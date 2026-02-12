import { useEffect } from "react";
import { FiCode, FiLock, FiZap, FiUsers, FiGithub, FiMail, FiLinkedin } from "react-icons/fi";
import SEO from "../components/SEO";
import "../styles/ContentPages.css";
import "../styles/About.css";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SendIt",
    description: "A secure platform for sharing files and code",
    url: "https://sendit.example.com",
    logo: "https://sendit.example.com/logo.png",
  };

  const teamMembers = [
    {
      name: "Mohammad Husain",
      img: "images/mohammd.png",
      role: "Full Stack Developer ",
      bio: "Full Stack Developer with practical experience in Angular and Next.js React.js. Specializes in building responsive web applications with REST API integration.",
      skills: ["React.js", "Next.js", "Angular", "Node.js", "Express.js", "MySQL", "Tailwind CSS"],
      email: "mohammadhusainmsn@gmail.com",
      linkedin: "linkedin.com/in/mohammadhusainmomin",
      github: "https://github.com/mohammadhusainmomin",
    },
    {
      name: "Shabir Trivedi",
      img: "images/sabbir.jpeg",
      role: "Frontend Developer",
      bio: "Frontend developer with expertise in modern web technologies and responsive UI/UX implementation.",
      skills: ["React", "JavaScript", "HTML/CSS", "Web Design", "User Experience", "Frontend Optimization"],
      email: "trivedishabbir071@gmail.com",
      linkedin: "https://www.linkedin.com/in/shabbir-trivedi-10a529358/",
    },
    {
      name: "Azim Divan",
      img: "images/azim.jpeg",
      role: "Backend Developer",
      bio: "Backend specialist focused on building robust and scalable server-side solutions with secure API implementation.",
      skills:  ["Node.js", "Express.js", "MongoDB", "Authentication", "API Security", "Database Design"],
      email: "ajimdiwan04570457@gmail.com",
    },
  ];

  return (
    <>
      <SEO
        title="About SendIt - Secure File & Code Sharing Platform"
        description="Learn about SendIt, a secure platform for sharing files and code snippets. Meet the team behind the innovation."
        url="https://sendit.example.com/about"
        structuredData={structuredData}
      />

      <div className="content-page-wrapper">
        <div className="content-container">
          <h1 className="page-title">About SendIt</h1>

          <section className="content-section">
            <h2>Our Mission</h2>
            <p>
              SendIt is dedicated to providing a secure, fast, and user-friendly platform for sharing files and code snippets. We believe that file sharing should be simple, safe, and accessible to everyone without compromising on security or performance.
            </p>
          </section>

          <section className="content-section">
            <h2>Why Choose SendIt?</h2>
            <div className="features-showcase">
              <div className="feature-item">
                <FiLock className="feature-item-icon" />
                <h4>Security First</h4>
                <p>All files are encrypted during transfer</p>
              </div>
              <div className="feature-item">
                <FiZap className="feature-item-icon" />
                <h4>Fast Transfer</h4>
                <p>Optimized for quick uploads and downloads</p>
              </div>
              <div className="feature-item">
                <FiCode className="feature-item-icon" />
                <h4>Code Sharing</h4>
                <p>Share code snippets with syntax highlighting</p>
              </div>
              <div className="feature-item">
                <FiUsers className="feature-item-icon" />
                <h4>No Sign-Up</h4>
                <p>Share files without creating an account</p>
              </div>
            </div>
          </section>

          <section className="content-section">
            <h2>What We Offer</h2>
            <p>
              SendIt provides comprehensive file and code sharing solutions tailored to your needs:
            </p>
            <ul className="feature-list">
              <li><strong>File Sharing:</strong> Upload and share files securely with code-based access</li>
              <li><strong>Code Sharing:</strong> Share code snippets with syntax highlighting and auto-expiration</li>
              <li><strong>Privacy Protection:</strong> Files expire automatically for enhanced security</li>
              <li><strong>User Management:</strong> Create accounts to track and manage your shared content</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Our Team</h2>
            <p>
              We are passionate developers committed to creating tools that make secure file sharing simple and accessible.
            </p>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-avatar">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="avatar-img" />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-skills">
                    {member.skills.map((skill, i) => (
                      <span key={i} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                  <div className="team-social">
                    {member.email !== "#" && (
                      <a href={`mailto:${member.email}`} title="Email" className="social-link">
                        <FiMail size={18} />
                      </a>
                    )}
                    {member.linkedin !== "#" && (
                      <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-link">
                        <FiLinkedin size={18} />
                      </a>
                    )}
                    {member.github !== "#" && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="social-link">
                        <FiGithub size={18} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="content-section">
            <h2>Our Commitment</h2>
            <p>
              We are committed to maintaining the highest standards of security and privacy. Our platform is built with modern web technologies and best practices to ensure your data is always protected. We continuously improve our systems and listen to user feedback to provide the best experience possible.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
