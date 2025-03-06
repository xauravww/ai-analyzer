import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

const SkillsChart = ({ data }) => {
  // Prepare data for radar chart
  const chartData = data.map(item => ({
    subject: item.skill.split(' ')[0], // Take just the first word for cleaner display
    A: item.proficiency,
    fullMark: 100
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const skill = data.find(s => s.skill.startsWith(payload[0].payload.subject))
      
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-secondary-200">
          <p className="font-medium text-secondary-800">{skill.skill}</p>
          <p className="text-primary-600 font-bold">{skill.proficiency}% proficiency</p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div 
      className="card h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">Skills Proficiency</div>
      <div className="card-body">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
              <Radar
                name="Proficiency"
                dataKey="A"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.6}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Top Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {skill.skill}
                <span className="ml-1 bg-primary-200 text-primary-800 px-1.5 py-0.5 rounded-full text-xs">
                  {skill.proficiency}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SkillsChart