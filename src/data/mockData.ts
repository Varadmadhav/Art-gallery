import { Artwork, Review } from '../context/AppContext';

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Abstract Harmony',
    price: 2850,
    category: 'Abstract',
    size: 'Large',
    image: 'https://images.unsplash.com/photo-1681235014294-588fea095706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc2Mzk1MzE1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1681235014294-588fea095706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc2Mzk1MzE1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1705254613735-1abb457f8a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwYXJ0fGVufDF8fHx8MTc2Mzk4OTMzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'A stunning abstract piece that explores the intersection of color and emotion. Created with acrylic on canvas, this artwork brings a vibrant energy to any space.',
    dimensions: '48" × 36" (122cm × 91cm)',
    availability: 'available',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    title: 'Ethereal Portrait',
    price: 3200,
    category: 'Portrait',
    size: 'Medium',
    image: 'https://images.unsplash.com/photo-1741805190677-699163f75635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBhaW50aW5nJTIwd29tYW58ZW58MXx8fHwxNzY0MDAyNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1741805190677-699163f75635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBhaW50aW5nJTIwd29tYW58ZW58MXx8fHwxNzY0MDAyNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'A captivating portrait that captures the essence of human emotion and beauty. Oil on canvas with meticulous attention to detail.',
    dimensions: '30" × 24" (76cm × 61cm)',
    availability: 'available',
    featured: true,
    newArrival: true,
  },
  {
    id: '3',
    title: 'Serene Landscape',
    price: 2400,
    category: 'Nature',
    size: 'Large',
    image: 'https://images.unsplash.com/photo-1688589935455-7793f9f52a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBwYWludGluZ3xlbnwxfHx8fDE3NjM5MTA5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1688589935455-7793f9f52a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBwYWludGluZ3xlbnwxfHx8fDE3NjM5MTA5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'An enchanting landscape that transports you to peaceful natural settings. Mixed media on canvas.',
    dimensions: '40" × 30" (102cm × 76cm)',
    availability: 'available',
    trending: true,
    newArrival: true,
  },
  {
    id: '4',
    title: 'Digital Dreams',
    price: 1800,
    category: 'Digital Art',
    size: 'Medium',
    image: 'https://images.unsplash.com/photo-1763931908251-db97aba71469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwbW9kZXJufGVufDF8fHx8MTc2NDAwMjYxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1763931908251-db97aba71469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwbW9kZXJufGVufDF8fHx8MTc2NDAwMjYxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Contemporary digital artwork that pushes the boundaries of modern art. High-quality giclée print on archival paper.',
    dimensions: '24" × 18" (61cm × 46cm)',
    availability: 'available',
    newArrival: true,
  },
  {
    id: '5',
    title: 'Minimalist Essence',
    price: 1500,
    category: 'Abstract',
    size: 'Small',
    image: 'https://images.unsplash.com/photo-1665779736808-047a6bbf43a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJ0d29ya3xlbnwxfHx8fDE3NjM5MjY2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1665779736808-047a6bbf43a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJ0d29ya3xlbnwxfHx8fDE3NjM5MjY2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'A minimalist approach to abstract art. Less is more in this refined piece.',
    dimensions: '20" × 16" (51cm × 41cm)',
    availability: 'available',
  },
  {
    id: '6',
    title: 'Vibrant Chaos',
    price: 3500,
    category: 'Abstract',
    size: 'Large',
    image: 'https://images.unsplash.com/photo-1705254613735-1abb457f8a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwYXJ0fGVufDF8fHx8MTc2Mzk4OTMzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1705254613735-1abb457f8a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwYXJ0fGVufDF8fHx8MTc2Mzk4OTMzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'An explosion of color and texture that demands attention. Bold and expressive.',
    dimensions: '60" × 40" (152cm × 102cm)',
    availability: 'sold',
    trending: true,
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    artworkId: '1',
    author: 'Sarah Mitchell',
    rating: 5,
    comment: 'Absolutely stunning piece! The colors are even more vibrant in person. It has become the centerpiece of our living room.',
    date: '2024-11-15',
  },
  {
    id: 'r2',
    artworkId: '1',
    author: 'James Chen',
    rating: 5,
    comment: 'Outstanding quality and beautifully packaged. The artist truly has a gift.',
    date: '2024-11-10',
  },
  {
    id: 'r3',
    artworkId: '2',
    author: 'Emily Rodriguez',
    rating: 5,
    comment: 'The attention to detail in this portrait is remarkable. Worth every penny.',
    date: '2024-11-18',
  },
];

