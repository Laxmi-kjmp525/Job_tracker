import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      // If you have validation middleware, errors might come as errors[]
      const msg =
        error?.response?.data?.message ||
        (error?.response?.data?.errors?.[0]?.message ?? "Register failed");
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="cardInner" style={{ maxWidth: 560, margin: "0 auto" }}>
        <h1 className="h1">Create your account ✨</h1>
        <p className="sub">Start tracking your job applications in one place.</p>

        <div className="hr" />

        {err ? <div className="alert alertErr">{err}</div> : null}

        <form className="form" onSubmit={submit}>
          <div>
            <div className="label">Full name</div>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Laxmi" />
          </div>

          <div>
            <div className="label">Email</div>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="laxmi@test.com" />
          </div>

          <div>
            <div className="label">Password</div>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" />
          </div>

          <button className="btn btnPrimary" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>

          <div className="small">
            Already have an account? <Link to="/login" style={{ color: "var(--brand)" }}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}