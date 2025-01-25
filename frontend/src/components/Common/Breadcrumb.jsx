import React from 'react';
import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <HiChevronRight className="flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
            )}
            <Link
              to={item.href}
              className={`ml-2 text-sm font-medium ${
                index === items.length - 1
                  ? 'text-purple-400 cursor-default'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
