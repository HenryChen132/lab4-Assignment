// client/src/about.jsx
import './controlled.css'
export default function About() {
return(
    <div className="home">
      <div className="overlay-box">
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <img 
            src="/me.jpg"   
            alt="logo"
            loading="lazy"
            style={{ width: '150px', height: '200px' }}
         />
          <h1>Haoxuan Chen<br /><br /> Game Developer</h1>
        </div>
        <hr />
         <p>
           I'm Haoxuan Chen, a passionate game developer with a strong foundation in programming, creative design, and game art.
        </p>    
        <h2>Here is my Resume!</h2>
      <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontSize: '20px' }}>
        View my Resume (PDF)
      </a>

      </div>
      <footer style={{ textAlign: 'center', color: 'lightblue' }}>
        Copyright © 2025 Haoxuan Chen
      </footer>
    </div>
  );
}