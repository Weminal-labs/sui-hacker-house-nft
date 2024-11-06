import { motion } from 'framer-motion'
import { FaWallet, FaCopy } from 'react-icons/fa'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useEnokiFlow } from '@mysten/enoki/react'
import { EnokiLogin } from '../EnokiLogin'

interface GalleryItem {
  id: number
  title: string
  image: string
  className: string
}

interface ImagePreviewProps {
  image: string
  title: string
  onClose: () => void
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Digital Art #1",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    id: 2,
    title: "Digital Art #2",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 3,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 4,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },

  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 5,
    title: "Digital Art #3",
    image: "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b",
    className: "md:col-span-1 md:row-span-1"
  },
]

const ImagePreview = ({ image, title, onClose }: ImagePreviewProps) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="w-full max-w-6xl relative">
        <button
          onClick={onClose}
          className="absolute right-0 -top-16 text-white/70 hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-6xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain max-h-[85vh] rounded-lg"
            loading="lazy"
          />
        </div>
        <h3 className="text-white text-xl font-bold mt-4">{title}</h3>
      </motion.div>
    </motion.div>,
    document.body
  )
}

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const enokiFlow = useEnokiFlow();
  const zkLoginState = enokiFlow.$zkLoginState.get();
  const address = zkLoginState.address;

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  const handleLogout = () => {
    enokiFlow.logout();
    window.location.reload();
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-[40px] py-8 border border-white/20">
        {/* Wallet Section */}
        <div className="mb-8">
          {!address ? (
            <EnokiLogin />
          ) : (
            <>
              <div className="flex items-center justify-between px-8">
                <div className="flex items-center gap-3">
                  <FaWallet className="text-white w-6 h-6" />
                  <h2 className="text-white text-xl font-bold">Wallet Address</h2>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={copyAddress}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <FaCopy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <p className="text-white/90 font-mono mt-2 px-8">{address}</p>
            </>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 md:gap-4 px-1 md:px-6">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative aspect-square overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <ImagePreview
          image={selectedImage.image}
          title={selectedImage.title}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
} 