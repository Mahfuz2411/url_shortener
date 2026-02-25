import { Link } from "react-router-dom";
import { FiLink, FiBarChart2, FiZap } from "react-icons/fi";

const faqData = [
  {
    question: "How do I create a short URL?",
    answer: "Go to the 'Create URL' page in your dashboard, paste your long URL, and the system will generate a short link automatically.",
  },
  {
    question: "What is the difference between Free and Premium?",
    answer: "Free users can create up to 100 URLs, with basic analytics. Premium users get advanced analytics, IP/country tracking, click timestamps, and unlimited URLs.",
  },
  {
    question: "Can I share my short URLs?",
    answer: "Yes! You can copy them using the 'Copy' button or use the redirect button to share instantly.",
  },
  {
    question: "How do I upgrade to Premium?",
    answer: "Premium upgrade is coming soon! Stay tuned for announcements on your dashboard.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-125 bg-primary text-primary-content">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to QuickShort</h1>
            <p className="text-xl mb-8">
              Shorten your URLs instantly, track clicks, and manage all your links in one powerful dashboard.
            </p>
            <Link to="/dashboard/create" className="btn btn-secondary btn-lg">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-base-content">Why Choose QuickShort?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <FiZap className="text-primary" size={48} />
              <h3 className="card-title">Lightning Fast</h3>
              <p>Create short URLs in milliseconds. No waiting, no hassle.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <FiBarChart2 className="text-primary" size={48} />
              <h3 className="card-title">Powerful Analytics</h3>
              <p>Track clicks, monitor performance, and gain valuable insights.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <FiLink className="text-primary" size={48} />
              <h3 className="card-title">Easy Management</h3>
              <p>Organize and manage all your links in one beautiful dashboard.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-base-content">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-100 shadow">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl mb-4">Ready to get started?</h2>
            <p className="mb-6">Join thousands of users who trust QuickShort for their link management needs.</p>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Start Now - It's Free!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
