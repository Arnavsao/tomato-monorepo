import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    {/* Hero Section */}
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">About Tomato</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          Connecting Bengaluru with the best local restaurants
        </p>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-6xl mx-auto px-3 py-12 md:py-16 md:px-6">
      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            At Tomato, we&apos;re passionate about bringing the diverse culinary landscape of Bengaluru right to your doorstep. From traditional South Indian delicacies to modern fusion cuisine, we connect you with the city&apos;s finest restaurants and food establishments.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our mission is to make food delivery in Bengaluru seamless, reliable, and delightful. We&apos;re not just delivering food; we&apos;re delivering the authentic flavors of the Garden City.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl px-3 py-6 md:px-8 md:py-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🍕</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Bengaluru Focused</h3>
            <p className="text-gray-600">Currently serving select areas in Bengaluru</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">What Drives Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg px-3 py-6 md:px-8 md:py-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Local Focus</h3>
            <p className="text-gray-600">
              We focus on Bengaluru&apos;s unique food culture, supporting local restaurants and bringing authentic flavors to your table.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg px-3 py-6 md:px-8 md:py-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Community</h3>
            <p className="text-gray-600">
              Building strong relationships with Bengaluru&apos;s restaurant community and supporting local businesses.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg px-3 py-6 md:px-8 md:py-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quality</h3>
            <p className="text-gray-600">
              Maintaining high standards of food quality, safety, and customer satisfaction in everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-white rounded-2xl shadow-xl md:px-12 py-12 px-3 mb-20">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">The Beginning</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Born in Bengaluru, Tomato started as a personal project with a simple goal: to create a seamless food delivery experience for the city&apos;s diverse population. What began as a local initiative has grown into a platform that celebrates Bengaluru&apos;s rich culinary heritage.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our journey is driven by the belief that everyone in Bengaluru deserves access to great food, delivered with care and speed.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Today & Beyond</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Today, Tomato connects Bengaluru residents with carefully selected local restaurants, offering everything from traditional dosas to modern continental cuisine. Our technology ensures seamless ordering, real-time tracking, and reliable delivery across the city.
            </p>
            <p className="text-gray-600 leading-relaxed">
              As we grow, our commitment to quality, community, and customer satisfaction remains at the heart of everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white py-12 px-3 md:px-12 md:py-16 mb-12 shadow-xl shadow-orange-500/20 md:shadow-none md:rounded-3xl md:mb-20 ">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Bengaluru&apos;s Flavors?</h2>
        <p className="text-xl opacity-90 mb-8">
          Join the growing community of Bengaluru residents who trust Tomato for their food delivery needs.
        </p>
        <button onClick={() => navigate('/')} className="bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          Start Ordering Now
        </button>
      </div>
    </div>
  </div>
  );
};

export default AboutUs;