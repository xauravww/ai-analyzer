import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { FiUpload, FiFile, FiAlertCircle } from 'react-icons/fi'

const FileUpload = ({ onFileUpload, isLoading, error }) => {
  const [file, setFile] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    multiple: false
  })

  const handleUpload = () => {
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className="card p-6">
      <motion.div
        className={`cursor-pointer border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          isDragActive ? 'border-primary-500 bg-primary-50' : 
          isDragReject ? 'border-red-500 bg-red-50' : 
          'border-secondary-300 hover:border-primary-400'
        }`}
        {...getRootProps()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center cursor-pointer">
          {isDragActive ? (
            <>
              <FiUpload className="text-5xl text-primary-500 mb-4" />
              <p className="text-primary-600 font-medium">Drop your resume here</p>
            </>
          ) : isDragReject ? (
            <>
              <FiAlertCircle className="text-5xl text-red-500 mb-4" />
              <p className="text-red-600 font-medium">File type not supported</p>
              <p className="text-secondary-500 text-sm mt-2">Please upload a PDF or DOCX file</p>
            </>
          ) : (
            <>
              <FiUpload className="text-5xl text-secondary-400 mb-4" />
              <p className="text-secondary-700 font-medium">Drag & drop your resume here</p>
              <p className="text-secondary-500 text-sm mt-2">or click to browse files</p>
              <p className="text-secondary-400 text-xs mt-4">Supported formats: PDF, DOCX</p>
            </>
          )}
        </div>
      </motion.div>

      {file && (
        <div className="flex items-center p-3 bg-secondary-100 rounded-lg mb-6">
          <FiFile className="text-secondary-500 mr-3" />
          <span className="text-secondary-700 font-medium">{file.name}</span>
          <span className="text-secondary-500 text-sm ml-2">
            ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg mb-6 flex items-center">
          <FiAlertCircle className="mr-2" />
          {error}
        </div>
      )}

      <motion.button
        className={`w-full btn ${
          file && !isLoading ? 'btn-primary' : 'bg-secondary-300 text-secondary-500 cursor-not-allowed'
        }`}
        disabled={!file || isLoading}
        onClick={handleUpload}
        whileHover={file && !isLoading ? { scale: 1.02 } : {}}
        whileTap={file && !isLoading ? { scale: 0.98 } : {}}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Resume...
          </div>
        ) : (
          'Analyze Resume'
        )}
      </motion.button>
    </div>
  )
}

export default FileUpload