"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninForm() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // sign in with email & password
      // Go to api/auth/[...nextauth]/route.js
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }

      console.log("welcome");
    } catch (error) {
      setError("unknown error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <div className="mb-4">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(input) => setEmail(input.target.value)}
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
          onChange={(input) => setPassword(input.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading || !email || !password}>
        {isLoading ? (
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
