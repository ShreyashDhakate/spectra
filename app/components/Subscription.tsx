import React from "react";

const Subscription: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Basic</h2>
            <p className="text-gray-400 mb-6">Perfect for casual viewers.</p>
            <p className="text-xl font-bold mb-6">$5/month</p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>Access to 100+ movies</li>
              <li>Standard quality</li>
              <li>Watch on 1 device</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold">Subscribe</button>
          </div>

          {/* Standard Plan */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Standard</h2>
            <p className="text-gray-400 mb-6">Ideal for movie enthusiasts.</p>
            <p className="text-xl font-bold mb-6">$10/month</p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>Access to 500+ movies</li>
              <li>HD quality</li>
              <li>Watch on 2 devices</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold">Subscribe</button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Premium</h2>
            <p className="text-gray-400 mb-6">For the ultimate experience.</p>
            <p className="text-xl font-bold mb-6">$20/month</p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>Unlimited movies</li>
              <li>Ultra HD quality</li>
              <li>Watch on 4 devices</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
