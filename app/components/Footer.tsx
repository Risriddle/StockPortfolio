export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Left side - Company or brand */}
          <div className="text-lg font-bold">
            <span className="text-yellow-400">Stock</span>Watch
          </div>
  
          {/* Centered links */}
          <div className="space-x-6">
            <a href="/privacy" className="hover:text-yellow-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-yellow-400">Terms of Service</a>
            <a href="/contact" className="hover:text-yellow-400">Contact Us</a>
          </div>
  
          {/* Right side - Social Media or other links */}
          <div className="space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    )
  }
  