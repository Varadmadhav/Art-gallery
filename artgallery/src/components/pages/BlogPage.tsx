import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-neutral-900 mb-4">Art Journal</h1>
          <p className="text-neutral-600 max-w-2xl">
            Insights, stories, and inspiration from the world of contemporary art
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <Link
          to={`/blog/${blogPosts[0].id}`}
          className="block mb-12 group"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-neutral-50 rounded-3xl overflow-hidden">
            <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
              <ImageWithFallback
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 lg:p-12">
              <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm mb-4">
                Featured
              </div>
              <h2 className="font-serif text-neutral-900 mb-4 group-hover:text-amber-700 transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-neutral-600 mb-6">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-neutral-500 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center text-amber-700 group-hover:text-amber-800">
                <span>Read More</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-neutral-900 mb-3 group-hover:text-amber-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
