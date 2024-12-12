import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState(""); // State to hold email input
  const [password, setPassword] = useState(""); // State to hold password input
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // State to hold error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setIsLoading(true);  // Show loading indicator

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

      localStorage.setItem("token", data.token); // Store JWT token

      // Redirect to dashboard or home page
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("Error:", error);
      setError(error.message);  // Show error message to user
    } finally {
      setIsLoading(false);  // Hide loading indicator
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
        {isLoading && <p>Loading...</p>}  {/* Loading indicator */}
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message */}
      </form>
    </div>
  );
};

export default Login;
