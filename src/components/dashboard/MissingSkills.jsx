import { TagCloud } from 'react-tagcloud'
import { motion } from 'framer-motion'

const MissingSkills = ({ data }) => {
  // Prepare data for tag cloud
  const cloudData = data.map((skill, index) => ({
    value: skill,
    count: Math.floor(Math.random() * 30) + 20, // Random size for visual interest
    key: index
  }))

  const customRenderer = (tag, size, color) => (
    <span
      key={tag.key}
      style={{
        animation: 'blinker 3s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${size}px`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
        color: '#0ea5e9',
      }}
    >
      {tag.value}
    </span>
  )

  return (
    <motion.div 
      className="card h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">Missing Skills</div>
      <div className="card-body">
        <div className="h-64 flex items-center justify-center">
          <TagCloud
            tags={cloudData}
            minSize={14}
            maxSize={30}
            renderer={customRenderer}
            className="w-full h-full flex items-center justify-center"
          />
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-secondary-600 mb-2">Recommended Skills to Acquire</h3>
          <ul className="space-y-2">
            {data.slice(0, 5).map((skill, index) => (
              <li key={index} className="flex items-center">
                <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                <span className="text-secondary-700">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default MissingSkills