export const blogPosts = [
  {
    id: 'b1',
    title: 'The Journey of Abstract Expression',
    excerpt: 'Exploring the evolution of my abstract art style over the past decade and the inspirations behind each piece.',
    image: 'https://images.unsplash.com/photo-1647792845543-a8032c59cbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2Mzk5NzMzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-11-20',
    author: 'Pooja Chauhan',
    content: `Abstract art has been my passion for over a decade. Each piece I create is a reflection of emotions, experiences, and the ever-changing world around us.

The journey began in my small studio apartment, where I first experimented with bold colors and unconventional techniques. I remember the day I discovered the power of letting paint flow freely, creating unexpected patterns that spoke volumes without saying a word.

Over the years, my style has evolved significantly. Early works were more structured, with defined boundaries and controlled chaos. As I grew as an artist, I learned to embrace uncertainty, allowing each piece to develop organically. This evolution wasn't just artistic—it was deeply personal.

Today, my abstract works are characterized by vibrant color palettes, dynamic textures, and a sense of movement that invites viewers to interpret and connect with the art on their own terms. Each painting is an invitation to pause, reflect, and find your own meaning within the chaos and beauty.`,
  },
  {
    id: 'b2',
    title: 'Behind the Canvas: My Creative Process',
    excerpt: 'A detailed look into how I transform blank canvases into meaningful artworks that resonate with collectors worldwide.',
    image: 'https://images.unsplash.com/photo-1758267928035-6716c00ff3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwb3J0cmFpdCUyMHN0dWRpb3xlbnwxfHx8fDE3NjM5MjI1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-11-15',
    author: 'Pooja Chauhan',
    content: `Creating art is more than just applying paint to canvas—it's a deeply personal ritual that begins long before the first brushstroke.

My process always starts with inspiration. It might come from a morning walk, a piece of music, or an emotional experience. I keep a visual journal where I sketch ideas, collect color swatches, and jot down feelings that I want to capture.

Once I have a concept, I spend time preparing my workspace. The right lighting, music, and materials are essential. I use primarily acrylics for their versatility and vibrant colors, though I often incorporate mixed media elements for added texture and depth.

The actual painting process is intuitive and meditative. I start with an underpainting to establish composition and values, then build layers progressively. Some pieces come together in a single session, while others evolve over weeks or even months. I'm not afraid to paint over sections that don't work—some of my best pieces have been "happy accidents" born from this willingness to iterate.`,
  },
  {
    id: 'b3',
    title: 'Art Collecting: A Guide for First-Time Buyers',
    excerpt: 'Everything you need to know about starting your art collection, from choosing pieces to caring for your investment.',
    image: 'https://images.unsplash.com/photo-1681235014294-588fea095706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc2Mzk1MzE1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-11-08',
    author: 'Pooja Chauhan',
    content: `Starting an art collection can feel overwhelming, but it doesn't have to be. Here's what I tell first-time buyers when they're considering purchasing their first piece.

First and foremost: buy what you love. Don't purchase art solely as an investment. The pieces you live with should bring you joy and resonance every day. Art is deeply personal, and the best collections are built on genuine emotional connections.

Consider your space carefully. Think about where the artwork will hang, the lighting conditions, and how it will complement your existing décor. I'm always happy to provide images showing how pieces might look in different settings.

Budget wisely but don't be afraid to invest. Quality original art can range widely in price, but remember you're not just buying a decorative object—you're investing in a unique creation that can't be replicated.

Finally, care for your investment properly. Keep art away from direct sunlight, maintain stable temperature and humidity levels, and have valuable pieces professionally framed with UV-protective glass.`,
  },
];
