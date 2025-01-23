import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { RxDotFilled } from 'react-icons/rx';

const ImageCarousel = ({ images, onRemove }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(Math.max(0, images.length - 1));
    }
  }, [images, currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleRemove = (index) => {
    if (onRemove) {
      onRemove(index);
      if (index === currentIndex && index === images.length - 1) {
        setCurrentIndex(Math.max(0, index - 1));
      } else if (index < currentIndex) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const getImageSrc = (image) => {
    if (typeof image === 'string') {
      return image;
    }
    return URL.createObjectURL(image);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[400px] group">
      {/* Main Image */}
      <div className="relative w-full h-full rounded-2xl bg-black/20 overflow-hidden">
        <img
          src={getImageSrc(images[currentIndex])}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
        
        {/* Remove Button */}
        {onRemove && (
          <button
            onClick={() => handleRemove(currentIndex)}
            className="absolute top-4 right-4 bg-red-500/80 text-white px-2 py-1 rounded-lg hover:bg-red-600/80 transition-colors z-20"
          >
            ×
          </button>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <div
            onClick={prevSlide}
            className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white cursor-pointer p-2 rounded-full"
          >
            <FiChevronLeft size={24} />
          </div>

          {/* Right Arrow */}
          <div
            onClick={nextSlide}
            className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white cursor-pointer p-2 rounded-full"
          >
            <FiChevronRight size={24} />
          </div>
        </>
      )}

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
          {images.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer transition-colors ${
                slideIndex === currentIndex ? 'text-white' : 'text-gray-400'
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
