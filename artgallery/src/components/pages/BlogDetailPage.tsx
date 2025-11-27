import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from '../../data/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);
  const relatedPosts = blogPosts.filter((p) => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-neutral-900 mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-amber-700 hover:text-amber-800">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-neutral-600 hover:text-amber-700 mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article>
          <h1 className="font-serif text-neutral-900 mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-neutral-600 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 mb-8">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-neutral max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-neutral-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Author Bio */}
        <div className="mt-12 p-8 bg-neutral-50 rounded-2xl">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-serif text-2xl">AH</span>
            </div>
            <div>
              <h3 className="font-serif text-neutral-900 mb-2">{post.author}</h3>
              <p className="text-neutral-600 mb-4">
                Contemporary artist with over 15 years of experience, specializing in abstract and portrait paintings.
                My work explores the intersection of color, emotion, and human experience.
              </p>
              <Link to="/about" className="text-amber-700 hover:text-amber-800">
                Learn more about the artist →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-neutral-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 mb-4">
                    <ImageWithFallback
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-neutral-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
