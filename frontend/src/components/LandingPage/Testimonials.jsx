import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Social Media Manager",
      company: "TechStart Inc.",
      quote: "InstaSync has revolutionized how we manage our Instagram content. The AI-powered scheduling is a game-changer!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4m0LR1PzIGKTjI8KTjwBoE4gCNenxT8r1tw&s"
    },
    {
      name: "Michael Chen",
      role: "Digital Marketing Director",
      company: "Growth Labs",
      quote: "The analytics dashboard provides insights that have helped us increase our engagement by 150%. Absolutely worth it!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4m0LR1PzIGKTjI8KTjwBoE4gCNenxT8r1tw&s"
    },
    {
      name: "Emma Williams",
      role: "Content Creator",
      company: "Creative Studio",
      quote: "I love how easy it is to plan and schedule content. The calendar view makes content planning a breeze.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4m0LR1PzIGKTjI8KTjwBoE4gCNenxT8r1tw&s"
    }
  ];

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-5">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="testimonials-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 .5H32M.5 0V32" fill="none" stroke="white" strokeOpacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonials-grid)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl font-montserrat">
            What Our Users Say
          </h2>
          <p className="mt-4 text-xl text-gray-300 font-poppins">
            Hear from our satisfied customers who have transformed their Instagram presence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative p-8 bg-gray-800/50 rounded-2xl backdrop-blur-sm"
            >
              {/* Quote Icon */}
              <svg
                className="absolute top-6 right-6 w-8 h-8 text-indigo-500/20"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              {/* Content */}
              <div className="relative">
                <p className="text-lg text-gray-300 mb-6 font-poppins">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white font-montserrat">{testimonial.name}</h4>
                    <p className="text-gray-400 font-poppins">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-b-2xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
