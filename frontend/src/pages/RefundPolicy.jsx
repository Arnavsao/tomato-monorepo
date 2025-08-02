const RefundPolicy = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    {/* Hero Section */}
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Refund & Cancellation Policy</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          Clear and fair policies for your peace of mind
        </p>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-4xl mx-auto md:px-6 py-16 px-2">
      {/* Overview */}
      <div className="bg-white rounded-2xl shadow-xl md:px-12 py-12 px-3 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Commitment to You</h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          At Tomato, we strive to provide the best possible service and ensure your complete satisfaction with every order. We understand that sometimes things don&apos;t go as planned, and we&apos;re here to help when they don&apos;t.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          This policy outlines our refund and cancellation procedures to ensure transparency and fairness for all our customers.
        </p>
      </div>

      {/* Key Points */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">⏰</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cancellation Window</h3>
              <p className="text-gray-600 leading-relaxed">
                Orders can only be cancelled before the restaurant begins preparing your food. Once preparation starts, cancellations are not possible.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Refund Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Refunds are processed within 3-5 business days and will be credited back to your original payment method.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📞</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Contact our support team immediately if you encounter any issues with your order for prompt assistance.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">✅</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Customer Satisfaction</h3>
              <p className="text-gray-600 leading-relaxed">
                We prioritize your satisfaction and will work to resolve any issues promptly and fairly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="bg-white rounded-2xl shadow-xl md:px-12 py-12 px-3 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Cancellation Policy</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">✅ Can Cancel</h3>
            <p className="text-gray-600">
              Orders that haven&apos;t started preparation yet can be cancelled immediately through the app or by contacting support.
            </p>
          </div>
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">❌ Cannot Cancel</h3>
            <p className="text-gray-600">
              Once the restaurant begins preparing your food, orders cannot be cancelled to prevent food waste and ensure fair treatment of our restaurant partners.
            </p>
          </div>
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">⚠️ Special Cases</h3>
            <p className="text-gray-600">
              In case of technical issues, delivery delays, or quality concerns, we may offer cancellations or refunds at our discretion.
            </p>
          </div>
        </div>
      </div>

      {/* Refund Scenarios */}
      <div className="bg-white rounded-2xl shadow-xl md:px-12 py-12 px-3 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">When Refunds Are Available</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Full Refunds</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                Cancelled orders before preparation starts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                Technical issues preventing order completion
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                Restaurant unable to fulfill the order
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Partial Refunds</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Missing items from your order
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Quality issues with specific items
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                Significant delivery delays
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white py-12 px-3 md:px-12 md:py-16 mb-12 shadow-xl shadow-orange-500/20 md:shadow-none md:rounded-3xl md:mb-20 ">
        <h2 className="text-3xl font-bold mb-4">Need Help with Your Order?</h2>
        <p className="text-xl opacity-90 mb-8">
          If you have any issues with your order or need to request a refund, please contact our support team immediately. We&apos;re here to help ensure your satisfaction.
        </p>
        <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  </div>
);

export default RefundPolicy; 