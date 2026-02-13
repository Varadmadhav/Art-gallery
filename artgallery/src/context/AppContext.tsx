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
  login: (email: string, password: string) => Promise<UserType> // 🔥 returns user
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const GUEST_CART_KEY = 'cart_guest'

function getUserCartKey(email: string) {
  return `cart_${email}`
}

// merge guest + user cart (same artwork → sum quantity)
function mergeCarts(guest: CartItem[] = [], user: CartItem[] = []): CartItem[] {
  const map = new Map<string, CartItem>()

  // user cart as base
  for (const item of user) {
    map.set(item.artwork.id, { ...item })
  }

  // add/merge guest cart
  for (const item of guest) {
    const existing = map.get(item.artwork.id)
    if (existing) {
      existing.quantity += item.quantity
    } else {
      map.set(item.artwork.id, { ...item })
    }
  }

  return Array.from(map.values())
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Artwork[]>([])
  const [user, setUser] = useState<UserType | null>(null)

  // 🔹 On first load: restore user + correct cart (guest or per-user)
  useEffect(() => {
    const savedUserStr = localStorage.getItem('user')
    let parsedUser: UserType | null = null

    if (savedUserStr) {
      try {
        parsedUser = JSON.parse(savedUserStr)
        setUser(parsedUser)
      } catch {
        parsedUser = null
      }
    }

    // cart: user-specific or guest
    if (parsedUser) {
      const userCartStr =
        localStorage.getItem(getUserCartKey(parsedUser.email)) ||
        localStorage.getItem('cart') // old key fallback

      if (userCartStr) {
        try {
          setCart(JSON.parse(userCartStr))
        } catch {
          setCart([])
        }
      }
    } else {
      const guestCartStr =
        localStorage.getItem(GUEST_CART_KEY) ||
        localStorage.getItem('cart') // old key fallback

      if (guestCartStr) {
        try {
          setCart(JSON.parse(guestCartStr))
        } catch {
          setCart([])
        }
      }
    }

    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch {
        setWishlist([])
      }
    }
  }, [])

  // 🔹 Persist wishlist (shared; if you want per-user later, we can change it)
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  // 🔹 Persist cart under correct key (guest vs user)
  useEffect(() => {
    const key = user ? getUserCartKey(user.email) : GUEST_CART_KEY
    localStorage.setItem(key, JSON.stringify(cart))
  }, [cart, user])

  // 🔹 Persist user
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

  // ✅ LOGIN: returns user and merges guest cart → user cart
  const login = async (email: string, password: string): Promise<UserType> => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      })

      const userData: UserType = {
        name: data.name,
        email: data.email,
        token: data.token,
        isAdmin: data.role === 'admin'
      }

      // read carts BEFORE changing user state
      const guestCartStr = localStorage.getItem(GUEST_CART_KEY)
      const userCartKey = getUserCartKey(userData.email)
      const userCartStr = localStorage.getItem(userCartKey)

      let guestCart: CartItem[] = []
      let userCart: CartItem[] = []

      if (guestCartStr) {
        try {
          guestCart = JSON.parse(guestCartStr)
        } catch {
          guestCart = []
        }
      }

      if (userCartStr) {
        try {
          userCart = JSON.parse(userCartStr)
        } catch {
          userCart = []
        }
      }

      const mergedCart = mergeCarts(guestCart, userCart)

      setUser(userData)
      setCart(mergedCart)

      localStorage.setItem('token', data.token)
      localStorage.setItem(userCartKey, JSON.stringify(mergedCart))
      localStorage.removeItem(GUEST_CART_KEY) // guest cart consumed

      return userData
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  // ✅ LOGOUT: save current cart to that user, switch to guest cart
  const logout = () => {
    if (user) {
      const userCartKey = getUserCartKey(user.email)
      localStorage.setItem(userCartKey, JSON.stringify(cart))
    }

    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    // load guest cart into state
    const guestCartStr = localStorage.getItem(GUEST_CART_KEY)
    if (guestCartStr) {
      try {
        setCart(JSON.parse(guestCartStr))
      } catch {
        setCart([])
      }
    } else {
      setCart([])
    }
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
