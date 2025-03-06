import { useState } from 'react'
import { motion } from 'framer-motion'

const CareerRoadmap = ({ data }) => {
  const [expandedStep, setExpandedStep] = useState(null)

  const toggleStep = (stepIndex) => {
    if (expandedStep === stepIndex) {
      setExpandedStep(null)
    } else {
      setExpandedStep(stepIndex)
    }
  }

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-header">Career Roadmap</div>
      <div className="card-body">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-secondary-800 mb-6">Improvement Plan</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>
            
            {/* Steps */}
            {data.roadmap.map((step, index) => (
              <motion.div 
                key={index}
                className="relative mb-8 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex">
                 <div className="flex-shrink-0 relative">
  <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-primary-100 border-2 md:border-4 border-white shadow-md flex items-center justify-center transition-all duration-300">
    <span className="text-primary-600 font-bold text-lg md:text-xl">
      {step.step}
    </span>
  </div>
</div>
                  
                  <div className="ml-6 flex-1">
                    <div 
                      className="bg-white border border-secondary-200 rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => toggleStep(index)}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-secondary-800">{step.description}</h4>
                        <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                          {step.timeline}
                        </span>
                      </div>
                      
                      {expandedStep === index && (
                        <motion.div 
                          className="mt-4 pt-4 border-t border-secondary-100"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <h5 className="text-sm font-medium text-secondary-600 mb-2">Recommended Resources:</h5>
                          <ul className="space-y-2">
                            {step.resources.map((resource, resIndex) => (
                              <li key={resIndex} className="flex items-start">
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-800 mr-2 mt-0.5 flex-shrink-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span className="text-secondary-700 text-sm">{resource}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-4">Suggested Certifications</h3>
            <ul className="space-y-3">
              {data.suggested_certifications.map((cert, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-3 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-secondary-700">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-4">Profile Optimization Tips</h3>
            <ul className="space-y-3">
              {data.profile_optimization_tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 mr-3 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-secondary-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CareerRoadmap