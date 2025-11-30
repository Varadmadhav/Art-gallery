import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletter-popup-seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for subscribing!');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative animate-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-serif text-2xl">AH</span>
          </div>
          <h2 className="font-serif text-neutral-900 mb-2">Stay Inspired</h2>
          <p className="text-neutral-600">
            Subscribe to receive updates on new artworks, exhibitions, and exclusive previews.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg"
          />
          <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 rounded-lg">
            Subscribe
          </Button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            No thanks, maybe later
          </button>
        </form>
      </div>
    </div>
  );
}
