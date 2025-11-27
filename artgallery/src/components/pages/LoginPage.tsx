import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner@2.0.3';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔥 Backend login
      const loggedInUser = await login(email, password);

      toast.success('Welcome back!');

      // 🔥 Get user saved in localStorage after backend login
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

      // 🔥 Admin redirect logic
      if (savedUser.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-serif text-2xl">AH</span>
          </div>
          <h1 className="font-serif text-neutral-900 mb-2">Welcome Back</h1>
          <p className="text-neutral-600">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-amber-700 hover:text-amber-800">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 rounded-lg py-6"
            >
              Sign In
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-amber-700 hover:text-amber-800">
                Sign up
              </Link>
            </p>
          </div>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              Use admin email to access admin dashboard.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
