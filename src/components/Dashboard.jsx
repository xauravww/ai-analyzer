import { useState } from 'react'
import { motion } from 'framer-motion'
import Summary from './dashboard/Summary'
import SkillsChart from './dashboard/SkillsChart'
import MissingSkills from './dashboard/MissingSkills'
import ExperienceTimeline from './dashboard/ExperienceTimeline'
import EducationChart from './dashboard/EducationChart'
import GapAnalysis from './dashboard/GapAnalysis'
import CareerRoadmap from './dashboard/CareerRoadmap'
import ScoreOverview from './dashboard/ScoreOverview'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
const Dashboard = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'gaps', label: 'Gaps' },
    { id: 'roadmap', label: 'Roadmap' }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <div className="pt-16">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary-800 mb-2 px-4 sm:px-0">
          Resume Analysis Results
        </h1>
        <p className="text-secondary-600 px-4 sm:px-0">
          Here's a detailed breakdown of your resume with actionable insights
        </p>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-16 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-md border border-secondary-200"
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6 text-secondary-600" />
          ) : (
            <MenuIcon className="h-6 w-6 text-secondary-600" />
          )}
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8 relative">
        <nav className="hidden md:flex space-x-1 border-b border-secondary-200 px-4 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${activeTab === tab.id
                  ? 'bg-white text-primary-600 border-l border-t border-r border-secondary-200'
                  : 'text-secondary-600 hover:text-primary-500'
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg rounded-lg mx-4 z-40"
          >
            <div className="flex flex-col p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-3 text-left rounded-lg transition-colors ${activeTab === tab.id
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                    }`}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

      </div>
      {activeTab === 'overview' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div variants={item} className="lg:col-span-3">
            <Summary data={data} />
          </motion.div>
          <motion.div variants={item}>
            <ScoreOverview data={data.Scoring} />
          </motion.div>
          <motion.div variants={item}>
            <SkillsChart data={data["Skills Analysis"]?.top_skills} />
          </motion.div>
          <motion.div variants={item}>
            <GapAnalysis data={data["Gap Analysis"]?.missing_keywords} />
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'skills' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div variants={item}>
            <SkillsChart data={data["Skills Analysis"]?.top_skills} />
          </motion.div>
          <motion.div variants={item}>
            <MissingSkills data={data["Skills Analysis"]?.missing_skills} />
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'experience' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <ExperienceTimeline data={data["Experience Breakdown"]} />
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'education' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <EducationChart data={data.Education} certifications={data.Certifications} />
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'gaps' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div variants={item} className="md:col-span-2">
            <GapAnalysis data={data["Gap Analysis"]?.missing_keywords} />
          </motion.div>
          <motion.div variants={item} className="md:col-span-2">
            <div className="card" >
              <div className="card-header">Skill Deficiencies</div>
              <div className="card-body">
                <ul className="space-y-3">
                  {data["Gap Analysis"]?.skill_deficiencies.map((deficiency, index) => (
                    <li key={index} className="flex">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-secondary-700">{deficiency}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'roadmap' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <CareerRoadmap data={data.Recommendations} />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Dashboard