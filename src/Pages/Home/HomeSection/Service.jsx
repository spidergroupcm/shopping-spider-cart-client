import React from 'react';
import { RotateCcw, RefreshCcw, Headset } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: <RotateCcw className="h-8 w-8 text-customPurple" />,
    title: 'Easy Exchange',
    desc: 'Seamless product exchange process for your convenience.',
  },
  {
    id: 2,
    icon: <RefreshCcw className="h-8 w-8 text-customPurple" />,
    title: '7 Days Return',
    desc: 'Enjoy a stress-free 7-day return policy on all orders.',
  },
  {
    id: 3,
    icon: <Headset className="h-8 w-8 text-customPurple" />,
    title: '24/7 Support',
    desc: 'We’re always here to help — any time, any day.',
  },
];

const Service = () => {
  return (
    <div className="w-11/12 mx-auto pb-24">


        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-2 mt-8">
           
            <h2 className="text-3xl md:text-4xl font-bold text-customPurple">
              Why Shop With Us?
            </h2>
           
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
             Discover the perfect blend of quality in every product we offer.
          </p>
        </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-customPurple/20 shadow-lg hover:shadow-xl transition-all duration-300 text-center p-8 hover:scale-105"
          >
            <div className="flex items-center justify-center mb-5">
              <div className="bg-customPurple/10 p-4 rounded-full">
                {service.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-customPurple mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
