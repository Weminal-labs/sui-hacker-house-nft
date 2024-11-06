import { useState } from 'react'
import { FaBars, FaTimes, FaGithub, FaTwitter, FaDiscord, FaInfoCircle, FaCloudUploadAlt, FaUser } from 'react-icons/fa'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
  onPageChange: (page: string) => void
  currentPage: string
}

export default function Layout({ children, onPageChange, currentPage }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const menuItems = [
    { id: 'profile', label: 'PROFILE', icon: <FaUser className="w-5 h-5" /> },
    { id: 'upload', label: 'UPLOAD FILE', icon: <FaCloudUploadAlt className="w-5 h-5" /> },
    { id: 'about', label: 'ABOUT US', icon: <FaInfoCircle className="w-5 h-5" /> },
  ]

  const handleMenuClick = (id: string) => {
    onPageChange(id)
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-lg z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/assets/logo/logo.png" alt="Weminal" className="w-10 h-10 rounded-full" />
              <span className="text-white font-bold text-xl">WEMINAL</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={'font-bold'}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-lg z-40 md:hidden transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <img src="/assets/logo/logo.png" alt="Weminal" className="w-8 h-8 rounded-full" />
              <span className="text-white font-bold text-lg">WEMINAL</span>
            </div>
            <button
              className="text-white p-2"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`text-white hover:text-gray-300 flex items-center gap-3 text-lg p-2 font-medium tracking-wide ${currentPage === item.id ? 'text-blue-400' : ''
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-lg z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Slogan */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <img src="/assets/logo/logo.png" alt="Weminal" className="w-6 h-6 rounded-full" />
                <span className="text-white font-bold text-base uppercase">Weminal</span>
              </div>
              <p className="text-white/80 text-xs">
                Where Ideas begin with a Hackathon
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaDiscord className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 