import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      });
    }

    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        if (section) {
          setActiveSection(section);
          const targetSection = document.getElementById(section);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Typing animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
      const titles = ['Full-Stack Developer', 'AI/ML Enthusiast', 'Problem Solver'];
      let titleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const typeWriter = () => {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
          typingText.textContent = currentTitle.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingText.textContent = currentTitle.substring(0, charIndex + 1);
          charIndex++;
        }

        let typeSpeed = 100;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentTitle.length) {
          typeSpeed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
          typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
      };

      typeWriter();
    }

    // Scroll spy for navigation
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -80% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
            navItems.forEach(item => {
              item.classList.remove('active');
              if (item.getAttribute('data-section') === id) {
                item.classList.add('active');
              }
            });
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    return () => {
      if (themeToggle) {
        themeToggle.removeEventListener('click', () => { });
      }
      navItems.forEach(item => {
        item.removeEventListener('click', () => { });
      });
      observer.disconnect();
    };
  }, [theme]);

  return (
    <>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-shapes"></div>
        <div className="neural-network"></div>
        <div className="gradient-orbs"></div>
      </div>

      {/* Dark Mode Toggle */}
      <button className="theme-toggle" id="themeToggle">
        <div className="toggle-track">
          <div className="toggle-thumb">
            <i className="fas fa-sun sun-icon"></i>
            <i className="fas fa-moon moon-icon"></i>
          </div>
        </div>
      </button>

      {/* Navigation */}
      <nav className="floating-nav">
        <div className="nav-container">
          <div className="nav-items">
            <a href="#hero" className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`} data-section="hero">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </a>
            <a href="#about" className={`nav-item ${activeSection === 'about' ? 'active' : ''}`} data-section="about">
              <i className="fas fa-user"></i>
              <span>About</span>
            </a>
            <a href="#experience" className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`} data-section="experience">
              <i className="fas fa-briefcase"></i>
              <span>Experience</span>
            </a>
            <a href="#skills" className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`} data-section="skills">
              <i className="fas fa-code"></i>
              <span>Skills</span>
            </a>
            <a href="#projects" className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`} data-section="projects">
              <i className="fas fa-rocket"></i>
              <span>Projects</span>
            </a>
            <a href="#achievements" className={`nav-item ${activeSection === 'achievements' ? 'active' : ''}`} data-section="achievements">
              <i className="fas fa-trophy"></i>
              <span>Achievements</span>
            </a>
            <a href="#contact" className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`} data-section="contact">
              <i className="fas fa-envelope"></i>
              <span>Contact</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="profile-card">
              <div className="profile-image-container">
                <div className="profile-image">
                  <img src="/Profile.jpg" alt="Harsh Bablani" className="profile-photo" />
                  <div className="profile-ring"></div>
                  <div className="profile-glow"></div>
                </div>
              </div>

              <div className="hero-text">
                <div className="greeting">
                  <span className="wave">👋</span>
                  <span>Hello, I'm</span>
                </div>
                <h1 className="hero-name">
                  <span className="name-part">HARSH</span>
                  <span className="name-part">BABLANI</span>
                </h1>
                <div className="hero-title">
                  <span className="typing-text"></span>
                  <span className="cursor">|</span>
                </div>
                <p className="hero-description">
                  Elite Full-Stack Developer crafting next-generation applications with cutting-edge
                  technology and unparalleled expertise in scalable, high-performance solutions.
                </p>

                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number">8.2</div>
                    <div className="stat-label">CGPA</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">2+</div>
                    <div className="stat-label">Years Exp</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">10+</div>
                    <div className="stat-label">Projects</div>
                  </div>
                </div>

                <div className="hero-actions">
                  <a className="cta-button primary" href="/SDE_Harsh Bablani Resume.pdf" download>
                    <span>Download Resume</span>
                    <i className="fas fa-download"></i>
                  </a>
                  <button className="cta-button secondary">
                    <span>View Projects</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>

                <div className="social-links">
                  <a href="https://www.linkedin.com/in/harsh-bablani-36011b2b1/" className="social-link linkedin"
                    target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/harsh-bablani" className="social-link github" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="mailto:bablaniharsh22@gmail.com" className="social-link email">
                    <i className="fas fa-envelope"></i>
                  </a>
                  <a href="tel:+918000398836" className="social-link phone">
                    <i className="fas fa-phone"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <div className="section-subtitle">Professional Summary</div>
          </div>

          <div className="about-content">
            <div className="about-text">
              <div className="premium-card">
                <div className="card-glow"></div>
                <div className="card-content">
                  <p className="about-description">
                    Passionate Full-Stack Developer with a strong focus on building scalable,
                    high-performance applications and ensuring robust web security. I thrive in dynamic
                    environments, continuously learning and adapting to new challenges while delivering
                    exceptional results that exceed expectations.
                  </p>

                  <div className="education-info">
                    <h3>Education</h3>
                    <div className="education-item">
                      <div className="education-header">
                        <h4>Sir M. Visvesvaraya Institute Of Technology</h4>
                        <span className="duration">Dec 2022 - 2026</span>
                      </div>
                      <p className="degree">Bachelor of Engineering, Artificial Intelligence and Machine
                        Learning</p>
                      <p className="location">Bangalore, India</p>
                      <div className="cgpa-display">
                        <span className="cgpa-label">CGPA:</span>
                        <span className="cgpa-value">8.2/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section experience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Experience</h2>
            <div className="section-subtitle">Professional Journey</div>
          </div>

          <div className="experience-timeline">
            <div className="timeline-line"></div>

            <div className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-card">
                <div className="card-glow"></div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h3>Software Developer Intern</h3>
                    <span className="duration">March 2025 - Present</span>
                  </div>
                  <h4>Shankh Technologies Pvt. Ltd.</h4>
                  <p className="location">Bangalore, India</p>
                  <ul className="experience-details">
                    <li>Worked on multiple client projects, developing end-to-end websites using React.js
                      and Node.js.</li>
                    <li>Implemented modern UI/UX designs with responsive layouts and optimized performance.
                    </li>
                    <li>Collaborated with cross-functional teams to deliver high-quality solutions.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-card">
                <div className="card-glow"></div>
                <div className="experience-content">
                  <div className="experience-header">
                    <h3>Software Developer Intern</h3>
                    <span className="duration">May 2025 - July 2025</span>
                  </div>
                  <h4>Routefever Travels Pvt. Ltd.</h4>
                  <p className="location">Bangalore, India</p>
                  <ul className="experience-details">
                    <li>Developed the company's end-to-end website using React.js and Node.js, improving
                      user engagement and providing a seamless booking experience.</li>
                    <li>Integrated payment gateways and booking systems for enhanced user experience.</li>
                    <li>Optimized website performance resulting in 40% faster load times.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Skills</h2>
            <div className="section-subtitle">Technical Expertise</div>
          </div>

          <div className="skills-grid">
            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-code"></i>
                </div>
                <h3>Programming Languages</h3>
                <div className="skill-tags">
                  <span className="skill-tag">C/C++</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">Python</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-palette"></i>
                </div>
                <h3>Frontend</h3>
                <div className="skill-tags">
                  <span className="skill-tag">React.js</span>
                  <span className="skill-tag">Next.js</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">Tailwind CSS</span>
                  <span className="skill-tag">Bootstrap</span>
                  <span className="skill-tag">Sass</span>
                  <span className="skill-tag">Shadcn UI</span>
                  <span className="skill-tag">Chakra UI</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-server"></i>
                </div>
                <h3>Backend</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Express.js</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">RESTful API</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-cloud"></i>
                </div>
                <h3>DevOps & Cloud</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">Linux</span>
                  <span className="skill-tag">Firebase</span>
                  <span className="skill-tag">Cloudflare</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-database"></i>
                </div>
                <h3>Database & Testing</h3>
                <div className="skill-tags">
                  <span className="skill-tag">PostgreSQL</span>
                  <span className="skill-tag">MySQL</span>
                  <span className="skill-tag">Postman</span>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <div className="category-card">
                <div className="card-glow"></div>
                <div className="category-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Soft Skills</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Communication</span>
                  <span className="skill-tag">Adaptability</span>
                  <span className="skill-tag">Problem-Solving</span>
                  <span className="skill-tag">Leadership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            <div className="section-subtitle">Featured Work</div>
          </div>

          <div className="projects-grid">
            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-traffic-light"></i>
                </div>
                <h3>Smart Traffic Management System</h3>
                <div className="project-tech">
                  <span>React.js</span>
                  <span>Node.js</span>
                  <span>Tailwind CSS</span>
                  <span>MongoDB</span>
                </div>
                <p className="project-description">
                  Built a real-time traffic tool using React and Node.js to optimize signal timings. Deployed
                  on Render to reduce congestion and improve traffic flow.
                </p>
                <div className="project-links">
                  <a href="https://github.com/harsh-bablani/Smart-Traffic-Oracle-system.git"
                    className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>DDoS Attack Detection System</h3>
                <div className="project-tech">
                  <span>Machine Learning</span>
                  <span>Deep Learning</span>
                  <span>NLP</span>
                </div>
                <p className="project-description">
                  Built Real-Time Anomaly Detection Model using LSTM, CNN, Random Forest, and SVM to identify
                  DDoS attacks on bank servers and enhance security.
                </p>
                <div className="project-links">
                  <a href="https://github.com/harsh-bablani/DDOS-Attack-Detection-Mode-.git"
                    className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-route"></i>
                </div>
                <h3>Routefever Static Website</h3>
                <div className="project-tech">
                  <span>React.js</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>RESTful APIs</span>
                </div>
                <p className="project-description">
                  Developed a full-stack website using React.js, Node.js, and Tailwind CSS, incorporating
                  responsive design and efficient routing.
                </p>
                <div className="project-links">
                  <a href="https://github.com/harsh-bablani/Route.git" className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="card-glow"></div>
              <div className="project-content">
                <div className="project-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <h3>LinkedIn Post Generator</h3>
                <div className="project-tech">
                  <span>Gen AI</span>
                  <span>Langchain</span>
                  <span>Llama 3.3</span>
                  <span>Streamlit</span>
                </div>
                <p className="project-description">
                  Developed a GenAI-Powered tool using Langchain, Streamlit and Llama 3.3 open-source model.
                  Generates high quality LinkedIn posts.
                </p>
                <div className="project-links">
                  <a href="https://github.com/harsh-bablani/Linkedin-post-generator.git" className="project-link"
                    target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="section achievements-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Achievements</h2>
            <div className="section-subtitle">Recognition & Awards</div>
          </div>

          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="card-glow"></div>
              <div className="achievement-content">
                <div className="achievement-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Google Scholar Publication</h3>
                <h4>World Congress On Advanced Pharmacy and Clinical Research (WCAPCR-24)</h4>
                <p>Published a research paper on Medical Image analysis using machine learning and natural
                  language processing</p>
              </div>
            </div>

            <div className="achievement-card">
              <div className="card-glow"></div>
              <div className="achievement-content">
                <div className="achievement-icon">
                  <i className="fas fa-plane"></i>
                </div>
                <h3>Team Lead - Aero Show 2023</h3>
                <h4>Air India Show 2023</h4>
                <p>Worked as Team Lead in Air India Show 2023 and managed the VIP entrance during the Show.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contact</h2>
            <div className="section-subtitle">Get In Touch</div>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card">
                <div className="card-glow"></div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>bablaniharsh22@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-glow"></div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Phone</h4>
                    <p>+91 8000398836</p>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-glow"></div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Location</h4>
                    <p>Bangalore, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
