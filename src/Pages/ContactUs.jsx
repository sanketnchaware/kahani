import React, { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    ("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-16 bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Have a story to tell? Questions about our platform? We'd love to hear
          from you. Reach out to us and become part of our growing community of
          storytellers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-black text-white rounded-lg shadow-sameshadow">
            <div className="p-6 flex flex-col items-center text-center">
              <Mail className="w-8 h-8 mb-4" />
              <p className=" title4 font-semibold mb-2">Email Us</p>
              <p title4 className="text-gray-300">
                stories@example.com
              </p>
            </div>
          </div>

          <div className="bg-black text-white rounded-lg shadow-sameshadow">
            <div className="p-6 flex flex-col items-center text-center">
              <Phone className="w-8 h-8 mb-4" />
              <p className=" title4 font-semibold mb-2">Call Us</p>
              <p title4 className="text-gray-300">
                +1 (555) 123-4567
              </p>
            </div>
          </div>

          <div className="bg-black text-white rounded-lg shadow-sameshadow">
            <div className="p-6 flex flex-col items-center text-center">
              <MapPin className="w-8 h-8 mb-4" />
              <p className=" title4 font-semibold mb-2">Visit Us</p>
              <p title4 className="text-gray-300">
                123 Story Street, Writer's Block, NY 10001
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sameshadow">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
