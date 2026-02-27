import React from 'react';
import { FiGithub, FiFileText, FiMail, FiExternalLink, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Paper', href: 'https://arxiv.org/abs/2511.00805', external: true },
    { label: 'Code', href: 'https://github.com/CoRAL-ASU/REaR', external: true },
    { label: 'CoRAL Lab', href: 'https://coral.lab.asu.edu', external: true },
    { label: 'Issues', href: 'https://github.com/CoRAL-ASU/REaR/issues', external: true }
  ];

  const authors = [
    { name: 'Rishita Agarwal', email: 'rishita@iitg.ac.in' },
    { name: 'Himanshu Singhal', email: 'h.singhal@iitg.ac.in' },
    { name: 'Vivek Gupta', email: 'vgupt140@asu.edu' }
  ];

  const institutions = [
    { name: 'Arizona State University', url: 'https://www.asu.edu/' },
    { name: 'University of Pennsylvania', url: 'https://www.upenn.edu/' }
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section footer-brand">
              <div className="brand-info">
                <h3 className="brand-title">REaR</h3>
                <p className="brand-subtitle">Retrieve, Expand and Refine for Effective Multitable Retrieval</p>
                <p className="brand-description">
                  A three-stage, LLM-free framework that jointly optimizes query–table relevance
                  and table–table joinability for efficient multi-table retrieval.
                </p>
              </div>

              <div className="footer-actions">
                <a
                  href="https://arxiv.org/abs/2511.00805"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-btn primary"
                >
                  <FiFileText />
                  Read Paper
                  <FiExternalLink className="external-icon" />
                </a>
                <a
                  href="https://github.com/CoRAL-ASU/REaR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-btn secondary"
                >
                  <FiGithub />
                  View Code
                  <FiExternalLink className="external-icon" />
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      {link.label}
                      <FiExternalLink className="link-icon" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Contact</h4>
              <ul className="footer-links">
                {authors.map((author, index) => (
                  <li key={index}>
                    <a
                      href={`mailto:${author.email}`}
                      className="footer-link contact-link"
                    >
                      <FiMail className="contact-icon" />
                      {author.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="section-title">Institutions</h4>
              <ul className="footer-links">
                {institutions.map((institution, index) => (
                  <li key={index}>
                    <a
                      href={institution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      {institution.name}
                      <FiExternalLink className="link-icon" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© {currentYear} REaR Research Team. CoRAL Lab, Arizona State University.</p>
              <p className="conference-info">arXiv 2025</p>
            </div>

            <div className="footer-meta">
              <div className="meta-item">
                <span>Made with</span>
                <FiHeart className="heart-icon" />
                <span>for the research community</span>
              </div>
              <div className="meta-item">
                <span>ArXiv:</span>
                <a
                  href="https://arxiv.org/abs/2511.00805"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arxiv-link"
                >
                  2511.00805
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
