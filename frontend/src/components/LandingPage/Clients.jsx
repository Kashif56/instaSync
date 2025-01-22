import React from 'react';
import { motion } from 'framer-motion';

const Clients = () => {
  const clients = [
    { 
      name: 'Google',
      logo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg'
    },
    { 
      name: 'Microsoft',
      logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg'
    },
    { 
      name: 'Amazon',
      logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg'
    },
    { 
      name: 'Meta',
      logo: 'https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg'
    },
    { 
      name: 'Apple',
      logo: 'https://www.vectorlogo.zone/logos/apple/apple-icon.svg'
    },
    { 
      name: 'Netflix',
      logo: 'https://www.vectorlogo.zone/logos/netflix/netflix-icon.svg'
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-5">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="clients-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 .5H32M.5 0V32" fill="none" stroke="white" strokeOpacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#clients-grid)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl font-montserrat">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-xl text-gray-300 font-poppins">
            Join thousands of businesses that trust InstaSync for their social media management
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center p-6 bg-gray-800 rounded-xl"
            >
              <div className="relative w-full aspect-[3/2] flex items-center justify-center">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300 filter invert"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
