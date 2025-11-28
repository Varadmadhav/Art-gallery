import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react'
import { Button } from '../ui/button'
import { useApp } from '../../context/AppContext'
import axios from 'axios'

type Tab = 'dashboard' | 'artworks' | 'orders'

export function AdminDashboard() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  const [artworks, setArtworks] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [editingArtwork, setEditingArtwork] = useState<any | null>(null)

  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    imageFile: null as File | null
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
    const fetchData = async () => {
      try {
        const artworksRes = await axios.get('http://localhost:5000/api/artworks')
        const ordersRes = await axios.get('http://localhost:5000/api/checkout')

        const formatted = artworksRes.data.map((a: any) => ({
          ...a,
          id: a._id
        }))

        setArtworks(formatted)
        setOrders(ordersRes.data.orders)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading Admin Data...</h2>
      </div>
    )
  }

  const openAddModal = () => {
    setEditingArtwork(null)
    setForm({ title: '', category: '', price: '', imageFile: null })
    setShowModal(true)
  }

  const openEditModal = (art: any) => {
    setEditingArtwork(art)
    setForm({
      title: art.title,
      category: art.category,
      price: String(art.price),
      imageFile: null
    })
    setShowModal(true)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleImage = (e: any) => {
    setForm(prev => ({ ...prev, imageFile: e.target.files[0] }))
  }

  const handleSave = async () => {
    if (!form.title || !form.category || !form.price) return

    const data = new FormData()
    data.append('title', form.title)
    data.append('category', form.category)
    data.append('price', form.price)

    if (form.imageFile) {
      data.append('image', form.imageFile)
    }

    try {
      if (editingArtwork) {
        const res = await axios.put(`http://localhost:5000/api/artworks/${editingArtwork.id}`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })

        const updated = { ...res.data, id: res.data._id }
        setArtworks(prev => prev.map(a => (a.id === updated.id ? updated : a)))
      } else {
        const res = await axios.post('http://localhost:5000/api/artworks', data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })

        const newArt = { ...res.data, id: res.data._id }
        setArtworks(prev => [newArt, ...prev])
      }

      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteArtwork = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/artworks/${id}`, tokenHeader)
      setArtworks(prev => prev.filter(a => a.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="font-serif text-neutral-900 mb-8">Admin Dashboard</h1>

        <div className="grid lg:grid-cols-5 gap-6">

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <nav className="space-y-2">

                <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-amber-100 text-amber-900' : 'text-neutral-700'}`}>
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </button>

                <button onClick={() => setActiveTab('artworks')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'artworks' ? 'bg-amber-100 text-amber-900' : 'text-neutral-700'}`}>
                  <Package className="w-5 h-5" /> Artworks
                </button>

                <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === 'orders' ? 'bg-amber-100 text-amber-900' : 'text-neutral-700'}`}>
                  <ShoppingCart className="w-5 h-5" /> Orders
                </button>

              </nav>
            </div>
          </div>

          <div className="lg:col-span-4">

            {activeTab === 'dashboard' && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="text-2xl font-serif">{artworks.length}</div>
                  <div className="text-sm text-neutral-500">Artworks</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="text-2xl font-serif">{orders.length}</div>
                  <div className="text-sm text-neutral-500">Orders</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="text-2xl font-serif">₹{orders.reduce((s,o)=>s+o.total,0)}</div>
                  <div className="text-sm text-neutral-500">Revenue</div>
                </div>
              </div>
            )}

            {activeTab === 'artworks' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between mb-6">
                  <h2 className="font-serif text-neutral-900">Manage Artworks</h2>

                  <Button className="bg-amber-700 hover:bg-amber-800" onClick={openAddModal}>
                    <Plus className="w-5 h-5 mr-2" /> Add Artwork
                  </Button>
                </div>

                {artworks.map(art => (
                  <div key={art.id} className="flex items-center gap-4 p-4 mb-4 border border-neutral-200 rounded-xl">
                    <img src={art.image} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3>{art.title}</h3>
                      <p className="text-sm text-neutral-600">{art.category} · ₹{art.price}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(art)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => deleteArtwork(art.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif text-neutral-900 mb-6">Orders</h2>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Customer</th>
                      <th className="text-left p-2">Artwork</th>
                      <th className="text-left p-2">Total</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o._id} className="border-t">
                        <td className="p-2">{o.firstName} {o.lastName}</td>
                        <td className="p-2">{o.cart.map((c:any)=>c.title).join(', ')}</td>
                        <td className="p-2">₹{o.total}</td>
                        <td className="p-2 capitalize">{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="font-serif mb-4">{editingArtwork ? 'Edit Artwork' : 'Add Artwork'}</h2>

            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded mb-3" />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded mb-3" />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded mb-3" />

            <input type="file" onChange={handleImage} className="mb-4" />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={()=>setShowModal(false)}>Cancel</Button>
              <Button className="bg-amber-700 hover:bg-amber-800" onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
