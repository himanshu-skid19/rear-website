import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Citation.css';

const Citation = () => {
  const [copied, setCopied] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const bibtexCitation = `@misc{agarwal2025rearretrieveexpandrefine,
  title={REaR: Retrieve, Expand and Refine for Effective Multitable Retrieval},
  author={Rishita Agarwal and Himanshu Singhal and Peter Baile Chen
          and Manan Roy Choudhury and Dan Roth and Vivek Gupta},
  year={2025},
  eprint={2511.00805},
  archivePrefix={arXiv},
  primaryClass={cs.IR},
  url={https://arxiv.org/abs/2511.00805}
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bibtexCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const authors = [
    {
      name: 'Rishita Agarwal',
      affiliation: 'Indian Institute of Technology Guwahati',
      role: 'First co-author',
      email: 'rishita@iitg.ac.in'
    },
    {
      name: 'Himanshu Singhal',
      affiliation: 'Indian Institute of Technology Guwahati',
      role: 'First co-author',
      email: 'h.singhal@iitg.ac.in'
    },
    {
      name: 'Peter Baile Chen',
      affiliation: 'Massachusetts Institute of Technology',
      role: 'Co-author',
      email: 'peterbc@mit.edu'
    },
    {
      name: 'Manan Roy Choudhury',
      affiliation: 'Arizona State University',
      role: 'Co-author',
      email: 'mroycho1@asu.edu'
    },
    {
      name: 'Dan Roth',
      affiliation: 'University of Pennsylvania',
      role: 'Co-advisor',
      email: 'danroth@seas.upenn.edu'
    },
    {
      name: 'Vivek Gupta',
      affiliation: 'Arizona State University',
      role: 'Primary supervisor',
      email: 'vgupt140@asu.edu'
    }
  ];

  return (
    <section id="citation" className="citation-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="citation-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Citation & Acknowledgments</h2>
            <p className="section-subtitle">
              If you use REaR in your research, please cite our paper
            </p>
          </motion.div>

          <motion.div className="citation-main" variants={itemVariants}>
            <div className="citation-card">
              <div className="citation-header">
                <div className="citation-info">
                  <h3>BibTeX Citation</h3>
                  <p>Copy and paste this citation into your bibliography</p>
                </div>
                <button className="copy-citation-btn" onClick={copyToClipboard}>
                  {copied ? <FiCheck /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="citation-code">
                <SyntaxHighlighter
                  language="bibtex"
                  style={prism}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--tertiary-bg)'
                  }}
                >
                  {bibtexCitation}
                </SyntaxHighlighter>
              </div>
            </div>
          </motion.div>

          <motion.div className="authors-section" variants={itemVariants}>
            <h3>Authors</h3>
            <div className="authors-grid">
              {authors.map((author, index) => (
                <div key={index} className="author-card">
                  <div className="author-info">
                    <h4>{author.name}</h4>
                    <p className="author-affiliation">{author.affiliation}</p>
                    <p className="author-role">{author.role}</p>
                  </div>
                  <div className="author-contact">
                    <a href={`mailto:${author.email}`} className="author-email">
                      {author.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Citation;
