import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState("Seeking employment");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [bSchool, setBSchool] = useState(""); // 🆕 Added for Business School
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const businessSchools = [
    "Harvard Business School",
    "Stanford Graduate School of Business",
    "Wharton School (University of Pennsylvania)",
    "MIT Sloan School of Management",
    "Booth School of Business (University of Chicago)",
    "Kellogg School of Management (Northwestern)",
    "Columbia Business School",
    "Tuck School of Business (Dartmouth)",
    "Haas School of Business (UC Berkeley)",
    "Yale School of Management",
    "Darden School of Business (University of Virginia)",
    "Ross School of Business (University of Michigan)",
    "Stern School of Business (NYU)",
    "Fuqua School of Business (Duke)",
    "Johnson Graduate School of Management (Cornell)",
    "McCombs School of Business (University of Texas at Austin)",
    "Simon Business School (University of Rochester)",
    "Olin Business School (Washington University in St. Louis)",
    "Goizueta Business School (Emory)",
    "Kenan-Flagler Business School (UNC Chapel Hill)",
    "Foster School of Business (University of Washington)",
    "Anderson School of Management (UCLA)",
    "Marshall School of Business (USC)",
    "Carnegie Mellon Tepper School of Business",
    "Georgetown McDonough School of Business",
    "Notre Dame Mendoza College of Business",
    "Boston College Carroll School of Management",
    "Georgia Tech Scheller College of Business",
    "Indiana University Kelley School of Business",
    "Rice University Jones Graduate School of Business",
    "Wisconsin School of Business",
    "Vanderbilt Owen Graduate School of Management",
    "Texas A&M Mays Business School",
    "University of Florida Warrington College of Business",
    "Boston University Questrom School of Business",
    "SMU Cox School of Business",
    "University of Minnesota Carlson School of Management",
    "University of Maryland Smith School of Business",
    "Purdue University Krannert School of Management",
    "Ohio State University Fisher College of Business",
    // You can add even more if needed!
  ];

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
        body: JSON.stringify({ name, job, industry, status, company, location, bSchool }), // 🆕 Include bSchool
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
          placeholder="Target Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Industry (e.g., Finance, Tech, Consulting)"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
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

        {/* 🆕 Business School Dropdown */}
        <select
          value={bSchool}
          onChange={(e) => setBSchool(e.target.value)}
          required
        >
          <option value="">Select your Business School</option>
          {businessSchools.map((school, index) => (
            <option key={index} value={school}>
              {school}
            </option>
          ))}
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
