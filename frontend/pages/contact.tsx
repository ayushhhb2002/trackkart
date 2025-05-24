import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Have questions or need assistance? Feel free to reach out to us using the form below.
        </p>

        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 text-gray-800 ">
          <form>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="blockfont-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;