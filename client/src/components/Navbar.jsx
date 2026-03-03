import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: 12,
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      <strong>Job Tracker</strong>

      {token && <Link to="/dashboard">Dashboard</Link>}

      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span style={{ marginLeft: "auto", fontSize: 14, color: "#555" }}>
            Hi, {user?.name || "User"}
          </span>
          <button
            onClick={logout}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
              border: "1px solid #ddd",
              background: "white",
              borderRadius: 6,
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}