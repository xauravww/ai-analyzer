import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const GapAnalysis = ({ data }) => {
  // Prepare data for bar chart
  const chartData = data.map(item => ({
    name: item.keyword,
    importance: item.importance * 25 // Scale to 0-100 for better visualization
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const importanceLevel = payload[0].payload.importance / 25
      let importanceText = 'Low'
      
      if (importanceLevel === 2) importanceText = 'Medium'
      else if (importanceLevel === 3) importanceText = 'High'
      else if (importanceLevel === 4) importanceText = 'Critical'
      
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-secondary-200">
          <p className="font-medium text-secondary-800">{label}</p>
          <p className="text-primary-600 font-bold">Importance: {importanceText}</p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div 
      className="card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">Gap Analysis</div>
      <div className="card-body">
        <h3 className="text-lg font-semibold text-secondary-800 mb-4">Missing Keywords</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="importance" 
                fill="#0ea5e9" 
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Importance Legend</h3>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <span className="h-3 w-3 bg-primary-300 rounded-full mr-1"></span>
              <span className="text-xs text-secondary-600">Low</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 bg-primary-400 rounded-full mr-1"></span>
              <span className="text-xs text-secondary-600">Medium</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 bg-primary-500 rounded-full mr-1"></span>
              <span className="text-xs text-secondary-600">High</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 bg-primary-700 rounded-full mr-1"></span>
              <span className="text-xs text-secondary-600">Critical</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GapAnalysis