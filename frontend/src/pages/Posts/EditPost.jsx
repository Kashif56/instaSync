import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineUpload, AiOutlineClockCircle, AiOutlineCalendar, AiOutlineTag, AiOutlineInstagram } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Breadcrumb from '../../components/Breadcrumb';
import ImageCarousel from '../../components/ImageCarousel';
import TagInput from '../../components/TagInput';
import DateTimeSelector from '../../components/DateTimeSelector';
import { updatePost, getPostById, deleteMedia } from '../../api/postApiService';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState([]); // New images to upload
  const [existingMedia, setExistingMedia] = useState([]); // Track existing media objects
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        const post = response.data;
        
        // Store existing media objects
        setExistingMedia(post.media);
        
        // Set preview URLs for existing media
        const mediaUrls = post.media.map(m => ({
          url: `http://localhost:8000${m.mediaFile}`,
          id: m.id,
          isExisting: true
        }));
        setPreviewImages(mediaUrls);
        setImages([]); // Clear images array as we'll only add new files here
        
        // Set other fields
        setCaption(post.caption);
        setTags(post.tags || '');
        
        // Parse scheduled datetime
        const scheduledDate = new Date(post.scheduledDateTime);
        setScheduleDate(scheduledDate.toISOString().split('T')[0]);
        setScheduleTime(scheduledDate.toTimeString().slice(0, 5));
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Failed to load post. Please try again.');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!scheduleDate || !scheduleTime) {
      toast.error('Please select schedule date and time');
      return;
    }

    try {
      setIsLoading(true);
      const postData = {
        caption,
        tags,
        scheduledDate: scheduleDate,
        scheduledTime: scheduleTime,
        images: images // Only new images
      };

      await updatePost(id, postData);
      toast.success('Post updated successfully!');
      
      // Navigate back after success
      setTimeout(() => {
        navigate('/posts');
      }, 1500);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(error.response?.data?.message || 'Failed to update post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = async (index) => {
    setIsLoading(true);
    try {
      // If removing an existing media
      if (index < existingMedia.length) {
        const mediaToDelete = existingMedia[index];
        await deleteMedia(id, mediaToDelete.id);
        
        // Update state after successful deletion
        setExistingMedia(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        
        toast.success('Image deleted successfully');
      } else {
        // Remove new image
        const newImageIndex = index - existingMedia.length;
        setImages(prev => prev.filter((_, i) => i !== newImageIndex));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error(error.response?.data?.message || 'Failed to delete image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + previewImages.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    // Add new files to images array (for upload)
    setImages(prevImages => [...prevImages, ...files]);
    
    // Add new preview URLs
    const newPreviewUrls = files.map(file => ({
      url: URL.createObjectURL(file),
      id: null, // null id indicates it's a new image
      file: file // store the file reference
    }));
    setPreviewImages(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
        <Navbar />
        
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-30">
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="edit-post-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M0 0h30v30H0z" fill="none"/>
                  <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.1)"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#edit-post-pattern)"/>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 pt-20 flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="mb-6 w-4/5 mx-auto">
            <Breadcrumb />
          </div>

          <div className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden w-4/5 mx-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                    Edit Post
                  </h1>
                  <p className="mt-2 text-gray-400">
                    Update your scheduled Instagram post
                  </p>
                </div>
                <div className="bg-black/50 backdrop-blur-md p-3 rounded-lg">
                  <AiOutlineInstagram className="w-6 h-6 text-purple-400" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-400">
                    Images
                  </label>
                  <div className="space-y-4">
                    {/* Image Carousel */}
                    {previewImages.length > 0 && (
                      <ImageCarousel 
                        images={previewImages} 
                        onRemove={removeImage}
                      />
                    )}

                    {/* Upload Button */}
                    <div className="flex items-center justify-center w-full">
                      <label className="w-full flex flex-col items-center justify-center h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-black/20 hover:bg-black/30 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <BiImageAdd className="w-10 h-10 text-purple-500 mb-3" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10 images)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-400">
                    Caption
                  </label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows={4}
                    className="w-full bg-black/20 border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    placeholder="Write your caption here..."
                  />
                </div>

                {/* Tags Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-400 flex items-center gap-2">
                    <AiOutlineTag className="w-5 h-5" />
                    Tags
                  </label>
                  <TagInput
                    value={tags}
                    onChange={setTags}
                  />
                </div>

                {/* Schedule Date and Time */}
                <DateTimeSelector
                  date={scheduleDate}
                  time={scheduleTime}
                  onDateChange={setScheduleDate}
                  onTimeChange={setScheduleTime}
                />

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/posts')}
                    className="px-6 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-150 flex items-center gap-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-150 flex items-center gap-2"
                  >
                    <AiOutlineUpload className="w-5 h-5" />
                    Update Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;