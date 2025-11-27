import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useApp } from '../../context/AppContext'
import { toast } from 'sonner@2.0.3'
import axios from 'axios'

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const { login } = useApp()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      })

      // Auto login after registration
      await login(email, password)

      toast.success('Account created successfully!')
      navigate('/')

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-serif text-2xl">AH</span>
          </div>
          <h1 className="font-serif text-neutral-900 mb-2">Create Account</h1>
          <p className="text-neutral-600">Join our community of art collectors</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-lg mt-2"
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg mt-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg mt-2"
                placeholder="••••••••"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="rounded-lg mt-2"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 rounded-lg py-6">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-700 hover:text-amber-800">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
