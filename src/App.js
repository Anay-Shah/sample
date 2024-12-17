import React, { useState, useEffect, useRef } from 'react';
import Tanjiro from './Tanjiro.png';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    console.log(ctx);

    // Resize canvas to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class with mouse interaction
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = 'rgba(255, 255, 255, 0.7)';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 150; i++) {
        particlesRef.current.push(
          new Particle(Math.random() * canvas.width, Math.random() * canvas.height)
        );
      }
    };

    // Mouse interaction
    canvas.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      particlesRef.current.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.speedX += dx / 1000;
          particle.speedY += dy / 1000;
        }
      });
    });

    // Animation loop
    // Animation loop
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Test: Draw a red rectangle
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 50, 50);

  // Create connection lines between close particles
  particlesRef.current.forEach((particle1) => {
    particle1.update();
    particle1.draw();

    particlesRef.current.forEach((particle2) => {
      const dx = particle1.x - particle2.x;
      const dy = particle1.y - particle2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 120})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particle1.x, particle1.y);
        ctx.lineTo(particle2.x, particle2.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animate);
};


    createParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(20,20,50,1) 0%, rgba(0,0,0,1) 100%)',
      }}
    />
  );
};

const Portfolio = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-black text-white min-h-screen">
      <InteractiveBackground />

      {/* Navigation Legend */}
      <div className="fixed top-4 right-4 z-50 bg-gray-800/70 rounded-lg p-2">
        <nav className="space-y-2">
          <button
            onClick={() => scrollToSection('about')}
            className="block text-white hover:text-blue-300 transition-transform duration-200 hover:scale-110"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="block text-white hover:text-blue-300 transition-transform duration-200 hover:scale-110"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="block text-white hover:text-blue-300 transition-transform duration-200 hover:scale-110"
          >
            Projects
          </button>
        </nav>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-white">Jane Doe</h1>
          <p className="text-xl text-gray-300">Computer Science Student @ Toronto Metropolitan University</p>
        </header>

        {/* About Me */}
        <section id="about" className="mb-12 bg-black/50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">About Me</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <img
                src={Tanjiro}
                alt="Profile"
                className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-gray-300 w-full md:w-2/3">
              Passionate computer science student specialized in software development
              and innovative technological solutions. Driven to create impactful software
              that pushes the boundaries of what's possible. With a strong foundation in
              programming and a creative approach to problem-solving, I am committed to
              developing cutting-edge technological solutions.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-12 bg-black/50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Python",
              "React",
              "JavaScript",
              "Machine Learning",
              "Docker",
              "Node.js",
              "Git",
              "SQL",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-12 bg-black/50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Projects</h2>
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Machine Learning Sentiment Analyzer</h3>
              <p className="text-gray-300">
                Developed an advanced sentiment analysis tool using deep learning techniques,
                achieving 85% accuracy in classifying social media text sentiment.
              </p>
              <a
                href="#"
                className="text-blue-400 hover:underline mt-2 inline-block"
              >
                View Project
              </a>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white">Distributed Cloud Storage System</h3>
              <p className="text-gray-300">
                Implemented a scalable distributed storage system with redundancy and
                load balancing using Go and Docker, optimizing data storage and retrieval.
              </p>
              <a
                href="#"
                className="text-blue-400 hover:underline mt-2 inline-block"
              >
                View Project
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 pt-4">
          <p>© 2024 Jane Doe. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
