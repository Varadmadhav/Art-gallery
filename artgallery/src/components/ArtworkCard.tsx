import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { Artwork } from '../context/AppContext'
import { useApp } from '../context/AppContext'
import { toast } from 'sonner@2.0.3'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface ArtworkCardProps {
  artwork: Artwork
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp()
  const inWishlist = isInWishlist(artwork.id)

  const availability = String(artwork.availability || 'available').toLowerCase()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()

    if (availability !== 'available') {
      toast.error('This artwork is not available')
      return
    }

    addToCart(artwork)
    toast.success('Added to cart')
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()

    if (inWishlist) {
      removeFromWishlist(artwork.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(artwork)
      toast.success('Added to wishlist')
    }
  }

  return (
    <Link to={`/artwork/${artwork.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500">

        <div className="aspect-[2/3] overflow-hidden bg-neutral-100">
          <ImageWithFallback
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {artwork.featured && (
            <span className="px-3 py-1 bg-amber-700 text-white text-xs rounded-full">
              Featured
            </span>
          )}

          {artwork.newArrival && (
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-full">
              New
            </span>
          )}

          {availability === 'sold' && (
            <span className="px-3 py-1 bg-neutral-900 text-white text-xs rounded-full">
              Sold
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlist}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-amber-50 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                inWishlist ? 'fill-amber-700 text-amber-700' : 'text-neutral-700'
              }`}
            />
          </button>

          <Link
            to={`/artwork/${artwork.id}`}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-amber-50 transition-colors"
          >
            <Eye className="w-5 h-5 text-neutral-700" />
          </Link>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-serif text-neutral-900 mb-1">
                {artwork.title}
              </h3>
              <p className="text-sm text-neutral-500">
                {artwork.category}
              </p>
            </div>

            <div className="text-right">
              <div className="font-serif text-amber-700">
                ₹{artwork.price.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="text-xs text-neutral-400 mb-4">
            {artwork.dimensions}
          </div>

          {availability === 'available' && (
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
