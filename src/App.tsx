import { useState, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { uploadToWalrus } from './services/uploadService'
import './App.css'
import Layout from './components/Layout'
import Profile from './components/Profile'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [contractAddress, setContractAddress] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentPage, setCurrentPage] = useState('upload')
  const [epochs, setEpochs] = useState(1)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedDay, setSelectedDay] = useState(1);
  const [proofObjectId, setProofObjectId] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      const previewUrl = URL.createObjectURL(file)
      setSelectedImage(previewUrl)
      setSelectedFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      const previewUrl = URL.createObjectURL(file)
      setSelectedImage(previewUrl)
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !proofObjectId) {
      toast.error('No file selected or proof object ID not set');
      return;
    }

    setIsLoading(true);
    try {
      const signer = wallet.signer; // Lấy từ wallet connection của bạn
      const result = await uploadToWalrus(selectedFile, epochs, selectedDay, proofObjectId, signer);

      if (result.success) {
        toast.success('Upload successful!');
        setContractAddress(result.blobId);
      } else {
        toast.error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetUpload = () => {
    setSelectedImage(null)
    setSelectedFile(null)
    setContractAddress(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'profile':
        return (
          <div className="w-full h-full overflow-y-auto pt-20 pb-24">
            <Profile />
          </div>
        )
      default:
        return (
          <div className="relative w-full h-full flex items-center justify-center px-4 py-16">
            <div className="max-w-[600px] w-full mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20">
                {contractAddress ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-white text-xl font-medium mb-2">Upload Successful!</h3>
                      <p className="text-white/80 text-sm mb-4">Your contract address:</p>
                      <code className="block p-4 bg-black/20 rounded-xl text-white/90 break-all">
                        {contractAddress}
                      </code>
                    </div>
                    <button
                      onClick={resetUpload}
                      className="w-full py-4 px-6 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition-colors"
                    >
                      Upload Another Image
                    </button>
                  </div>
                ) : selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-60 object-contain rounded-2xl"
                    />
                    <div className="flex flex-col md:flex-row gap-4">
                      <button
                        onClick={resetUpload}
                        className="flex-1 py-4 px-6 rounded-full bg-white/20 text-white"
                      >
                        Choose Another
                      </button>
                      <button
                        onClick={handleUpload}
                        disabled={isLoading}
                        className="flex-1 py-4 px-6 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Uploading...' : 'Upload Image'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="relative w-full h-60 rounded-2xl border-2 border-dashed border-white/40 flex flex-col items-center justify-center cursor-pointer hover:border-white/60 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <div className="text-center p-8">
                        <div className="text-white/80 mb-2">
                          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-lg font-medium">Drag and drop image here</p>
                          <p className="text-sm opacity-70">or click to select file</p>
                        </div>
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="space-y-4">
                      <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(Number(e.target.value))}
                        className="w-full p-2 rounded"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(day => (
                          <option key={day} value={day}>Day {day}</option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={proofObjectId || ''}
                        onChange={(e) => setProofObjectId(e.target.value)}
                        placeholder="Enter your Proof Object ID"
                        className="w-full p-2 rounded"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Layout onPageChange={setCurrentPage} currentPage={currentPage}>
      <div className="fixed inset-0 w-full h-full overflow-auto">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/6568a1c859ceca16cf4653d6_Var6-transcode.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content Overlay */}
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={renderContent()} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Layout>
  )
}

export default App
