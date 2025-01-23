import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  // Create breadcrumb items with proper formatting
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    
    // If it's a post ID, format it differently
    const formattedLabel = !isNaN(segment) ? `Post #${segment}` : label;

    return {
      label: formattedLabel,
      url,
      isLast: index === pathSegments.length - 1
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link 
        to="/"
        className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
      >
        Home
      </Link>
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.url}>
          <AiOutlineRight className="w-3 h-3 text-gray-500" />
          {item.isLast ? (
            <span className="text-purple-400 font-medium">
              {item.label}
            </span>
          ) : (
            <Link
              to={item.url}
              className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
