import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/HomePage'

function App() {

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* Add more routes here */}
      </Routes>
    </div>
  )
}

export default App
