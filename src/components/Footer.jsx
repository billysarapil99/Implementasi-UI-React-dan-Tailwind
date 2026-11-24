function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} JobSheet React & Tailwind CSS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;