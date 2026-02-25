const About = () => {
  return (
    <div className="space-y-12">

      {/* Banner / Hero Section */}
      <section className="bg-blue-500 text-white py-20 px-6 text-center rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About QuickShort</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          QuickShort is a fast, reliable, and easy-to-use URL shortening service. We help you manage and share your links efficiently while providing insightful analytics.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-gray-700 text-center text-lg md:text-xl">
          Our mission is to simplify link management and give users powerful analytics to make data-driven decisions. We aim to save your time and help you track your online presence effortlessly.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-gray-700">
              Create short links instantly and access them anywhere with a fast and secure system.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-700">
              Track clicks, see top-performing URLs, and get insights on user activity and geography.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
            <p className="text-gray-700">
              Our dashboard is intuitive, responsive, and easy to navigate for both free and premium users.
            </p>
          </div>
        </div>
      </section>

      {/* Team / Closing Section */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-20">
        <h2 className="text-3xl font-bold mb-6">Our Team</h2>
        <p className="text-gray-700 text-lg md:text-xl">
          We are a passionate team of developers and designers dedicated to building tools that make the web easier to use. Stay tuned for more features and improvements!
        </p>
      </section>

    </div>
  );
};

export default About;
