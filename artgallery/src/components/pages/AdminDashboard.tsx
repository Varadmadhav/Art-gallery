import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react'
import { Button } from '../ui/button'
import { useApp } from '../../context/AppContext'
import axios from 'axios'

type Tab = 'dashboard' | 'artworks' | 'orders' | 'customers'

type NewArtworkForm = {
  title: string
  artist: string
  description: string
  price: string
  category: string
  stock: string
  rating: string
  imageFile: File | null
}

export function AdminDashboard() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  const [stats, setStats] = useState<any>(null)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [artworks, setArtworks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showAddModal, setShowAddModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingArtwork, setEditingArtwork] = useState<any | null>(null)

  const [newArtwork, setNewArtwork] = useState<NewArtworkForm>({
    title: '',
    artist: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    rating: '',
    imageFile: null
  })

  if (!user || !user.isAdmin) {
    navigate('/login')
    return null
  }

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await axios.get('http://localhost:5000/api/order/admin/stats', tokenHeader)
        const recentRes = await axios.get('http://localhost:5000/api/order/admin/recent', tokenHeader)
        const customersRes = await axios.get('http://localhost:5000/api/order/admin/customers', tokenHeader)
        const artworksRes = await axios.get('http://localhost:5000/api/artworks')

        setStats(statsRes.data)
        setRecentOrders(recentRes.data)
        setCustomers(customersRes.data)

        const formattedArtworks = artworksRes.data.map((a: any) => ({
          ...a,
          id: a._id
        }))
        setArtworks(formattedArtworks)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading Admin Data...</h2>
      </div>
    )
  }

  const statCards = [
    { label: 'Total Sales', value: `$${stats.totalSales}`, icon: DollarSign },
    { label: 'Orders', value: stats.totalOrders, icon: ShoppingCart },
    { label: 'Artworks', value: stats.totalArtworks, icon: Package },
    { label: 'Customers', value: stats.totalCustomers, icon: Users }
  ]

  const deleteArtwork = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/artworks/${id}`, tokenHeader)
      setArtworks(prev => prev.filter(a => a.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const openCreateModal = () => {
    setEditingArtwork(null)
    setNewArtwork({
      title: '',
      artist: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      rating: '',
      imageFile: null
    })
    setShowAddModal(true)
  }

  const openEditModal = (artwork: any) => {
    setEditingArtwork(artwork)
    setNewArtwork({
      title: artwork.title || '',
      artist: artwork.artist || '',
      description: artwork.description || '',
      price: artwork.price != null ? String(artwork.price) : '',
      category: artwork.category || '',
      stock: artwork.stock != null ? String(artwork.stock) : '',
      rating: artwork.rating != null ? String(artwork.rating) : '',
      imageFile: null
    })
    setShowAddModal(true)
  }

  const handleNewArtworkChange = (e: any) => {
    const { name, value } = e.target
    setNewArtwork(prev => ({ ...prev, [name]: value }))
  }

  const handleNewArtworkImage = (e: any) => {
    const file = e.target.files?.[0] || null
    setNewArtwork(prev => ({ ...prev, imageFile: file }))
  }

  const handleCreateArtwork = async (e: any) => {
    e.preventDefault()
    if (!newArtwork.title || !newArtwork.price || !newArtwork.category || (!editingArtwork && !newArtwork.imageFile)) {
      alert('Title, price, category and image are required')
      return
    }

    try {
      setSubmitting(true)
      const formData = new FormData()
      formData.append('title', newArtwork.title)
      formData.append('artist', newArtwork.artist)
      formData.append('description', newArtwork.description)
      formData.append('price', newArtwork.price)
      formData.append('category', newArtwork.category)
      formData.append('stock', newArtwork.stock)
      formData.append('rating', newArtwork.rating)
      if (newArtwork.imageFile) {
        formData.append('image', newArtwork.imageFile)
      }

      if (editingArtwork) {
        const res = await axios.put(
          `http://localhost:5000/api/artworks/${editingArtwork.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        const updated = { ...res.data, id: res.data._id }
        setArtworks(prev => prev.map(a => (a.id === updated.id ? updated : a)))
      } else {
        const res = await axios.post('http://localhost:5000/api/artworks', formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })

        const created = { ...res.data, id: res.data._id }
        setArtworks(prev => [created, ...prev])
      }

      setNewArtwork({
        title: '',
        artist: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        rating: '',
        imageFile: null
      })
      setEditingArtwork(null)
      setShowAddModal(false)
    } catch (error) {
      console.log(error)
      alert('Failed to save artwork')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setEditingArtwork(null)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-serif text-neutral-900 mb-8">Admin Dashboard</h1>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeTab === 'dashboard' ? 'bg-amber-100 text-amber-900' : 'text-neutral-700'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </button>

                <button
                  onClick={() => setActiveTab('artworks')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeTab === 'artworks' ? 'bg-amber-100 text-amber-900' : 'text-neutral-700'
                  }`}
                >
                  <Package className="w-5 h-5" /> Artworks
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeTab === 'orders' ? 'bg-amber-100 text-amber-900' : 'text-neutral-700'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" /> Orders
                </button>

                <button
                  onClick={() => setActiveTab('customers')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeTab === 'customers' ? 'bg-amber-100 text-amber-900' : 'text-neutral-700'
                  }`}
                >
                  <Users className="w-5 h-5" /> Customers
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-4">
            {activeTab === 'dashboard' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map(stat => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-amber-100 flex items-center justify-center rounded-xl">
                        <stat.icon className="w-6 h-6 text-amber-700" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-serif mb-1">{stat.value}</div>
                    <div className="text-sm text-neutral-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'artworks' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-neutral-900">Manage Artworks</h2>
                  <Button className="bg-amber-700 hover:bg-amber-800" onClick={openCreateModal}>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Artwork
                  </Button>
                </div>

                <div className="space-y-4">
                  {artworks.map(artwork => (
                    <div
                      key={artwork.id}
                      className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl"
                    >
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-neutral-900 mb-1">{artwork.title}</h3>
                        <p className="text-sm text-neutral-600">
                          {artwork.category} · ${artwork.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(artwork)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => deleteArtwork(artwork.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif text-neutral-900 mb-6">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 text-sm text-neutral-600">Customer</th>
                        <th className="text-left py-3 text-sm text-neutral-600">Artwork</th>
                        <th className="text-left py-3 text-sm text-neutral-600">Amount</th>
                        <th className="text-left py-3 text-sm text-neutral-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order._id} className="border-b border-neutral-100">
                          <td className="py-4 text-sm text-neutral-900">{order.user?.name}</td>
                          <td className="py-4 text-sm text-neutral-600">
                            {order.items[0]?.artwork?.title}
                          </td>
                          <td className="py-4 text-sm text-neutral-900">${order.totalAmount}</td>
                          <td className="py-4 text-sm text-neutral-900 capitalize">
                            {order.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif text-neutral-900 mb-6">Customer List</h2>
                <div className="space-y-4">
                  {customers.map((customer: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="font-serif text-amber-800">
                            {customer.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-neutral-900 mb-1">{customer.name}</h3>
                          <p className="text-sm text-neutral-600">{customer.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-neutral-900 mb-1">{customer.orders} orders</div>
                        <div className="text-sm text-neutral-600">${customer.spent}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="font-serif text-xl mb-4">
              {editingArtwork ? 'Edit Artwork' : 'Add New Artwork'}
            </h2>
            <form className="space-y-4" onSubmit={handleCreateArtwork}>
              <div>
                <div className="text-sm mb-1">Title</div>
                <input
                  name="title"
                  value={newArtwork.title}
                  onChange={handleNewArtworkChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div>
                <div className="text-sm mb-1">Artist</div>
                <input
                  name="artist"
                  value={newArtwork.artist}
                  onChange={handleNewArtworkChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm mb-1">Category</div>
                  <input
                    name="category"
                    value={newArtwork.category}
                    onChange={handleNewArtworkChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <div className="text-sm mb-1">Price</div>
                  <input
                    name="price"
                    type="number"
                    value={newArtwork.price}
                    onChange={handleNewArtworkChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm mb-1">Stock</div>
                  <input
                    name="stock"
                    type="number"
                    value={newArtwork.stock}
                    onChange={handleNewArtworkChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <div className="text-sm mb-1">Rating</div>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    value={newArtwork.rating}
                    onChange={handleNewArtworkChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm mb-1">Description</div>
                <textarea
                  name="description"
                  value={newArtwork.description}
                  onChange={handleNewArtworkChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm min-h-[80px]"
                />
              </div>

              <div>
                <div className="text-sm mb-1">
                  Image {editingArtwork ? '(leave empty to keep current)' : ''}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewArtworkImage}
                  className="w-full text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-800"
                  disabled={submitting}
                >
                  {submitting
                    ? editingArtwork
                      ? 'Saving...'
                      : 'Saving...'
                    : editingArtwork
                    ? 'Save Changes'
                    : 'Save Artwork'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
