const prisma = require("../prisma");

// POST /api/jobs
const createJob = async (req, res) => {
  try {
    const { company, role, status, notes, dateApplied } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "company and role are required" });
    }

    const job = await prisma.job.create({
      data: {
        company,
        role,
        status, // APPLIED | INTERVIEW | OFFER | REJECTED
        notes,
        dateApplied: dateApplied ? new Date(dateApplied) : undefined,
        userId: req.userId,
      },
    });

    return res.status(201).json(job);
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/jobs?page=1&limit=10&status=APPLIED&search=google
const getJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 50);

    const status = req.query.status; // optional
    const search = (req.query.search || "").trim(); // optional

    const where = {
      userId,
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { company: { contains: search, mode: "insensitive" } },
              { role: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const [total, jobs] = await Promise.all([
      prisma.job.count({ where }),
      prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      jobs,
    });
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/jobs/stats
const getJobStats = async (req, res) => {
  try {
    const userId = req.userId;

    const [total, grouped] = await Promise.all([
      prisma.job.count({ where: { userId } }),
      prisma.job.groupBy({
        by: ["status"],
        where: { userId },
        _count: { status: true },
      }),
    ]);

    const byStatus = {
      APPLIED: 0,
      INTERVIEW: 0,
      OFFER: 0,
      REJECTED: 0,
    };

    for (const row of grouped) {
      byStatus[row.status] = row._count.status;
    }

    return res.json({ total, byStatus });
  } catch (error) {
    console.error("JOB STATS ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/jobs/:id
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findFirst({ where: { id, userId: req.userId } });
    if (!job) return res.status(404).json({ message: "Job not found" });

    const updated = await prisma.job.update({
      where: { id },
      data: req.body,
    });

    return res.json(updated);
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findFirst({ where: { id, userId: req.userId } });
    if (!job) return res.status(404).json({ message: "Job not found" });

    await prisma.job.delete({ where: { id } });

    return res.json({ message: "Job deleted" });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createJob, getJobs, getJobStats, updateJob, deleteJob };