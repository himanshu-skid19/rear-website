import React, { useState } from 'react';
import { FiSearch, FiPlusCircle, FiFilter, FiArrowRight, FiZap, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Architecture.css';

const Architecture = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const architectureSteps = [
    {
      id: 'retrieve',
      title: 'Retrieve',
      icon: FiSearch,
      description: 'Query-aligned table selection via standard retrievers',
      details: [
        'Sparse retrievers: TF-IDF based scoring (BM25, SPLADE)',
        'Dense retrievers: cosine similarity between learned embeddings (UAE, GTE, e5-mistral, BGE)',
        'Hybrid retrievers: weighted combination of sparse and dense scores',
        'Selects top-k semantically relevant tables for the input query'
      ],
      color: 'var(--blue-accent)'
    },
    {
      id: 'expand',
      title: 'Expand',
      icon: FiPlusCircle,
      description: 'Augment with structurally joinable tables via FAISS column search',
      details: [
        'Measure column embedding similarity using approximate nearest neighbor search (FAISS)',
        'Identify joinable tables that are structurally compatible with the base set',
        'Cross-encoder reranking to filter semantically distant candidates',
        'Expands from k to k\' + Δk\' candidates, capturing joinable neighbors'
      ],
      color: 'var(--purple-accent)'
    },
    {
      id: 'refine',
      title: 'Refine',
      icon: FiFilter,
      description: 'Joint scoring by query relevance and table-table joinability',
      details: [
        'Query-table relevance: cross-encoder similarity between query and table',
        'Table-table joinability: attention-weighted score based on column-level similarities',
        'Jointly weight both signals to produce a final ranking score',
        'Rerank all candidates and return the final top-k table set'
      ],
      color: 'var(--green-accent)'
    }
  ];

  const pipelineFlow = [
    { type: 'input', label: 'Query + Tables', color: 'var(--cyan-accent)' },
    { type: 'step', label: 'Retrieve', color: 'var(--blue-accent)' },
    { type: 'step', label: 'Expand', color: 'var(--purple-accent)' },
    { type: 'step', label: 'Refine', color: 'var(--green-accent)' },
    { type: 'output', label: 'Final Table Set', color: 'var(--success-text)' }
  ];

  return (
    <section id="architecture" className="architecture-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="architecture-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Pipeline Architecture</h2>
            <p className="section-subtitle">
              Three cleanly separated stages — each targeting a distinct aspect of multi-table retrieval
            </p>
          </motion.div>

          <motion.div className="pipeline-overview" variants={itemVariants}>
            <div className="pipeline-flow">
              {pipelineFlow.map((item, index) => (
                <React.Fragment key={item.label}>
                  <div
                    className={`pipeline-node ${item.type}`}
                    style={{ '--node-color': item.color }}
                  >
                    <div className="node-content">
                      <span>{item.label}</span>
                    </div>
                  </div>
                  {index < pipelineFlow.length - 1 && (
                    <FiArrowRight className="pipeline-arrow" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          <motion.div className="architecture-details" variants={itemVariants}>
            <div className="steps-navigation">
              {architectureSteps.map((step, index) => (
                <button
                  key={step.id}
                  className={`step-nav-item ${activeStep === index ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                  style={{ '--step-color': step.color }}
                >
                  <step.icon className="step-nav-icon" />
                  <div className="step-nav-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="step-details">
              <motion.div
                key={activeStep}
                className="step-detail-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="step-header">
                  <div
                    className="step-icon-large"
                    style={{ '--step-color': architectureSteps[activeStep].color }}
                  >
                    {React.createElement(architectureSteps[activeStep].icon)}
                  </div>
                  <div>
                    <h3>{architectureSteps[activeStep].title}</h3>
                    <p>{architectureSteps[activeStep].description}</p>
                  </div>
                </div>

                <div className="step-features">
                  <h4>Key Features:</h4>
                  <ul className="features-list">
                    {architectureSteps[activeStep].details.map((detail, index) => (
                      <li key={index} className="feature-item">
                        <FiCheckCircle className="feature-icon" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="architecture-advantages" variants={itemVariants}>
            <h3 className="advantages-title">Why This Architecture?</h3>
            <div className="advantages-grid">
              <div className="advantage-item">
                <div className="advantage-icon modular">
                  <FiZap />
                </div>
                <h4>LLM-Free</h4>
                <p>No online LLM calls at inference time — 92% token reduction vs. ARM with competitive retrieval quality.</p>
              </div>

              <div className="advantage-item">
                <div className="advantage-icon interpretable">
                  <FiSearch />
                </div>
                <h4>Retriever-Agnostic</h4>
                <p>Plug-and-play layer over any existing retriever: dense, sparse, or hybrid. No retraining required.</p>
              </div>

              <div className="advantage-item">
                <div className="advantage-icon efficient">
                  <FiFilter />
                </div>
                <h4>Joint Optimization</h4>
                <p>Simultaneously optimizes query–table relevance and table–table joinability in a single unified framework.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;
