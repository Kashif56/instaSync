import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PostsFilter from '../../components/Dashboard/PostsFilter';
import PostsGrid from '../../components/Dashboard/PostsGrid';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import { getUserPosts } from '../../api/postApiService';

const AllPosts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get initial filter values from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(queryParams.get('status') || 'all');
  const [sortBy, setSortBy] = useState(queryParams.get('sort') || 'recent');

  // Update URL when filters change
  const updateQueryParams = (filters) => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.status !== 'all') params.set('status', filters.status);
    if (filters.sort !== 'recent') params.set('sort', filters.sort);
    
    const newUrl = `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    navigate(newUrl, { replace: true });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getUserPosts();
        // Ensure we have an array of posts
        const fetchedPosts = Array.isArray(response.data) ? response.data : [];
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again.');
        toast.error('Failed to load posts. Please try again.');
        // Set empty arrays to prevent undefined errors
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (Array.isArray(posts)) {
      filterAndSortPosts();
      updateQueryParams({ search: searchTerm, status: statusFilter, sort: sortBy });
    }
  }, [searchTerm, statusFilter, sortBy, posts]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
    setStatusFilter(params.get('status') || 'all');
    setSortBy(params.get('sort') || 'recent');
  }, [location.search]);

  const filterAndSortPosts = () => {
    if (!Array.isArray(posts)) {
      setFilteredPosts([]);
      return;
    }

    let result = [...posts];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(post =>
        (post?.caption || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post?.tags || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(post => {
        if (!post?.scheduledDateTime) return false;
        const postDate = new Date(post.scheduledDateTime);
        const now = new Date();
        
        if (statusFilter === 'scheduled') {
          return postDate > now;
        } else if (statusFilter === 'published') {
          return postDate <= now;
        }
        return true;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b?.scheduledDateTime || 0) - new Date(a?.scheduledDateTime || 0);
        case 'popular':
          return (b?.likes || 0) - (a?.likes || 0);
        case 'engagement':
          const engagementA = (a?.likes || 0) + (a?.comments || 0);
          const engagementB = (b?.likes || 0) + (b?.comments || 0);
          return engagementB - engagementA;
        default:
          return 0;
      }
    });

    setFilteredPosts(result);
  };

  const handleFilterChange = (type, value) => {
    switch (type) {
      case 'search':
        setSearchTerm(value);
        break;
      case 'status':
        setStatusFilter(value);
        break;
      case 'sort':
        setSortBy(value);
        break;
      default:
        break;
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
        <Navbar />
      
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-30">
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="posts-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M0 0h30v30H0z" fill="none"/>
                  <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.1)"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#posts-pattern)"/>
            </svg>
          </div>
        </div>

        <div className="relative z-10 pt-20 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                Your Posts
              </h1>
              <p className="mt-2 text-gray-400">
                Manage and monitor all your Instagram posts in one place
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-xl px-4 py-2 rounded-lg border border-gray-800">
                <span className="text-purple-400 font-medium">Total Posts:</span>
                <span className="text-white font-bold">{Array.isArray(filteredPosts) ? filteredPosts.length : 0}</span>
              </div>
            </div>
          </div>

          <PostsFilter 
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            sortBy={sortBy}
          />

          <div className="mt-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-400">{error}</div>
            ) : (
              <>
                <PostsGrid posts={filteredPosts || []} onDeletePost={handleDeletePost} />
                {(!Array.isArray(filteredPosts) || filteredPosts.length === 0) && (
                  <div className="text-center py-12 text-gray-400">
                    No posts found
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AllPosts;