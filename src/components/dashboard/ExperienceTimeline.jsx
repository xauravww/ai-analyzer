import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { motion } from 'framer-motion'

const ExperienceTimeline = ({ data }) => {
  const { timeline, notable_achievements } = data
  console.log("Data in experience timeline", data)
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-header">Experience Timeline</div>
      <div className="card-body">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-secondary-800">Career History</h3>
            <span className="bg-primary-100 text-primary-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full inline-flex items-center gap-1.5">
  <span className="whitespace-nowrap">
    {data?.total_years_experience || '0'}Yrs
  </span>
  <span className="hidden sm:inline">•</span>
  <span className="whitespace-nowrap">
    {data?.total_months_experience || '0'}Mos
  </span>
  <span className="hidden sm:inline ml-1.5">Experience</span>
</span>
          </div>

          <VerticalTimeline layout="1-column" animate={true} lineColor="#e2e8f0">
            {timeline.map((job, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'white', color: '#1e293b', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                contentArrowStyle={{ borderRight: '7px solid white' }}
                date={job.duration}
                iconStyle={{ background: '#0ea5e9', color: '#fff' }}
                icon={
                  <div className="flex items-center justify-center h-full object-contain">
                    <div className='bg-white rounded-full p-2'></div>
                  </div>
                }
              >
                <h3 className="vertical-timeline-element-title text-lg font-bold">{job.role}</h3>
                <h4 className="vertical-timeline-element-subtitle text-secondary-600">{job.company}</h4>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-secondary-800 mb-4">Notable Achievements</h3>
          <ul className="space-y-3">
            {notable_achievements.map((achievement, index) => (
              <motion.li
                key={index}
                className="flex"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-secondary-700">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default ExperienceTimeline