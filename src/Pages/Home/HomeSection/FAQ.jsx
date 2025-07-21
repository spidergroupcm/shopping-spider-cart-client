import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return window from the date of delivery. Items must be unused, unwashed, and returned with original packaging and tags.",
  },
  {
    question: "How long will it take to receive my order?",
    answer:
      "Standard shipping takes 3–5 business days. Express delivery options are available at checkout for faster service.",
  },
  {
    question: "Do you deliver internationally?",
    answer:
      "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery time may vary based on location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email or SMS. You can track it directly on our website.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or canceled within 12 hours of placement. Please reach out to our support team as soon as possible.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, American Express, bKash, Nagad, Rocket, and Cash on Delivery (COD) for select locations.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-5 px-5 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2">
            
            <h2 className="text-3xl md:text-4xl font-bold text-customPurple">
              Frequently Asked Questions
            </h2>
          
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Everything you need to know about shopping with us. 
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-4 md:py-5 text-left bg-white hover:bg-gray-50 rounded-t-2xl transition"
              >
                <span className="text-lg md:text-xl font-medium text-customPurple">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="text-customPurple w-5 h-5" />
                ) : (
                  <ChevronDown className="text-customPurple w-5 h-5" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden text-gray-600 transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "max-h-[300px] pb-5 pt-2" : "max-h-0"
                }`}
              >
                <p className="text-sm md:text-base">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
