import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900">
      <nav className="container mx-auto py-4 px-6 flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">
          Newspaper Billing App
        </a>
        <div>
          <a
            href="/"
            className="text-gray-300 hover:text-white ml-4 transition duration-300"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-300 hover:text-white ml-4 transition duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-gray-300 hover:text-white ml-4 transition duration-300"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Newspaper Billing App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export { Header, Footer };
