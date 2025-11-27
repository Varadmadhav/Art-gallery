import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Trash2,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../../context/AppContext';
import { artworks } from '../../data/mockData';

type Tab = 'dashboard' | 'artworks' | 'orders' | 'customers';

export function AdminDashboard() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  if (!user || !user.isAdmin) {
    navigate('/login');
    return null;
  }

  const stats = [
    { label: 'Total Sales', value: '$45,231', icon: DollarSign, change: '+12.5%' },
    { label: 'Visitors', value: '8,245', icon: Eye, change: '+8.2%' },
    { label: 'Orders', value: '142', icon: ShoppingCart, change: '+18.7%' },
    { label: 'Artworks', value: artworks.length.toString(), icon: Package, change: '+3' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Sarah Mitchell', artwork: 'Abstract Harmony', amount: 2850, status: 'Shipped' },
    { id: 'ORD-002', customer: 'James Chen', artwork: 'Ethereal Portrait', amount: 3200, status: 'Processing' },
    { id: 'ORD-003', customer: 'Emily Rodriguez', artwork: 'Serene Landscape', amount: 2400, status: 'Delivered' },
  ];

  const customers = [
    { name: 'Sarah Mitchell', email: 'sarah@example.com', orders: 3, spent: 8450 },
    { name: 'James Chen', email: 'james@example.com', orders: 2, spent: 5600 },
    { name: 'Emily Rodriguez', email: 'emily@example.com', orders: 1, spent: 2400 },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-neutral-900 mb-2">Admin Dashboard</h1>
          <p className="text-neutral-600">Manage your gallery and monitor performance</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="text-sm">Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('artworks')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'artworks'
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="text-sm">Artworks</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm">Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'customers'
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Customers</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-amber-700" />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          <span>{stat.change}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-serif text-neutral-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-neutral-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-serif text-neutral-900 mb-6">Recent Orders</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-200">
                          <th className="text-left py-3 text-sm text-neutral-600">Order ID</th>
                          <th className="text-left py-3 text-sm text-neutral-600">Customer</th>
                          <th className="text-left py-3 text-sm text-neutral-600">Artwork</th>
                          <th className="text-left py-3 text-sm text-neutral-600">Amount</th>
                          <th className="text-left py-3 text-sm text-neutral-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-neutral-100">
                            <td className="py-4 text-sm text-neutral-900">{order.id}</td>
                            <td className="py-4 text-sm text-neutral-900">{order.customer}</td>
                            <td className="py-4 text-sm text-neutral-600">{order.artwork}</td>
                            <td className="py-4 text-sm text-neutral-900">${order.amount.toLocaleString()}</td>
                            <td className="py-4">
                              <span
                                className={`px-3 py-1 text-xs rounded-full ${
                                  order.status === 'Delivered'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : order.status === 'Shipped'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'artworks' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-neutral-900">Manage Artworks</h2>
                  <Button className="bg-amber-700 hover:bg-amber-800 rounded-lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Artwork
                  </Button>
                </div>
                <div className="space-y-4">
                  {artworks.map((artwork) => (
                    <div key={artwork.id} className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-neutral-900 mb-1">{artwork.title}</h3>
                        <p className="text-sm text-neutral-600">{artwork.category} · ${artwork.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
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
                <h2 className="font-serif text-neutral-900 mb-6">All Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 text-sm text-neutral-600">Order ID</th>
                        <th className="text-left py-3 text-sm text-neutral-600">Customer</th>
                        <th className="text-left py-3 text-sm text-neutral-600">Artwork</th>
                        <th className="text-left py-3 text-sm text-neutral-600">Amount</th>
                        <th className="text-left py-3 text-sm text-neutral-600">Status</th>
                        <th className="text-left py-3 text-sm text-neutral-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-neutral-100">
                          <td className="py-4 text-sm text-neutral-900">{order.id}</td>
                          <td className="py-4 text-sm text-neutral-900">{order.customer}</td>
                          <td className="py-4 text-sm text-neutral-600">{order.artwork}</td>
                          <td className="py-4 text-sm text-neutral-900">${order.amount.toLocaleString()}</td>
                          <td className="py-4">
                            <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
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
                  {customers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="font-serif text-amber-800">{customer.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-neutral-900 mb-1">{customer.name}</h3>
                          <p className="text-sm text-neutral-600">{customer.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-neutral-900 mb-1">{customer.orders} orders</div>
                        <div className="text-sm text-neutral-600">${customer.spent.toLocaleString()} spent</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
