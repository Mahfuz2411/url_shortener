import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Pricing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-4xl w-full px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans</h1>

        {/* Cards vertically stacked on small screens, centered */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-8 md:space-y-0 justify-center items-stretch">
          {/* Free Plan */}
          <div className="flex-1 border rounded-xl p-6 flex flex-col justify-between shadow hover:shadow-lg transition">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Free</h2>
              <p className="text-gray-600 mb-6">
                Perfect for individuals trying out our URL shortener.
              </p>

              <ul className="mb-6 space-y-2 text-gray-700">
                <li>✅ Unlimited Short URLs (up to 100)</li>
                <li>✅ Basic Dashboard</li>
                <li>❌ Click analytics hidden</li>
                <li>❌ Advanced analytics (IP, country, time) unavailable</li>
              </ul>
            </div>

            <div>
              {user ? (
                <Link
                  to="/dashboard/create"
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Create URL
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block text-center bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Login to use
                </Link>
              )}
            </div>
          </div>

          {/* Premium Plan */}
          <div className="flex-1 border rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition border-blue-600 relative">
            <div>
              <div className="absolute top-4 right-4 bg-yellow-300 text-yellow-800 font-semibold px-2 py-1 rounded-full text-sm">
                Coming Soon
              </div>
              <h2 className="text-2xl font-semibold mb-4">Premium</h2>
              <p className="text-gray-600 mb-6">
                Advanced analytics, unlimited URLs, and more.
              </p>

              <ul className="mb-6 space-y-2 text-gray-700">
                <li>✅ Unlimited Short URLs</li>
                <li>✅ Full Dashboard</li>
                <li>✅ Click analytics (IP, country, time)</li>
                <li>✅ Advanced URL stats & reports</li>
              </ul>
            </div>

            <div>
              <Link
                to={user ? "/dashboard/create" : "/login"}
                className="block text-center bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
              >
                Coming Soon
              </Link>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-12 text-gray-500 text-center max-w-2xl mx-auto">
          <p>
            Free tier requires login to create URLs. Free plan limits URL creation to 100 links.
            Analytics for free users are not visible.
          </p>
          <p className="mt-2">
            Premium unlocks full analytics including IP, country, click time, and more.
            <strong>Coming Soon!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
