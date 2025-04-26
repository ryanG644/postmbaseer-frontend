import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState("Seeking employment"); // default
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
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
        body: JSON.stringify({ name, job, status, company, location }),
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
      <p>Enter your details for your personalized MBA prophecy:</p>

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
          placeholder="Job / Target Job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option>Seeking employment</option>
          <option>Got an offer, considering it</option>
          <option>Accepted an offer</option>
          <option>Starting my own venture</option>
          <option>Taking time off to figure things out</option>
        </select>
        <input
          type="text"
          placeholder="Company (Optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (Optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Ask the Oracle</button>
      </form>

      {loading && <p>🔮 Summoning your fate...</p>}

      {result && (
        <div className="result">
          <h3>🗣 Oracle says:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
