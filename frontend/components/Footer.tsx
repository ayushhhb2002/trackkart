import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
              TrackKart is your one-stop shop for all your shopping needs. We
              provide high-quality products at the best prices.
            </p>
          </div>

          <div className="md:ml-20">
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/help" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:underline">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:underline">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="md:ml-20">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/shop" className="hover:underline">
                  Shop
                </a>
              </li>
              <li>
                <a href="/offers" className="hover:underline">
                  Offers
                </a>
              </li>
              <li>
                <a href="/new-arrivals" className="hover:underline">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="md:ml-20">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          <p>
            &copy; {new Date().getFullYear()} TrackKart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
