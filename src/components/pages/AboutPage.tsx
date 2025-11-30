import { Award, BookOpen, Palette, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AboutPage() {
  const achievements = [
    { year: '2023', title: 'Featured in Contemporary Art Magazine', description: 'Cover artist and 8-page feature' },
    { year: '2022', title: 'Solo Exhibition - Metropolitan Gallery', description: 'Sold-out show featuring 30 original works' },
    { year: '2021', title: 'Art Innovation Award', description: 'Recognition for pioneering mixed-media techniques' },
    { year: '2020', title: 'International Art Fair - New York', description: 'Represented among 500+ global artists' },
  ];

  const exhibitions = [
    { year: '2024', name: 'Chromatic Dreams', location: 'San Francisco Art Center', type: 'Solo' },
    { year: '2023', name: 'Abstract Expressions', location: 'Museum of Contemporary Art', type: 'Group' },
    { year: '2023', name: 'Colors in Motion', location: 'Chelsea Gallery, NYC', type: 'Solo' },
    { year: '2022', name: 'Modern Visions', location: 'Los Angeles Gallery', type: 'Group' },
    { year: '2021', name: 'Emerging Voices', location: 'Art Basel Miami', type: 'Group' },
  ];

  const stats = [
    { icon: Palette, value: '500+', label: 'Artworks Created' },
    { icon: Users, value: '300+', label: 'Collectors Worldwide' },
    { icon: Award, value: '15+', label: 'Awards & Recognition' },
    { icon: BookOpen, value: '50+', label: 'Exhibitions' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden bg-neutral-900">
       <ImageWithFallback
  src="https://res.cloudinary.com/dql5knfxm/image/upload/v1764399442/Gemini_Generated_Image_6guy0o6guy0o6guy_egjxc6.png"
  alt="Pooja Chauhan in studio"
  className="w-full h-full object-cover opacity-50"
 />



        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="font-serif mb-4">About Pooja Chauhan</h1>
            <p className="text-xl text-white/90">
              Contemporary artist exploring the boundaries of color, emotion, and abstract expression
            </p>
          </div>
        </div>
      </div>

      {/* Biography */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-neutral-900 mb-6">My Journey</h2>

<p className="text-neutral-700 mb-6">
  My artistic journey began long before I ever held a professional canvas. From childhood, I found myself drawn 
  to colors, patterns, and stories expressed through traditional Indian art. This early fascination slowly grew 
  into a passion that shaped my identity and my purpose as an artist.
</p>

<p className="text-neutral-700 mb-6">
  Over the years, I dedicated myself to learning, experimenting, and refining my skills. I successfully completed 
  both my Elementary and Intermediate art examinations, and during my school years, I participated in and won 
  numerous art competitions—each one strengthening my confidence and encouraging me to pursue art more seriously.
</p>

<p className="text-neutral-700 mb-6">
  As I continued exploring different mediums—painting, sketching, mixed media, and contemporary styles—I found 
  my creative voice rooted in Indian cultural expression. Whether I am working with bold strokes or delicate 
  details, my work always carries a touch of Indian tradition blended with modern storytelling.
</p>

<p className="text-neutral-700 mb-6">
  What began as a childhood passion has now grown into a committed artistic practice. I believe that creativity 
  has no boundaries, and each artwork I create reflects my journey, my heritage, and my desire to express the 
  beauty and depth of human emotion.
</p>

<p className="text-neutral-700">
  Today, I continue to explore new ideas, experiment with innovative techniques, and push myself as an artist 
  with every piece I create. My goal is simple—to craft art that resonates, inspires, and speaks to the soul.
</p>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-amber-700" />
                </div>
                <div className="text-3xl font-serif text-neutral-900 mb-2">{stat.value}</div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-neutral-900 mb-12 text-center">Awards & Recognition</h2>
          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-amber-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-serif">{achievement.year}</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-neutral-900 mb-2">{achievement.title}</h3>
                  <p className="text-neutral-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibition History */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-neutral-900 mb-12 text-center">Exhibition History</h2>
          <div className="space-y-6">
            {exhibitions.map((exhibition, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-neutral-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-neutral-900 mb-2">{exhibition.name}</h3>
                    <p className="text-neutral-600">{exhibition.location}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-neutral-500">{exhibition.year}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      exhibition.type === 'Solo'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}>
                      {exhibition.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Photos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-neutral-900 mb-12 text-center">In the Studio</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758267928035-6716c00ff3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwb3J0cmFpdCUyMHN0dWRpb3xlbnwxfHx8fDE3NjM5MjI1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Studio view 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1647792845543-a8032c59cbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2Mzk5NzMzNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Studio view 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1681235014294-588fea095706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwYXJ0fGVufDF8fHx8MTc2Mzk1MzE1MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Studio view 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-700 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-white mb-6">Let's Create Together</h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
            Interested in commissioning a custom piece or learning more about available artworks? 
            I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             {/* Commission Artwork Button */}
  <Link to="/commission">
  <Button
    variant="outline"
    className="bg-white text-amber-900 hover:bg-neutral-100 rounded-lg px-8 py-6 border-white transition-colors duration-300"
  >
    Request Commission
  </Button>
</Link>

<Link to="/gallery">
  <Button
    variant="outline"
    className="bg-white text-amber-900 hover:bg-neutral-100 rounded-lg px-8 py-6 border-white transition-colors duration-300"
  >
    View Gallery
  </Button>
</Link>

          </div>
        </div>
      </section>
    </div>
  );
}
