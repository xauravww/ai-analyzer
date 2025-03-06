import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { div } from 'framer-motion/client'

const EducationChart = ({ data = {}, certifications = [] }) => {
  // Mock data for education breakdown
  console.log("data",data)
  const educationData = [
    { name: 'Computer Science', value: 60 },
    { name: 'Web Development', value: 20 },
    { name: 'Cloud Computing', value: 10 },
    { name: 'Data Structures', value: 10 }
  ]

  const COLORS = ['#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899']

  // Custom Tooltip for Pie Chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-secondary-200">
          <p className="font-medium text-secondary-800">{payload[0].name}</p>
          <p className="text-primary-600 font-bold">{payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-header">Education & Certifications</div>
      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Degree Information */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-4">Degree Information</h3>

            {data?.degrees?.length > 0 ? (
              data?.degrees.map((degree, index) => (
                <div key={index} className="bg-secondary-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-secondary-800">{degree?.degree}</h4>
                  <p className="text-secondary-600">{degree?.institution}</p>
                  <p className="text-secondary-500 text-sm">{degree?.date}</p>
                  {data?.gpa && <p className="text-primary-600 font-medium mt-2">GPA: {data?.gpa}</p>}
                </div>
              ))
            ) : (
              <p className="text-secondary-600">No degree information available.</p>
            )}

            {/* Relevant Coursework */}
            <div>
              <h4 className="font-medium text-secondary-800 mb-2">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {data?.relevant_coursework?.length > 0 ? (
                  data.relevant_coursework.map((course, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800"
                    >
                      {course}
                    </span>
                  ))
                ) : (
                  <p className="text-secondary-600">No coursework listed.</p>
                )}
              </div>
            </div>
          </div>

          {/* Education Breakdown - Pie Chart */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-800 mb-4">Education Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {data?.education_chart && data?.education_chart.length==0 && (<div className='text-secondary-600'>Didn't find any info to build chart</div>)}
                {data?.education_chart && data?.education_chart.length!=0 && (<PieChart>
                  <Pie
                    data={data?.education_chart || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data?.education_chart && data?.education_chart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>)}
              </ResponsiveContainer>
            </div>

            {/* Certifications */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Certifications</h3>
              {certifications?.length > 0 ? (
                <ul className="space-y-2">
                  {certifications?.map((cert, index) => (
                    <li key={index} className="flex flex-col bg-secondary-50 p-3 rounded-lg shadow-sm">
                      <span className="text-secondary-800 font-medium">{cert?.certification}</span>
                      <span className="text-secondary-600 text-sm">{cert?.source}</span>
                      <span className="text-secondary-500 text-xs">{cert?.date}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-secondary-600">No certifications available.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default EducationChart
