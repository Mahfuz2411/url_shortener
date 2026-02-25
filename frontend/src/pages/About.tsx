import { FiTarget } from "react-icons/fi";
// import { FiUsers, FiAward } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-100 bg-primary text-primary-content">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">About QuickShort</h1>
            <p className="text-xl">
              QuickShort is a fast, reliable, and easy-to-use URL shortening service. We help you manage and share your links efficiently while providing insightful analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <FiTarget className="text-primary mb-4" size={64} />
            <h2 className="card-title text-3xl mb-4">Our Mission</h2>
            <p className="text-base-content/70 text-lg max-w-2xl">
              Our mission is to simplify link management and give users powerful analytics to make data-driven decisions. We aim to save your time and help you track your online presence effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-base-content">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <h3 className="card-title">⚡ Fast & Reliable</h3>
              <p className="text-base-content/70">
                Create short links instantly and access them anywhere with a fast and secure system.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <h3 className="card-title">📊 Analytics</h3>
              <p className="text-base-content/70">
                Track clicks, see top-performing URLs, and get insights on user activity and geography.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
            <div className="card-body">
              <h3 className="card-title">🎯 User Friendly</h3>
              <p className="text-base-content/70">
                Our dashboard is intuitive, responsive, and easy to navigate for both free and premium users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Commented out for now, will use real data later */}
      {/* <div className="container mx-auto px-6 py-16">
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FiUsers size={32} />
            </div>
            <div className="stat-title">Active Users</div>
            <div className="stat-value text-primary">1,000+</div>
            <div className="stat-desc">Growing every day</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FiTarget size={32} />
            </div>
            <div className="stat-title">URLs Shortened</div>
            <div className="stat-value text-secondary">10K+</div>
            <div className="stat-desc">And counting</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-accent">
              <FiAward size={32} />
            </div>
            <div className="stat-title">Uptime</div>
            <div className="stat-value">99.9%</div>
            <div className="stat-desc">Reliable service</div>
          </div>
        </div>
      </div> */}

      {/* Team Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl mb-4">Our Team</h2>
            <p className="text-base-content/70 text-lg max-w-2xl">
              We are a passionate team of developers and designers dedicated to building tools that make the web easier to use. Stay tuned for more features and improvements!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
