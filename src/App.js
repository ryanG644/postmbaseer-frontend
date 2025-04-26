import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("https://postmbaseer-backend.onrender.com/api/oracle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, job, status }),
      });

      const data = await response.json();
      setResult(data.answer);
    } catch (err) {
      setResult("⚠️ Oracle failed to respond. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>🧙‍♂️ PostMBASeer</h1>
      <p>Enter your details to receive your MBA prophecy:</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dream Job (e.g., VC)"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Current Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <button type="submit">Ask the Oracle</button>
      </form>

      {loading && <p>🔮 Summoning your fate...</p>}

      {result && (
        <div className="result">
          <h3>🗣 Oracle says:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
