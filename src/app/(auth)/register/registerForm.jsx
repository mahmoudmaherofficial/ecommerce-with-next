"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pwdError, setPwdError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setPwdError(false);
    setError(null);

    // Check password strength
    const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!regPassword.test(password)) {
      setPwdError(true);
      setError(
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 special character and 1 numeric."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        // Check specifically for "user already exists" error (409 status)
        if (response.status === 409 && data.error === "User already exists") {
          setError("User already exists. Please use a different email.");
        }
        return;
      }

      // Success case
      toast.success("Account created successfully");
      e.target.reset(); // Reset form on success
      router.push("/signin");
    } catch (error) {
      // Handle network or unexpected errors
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <div className="mb-4">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          aria-describedby="emailHelp"
          onChange={(prev) => setName(prev.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(prev) => setEmail(prev.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(prev) => setPassword(prev.target.value)}
          required
          style={{ borderColor: pwdError && "#f00" }}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading || !name || !email || !password}>
        {loading ? (
          <div className="spinner-border text-light" style={{ width: "1rem", height: "1rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Create account"
        )}
      </button>
      <p className="mt-3" style={{ color: "#ff7790" }}>
        {error ? error : ""}
      </p>
    </form>
  );
}
