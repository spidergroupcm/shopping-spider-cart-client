import React from "react";
import { Helmet } from "react-helmet-async";
const blogs = [
  {
    id: 1,
    image: "https://i.ibb.co/XZZbN6Ns/New-Project-1.jpg",
    title: "The Latest Streetwear Trends in 2025",
    description:
      "Explore the top styles that are dominating the fashion streets this year. From oversized silhouettes to bold prints...",
  },
  {
    id: 2,
    image: "https://i.ibb.co/Tqk43F5f/New-Project-2.jpg",
    title: "How to Style Bold Colors with Confidence",
    description:
      "Discover tips to mix vibrant colors into your daily outfits without losing balance. A guide for every fashion-forward mind.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/fzP3mvkW/New-Project-3.jpg",
    title: "Eco-Friendly Fashion: What You Should Know",
    description:
      "Learn how sustainable clothing is reshaping the fashion industry and what brands to look out for in 2025.",
  },
  {
    id: 4,
    image: "https://i.ibb.co/SwvhkQ5s/New-Project-4.jpg",
    title: "Top Accessories That Elevate Any Outfit",
    description:
      "Accessories can make or break your look. We break down must-have pieces that bring out the best in your style.",
  },
];

const Blog = () => {
  return (
    <section className="px-4 py-16 bg-gradient-to-b from-white to-purple-50" id="blog">
     
            <Helmet>
            <title>Blog | Shopping Spider</title>
             </Helmet>
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 text-black relative inline-block">
        <span className="relative z-10 text-customPurple">From Our Fashion Blog</span>
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-16 h-1 bg-customPurple rounded-full"></span>
      </h2>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="relative bg-white rounded-2xl border border-customPurple/30 p-6 pt-20 hover:shadow-2xl transition duration-300 group"
          >
            {/* Small round image */}
            <div className="absolute -top-6 left-6 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text content */}
            <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-customPurple transition">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              {blog.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;