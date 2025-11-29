import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import axios from 'axios'
import { Button } from '../ui/button'
import { ArtworkCard } from '../ArtworkCard'
import { ImageWithFallback } from '../figma/ImageWithFallback'

export function HomePage() {
  const [artworks, setArtworks] = useState<any[]>([])

  // ⭐ Splash animation logic
  useEffect(() => {
    const splash = document.getElementById("bg-splash")
    if (splash) {
      setTimeout(() => {
        splash.classList.add("splash-expand")
      }, 50)

      setTimeout(() => {
        splash.classList.add("splash-fade")
      }, 900)
    }
  }, [])

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/artworks')
        setArtworks(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchArtworks()
  }, [])

  const trendingArtworks = artworks.slice(0, 4)

  return (
    <div>

      {/* ⭐ SPLASH ANIMATION DIV */}
      <div
        id="bg-splash"
        className="pointer-events-none fixed left-1/2 top-1/2 z-[9999] bg-amber-600 rounded-full opacity-100 splash-start">
      </div>

      {/* ⭐ MAIN HERO SECTION WITH VIDEO BACKGROUND */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-100">
        
        {/* 1. BACKGROUND VIDEO */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source 
            src="https://res.cloudinary.com/dql5knfxm/video/upload/v1764403169/Watercolor_Splash_Animation_Generated_n16lhd.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* 2. OVERLAY (Makes text readable over video) */}
        {/* Adjust 'bg-white/80' to 'bg-white/60' if you want to see more video, or 'bg-black/50' if you want dark mode */}
        <div className="absolute inset-0 bg-white/80 z-0" />

        {/* 3. OPTIONAL PATTERN OVERLAY (From your original code) */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.3),transparent_50%)]" />
        </div>

        {/* CONTENT (Relative z-10 ensures it sits ON TOP of the video) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span className="text-sm text-neutral-700">Contemporary Fine Art Gallery</span>
            </div>

            <h1 className="font-serif text-neutral-900 mb-6">
              Discover Original Artwork That Speaks to Your Soul
            </h1>

            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto font-medium">
              Explore a curated collection of contemporary paintings by Pooja Chauhan. Each piece is an original work of art, created with passion and precision.
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
                  className="bg-white/80 backdrop-blur text-amber-900 hover:bg-white rounded-lg px-8 py-6 border-white"
                >
                  Request Commission
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* REST OF YOUR PAGE (UNCHANGED) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://res.cloudinary.com/dql5knfxm/image/upload/v1764398434/WhatsApp_Image_2025-11-29_at_12.00.40_PM_mh1qce.jpg"
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
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

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
  )
}