import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid cols2">
      <div className="card">
        <div className="cardInner">
          <h1 className="h1">Welcome back 👋</h1>
          <p className="sub">
            Login to manage your applications, update status, and track progress.
          </p>

          <div className="hr" />

          {err ? <div className="alert alertErr">{err}</div> : null}

          <form className="form" onSubmit={submit}>
            <div>
              <div className="label">Email</div>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="laxmi@test.com" />
            </div>

            <div>
              <div className="label">Password</div>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <button className="btn btnPrimary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="small">
              New here? <Link to="/register" style={{ color: "var(--brand)" }}>Create an account</Link>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="cardInner">
          <h1 className="h1">What you can do</h1>
          <p className="sub">Track jobs like a pro — clean + interview-ready.</p>

          <div className="hr" />

          <div className="grid">
            <div className="alert">✅ Add jobs with company, role, notes</div>
            <div className="alert">✅ Filter by status + search</div>
            <div className="alert">✅ Stats: Applied / Interview / Offer / Rejected</div>
            <div className="alert">✅ Pagination ready</div>
          </div>
        </div>
      </div>
    </div>
  );
}