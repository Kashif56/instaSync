import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const TagInput = ({ value, onChange }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Convert comma-separated string to tags array on initial load and when value changes
  useEffect(() => {
    if (value) {
      const tagArray = value.split(',').map(tag => tag.trim()).filter(tag => tag);
      setTags(tagArray);
    } else {
      setTags([]);
    }
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    // If user types or pastes with commas, create tags
    if (val.includes(',')) {
      const newTags = val
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
      
      // Add new tags and clear input
      const updatedTags = [...tags, ...newTags];
      setTags(updatedTags);
      setInputValue('');
      
      // Notify parent component
      onChange(updatedTags.join(','));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue('');
      onChange(newTags.join(','));
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag when backspace is pressed and input is empty
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      onChange(newTags.join(','));
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onChange(newTags.join(','));
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-black/30 border border-gray-700 rounded-lg min-h-[42px]">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center gap-1 px-3 py-1 bg-purple-500/30 text-purple-300 rounded-full text-sm border border-purple-500/50 group"
        >
          #{tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <AiOutlineClose className="w-3 h-3" />
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? "Add tags separated by comma" : ""}
        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder-gray-400"
      />
    </div>
  );
};

export default TagInput;
