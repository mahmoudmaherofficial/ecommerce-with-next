"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name, email, password }),
  //     });
  //     e.target.reset();
  //   } catch (error) {
  //     console.log("user already exists");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
          alert("User already exists. Please use a different email.");
        } else {
          // Handle other errors generically
          alert(data.error || "Registration failed");
        }
        return;
      }

      // Success case
      alert("Registration successful!");
      e.target.reset(); // Reset form on success
    } catch (error) {
      // Handle network or unexpected errors
      alert("An error occurred. Please try again later.");
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
        />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Create Account
      </button>
    </form>
  );
}
