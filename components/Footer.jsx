import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-[#fafaf9] py-12 mt-16">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Eventra</h3>
            <p className="font-source text-gray-300 text-sm">
              Premium event management platform connecting organizers and attendees worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-source text-sm text-gray-300">
              <li><Link href="/" className="hover:text-[#b8960c] transition-colors">Home</Link></li>
              <li><Link href="/events" className="hover:text-[#b8960c] transition-colors">Events</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#b8960c] transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-playfair font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 font-source text-sm text-gray-300">
              <li><Link href="#" className="hover:text-[#b8960c] transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-[#b8960c] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[#b8960c] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair font-semibold mb-4">Contact</h4>
            <p className="font-source text-sm text-gray-300">
              Email: <a href="mailto:info@eventra.com" className="hover:text-[#b8960c] transition-colors">info@eventra.com</a>
            </p>
            <p className="font-source text-sm text-gray-300 mt-2">
              Phone: <a href="tel:+1234567890" className="hover:text-[#b8960c] transition-colors">+1 (234) 567-890</a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="font-source text-center text-sm text-gray-400">
            © {currentYear} Eventra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
