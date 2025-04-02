
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StreetStyleCollection = () => {
  const streetwearImages = [
    '/lovable-uploads/339a264f-8ffa-4e20-bbd6-35293dfba715.png',
    '/lovable-uploads/9fe057af-cffc-4f1e-a6d2-30c502980b08.png'
  ];

  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Brewery x Street Style
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Inspired by the raw energy of urban life and collaborative spirit, our latest collection blends streetwear aesthetics with unfiltered authenticity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {streetwearImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group overflow-hidden rounded-xl"
            >
              <img 
                src={image} 
                alt={`Streetwear Style ${index + 1}`} 
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/collections/brewery" 
            className="inline-block px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StreetStyleCollection;
