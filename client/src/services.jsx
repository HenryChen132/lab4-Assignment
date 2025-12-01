// client/src/services.jsx
import './controlled.css'
export default function Services() {
return (
<div className="home">
      <div className="overlay-box">
          <h2 style={{ color: 'white' ,backgroundColor: 'black', border: '1px solid black', borderRadius: '10px' }}>Highlight Skills</h2>
          <ul style={{fontSize: '18px', marginLeft: '20px'}}>
            <li>Proficient in C# and Unity for game development</li>
            <li>Strong understanding of 3D modeling and animation</li>
            <li>Experience with game design principles and user experience</li>
            <li>Skilled in problem-solving and debugging</li>
            <li>Excellent skills of game art and design</li>
          </ul>
      </div>
      <footer style={{ textAlign: 'center', color: 'lightblue' }}>
        Copyright © 2025 Haoxuan Chen
      </footer>
</div>
);
}