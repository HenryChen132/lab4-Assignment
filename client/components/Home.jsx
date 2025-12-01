// client/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import './controlled.css'

export default function Home() {
   const navigate = useNavigate();
  return (
    <div className="home">
      <div className="overlay-box">
          <h1>Welcome to my portfolio!</h1>
        <h4>
          My mission is to create engaging and innovative game experiences by combining programming, creative design, and game art skills.
        </h4>
        <h3>
          Explore my projects and feel free to get in touch!
        </h3>
        
        <br />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '10px', marginTop: "20px", marginBottom: "20px" }}>
          <p>More information about me --------------------------</p>
          <button onClick={() => navigate("/about")}>About</button>
        </div>
         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '10px', marginTop: "20px", marginBottom: "20px" }}>
          <p>My Education history -------------------------------</p>
          <button onClick={() => navigate("/education")}>Education</button>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '10px', marginTop: "20px", marginBottom: "20px" }}>
          <p>Explore my achievements! ----------------------------</p>
          <button onClick={() => navigate("/project")}>Project</button>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '10px', marginTop: "20px", marginBottom: "20px" }}>
          <p>My Services -------------------------------------------</p>
          <button onClick={() => navigate("/services")}>Services</button>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '10px', marginTop: "20px", marginBottom: "20px" }}>
          <p>To contact me -----------------------------------------</p>
          <button onClick={() => navigate("/contact")}>Contact</button>
        </div>
        
      </div>
      <footer style={{ textAlign: 'center', color: 'lightblue' }}>Copyright © 2025 Haoxuan Chen
</footer>
    </div>
    
  )
}

