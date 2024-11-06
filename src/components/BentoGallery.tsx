import { motion } from 'framer-motion'

interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
  className: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Digital Art",
    description: "Explore digital masterpieces",
    image: "/assets/gallery/digital-art.jpg",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    id: 2,
    title: "Photography",
    description: "Capture moments in time",
    image: "/assets/gallery/photography.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 3,
    title: "3D Models",
    description: "Discover 3D creations",
    image: "/assets/gallery/3d-models.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 4,
    title: "AI Art",
    description: "AI-generated artwork",
    image: "/assets/gallery/ai-art.jpg",
    className: "md:col-span-1 md:row-span-2"
  }
]

export default function BentoGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {galleryItems.map((item) => (
        <motion.div
          key={item.id}
          className={`relative group overflow-hidden rounded-3xl ${item.className}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover aspect-square md:aspect-auto"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-white/80 text-sm">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 