import React from 'react';
import { FiGithub, FiFileText, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-particles"></div>
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <FiAward className="badge-icon" />
            <span>arXiv 2025</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="title-main">REaR</span>
            <span className="title-subtitle">Retrieve, Expand and Refine for Effective Multitable Retrieval</span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            A three-stage, LLM-free framework that separates semantic relevance from structural
            joinability for efficient, high-fidelity multi-table retrieval. Competitive with
            LLM-augmented systems at 92% fewer tokens.
          </motion.p>

          <motion.div className="hero-stats" variants={itemVariants}>
            <div className="stat-item">
              <div className="stat-number text-gradient">3</div>
              <div className="stat-label">Datasets</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-gradient">93.96%</div>
              <div className="stat-label">Best Recall</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-gradient">92%</div>
              <div className="stat-label">Token Reduction</div>
            </div>
          </motion.div>

          <motion.div className="hero-authors" variants={itemVariants}>
            <div className="authors-list">
              <span className="author-name">Rishita Agarwal<sup>1*</sup></span>
              <span className="author-name">Himanshu Singhal<sup>1*</sup></span>
              <span className="author-name">Peter Baile Chen<sup>2</sup></span>
              <span className="author-name">Manan Roy Choudhury<sup>3</sup></span>
              <span className="author-name">Dan Roth<sup>4</sup></span>
              <span className="author-name">Vivek Gupta<sup>3</sup></span>
            </div>

            <div className="affiliations">
              <span><sup>1</sup>Indian Institute of Technology, Guwahati</span>
              <span><sup>2</sup>MIT</span>
              <span><sup>3</sup>Arizona State University</span>
              <span><sup>4</sup>University of Pennsylvania</span>
            </div>

            <div className="author-note">
              <sup>*</sup> Equal Contribution
            </div>
          </motion.div>
          <motion.div className="hero-actions" variants={itemVariants}>
            <a
              href="https://arxiv.org/abs/2511.00805"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hero-btn"
            >
              <FiFileText />
              Read Paper
            </a>
            <a
              href="https://github.com/CoRAL-ASU/REaR"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary hero-btn"
            >
              <FiGithub />
              View Code
            </a>
          </motion.div>
        </motion.div>

        {/* Right-side pipeline visual */}
        <motion.div
          className="hero-visual"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="visual-container">
            <div className="weaver-pipeline">

              {/* Input */}
              <div className="pipeline-stage input-stage">
                <div className="input-box">
                  <div className="input-label">Query</div>
                  <div className="input-connector">+</div>
                  <div className="input-label">Table Corpus</div>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              {/* Stage 1 — Retrieve */}
              <div className="pipeline-stage">
                <div className="stage-box retrieve-box">
                  <div className="stage-title">Retrieve</div>
                  <div className="stage-tags">
                    <span className="stage-tag">Dense</span>
                    <span className="stage-tag">Sparse</span>
                    <span className="stage-tag">Hybrid</span>
                  </div>
                  <div className="stage-subtitle">Query-aligned table selection</div>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              {/* Stage 2 — Expand */}
              <div className="pipeline-stage">
                <div className="stage-box expand-box">
                  <div className="stage-title">Expand</div>
                  <div className="stage-tags">
                    <span className="stage-tag">FAISS Search</span>
                    <span className="stage-tag">Cross-encoder</span>
                  </div>
                  <div className="stage-subtitle">Joinable table discovery</div>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              {/* Stage 3 — Refine */}
              <div className="pipeline-stage">
                <div className="stage-box refine-box">
                  <div className="stage-title">Refine</div>
                  <div className="stage-tags">
                    <span className="stage-tag">Relevance</span>
                    <span className="stage-tag">Joinability</span>
                  </div>
                  <div className="stage-subtitle">Joint scoring &amp; reranking</div>
                </div>
              </div>

              <div className="flow-arrow">↓</div>

              {/* Output */}
              <div className="pipeline-stage output-stage">
                <div className="output-box">
                  <div className="output-label">Final Table Set</div>
                  <div className="output-shine"></div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
