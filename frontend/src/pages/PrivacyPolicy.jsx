const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    {/* Hero Section */}
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          Your privacy is our priority. Learn how we protect your information.
        </p>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Introduction */}
      <div className="bg-white rounded-2xl shadow-xl p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Privacy Matters</h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          At Tomato, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our food ordering service.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          We believe in transparency and want you to understand exactly how your information is handled. This policy outlines our practices and your rights regarding your personal data.
        </p>
      </div>

      {/* Key Points */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🔒</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Data Security</h3>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📋</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Information Collection</h3>
              <p className="text-gray-600 leading-relaxed">
                We collect only the information necessary to provide our services, including contact details, delivery addresses, and order history.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎯</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">How We Use Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Your information is used solely to process orders, improve our services, and provide customer support. We do not sell your personal data.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🤝</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Third-Party Sharing</h3>
              <p className="text-gray-600 leading-relaxed">
                We may share information with delivery partners and restaurants only as necessary to fulfill your orders. We do not share data with third parties for marketing purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="bg-white rounded-2xl shadow-xl p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">What Information We Collect</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Personal Information</h3>
            <p className="text-gray-600">
              Name, email address, phone number, and delivery address to process your orders and provide customer support.
            </p>
          </div>
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Order Information</h3>
            <p className="text-gray-600">
              Order history, preferences, and feedback to improve our services and provide personalized recommendations.
            </p>
          </div>
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Technical Data</h3>
            <p className="text-gray-600">
              Device information, IP address, and usage analytics to enhance app performance and user experience.
            </p>
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div className="bg-white rounded-2xl shadow-xl p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Rights</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Access & Control</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Access your personal data
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Update or correct your information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Request deletion of your data
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Communication</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Opt-out of marketing communications
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Control notification preferences
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Report privacy concerns
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
        <p className="text-xl opacity-90 mb-8">
          If you have any questions about this Privacy Policy or how we handle your data, please contact our privacy team.
        </p>
        <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          Contact Privacy Team
        </button>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy; 