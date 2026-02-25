import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-12">
      {/* Banner / Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to QuickShort</h1>
        <p className="text-lg md:text-xl mb-6">
          Shorten your URLs instantly, track clicks, and manage all your links in one dashboard.
        </p>
        <a
          href="/dashboard/create"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border rounded shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 border-t bg-gray-50">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
