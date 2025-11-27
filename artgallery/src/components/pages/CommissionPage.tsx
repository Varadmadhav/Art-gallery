import { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

export function CommissionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artworkType: '',
    size: '',
    budget: '',
    deadline: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Commission request submitted successfully!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="font-serif text-neutral-900 mb-4">Request Received!</h2>
          <p className="text-neutral-600 mb-8">
            Thank you for your commission request. I'll review your requirements and get back to you within 2-3 business days.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            className="bg-amber-700 hover:bg-amber-800 rounded-lg"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-50 to-neutral-50 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="font-serif text-neutral-900 mb-4">Commission Custom Artwork</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Looking for something unique? I'd love to create a custom piece tailored to your vision. 
            Fill out the form below and let's bring your ideas to life.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Process */}
        <div className="mb-12">
          <h2 className="font-serif text-neutral-900 mb-8 text-center">The Commission Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Submit Request', desc: 'Share your vision and requirements' },
              { step: 2, title: 'Consultation', desc: 'We discuss details and pricing' },
              { step: 3, title: 'Creation', desc: 'I create your custom artwork' },
              { step: 4, title: 'Delivery', desc: 'Receive your unique piece' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-serif">
                  {item.step}
                </div>
                <h3 className="text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-neutral-50 rounded-3xl p-8 lg:p-12">
          <h2 className="font-serif text-neutral-900 mb-8">Commission Request Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-lg mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="rounded-lg mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-lg mt-2"
              />
            </div>

            {/* Artwork Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="artworkType">Artwork Type *</Label>
                <Select
                  value={formData.artworkType}
                  onValueChange={(value) => setFormData({ ...formData, artworkType: value })}
                  required
                >
                  <SelectTrigger className="rounded-lg mt-2">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                    <SelectItem value="landscape">Landscape / Nature</SelectItem>
                    <SelectItem value="digital">Digital Art</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="size">Preferred Size *</Label>
                <Select
                  value={formData.size}
                  onValueChange={(value) => setFormData({ ...formData, size: value })}
                  required
                >
                  <SelectTrigger className="rounded-lg mt-2">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (up to 24")</SelectItem>
                    <SelectItem value="medium">Medium (24" - 36")</SelectItem>
                    <SelectItem value="large">Large (36" - 48")</SelectItem>
                    <SelectItem value="xlarge">Extra Large (48"+)</SelectItem>
                    <SelectItem value="custom">Custom Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                >
                  <SelectTrigger className="rounded-lg mt-2">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-2000">Under $2,000</SelectItem>
                    <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="above-10000">Above $10,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="deadline">Desired Completion Date</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="rounded-lg mt-2"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Describe Your Vision *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                placeholder="Tell me about your vision, preferred colors, style, mood, and any other details that will help me create the perfect piece for you..."
                className="rounded-lg mt-2"
              />
            </div>

            {/* Reference Images */}
            <div>
              <Label>Reference Images (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-amber-700 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-600 mb-1">Drop your reference images here</p>
                <p className="text-xs text-neutral-500">or click to browse (PNG, JPG up to 10MB)</p>
              </div>
            </div>

            <div className="pt-6">
              <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 rounded-lg py-6">
                Submit Commission Request
              </Button>
            </div>

            <p className="text-xs text-neutral-500 text-center">
              By submitting this form, you agree to be contacted regarding your commission request.
            </p>
          </form>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="font-serif text-neutral-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How long does a commission take?',
                a: 'Typical commissions take 4-8 weeks depending on size and complexity. Rush orders may be available for an additional fee.',
              },
              {
                q: 'What are your commission rates?',
                a: 'Rates vary based on size, medium, and complexity. Small pieces start at $1,500, medium at $3,000, and large pieces at $5,000+.',
              },
              {
                q: 'Do you require a deposit?',
                a: 'Yes, I require a 50% deposit to begin work, with the balance due upon completion before shipping.',
              },
              {
                q: 'Can I see progress updates?',
                a: 'Absolutely! I provide regular progress photos and welcome feedback throughout the creation process.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-neutral-200">
                <h3 className="text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
