import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      title: "AI-Powered Post Scheduling",
      description: "Our intelligent algorithm analyzes your audience's behavior to determine the perfect posting times for maximum engagement.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      image: "https://cdn.dribbble.com/userupload/16359713/file/original-d86dfa2f7fb1370d152ee83cb30eb034.jpg",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Smart Analytics Dashboard",
      description: "Get deep insights into your content performance with our comprehensive analytics suite. Track engagement, growth, and audience behavior.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      image: "https://cdn.dribbble.com/userupload/15141810/file/original-06f5407ad8dc1322b114e4a9223b8503.jpg",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Content Calendar & Planner",
      description: "Plan and organize your content strategy with our intuitive drag-and-drop calendar. Schedule posts weeks in advance with ease.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      image: "https://cdn.dribbble.com/userupload/15141810/file/original-06f5407ad8dc1322b114e4a9223b8503.jpg",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-5">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="features-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 .5H32M.5 0V32" fill="none" stroke="white" strokeOpacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#features-grid)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl font-montserrat">
            Powerful Features for Growth
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
            Everything you need to manage your Instagram presence effectively
          </p>
        </motion.div>

        <div className="mt-16 space-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 p-8 rounded-2xl bg-gray-800/50`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className={`inline-flex items-center justify-center p-3 bg-gradient-to-r ${feature.color} rounded-lg shadow-lg mb-6`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl mb-4 font-montserrat">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-300 font-poppins">
                  {feature.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r ${feature.color} hover:opacity-90 transition-opacity duration-300 shadow-lg`}
                >
                  Learn More
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Image */}
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-gray-900/20 z-10"></div>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/0 to-gray-900/0 group-hover:from-gray-900/40 group-hover:to-gray-900/40 transition-all duration-300"></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
