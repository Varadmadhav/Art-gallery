import { useState, useMemo, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ArtworkCard } from '../ArtworkCard'
import { Button } from '../ui/button'
import axios from 'axios'

export function GalleryPage() {
  const [artworks, setArtworks] = useState<any[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/artworks')
        setArtworks(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchArtworks()
  }, [])

  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      const matchesSearch =
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === 'all' || artwork.category === categoryFilter
      const matchesSize = sizeFilter === 'all' || artwork.size === sizeFilter

      let matchesPrice = true
      if (priceFilter === 'under-2000') matchesPrice = artwork.price < 2000
      else if (priceFilter === '2000-3000') matchesPrice = artwork.price >= 2000 && artwork.price <= 3000
      else if (priceFilter === 'above-3000') matchesPrice = artwork.price > 3000

      return matchesSearch && matchesCategory && matchesPrice && matchesSize
    })
  }, [artworks, searchQuery, categoryFilter, priceFilter, sizeFilter])

  const categories = ['all', ...Array.from(new Set(artworks.map((a) => a.category)))]
  const sizes = ['all', ...Array.from(new Set(artworks.map((a) => a.size)))]

  return (
    <div className="min-h-screen bg-neutral-50">

      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-neutral-900 mb-4">Art Gallery</h1>
          <p className="text-neutral-600 max-w-2xl">
            Explore our complete collection of original artworks. Each piece is carefully crafted and available for purchase.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden rounded-lg"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>

            <div className="hidden lg:flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 rounded-lg">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-48 rounded-lg">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-2000">Under ₹2,000</SelectItem>
                  <SelectItem value="2000-3000">₹2,000 - ₹3,000</SelectItem>
                  <SelectItem value="above-3000">Above ₹3,000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sizeFilter} onValueChange={setSizeFilter}>
                <SelectTrigger className="w-48 rounded-lg">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size === 'all' ? 'All Sizes' : size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-neutral-600">
            Showing {filteredArtworks.length} {filteredArtworks.length === 1 ? 'artwork' : 'artworks'}
          </p>
        </div>

        {filteredArtworks.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={{...artwork, id: artwork._id}} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="font-serif text-neutral-900 mb-2">No artworks found</h3>
          </div>
        )}
      </div>
    </div>
  )
}
