import React, { useContext } from "react";
import { ScrollText, Users, BookOpen, Share2 } from "lucide-react";
import CommonButton from "../Components/Common/CommonButton";
import { Link } from "react-router-dom";
import UserContext from "../Context/userContext";

const AboutUs = () => {
  const {
    auth: { user, isAuthenticated },
  } = useContext(UserContext);

  return (
    <div className="min-h-screen mt-16 bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Share Your Story With The World
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Every memory deserves to be shared, every story deserves to be told.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-black">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that everyone has a story worth sharing. Our platform
            provides a safe and supportive space where writers can transform
            their memories into lasting legacies, connecting with readers from
            around the globe. Whether you're sharing a life-changing moment or a
            simple day that touched your heart, your story matters.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Cards */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <ScrollText className="h-12 w-12 text-black" />
                <h3 className="text-xl font-semibold text-black">
                  Write Freely
                </h3>
                <p className="text-gray-600">
                  Express yourself without boundaries in our intuitive writing
                  environment.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <Users className="h-12 w-12 text-black" />
                <h3 className="text-xl font-semibold text-black">Connect</h3>
                <p className="text-gray-600">
                  Join a community of passionate storytellers and engaged
                  readers.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <BookOpen className="h-12 w-12 text-black" />
                <h3 className="text-xl font-semibold text-black">Discover</h3>
                <p className="text-gray-600">
                  Explore stories from different perspectives and cultures.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <Share2 className="h-12 w-12 text-black" />
                <h3 className="text-xl font-semibold text-black">Share</h3>
                <p className="text-gray-600">
                  Share your stories easily across various platforms and
                  networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg">
            <h4 className="text-4xl font-bold text-black">50K+</h4>
            <p className="text-gray-600 mt-2">Stories Shared</p>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <h4 className="text-4xl font-bold text-black">100K+</h4>
            <p className="text-gray-600 mt-2">Active Writers</p>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <h4 className="text-4xl font-bold text-black">1M+</h4>
            <p className="text-gray-600 mt-2">Monthly Readers</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Sharing Your Story Today
          </h2>
          <p className="text-lg mb-8">
            Join our community and let your voice be heard.
          </p>
          {!isAuthenticated ? (
            <Link to="/signup">
              <CommonButton styles="w-fit invert" size="sm">
                Sign up Now
              </CommonButton>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
