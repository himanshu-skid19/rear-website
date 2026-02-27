import React from 'react';
import { FiDatabase, FiGitMerge } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Abstract.css';

const Abstract = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="abstract" className="abstract-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="abstract-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Abstract</h2>
            <p className="section-subtitle">
              Jointly optimizing query-table relevance and table-table joinability
            </p>
          </motion.div>

          <motion.div className="abstract-main" variants={itemVariants}>
            <div className="abstract-text">
              <p>
                Answering natural language queries over relational data often requires retrieving
                and reasoning over multiple tables, yet most retrievers optimize only for
                query–table relevance and ignore table–table compatibility.
              </p>
              <p>
                We introduce <strong>REaR</strong> (Retrieve, Expand and Refine), a three-stage,
                LLM-free framework that separates semantic relevance from structural joinability
                for efficient, high-fidelity multi-table retrieval. REaR (i) retrieves
                query-aligned tables, (ii) expands these with structurally joinable tables via
                fast, precomputed column-embedding comparisons, and (iii) refines them by pruning
                noisy or weakly related candidates.
              </p>
              <p>
                REaR is a retrieval framework that jointly optimizes query–table relevance and
                table–table joinability without online LLM calls, achieving performance
                competitive with state-of-the-art LLM-augmented systems while maintaining
                significantly lower latency and cost — 92.24% token reduction vs. ARM.
              </p>
            </div>

            <div className="abstract-highlights">
              <div className="highlight-item">
                <div className="highlight-icon sql-highlight">
                  <FiDatabase />
                </div>
                <div className="highlight-content">
                  <h4>Query Relevance</h4>
                  <p>Dense, sparse, and hybrid retrievers for semantic query-table alignment</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon llm-highlight">
                  <FiGitMerge />
                </div>
                <div className="highlight-content">
                  <h4>Joinability</h4>
                  <p>FAISS-based column embedding search for structural table-table compatibility</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="key-contributions" variants={itemVariants}>
            <h3 className="contributions-title">Key Contributions</h3>
            <div className="contributions-grid">
              <div className="contribution-item">
                <div className="contribution-number">01</div>
                <div className="contribution-content">
                  <h4>LLM-Free Design</h4>
                  <p>
                    Eliminates online LLM calls entirely, achieving 92.24% token reduction
                    compared to ARM while maintaining competitive retrieval quality.
                  </p>
                </div>
              </div>

              <div className="contribution-item">
                <div className="contribution-number">02</div>
                <div className="contribution-content">
                  <h4>Joint Optimization</h4>
                  <p>
                    Explicitly models both query–table relevance and table–table joinability
                    through a three-stage pipeline with dedicated components for each.
                  </p>
                </div>
              </div>

              <div className="contribution-item">
                <div className="contribution-number">03</div>
                <div className="contribution-content">
                  <h4>Retriever-Agnostic</h4>
                  <p>
                    Works as a plug-and-play layer over any standard retriever — dense, sparse,
                    or hybrid — enabling broad applicability across existing systems.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Abstract;
