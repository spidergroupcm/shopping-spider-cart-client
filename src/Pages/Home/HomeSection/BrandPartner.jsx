import { SiAdidas, SiNike, SiPuma, SiReebok, SiUnderarmour } from "react-icons/si";
import { CgChanel } from "react-icons/cg";
import Marquee from "react-fast-marquee";

const BrandPartner = () => {
  const brands = [
    {
      name: "Puma",
      icon: <SiPuma className="text-4xl text-customPurple group-hover:text-pink-500 transition-colors duration-300" />,
    },
    {
      name: "Adidas",
      icon: <SiAdidas className="text-4xl text-customPurple group-hover:text-blue-500 transition-colors duration-300" />,
    },
    {
      name: "Nike",
      icon: <SiNike className="text-4xl text-customPurple group-hover:text-orange-500 transition-colors duration-300" />,
    },
    {
      name: "Reebok",
      icon: <SiReebok className="text-4xl text-customPurple group-hover:text-red-500 transition-colors duration-300" />,
    },
    {
      name: "Under Armour",
      icon: <SiUnderarmour className="text-4xl text-customPurple group-hover:text-violet-600 transition-colors duration-300" />,
    },
    {
      name: "Chanel",
      icon: <CgChanel className="text-4xl text-customPurple group-hover:text-black transition-colors duration-300" />,
    },
  ];

  return (
    <section className="pb-24 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">

       {/* Section Title */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-2 mt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-customPurple">
             Our Trusted Brand Partners
            </h2>
          </div>
          <p className="text-gray-500 max-w-xl mx-auto">
             Partnered with top fashion brands to bring you quality style.
          </p>
        </div>


        <div className="bg-white/70 py-10 rounded-3xl shadow-xl border border-customPurple/10">
          <Marquee speed={50} gradient={false} pauseOnHover={true} autoFill={true}>
            {brands.map((brand, index) => (
              <div
                key={index}
                className="mx-10 flex flex-col items-center justify-center group transition-transform duration-300 hover:scale-110"
              >
                <div className="p-5 bg-white rounded-full shadow-lg ring-2 ring-customPurple/10 group-hover:ring-customPurple/30 transition-all duration-300">
                  {brand.icon}
                </div>
                <h4 className="mt-3 text-base md:text-lg font-medium text-customPurple group-hover:text-black transition-colors duration-300">
                  {brand.name}
                </h4>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default BrandPartner;