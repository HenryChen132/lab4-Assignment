// client/src/Navbar.jsx
import React from "react";

function Navbar() {
  return (
    <div style={{ textAlign: "center", margin: "20px", fontWeight: "bold" }}>
      <a href="/"><button>Home</button></a>
      <a href="/about"><button>About Me</button></a>
      <a href="/education"><button>Education</button></a>
      <a href="/project"><button>Project</button></a>
      <a href="/services"><button>Services</button></a>
      <a href="/contact"><button>Contact Me</button></a>
    </div>
  );
}

export default Navbar;
