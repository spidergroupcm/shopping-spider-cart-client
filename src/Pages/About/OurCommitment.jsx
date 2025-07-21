import { CheckCircle } from "lucide-react";

const OurCommitment = () => {
  return (
    <div className="w-11/12 mx-auto pb-20 text-white">
      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-customPurple via-purple-700 to-purple-900 rounded-2xl p-8 shadow-lg transition hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center mb-4">Our Mission</h2>
          <p className="text-gray-200 text-base leading-relaxed">
            At <strong>WearHive e-commerce</strong>, our mission is to provide high-quality, stylish, and affordable fashion for everyone. We aim to empower individuals by offering trendy collections that suit every style and occasion.
          </p>
        </div>
        <div className="bg-gradient-to-br from-customPurple via-purple-700 to-purple-900 rounded-2xl p-8 shadow-lg transition hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center mb-4">Our Vision</h2>
          <p className="text-gray-200 text-base leading-relaxed">
            Our vision is to become a globally recognized fashion brand that inspires confidence and individuality. We prioritize sustainability, technology, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-20 text-center">
        <h2 className="text-4xl font-bold text-customPurple mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            "Premium Quality",
            "Affordable Prices",
            "Fast & Secure Delivery",
            "Customer-Centric Approach",
            "Trendy & Versatile Collections",
            "Sustainable Practices",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 shadow-md hover:shadow-lg transition hover:-translate-y-1"
            >
              <CheckCircle className="text-customPurple size-6 shrink-0" strokeWidth={2.5} />
              <p className="text-customPurple text-lg font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurCommitment;

