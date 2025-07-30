const TermsAndConditions = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    {/* Hero Section */}
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          Understanding our service agreement and your rights
        </p>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Introduction */}
      <div className="bg-white rounded-2xl shadow-xl p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Tomato</h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          By using our food ordering service, you agree to these terms and conditions. These terms govern your use of our platform and outline the rights and responsibilities of both you and Tomato.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Please read these terms carefully before placing your first order. Your continued use of our service constitutes acceptance of these terms.
        </p>
      </div>

      {/* Key Terms */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📱</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Service Usage</h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform connects you with local restaurants for food delivery. You must provide accurate information and comply with all applicable laws.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💳</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Payment Terms</h3>
              <p className="text-gray-600 leading-relaxed">
                All payments are processed securely. Prices are subject to change, and delivery fees apply. Orders are confirmed upon successful payment.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🚫</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Order Cancellation</h3>
              <p className="text-gray-600 leading-relaxed">
                Orders cannot be cancelled once preparation has started. Please review your order carefully before confirming to avoid any issues.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🛡️</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Account Security</h3>
              <p className="text-gray-600 leading-relaxed">
                You are responsible for maintaining the security of your account. Do not share your login credentials with others.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Terms */}
      <div className="bg-white rounded-2xl shadow-xl p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Service Agreement</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Order Processing</h3>
            <p className="text-gray-600">
              Orders are processed on a first-come, first-served basis. Delivery times are estimates and may vary based on restaurant preparation time and traffic conditions.
            </p>
          </div>
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Assurance</h3>
            <p className="text-gray-600">
              While we strive to ensure food quality, we are not responsible for the preparation or ingredients used by restaurants. Food allergies and dietary restrictions should be communicated directly to restaurants.
            </p>
          </div>
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Liability Limitations</h3>
            <p className="text-gray-600">
              Tomato acts as an intermediary between customers and restaurants. We are not liable for food quality issues, which should be addressed directly with the restaurant or our support team.
            </p>
          </div>
        </div>
      </div>

      {/* User Responsibilities */}
      <div className="bg-white rounded-2xl shadow-xl p-12 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Responsibilities</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Account Management</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Provide accurate personal information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Keep account credentials secure
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Update contact information as needed
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Conduct</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Review orders before confirmation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Be available for delivery
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Treat delivery partners respectfully
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Questions About Our Terms?</h2>
        <p className="text-xl opacity-90 mb-8">
          If you have any questions about these terms and conditions or need clarification on any point, please contact our support team.
        </p>
        <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  </div>
);

export default TermsAndConditions; 