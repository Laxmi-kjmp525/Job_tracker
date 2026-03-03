import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const STATUSES = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // stats
  const [stats, setStats] = useState({ total: 0, byStatus: {} });

  // jobs list
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);

  // filters
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  // add job
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [notes, setNotes] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (statusFilter) params.set("status", statusFilter);
    if (search.trim()) params.set("search", search.trim());
    return params.toString();
  }, [page, limit, statusFilter, search]);

  const loadStats = async () => {
    const res = await api.get("/jobs/stats");
    setStats(res.data);
  };

  const loadJobs = async () => {
    const res = await api.get(`/jobs?${query}`);
    setJobs(res.data.jobs);
    setTotalPages(res.data.totalPages || 1);
  };

  const refresh = async () => {
    setErr("");
    setLoading(true);
    try {
      await Promise.all([loadStats(), loadJobs()]);
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const addJob = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/jobs", { company, role, status, notes });
      setCompany("");
      setRole("");
      setNotes("");
      setStatus("APPLIED");
      setPage(1);
      await refresh();
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to add job");
    }
  };

  const changeStatus = async (id, newStatus) => {
    setErr("");
    try {
      await api.put(`/jobs/${id}`, { status: newStatus });
      await refresh();
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to update status");
    }
  };

  const deleteJob = async (id) => {
    setErr("");
    try {
      await api.delete(`/jobs/${id}`);
      await refresh();
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="grid cols3">
      {/* LEFT MAIN */}
      <div className="grid">
        <div className="card">
          <div className="cardInner">
            <div className="row">
              <div>
                <h1 className="h1" style={{ marginBottom: 4 }}>Dashboard</h1>
                <p className="sub">Track job applications and update status quickly.</p>
              </div>
              <div className="rowRight">
                <span className="badge">Total: {stats.total ?? 0}</span>
                <button className="btn" onClick={refresh} disabled={loading}>
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              </div>
            </div>

            {err ? <div className="alert alertErr" style={{ marginTop: 12 }}>{err}</div> : null}

            <div className="hr" />

            <div className="statsGrid">
              {STATUSES.map((s) => (
                <div key={s} className="stat">
                  <div className="statLabel">{s}</div>
                  <div className="statValue">{stats.byStatus?.[s] ?? 0}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* JOB LIST */}
        <div className="card">
          <div className="cardInner">
            <div className="row">
              <h2 style={{ margin: 0 }}>Your Jobs</h2>
              <span className="badge">{jobs.length} shown</span>
            </div>

            <div className="hr" />

            {jobs.length === 0 ? (
              <div className="alert">No jobs found. Add your first job above 👇</div>
            ) : (
              <div className="grid">
                {jobs.map((job) => (
                  <div key={job.id} className="jobCard">
                    <div>
                      <p className="jobTitle">{job.company}</p>
                      <p className="jobMeta">
                        {job.role} <br />
                        <span className="small">
                          Status: <b>{job.status}</b> • {job.notes ? job.notes : "no notes"}
                        </span>
                      </p>
                    </div>

                    <div className="row" style={{ alignItems: "center" }}>
                      <select
                        className="select"
                        value={job.status}
                        onChange={(e) => changeStatus(job.id, e.target.value)}
                        style={{ minWidth: 160 }}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>

                      <button className="btn btnDanger" onClick={() => deleteJob(job.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pagination">
              <button className="btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                Prev
              </button>

              <span className="badge">
                Page {page} / {totalPages}
              </span>

              <button className="btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="grid" style={{ alignContent: "start" }}>
        {/* ADD JOB */}
        <div className="card">
          <div className="cardInner">
            <h2 style={{ margin: 0 }}>Add Job</h2>
            <p className="sub">Add company + role. Notes optional.</p>

            <div className="hr" />

            <form className="form" onSubmit={addJob}>
              <input className="input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (e.g., Google)" />
              <input className="input" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role (e.g., Backend Intern)" />

              <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <textarea className="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)..." />

              <button className="btn btnPrimary">Add</button>
            </form>
          </div>
        </div>

        {/* FILTERS */}
        <div className="card">
          <div className="cardInner">
            <h2 style={{ margin: 0 }}>Filter & Search</h2>
            <p className="sub">Filter by status or search company/role.</p>

            <div className="hr" />

            <div className="form">
              <select
                className="select"
                value={statusFilter}
                onChange={(e) => {
                  setPage(1);
                  setStatusFilter(e.target.value);
                }}
              >
                <option value="">All Status</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <input
                className="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search (e.g., google, intern...)"
              />

              <button className="btn" onClick={() => setPage(1)}>
                Apply
              </button>

              <button
                className="btn"
                onClick={() => {
                  setPage(1);
                  setSearch("");
                  setStatusFilter("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="card">
          <div className="cardInner">
            <h2 style={{ margin: 0 }}>Tips</h2>
            <div className="hr" />
            <div className="grid">
              <div className="alert">Use <b>INTERVIEW</b> once your OA/HR round starts.</div>
              <div className="alert">Add notes like “Referral”, “OA done”, “HR on 12th”.</div>
              <div className="alert">Keep statuses updated — this is what impresses interviewers.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}