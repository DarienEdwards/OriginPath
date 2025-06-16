import React from 'react';

const Header = ({ title, subtitle }) => (
  <header className="p-4 border-b bg-white">
    <h1 className="text-3xl font-bold">{title}</h1>
    <p className="text-sm text-gray-600">{subtitle}</p>
  </header>
);

export default Header;
