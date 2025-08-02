const Delivery = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    {/* Hero Section */}
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Fast & Reliable Delivery</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          From Bengaluru&apos;s kitchens to your doorstep in minutes
        </p>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-6xl mx-auto md:px-6 py-16 px-3">
      {/* Delivery Stats */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">30-45 min</h3>
          <p className="text-gray-600">Average Delivery Time</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🌍</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Bengaluru</h3>
          <p className="text-gray-600">Currently Serving</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🚚</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Local Partners</h3>
          <p className="text-gray-600">Delivery Partners</p>
        </div>
      </div>

      {/* Delivery Features */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Why Choose Our Delivery?</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Bengaluru Coverage</h3>
                <p className="text-gray-600 leading-relaxed">
                  We currently serve major areas in Bengaluru including Koramangala, Indiranagar, Whitefield, and surrounding regions. Check your address during checkout to confirm delivery availability.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⏰</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Standard delivery times range from 30-45 minutes, depending on your location and restaurant preparation time. During peak hours, delivery may take up to 60 minutes.
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
                <h3 className="text-xl font-bold text-gray-800 mb-3">Transparent Pricing</h3>
                <p className="text-gray-600 leading-relaxed">
                  A delivery fee of ₹40 is applied to all orders to support our delivery partners and maintain service quality. This fee is clearly displayed during checkout.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg px-4 py-8 md:px-8 md:py-12">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track your order in real-time through our app or website. You will receive updates on your order status, from preparation to delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Process */}
      <div className="bg-white rounded-2xl shadow-xl md:px-12 py-12 px-3 mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Place Order</h3>
            <p className="text-gray-600 text-sm">
              Browse Bengaluru restaurants and select your favorite dishes
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Kitchen Prepares</h3>
            <p className="text-gray-600 text-sm">
              Restaurant starts preparing your fresh meal
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Partner Picks Up</h3>
            <p className="text-gray-600 text-sm">
              Our delivery partner collects your order
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              4
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delivered Fresh</h3>
            <p className="text-gray-600 text-sm">
              Hot and fresh food delivered to your door
            </p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white py-12 px-3 md:px-12 md:py-16 mb-12 shadow-xl shadow-orange-500/20 md:shadow-none md:rounded-3xl md:mb-20 ">
        <h2 className="text-3xl font-bold mb-4">Need Help with Delivery?</h2>
        <p className="text-xl opacity-90 mb-8">
          For any delivery-related questions or concerns, please contact our customer support team. We are here to ensure your delivery experience is smooth and satisfying.
        </p>
        <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  </div>
);

export default Delivery; 