import React, { useState } from 'react';
import { FiBarChart2, FiZap, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Results.css';

const Results = () => {
  const [activeDataset, setActiveDataset] = useState('bird');
  const [activeModel, setActiveModel] = useState('stages');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const resultsData = {
    bird: {
      name: 'BIRD',
      fullName: 'BIRD',
      description: 'Schema-rich enterprise databases with complex multi-table queries',
      models: {
        stages: {
          name: 'Stage Comparison (UAE)',
          shortName: 'By Stage',
          bestAccuracy: '93.42',
          metric: 'Full Recall',
          results: [
            { method: 'Retrieval (Top 5)', accuracy: '82.79' },
            { method: '+Expansion', accuracy: '93.42' },
            { method: 'REAR (Full)', accuracy: '87.29', isOurs: true }
          ]
        },
        llm: {
          name: 'vs LLM Methods',
          shortName: 'vs LLM',
          bestAccuracy: '92.7',
          metric: 'Full Recall',
          results: [
            { method: 'ARM (LLM)', accuracy: '92.7' },
            { method: 'MURRE (LLM)', accuracy: '80.1' },
            { method: 'JAR (LLM)', accuracy: '77.9' },
            { method: 'REAR (Ours)', accuracy: '87.3', isOurs: true }
          ]
        }
      }
    },
    mmqa: {
      name: 'MMQA',
      fullName: 'MMQA',
      description: 'Open-domain multi-table QA with 695 heterogeneous tables',
      models: {
        stages: {
          name: 'Stage Comparison (UAE)',
          shortName: 'By Stage',
          bestAccuracy: '75.64',
          metric: 'Full Recall',
          results: [
            { method: 'Retrieval (Top 5)', accuracy: '52.27' },
            { method: '+Expansion', accuracy: '75.64' },
            { method: 'REAR (Full)', accuracy: '66.61', isOurs: true }
          ]
        }
      }
    },
    spider: {
      name: 'Spider',
      fullName: 'Spider',
      description: 'Complex cross-domain SQL benchmark with 139 tables across 20 databases',
      models: {
        stages: {
          name: 'Stage Comparison (UAE)',
          shortName: 'By Stage',
          bestAccuracy: '99.13',
          metric: 'Full Recall',
          results: [
            { method: 'Retrieval (Top 5)', accuracy: '96.61' },
            { method: '+Expansion', accuracy: '99.13' },
            { method: 'REAR (Full)', accuracy: '97.68', isOurs: true }
          ]
        }
      }
    }
  };

  const datasets = Object.keys(resultsData);
  const currentData = resultsData[activeDataset];
  const availableModels = currentData ? Object.keys(currentData.models) : [];
  const currentModelData = currentData?.models?.[activeModel];

  const handleDatasetChange = (dataset) => {
    setActiveDataset(dataset);
    const firstModel = Object.keys(resultsData[dataset].models)[0];
    setActiveModel(firstModel);
  };

  return (
    <section id="results" className="results-section section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="results-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Experimental Results</h2>
            <p className="section-subtitle">
              REAR achieves competitive recall with 92% fewer tokens than LLM-based methods
            </p>
          </motion.div>

          <motion.div className="results-detailed" variants={itemVariants}>
            <div className="dataset-selector">
              <h3>Detailed Results by Dataset</h3>
              <div className="dataset-tabs">
                {datasets.map((dataset) => (
                  <button
                    key={dataset}
                    className={`dataset-tab ${activeDataset === dataset ? 'active' : ''}`}
                    onClick={() => handleDatasetChange(dataset)}
                  >
                    {resultsData[dataset].name}
                  </button>
                ))}
              </div>
            </div>

            {availableModels.length > 1 && currentModelData && (
              <div className="model-selector">
                <h4>Select View</h4>
                <div className="model-tabs">
                  {availableModels.map((modelKey) => (
                    <button
                      key={modelKey}
                      className={`model-tab ${activeModel === modelKey ? 'active' : ''}`}
                      onClick={() => setActiveModel(modelKey)}
                    >
                      {currentData.models[modelKey].shortName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="results-visualization">
              <div className="dataset-info">
                <h4>{currentData?.name}</h4>
                <p>{currentData?.description}</p>
                {currentModelData && (
                  <div className="best-result">
                    <FiAward className="award-icon" />
                    <span>Best {currentModelData.metric}: {currentModelData.bestAccuracy}%</span>
                  </div>
                )}
              </div>

              {currentModelData && (
                <div className="results-chart">
                  <div className="chart-header">
                    <h5>{currentModelData.metric} (%)</h5>
                    <span className="chart-subtitle">Higher is better • {currentModelData.name}</span>
                  </div>
                  <div className="chart-bars">
                    {currentModelData.results
                      .sort((a, b) => parseFloat(b.accuracy) - parseFloat(a.accuracy))
                      .map((result, index) => {
                        const maxAcc = Math.max(...currentModelData.results.map(r => parseFloat(r.accuracy)));
                        const width = maxAcc > 0 ? (parseFloat(result.accuracy) / maxAcc) * 100 : 0;
                        return (
                          <motion.div
                            key={`${result.method}-${index}`}
                            className={`chart-bar ${result.isOurs ? 'our-method' : ''}`}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          >
                            <div className="bar-info">
                              <span className="method-name">{result.method}</span>
                              <span className="method-model">{currentModelData.shortName}</span>
                            </div>
                            <div className="bar-container">
                              <motion.div
                                className="bar-fill"
                                style={{ width: `${width}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${width}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                              <span className="bar-value">{result.accuracy}%</span>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div className="key-findings" variants={itemVariants}>
            <h3>Key Findings</h3>
            <div className="findings-grid">
              <div className="finding-item">
                <div className="finding-icon"><FiBarChart2 /></div>
                <div className="finding-content">
                  <h4>Consistent Performance</h4>
                  <p>
                    REAR improves full recall across all three datasets and all retriever types,
                    showing robust performance on diverse multi-table retrieval tasks.
                  </p>
                </div>
              </div>

              <div className="finding-item">
                <div className="finding-icon"><FiZap /></div>
                <div className="finding-content">
                  <h4>92% Token Reduction</h4>
                  <p>
                    Reduces token usage by 92.24% compared to ARM (19,748 → 1,534 tokens per query)
                    while achieving higher SQL execution accuracy.
                  </p>
                </div>
              </div>

              <div className="finding-item">
                <div className="finding-icon"><FiAward /></div>
                <div className="finding-content">
                  <h4>Downstream Gains</h4>
                  <p>
                    Retrieval improvements directly translate to SQL generation: +5.22 pts on BIRD
                    and +12.14 pts on MMQA with Gemini 2.0 Flash.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="multimodal-results" variants={itemVariants}>
            <h3>SQL Execution Accuracy</h3>
            <div className="multimodal-grid">
              <div className="multimodal-card">
                <h4>BIRD</h4>
                <p className="multimodal-desc">Schema-rich databases</p>
                <div className="multimodal-score">
                  <span className="score-value">43.09%</span>
                  <span className="score-model">Gemini 2.0 Flash</span>
                </div>
                <div className="score-comparison">
                  <span>vs baseline: +5.22 pts</span>
                </div>
              </div>

              <div className="multimodal-card">
                <h4>MMQA</h4>
                <p className="multimodal-desc">Open-domain multi-table</p>
                <div className="multimodal-score">
                  <span className="score-value">38.87%</span>
                  <span className="score-model">Gemini 2.0 Flash</span>
                </div>
                <div className="score-comparison">
                  <span>vs baseline: +12.14 pts</span>
                </div>
              </div>

              <div className="multimodal-card">
                <h4>Spider</h4>
                <p className="multimodal-desc">Cross-domain SQL benchmark</p>
                <div className="multimodal-score">
                  <span className="score-value">69.93%</span>
                  <span className="score-model">Gemini 2.0 Flash</span>
                </div>
                <div className="score-comparison">
                  <span>vs baseline: +0.49 pts</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
