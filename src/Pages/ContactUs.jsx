import React, { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
const ContactForm = () => {
  const service_id = import.meta.env.VITE_SERVICE_ID;
  const template_id = import.meta.env.VITE_TEMPLATE_ID;
  const public_key = import.meta.env.VITE_PUBLIC_KEY;

  const [params, setParams] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(service_id, template_id, form.current, public_key).then(
      (result) => {
        console.log("Message sent:", result.text);
        alert("Message sent successfully!");
        setParams({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      },
      (error) => {
        console.log("Error:", error);
        alert("Failed to send message.");
      }
    );
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
                sanketnchaware@gmail.com
              </p>
            </div>
          </div>

          <div className="bg-black text-white rounded-lg shadow-sameshadow">
            <div className="p-6 flex flex-col items-center text-center">
              <Phone className="w-8 h-8 mb-4" />
              <p className=" title4 font-semibold mb-2">Call Us</p>
              <p title4 className="text-gray-300">
                +91 8378910529
              </p>
            </div>
          </div>

          <div className="bg-black text-white rounded-lg shadow-sameshadow">
            <div className="p-6 flex flex-col items-center text-center">
              <MapPin className="w-8 h-8 mb-4" />
              <p className=" title4 font-semibold mb-2">Visit Us</p>
              <p title4 className="text-gray-300">
                Samarth Nagar, Near Tahasil Office, Risod, Maharashtra, India.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sameshadow">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Send us a Message
            </h2>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={params.name}
                    onChange={handleChange}
                    className="w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
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
                    value={params.email}
                    onChange={handleChange}
                    className="w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
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
                  value={params.subject}
                  onChange={handleChange}
                  className="w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={params.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
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
