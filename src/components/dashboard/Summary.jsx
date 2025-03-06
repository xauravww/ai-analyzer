import { motion } from 'framer-motion'

const Summary = ({ data }) => {
  return (
    <motion.div 
      className="card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        Resume Summary
      </div>
      <div className="card-body">
        <p className="text-secondary-700 leading-relaxed">{data.Summary}</p>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-secondary-500 mb-1">Experience</h3>
            <p className="text-2xl font-bold text-secondary-800">{data["Experience Breakdown"]?.total_years_experience} years {data["Experience Breakdown"]?.total_months_experience} months</p>
          </div>
          
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-secondary-500 mb-1">ATS Score</h3>
            <p className="text-2xl font-bold text-secondary-800">{data.Scoring.overall_ats_compatibility}%</p>
          </div>
          
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-secondary-500 mb-1">Top Skill</h3>
            <p className="text-lg font-bold text-secondary-800 truncate">
              {data["Skills Analysis"]?.top_skills[0]?.skill}
            </p>
          </div>
          
          <div className="bg-secondary-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-secondary-500 mb-1">Education</h3>
            <p className="text-lg font-bold text-secondary-800 truncate">
              {data.Education?.degrees[0]?.degree}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Summary