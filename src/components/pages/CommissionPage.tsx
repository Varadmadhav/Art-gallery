import { useState } from 'react'
import { Upload, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner@2.0.3'
import axios from 'axios'

export function CommissionPage() {
  const [submitted, setSubmitted] = useState(false)
  const [images, setImages] = useState<File[]>([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artworkType: '',
    size: '',
    budget: '',
    deadline: '',
    message: ''
  })

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    setImages(Array.from(files))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = new FormData()
      data.append('fullName', formData.name)
      data.append('email', formData.email)
      data.append('phone', formData.phone)
      data.append('artworkType', formData.artworkType)
      data.append('size', formData.size)
      data.append('budget', formData.budget)
      data.append('deadline', formData.deadline)
      data.append('message', formData.message)

      images.forEach((img) => {
        data.append('images', img)
      })

      await axios.post("http://localhost:5000/api/commission/create", data)

      setSubmitted(true)
      toast.success('Commission request submitted successfully!')
    } catch (error) {
      console.log(error)
      toast.error("Failed to submit commission")
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="font-serif text-neutral-900 mb-4">Request Received!</h2>
          <p className="text-neutral-600 mb-8">
            Thank you for your commission request. I'll review your requirements soon.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            className="bg-amber-700 hover:bg-amber-800 rounded-lg"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 bg-neutral-50 rounded-3xl">

        <h2 className="font-serif text-neutral-900 mb-8">
          Commission Request Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Full Name *</Label>
              <Input
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Artwork Type</Label>
              <Select onValueChange={(v) => setFormData({ ...formData, artworkType: v })}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Size</Label>
              <Select onValueChange={(v) => setFormData({ ...formData, size: v })}>
                <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Budget</Label>
              <Input
                value={formData.budget}
                onChange={e => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>

            <div>
              <Label>Deadline</Label>
              <Input
                type="date"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea
              rows={6}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div>
            <Label>Upload images</Label>
            <div
              className="mt-2 p-6 border border-dashed border-amber-700 rounded-xl cursor-pointer text-center"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              Drop images or click to upload
            </div>
            <input
              id="fileInput"
              type="file"
              multiple
              hidden
              onChange={(e) => handleFiles(e.target.files)}
            />

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    className="h-20 w-full object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <Button className="w-full bg-amber-700 hover:bg-amber-800">
            Submit Commission
          </Button>

        </form>
      </div>
    </div>
  )
}
