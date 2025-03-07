import { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import './App.css';
import mockData from './data/mockData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function parseWrappedJson(str) {
    // Find the index of the first '{' (start of the JSON object)
    const start = str.indexOf('{');
    // Find the index of the last '}' (end of the JSON object) and add 1 to include it
    const end = str.lastIndexOf('}') + 1;

    // Check if '{' or '}' is missing, indicating an invalid string
    if (start === -1 || end === 0) {
      throw new Error('Invalid JSON string: missing { or }');
    }

    // Extract the substring containing the JSON object
    const jsonStr = str.substring(start, end);

    // Clean the JSON string by replacing non-breaking spaces (\u00A0) with regular spaces
    const cleanedJsonStr = jsonStr.replace(/\u00A0/g, ' ');

    // Parse the cleaned string into a JavaScript object with error handling
    try {
      return JSON.parse(cleanedJsonStr);
    } catch (e) {
      throw new Error('Failed to parse JSON: ' + e.message);
    }
  }

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setResumeData(null);

    try {
      // Upload the file to extract text
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch(`${import.meta.env.VITE_SAURAV_UTILS_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.message || "File upload failed");
      }

      const uploadResult = await uploadResponse.json();
      const extractedData = `today's date is ${new Date().toISOString()},  ${uploadResult.extractedText}` || "";

      const analysisResponse = await fetch(`${import.meta.env.VITE_N8N_API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: extractedData
        })
      });

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json();
        setIsLoading(false);
        throw new Error(errorData.message || "Analysis failed");
      }

      const analysisResult = await analysisResponse.json();
      const parsedJson = analysisResult;
      const isResume = parsedJson[0]?.isResume;
      if (parsedJson && isResume) {
        setResumeData(parsedJson[0]);
      } else {
        if (!isResume) {
          setIsLoading(false);
          // Show error toast notification with autoClose timer (5 seconds)
          toast.error(parsedJson[0]?.Summary, {
            position: "top-center",
            autoClose: 10000, // 10000ms = 10 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      setError("Error processing resume");
      toast.error("Error processing resume", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 p-4 sm:p-6 md:p-8">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center">
        {!resumeData && (
          <div className="w-full max-w-3xl mx-auto">
            <p className="text-center mb-8 mt-8 text-secondary-600 text-sm sm:text-base md:text-lg">
              Upload your resume to get detailed insights and improvement recommendations
            </p>
            <FileUpload
              onFileUpload={handleFileUpload}
              isLoading={isLoading}
              error={error}
            />
          </div>
        )}
        {resumeData && (
          <div className="w-full">
            <Dashboard data={resumeData} />
          </div>
        )}
      </main>

      <ToastContainer />
    </div>
  );
}

export default App;
