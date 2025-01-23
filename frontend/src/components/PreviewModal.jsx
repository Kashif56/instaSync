import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineHeart, AiOutlineComment, AiOutlineInstagram } from 'react-icons/ai';
import { FiBookmark, FiSend, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';

const PreviewModal = ({ isOpen, onClose, images, caption, tags }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const formatCaption = (caption, tags) => {
    const hashTags = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag)
      .map(tag => `#${tag}`)
      .join(' ');
    return `${caption}\n\n${hashTags}`;
  };

  const prevSlide = () => {
    setCurrentIndex(current => (current === 0 ? images.length - 1 : current - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(current => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-xl overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        {/* Instagram Preview */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center p-4 border-b dark:border-gray-700">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <AiOutlineInstagram className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 font-semibold text-gray-900 dark:text-white">Your Instagram Handle</span>
          </div>

          {/* Image Carousel */}
          <div className="relative w-full aspect-square bg-black">
            {images && images.length > 0 && (
              <>
                <img
                  src={typeof images[currentIndex] === 'string' ? images[currentIndex] : URL.createObjectURL(images[currentIndex])}
                  alt={`Preview ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                      {currentIndex + 1} / {images.length}
                    </div>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`transition-colors ${
                            index === currentIndex ? 'text-blue-500' : 'text-gray-400'
                          }`}
                        >
                          <BsDot className="w-6 h-6" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                <AiOutlineHeart className="w-7 h-7" />
              </button>
              <button className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                <AiOutlineComment className="w-7 h-7" />
              </button>
              <button className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                <FiSend className="w-7 h-7" />
              </button>
            </div>
            <button className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              <FiBookmark className="w-7 h-7" />
            </button>
          </div>

          {/* Caption */}
          <div className="px-4 pb-4">
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
              <span className="font-semibold mr-2">Your Instagram Handle</span>
              {formatCaption(caption, tags)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
