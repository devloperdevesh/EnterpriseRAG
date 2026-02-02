import { useState } from "react";
import { api } from "../api/client";

export default function Signup({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !password || !tenantId) {
      setMessage("All fields are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/signup", {
        email,
        password,
        tenant_id: tenantId.trim(), //Required by backend
        role: "user",
      });

      setMessage(res.data.message || "Account created successfully");
    } catch (err: any) {
      const msg =
        err.response?.data?.detail?.[0]?.msg ||
        err.response?.data?.detail ||
        "Signup failed";

      setMessage(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Create Account</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Tenant / Workspace ID (e.g. tenant1)"
        value={tenantId}
        onChange={(e) => setTenantId(e.target.value)}
        style={styles.input}
      />

      <button
        onClick={submit}
        style={{
          ...styles.button,
          opacity: loading ? 0.6 : 1,
        }}
        disabled={loading}
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>

      <p style={{ marginTop: 15 }}>
        <span style={styles.link} onClick={onBack}>
          Back to Login
        </span>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  card: {
    width: 420,
    margin: "120px auto",
    padding: 32,
    borderRadius: 16,
    background: "#ffffff",
    boxShadow: "0 15px 60px rgba(0,0,0,0.12)",
    textAlign: "center" as const,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 14,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(90deg,#8A2BE2,#007BFF)",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },
  link: {
    color: "#007BFF",
    cursor: "pointer",
  },
};
