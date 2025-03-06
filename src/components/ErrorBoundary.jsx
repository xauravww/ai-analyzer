import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
          <h2 className="text-xl font-bold text-red-700 mb-4">Something went wrong</h2>
          <p className="text-red-600 mb-4">
            We encountered an error while processing your request. Please try again later.
          </p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-red-700 font-medium">Error Details</summary>
              <pre className="mt-2 p-4 bg-red-100 rounded overflow-auto text-xs text-red-800">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary