import React from "react";

function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="max-w-6xl mx-auto px-6 text-center">
        &copy; {new Date().getFullYear()} AI Finance Advisor. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
