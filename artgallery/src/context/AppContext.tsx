import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export interface Artwork {
  id: string
  title: string
  price: number
  category: string
  size: string
  image: string
  images: string[]
  description: string
  dimensions: string
  availability: 'available' | 'sold' | 'reserved'
  featured?: boolean
  trending?: boolean
  newArrival?: boolean
}

export interface CartItem {
  artwork: Artwork
  quantity: number
}

interface UserType {
  name: string
  email: string
  token: string
  isAdmin: boolean
}

interface AppContextType {
  cart: CartItem[]
  wishlist: Artwork[]
  addToCart: (artwork: Artwork) => void
  removeFromCart: (artworkId: string) => void
  updateCartQuantity: (artworkId: string, quantity: number) => void
  addToWishlist: (artwork: Artwork) => void
  removeFromWishlist: (artworkId: string) => void
  isInWishlist: (artworkId: string) => boolean
  clearCart: () => void

  user: UserType | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Artwork[]>([])
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    const savedUser = localStorage.getItem('user')

    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const addToCart = (artwork: Artwork) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.artwork.id === artwork.id)
      if (existing) {
        return prev.map((item) =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { artwork, quantity: 1 }]
    })
  }

  const removeFromCart = (artworkId: string) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId))
  }

  const updateCartQuantity = (artworkId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(artworkId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.artwork.id === artworkId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const addToWishlist = (artwork: Artwork) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === artwork.id)) return prev
      return [...prev, artwork]
    })
  }

  const removeFromWishlist = (artworkId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== artworkId))
  }

  const isInWishlist = (artworkId: string) => {
    return wishlist.some((item) => item.id === artworkId)
  }

  // ✅ REAL LOGIN CONNECTED TO BACKEND
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      })

      setUser({
        name: data.name,
        email: data.email,
        token: data.token,
        isAdmin: data.role === 'admin'
      })

    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearCart,
        user,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
