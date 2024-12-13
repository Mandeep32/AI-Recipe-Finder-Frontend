import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);  

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard"; // Redirect after login

    } catch (error) {
      console.error("Error:", error);
      setError(error.message); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" disabled={isLoading}>Login</button>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {/* Add the Signup button here */}
      <div>
        <p>Don't have an account?</p>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
