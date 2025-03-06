import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'

const ScoreOverview = ({ data }) => {
  const { overall_ats_compatibility, skills_score, experience_score, education_score } = data
  
  // Prepare data for radial chart
  const scoreData = [
    { name: 'Skills', value: skills_score },
    { name: 'Experience', value: experience_score },
    { name: 'Education', value: education_score }
  ]
  
  const COLORS = ['#0ea5e9', '#10b981', '#8b5cf6']
  
  // Calculate score color based on value
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 80) return 'text-blue-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }
  
  return (
    <motion.div 
      className="card h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">Resume Score</div>
      <div className="card-body">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-40 h-40 mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor(overall_ats_compatibility)}`}>
                {overall_ats_compatibility}%
              </span>
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-secondary-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-primary-500"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 40 * overall_ats_compatibility / 100} ${2 * Math.PI * 40 * (100 - overall_ats_compatibility) / 100}`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-secondary-800">ATS Compatibility</h3>
          <p className="text-secondary-600 text-sm">Overall resume score</p>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={scoreData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-secondary-50 p-2 rounded-lg text-center">
            <p className={`text-xl font-bold ${getScoreColor(skills_score)}`}>{skills_score}%</p>
            <p className="text-xs text-secondary-600">Skills</p>
          </div>
          <div className="bg-secondary-50 p-2 rounded-lg text-center">
            <p className={`text-xl font-bold ${getScoreColor(experience_score)}`}>{experience_score}%</p>
            <p className="text-xs text-secondary-600">Experience</p>
          </div>
          <div className="bg-secondary-50 p-2 rounded-lg text-center">
            <p className={`text-xl font-bold ${getScoreColor(education_score)}`}>{education_score}%</p>
            <p className="text-xs text-secondary-600">Education</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ScoreOverview