import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUpload, AiOutlineClockCircle, AiOutlineCalendar, AiOutlineTag, AiOutlineInstagram, AiOutlineEye } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import Navbar from '../../components/Navbar';
import Breadcrumb from '../../components/Breadcrumb';
import ImageCarousel from '../../components/ImageCarousel';
import PreviewModal from '../../components/PreviewModal';
import TagInput from '../../components/TagInput';
import DateTimeSelector from '../../components/DateTimeSelector';
import Toast from '../../components/Toast'; // Import Toast component

const AddPost = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toast, setToast] = useState(null); // Add toast state

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 10) {
      setToast({ type: 'error', message: 'Maximum 10 images allowed' });
      return;
    }

    setImages([...images, ...files]);

    // Create preview URLs
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewImages = previewImages.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewImages(newPreviewImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setToast({ type: 'error', message: 'Please select at least one image' });
      return;
    }

    if (!scheduleDate || !scheduleTime) {
      setToast({ type: 'error', message: 'Please select schedule date and time' });
      return;
    }

    // TODO: Implement post creation logic
    console.log({
      images,
      caption,
      tags: tags.split(',').map(tag => tag.trim()),
      scheduleDate,
      scheduleTime,
    });
    setToast({ type: 'success', message: 'Post scheduled successfully!' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <Navbar />
      
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-30">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="add-post-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M0 0h30v30H0z" fill="none"/>
                <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.1)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#add-post-pattern)"/>
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
                  Schedule New Post
                </h1>
                <p className="mt-2 text-gray-400">
                  Create and schedule your Instagram post
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
                  Upload Images
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
                  <div className="flex justify-center">
                    <label className="relative px-6 py-4 rounded-lg border-2 border-dashed border-gray-700 hover:border-purple-500/50 transition-colors cursor-pointer bg-black/20 flex items-center space-x-2">
                      <BiImageAdd className="w-6 h-6 text-purple-400" />
                      <span className="text-sm text-gray-400">
                        {previewImages.length === 0 ? 'Upload Images' : 'Add More Images'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
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

              {/* Tags */}
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
                  onClick={() => setIsPreviewOpen(true)}
                  className="px-6 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-150 flex items-center gap-2"
                >
                  <AiOutlineEye className="w-5 h-5" />
                  Preview
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-150 flex items-center gap-2"
                >
                  <AiOutlineUpload className="w-5 h-5" />
                  Schedule Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        images={previewImages}
        caption={caption}
        tags={tags}
      />

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

export default AddPost;