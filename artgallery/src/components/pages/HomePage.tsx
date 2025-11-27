import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { ArtworkCard } from '../ArtworkCard';
import { artworks } from '../../data/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function HomePage() {
  const featuredArtworks = artworks.filter((art) => art.featured);
  const newArrivals = artworks.filter((art) => art.newArrival).slice(0, 3);
  const trendingArtworks = artworks.filter((art) => art.trending).slice(0, 4);

  const collections = [
    { name: 'Portrait', count: artworks.filter((a) => a.category === 'Portrait').length, image: artworks.find((a) => a.category === 'Portrait')?.image },
    { name: 'Abstract', count: artworks.filter((a) => a.category === 'Abstract').length, image: artworks.find((a) => a.category === 'Abstract')?.image },
    { name: 'Nature', count: artworks.filter((a) => a.category === 'Nature').length, image: artworks.find((a) => a.category === 'Nature')?.image },
    { name: 'Digital Art', count: artworks.filter((a) => a.category === 'Digital Art').length, image: artworks.find((a) => a.category === 'Digital Art')?.image },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-100 to-amber-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.3),transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span className="text-sm text-neutral-700">Contemporary Fine Art Gallery</span>
            </div>
            <h1 className="font-serif text-neutral-900 mb-6">
              Discover Original Artwork That Speaks to Your Soul
            </h1>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              Explore a curated collection of contemporary paintings by Pooja Chauhan. Each piece is an original work of art, created with passion and precision to transform your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/gallery">
                <Button className="bg-amber-700 hover:bg-amber-800 rounded-lg px-8 py-6">
                  Explore Gallery
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/commission">
                <Button
                  variant="outline"
                  className="bg-white text-amber-900 hover:bg-neutral-100 rounded-lg px-8 py-6 border-white"
                >
                  Request Commission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758267928035-6716c00ff3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwb3J0cmFpdCUyMHN0dWRpb3xlbnwxfHx8fDE3NjM5MjI1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Pooja Chauhan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-700 rounded-2xl -z-10" />
            </div>
            <div>
              <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm mb-4">
                About the Artist
              </div>
              <h2 className="font-serif text-neutral-900 mb-6">Pooja Chauhan</h2>
              <p className="text-neutral-600 mb-6">
                A contemporary artist with over 15 years of experience, specializing in abstract and portrait paintings. My work has been featured in galleries across the country and collected by art enthusiasts worldwide.
              </p>
              <p className="text-neutral-600 mb-8">
                Each piece I create is a journey of emotion, color, and texture. I believe art should not only beautify a space but also evoke feelings and create meaningful connections.
              </p>
              <Link to="/about">
                <Button variant="outline" className="rounded-lg border-neutral-300">
                  Read Full Biography
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-neutral-900 mb-4">Explore Collections</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Browse artworks by category and discover the perfect piece for your collection
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.name}
                to={`/gallery?category=${collection.name}`}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <ImageWithFallback
                  src={collection.image || ''}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-white mb-1">{collection.name}</h3>
                  <p className="text-sm text-white/80">{collection.count} Artworks</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-serif text-neutral-900 mb-2">New Arrivals</h2>
              <p className="text-neutral-600">Discover the latest additions to the collection</p>
            </div>
            <Link to="/gallery">
              <Button variant="ghost" className="text-amber-700 hover:text-amber-800">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Artworks */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-neutral-900 mb-4">Trending Now</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Popular pieces that collectors are loving
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-700 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-white mb-6">Ready to Start Your Collection?</h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
            Discover unique, original artworks that will transform your space and inspire you every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gallery">
              <Button className="bg-white text-amber-900 hover:bg-neutral-100 rounded-lg px-8 py-6">
                Shop Now
              </Button>
            </Link>
            <Link to="/commission">
              <Button
                variant="outline"
                className="bg-white text-amber-900 hover:bg-neutral-100 rounded-lg px-8 py-6 border-white"
              >
                Request Commission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
