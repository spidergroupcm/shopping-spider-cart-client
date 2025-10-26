import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineAddIcCall, MdOutlineMailOutline } from "react-icons/md";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
 import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_3o5cagi", "template_h79h5no", e.target, "RKMOWusxZveXSTvdP")
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Thank you for reaching out. We'll get back to you soon!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({
          firstName: "",
          lastName: "",
          subject: "",
          message: "",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="bg-white py-20">
      
                  <Helmet>
                  <title>Contact | Shopping Spider</title>
                   </Helmet>
      <div className="w-11/12 lg:w-9/12 mx-auto grid md:grid-cols-1 gap-10">
        

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-customPurple/5 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-customPurple mb-6">
              Contact Information
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-start gap-4">
                <div className="bg-customPurple/10 p-3 rounded-full">
                  <IoLocation className="text-customPurple w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Our Address:</h4>
                  <p>Banani, Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-customPurple/10 p-3 rounded-full">
                  <MdOutlineAddIcCall className="text-customPurple w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Call Us:</h4>
                  <p>+88 01789711089</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-customPurple/10 p-3 rounded-full">
                  <MdOutlineMailOutline className="text-customPurple w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Email Us:</h4>
                  <p>spidergroupcm@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-customPurple/10 p-3 rounded-full">
                  <FaRegClock className="text-customPurple w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Opening Hours:</h4>
                  <p>Mon–Fri: 8am–11pm<br />Sat–Sun: 8am–12pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-customPurple/5 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-customPurple mb-6">Get In Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customPurple px-4 py-2 rounded w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customPurple px-4 py-2 rounded w-full"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customPurple px-4 py-2 rounded w-full mt-4"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customPurple px-4 py-2 rounded w-full mt-4 h-32"
              ></textarea>
              <button
                type="submit"
                className="bg-customPurple hover:bg-purple-700 text-white font-semibold w-full py-2 mt-4 rounded transition"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full h-[400px] rounded-xl overflow-hidden border-2 border-customPurple shadow-md">
          <iframe
            title="Google Map - Banani Dhaka"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8677639234086!2d90.40524457484863!3d23.75090308867708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7e6bffba1c5%3A0xeca38b88eb96c4f6!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1721047077223!5m2!1sen!2sbd"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;