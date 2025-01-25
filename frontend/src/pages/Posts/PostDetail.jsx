import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { AiOutlineHeart, AiOutlineMessage, AiOutlineShareAlt, AiOutlineEye, AiOutlineCalendar, AiOutlineTag, AiOutlineClockCircle, AiOutlineGlobal } from 'react-icons/ai';
import Navbar from '../../components/Navbar';
import Breadcrumb from '../../components/Breadcrumb';

import { getPostById } from '../../api/postApiService';

const PostDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await getPostById(id);
        console.log('Post data:', response.data); // Debug log
        console.log('Tags:', response.data.tags); // Debug log for tags
        console.log('Tags type:', typeof response.data.tags); // Debug log for tags type
        setPost(response.data); 
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const nextImage = () => {
    if (!post?.media?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % post.media.length);
  };

  const prevImage = () => {
    if (!post?.media?.length) return;
    setCurrentImageIndex((prev) => (prev - 1 + post.media.length) % post.media.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
      <Navbar />
      
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-30">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="detail-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M0 0h30v30H0z" fill="none"/>
                <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.1)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#detail-pattern)"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Carousel */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : post?.media?.length > 0 ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={`http://localhost:8000${post.media[currentImageIndex]?.mediaFile || ''}`}
                      alt={`Post image ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      onError={(e) => {
                        console.error('Image failed to load:', e);
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                  {post.media.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                      >
                        <FiChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                      >
                        <FiChevronRight className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {post.media.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                  No images available
                </div>
              )}
            </div>

            {/* Post Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                  Post Details
                </h1>
                <div className="mt-4 space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-300">{post.caption}</p>
                  </div>

                

                  {/* Tags */}
                  {post?.tags && (
                    <div className="flex items-center space-x-2">
                      <AiOutlineTag className="w-5 h-5 text-purple-400" />
                      <div className="flex flex-wrap gap-2">
                        {typeof post.tags === 'string' ? (
                          // If tags is a simple string, split by commas or display as single tag
                          post.tags.includes(',') ? (
                            post.tags.split(',').map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                              >
                                #{tag.trim()}
                              </span>
                            ))
                          ) : (
                            <span
                              className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                            >
                              #{post.tags}
                            </span>
                          )
                        ) : Array.isArray(post.tags) ? (
                          // If tags is an array
                          post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400">No tags</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Status and Dates */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="text-purple-400 font-medium mb-2 flex items-center">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${!post.postedAt ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                          Status: <span className="text-white ml-2">{!post.postedAt ? 'Scheduled' : 'Posted'}</span>
                        </div>
                      </div>
                      {!post.postedAt ? (
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <AiOutlineCalendar className="w-5 h-5 text-purple-400 mt-1" />
                            <div>
                              <div className="text-gray-400 text-sm">Scheduled Date</div>
                              <div className="text-white">
                                {new Date(post.scheduledDateTime).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <AiOutlineClockCircle className="w-5 h-5 text-purple-400 mt-1" />
                            <div>
                              <div className="text-gray-400 text-sm">Scheduled Time</div>
                              <div className="text-white">
                                {new Date(post.scheduledDateTime).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <AiOutlineGlobal className="w-5 h-5 text-purple-400 mt-1" />
                            <div>
                              <div className="text-gray-400 text-sm">Timezone</div>
                              <div className="text-white">
                                {Intl.DateTimeFormat().resolvedOptions().timeZone}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-2">
                          <AiOutlineCalendar className="w-5 h-5 text-purple-400 mt-1" />
                          <div>
                            <div className="text-gray-400 text-sm">Posted On</div>
                            <div className="text-white">
                              {new Date(post.postedAt).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                      <AiOutlineEye className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-white">{post.views}</div>
                      <div className="text-sm text-gray-400">Views</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                      <AiOutlineHeart className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-white">{post.likes}</div>
                      <div className="text-sm text-gray-400">Likes</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                      <AiOutlineMessage className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-white">{post.comments}</div>
                      <div className="text-sm text-gray-400">Comments</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                      <AiOutlineShareAlt className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-white">{post.shares}</div>
                      <div className="text-sm text-gray-400">Shares</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96">
        <div className="absolute w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      </div>
      <div className="fixed top-0 right-0 translate-x-1/4 -translate-y-1/4 w-96 h-96">
        <div className="absolute w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default PostDetail;