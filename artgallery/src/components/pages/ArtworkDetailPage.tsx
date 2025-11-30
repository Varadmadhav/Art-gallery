import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ChevronLeft,
  Heart,
  ShoppingCart,
  ZoomIn,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon
} from 'lucide-react'
import { Button } from '../ui/button'
import { useApp } from '../../context/AppContext'
import { toast } from 'sonner@2.0.3'
import { ArtworkCard } from '../ArtworkCard'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import axios from 'axios'

export function ArtworkDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp()

  const [artwork, setArtwork] = useState<any>(null)
  const [relatedArtworks, setRelatedArtworks] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [showZoom, setShowZoom] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchArtwork = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/artworks/${id}`)
        const data = {
          ...res.data,
          id: res.data._id,
          availability: String(res.data.availability || 'available').toLowerCase(),
          images: res.data.images?.length ? res.data.images : [res.data.image]
        }

        setArtwork(data)

        const all = await axios.get('http://localhost:5000/api/artworks')
        const related = all.data
          .filter((a: any) => a.category === data.category && a._id !== data.id)
          .slice(0, 4)
          .map((a: any) => ({
            ...a,
            id: a._id,
            availability: String(a.availability || 'available').toLowerCase(),
            images: a.images?.length ? a.images : [a.image]
          }))

        setRelatedArtworks(related)
      } catch (error) {
        setArtwork(null)
      }
    }

    fetchArtwork()
  }, [id])

  if (!artwork) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Artwork Not Found</h2>
          <Link to="/gallery">
            <Button variant="outline">Back to Gallery</Button>
          </Link>
        </div>
      </div>
    )
  }

  const inWishlist = isInWishlist(artwork.id)

  const handleAddToCart = () => {
    if (artwork.availability !== 'available') {
      toast.error('This artwork is not available')
      return
    }

    addToCart(artwork)
    toast.success('Added to cart')
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(artwork.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(artwork)
      toast.success('Added to wishlist')
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % artwork.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + artwork.images.length) % artwork.images.length)
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link
          to="/gallery"
          className="inline-flex items-center mb-8 text-neutral-700 hover:text-amber-700"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Gallery
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <div
              className="relative bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center"
              style={{ width: 320, height: 420 }}
            >
              <ImageWithFallback
                src={artwork.images[selectedImage]}
                alt={artwork.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />

              {artwork.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white h-8 w-8 rounded-full shadow flex items-center justify-center"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white h-8 w-8 rounded-full shadow flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <button
                onClick={() => setShowZoom(true)}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-serif">{artwork.title}</h1>

            {/* ✅ RUPEE SYMBOL APPLIED */}
            <div className="text-2xl text-amber-700 font-semibold">
              ₹{artwork.price}
            </div>

            <p className="text-neutral-600">{artwork.description}</p>

            <div className="bg-neutral-50 p-5 rounded-xl space-y-2">
              <div>
                <b>Dimensions:</b> {artwork.dimensions}
              </div>
              <div>
                <b>Size:</b> {artwork.size}
              </div>
              <div>
                <b>Status:</b> {artwork.availability}
              </div>
            </div>

            {artwork.availability === 'available' && (
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-amber-700 hover:bg-amber-800 py-6"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Add to Cart
                </Button>

                <Button
                  onClick={handleWishlist}
                  variant="outline"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      inWishlist ? 'text-red-500 fill-red-500' : ''
                    }`}
                  />
                </Button>
              </div>
            )}
          </div>
        </div>

        {relatedArtworks.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-serif mb-6">You May Also Like</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtworks.map((art) => (
                <ArtworkCard key={art.id} artwork={art} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showZoom && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setShowZoom(false)}
        >
          <img
            src={artwork.images[selectedImage]}
            alt={artwork.title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  )
}
