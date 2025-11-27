import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleAddToCart = (artwork: any) => {
    if (artwork.availability !== 'available') {
      toast.error('This artwork is not available');
      return;
    }
    addToCart(artwork);
    toast.success('Added to cart');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-neutral-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Heart className="w-12 h-12 text-neutral-400" />
          </div>
          <h2 className="font-serif text-neutral-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-neutral-600 mb-8">
            Save your favorite artworks here for later
          </p>
          <Link to="/gallery">
            <Button className="bg-amber-700 hover:bg-amber-800 rounded-lg">
              Explore Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-neutral-900 mb-2">My Wishlist</h1>
          <p className="text-neutral-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((artwork) => (
            <div key={artwork.id} className="bg-white rounded-2xl shadow-sm overflow-hidden group">
              <Link to={`/artwork/${artwork.id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                  <ImageWithFallback
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </Link>

              <div className="p-6">
                <Link to={`/artwork/${artwork.id}`}>
                  <h3 className="font-serif text-neutral-900 mb-1 hover:text-amber-700 transition-colors">
                    {artwork.title}
                  </h3>
                </Link>
                <p className="text-sm text-neutral-500 mb-2">{artwork.category}</p>
                <div className="font-serif text-amber-700 mb-4">${artwork.price.toLocaleString()}</div>

                <div className="flex gap-2">
                  {artwork.availability === 'available' ? (
                    <Button
                      onClick={() => handleAddToCart(artwork)}
                      className="flex-1 bg-amber-700 hover:bg-amber-800 rounded-lg"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <Button disabled className="flex-1 rounded-lg" size="sm">
                      Not Available
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      removeFromWishlist(artwork.id);
                      toast.success('Removed from wishlist');
                    }}
                    variant="outline"
                    className="rounded-lg"
                    size="sm"
                  >
                    <Heart className="w-4 h-4 fill-amber-700 text-amber-700" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
