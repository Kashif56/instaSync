import React from 'react';
import { Link } from 'react-router-dom';
import { HiChevronRight, HiHome } from 'react-icons/hi';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-400">
        <li>
          <Link
            to="/"
            className="flex items-center hover:text-purple-400 transition-colors"
            aria-label="Home"
          >
            <HiHome className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex items-center">
              <HiChevronRight className="w-4 h-4" aria-hidden="true" />
            </li>
            <li>
              {index === items.length - 1 ? (
                <span className="text-purple-400" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-purple-400 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
