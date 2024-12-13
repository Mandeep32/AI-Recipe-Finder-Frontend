import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const signupData = { name, email, password };

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      setSignupSuccess(true); // Set success to true after successful signup

    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      {signupSuccess ? (
        <div>
          <p>Signup successful! You can now login.</p>
          {/* Button to return to Login page */}
          <button onClick={() => navigate("/login")}>Return to Login</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
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
          <button type="submit" disabled={isLoading}>Signup</button>
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Signup;
