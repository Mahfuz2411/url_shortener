import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { FiCheck, FiX } from "react-icons/fi";

const Pricing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-base-200 py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-base-content">Pricing Plans</h1>
          <p className="text-xl text-base-content/70">Choose the perfect plan for your needs</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-2">Free</h2>
              <p className="text-base-content/60 mb-6">
                Perfect for individuals trying out our URL shortener.
              </p>

              <div className="divider"></div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <FiCheck className="text-success" size={20} />
                  <span>Up to 100 Short URLs</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-success" size={20} />
                  <span>Basic Dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiX className="text-error" size={20} />
                  <span className="text-base-content/50">Click analytics hidden</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiX className="text-error" size={20} />
                  <span className="text-base-content/50">Advanced analytics unavailable</span>
                </li>
              </ul>

              <div className="card-actions">
                {user ? (
                  <Link to="/dashboard/create" className="btn btn-primary w-full">
                    Create URL
                  </Link>
                ) : (
                  <Link to="/login" className="btn btn-outline btn-primary w-full">
                    Login to Use
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="card bg-primary text-primary-content shadow-xl hover:shadow-2xl transition relative">
            <div className="badge badge-secondary absolute top-4 right-4">Coming Soon</div>
            <div className="card-body">
              <h2 className="card-title text-3xl mb-2">Premium</h2>
              <p className="opacity-80 mb-6">
                Advanced analytics, unlimited URLs, and more.
              </p>

              <div className="divider divider-neutral"></div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <FiCheck size={20} />
                  <span>Unlimited Short URLs</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck size={20} />
                  <span>Full Dashboard Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck size={20} />
                  <span>Click analytics (IP, country, time)</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck size={20} />
                  <span>Advanced URL stats & reports</span>
                </li>
              </ul>

              <div className="card-actions">
                <button className="btn btn-disabled w-full">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="alert alert-info shadow-lg max-w-3xl mx-auto mt-12">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">Note</h3>
              <div className="text-sm">
                Free tier requires login to create URLs. Free plan limits URL creation to 100 links. Analytics for free users are not visible. Premium unlocks full analytics including IP, country, click time, and more.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
