import Link from "next/link";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={`relative w-full bg-black text-brand-beige px-4 sm:px-6 md:px-8 lg:px-10 py-8 mt-auto ${className || ''}`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Get In Touch Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Get In Touch</h2>
            <div className="flex flex-col space-y-2">
              <a
                href="mailto:talyawy@proton.me"
                className="text-lg font-bold text-brand-beige/80 hover:text-brand-beige transition-colors duration-300"
              >
                talyawy@proton.me
              </a>
              <a
                href="tel:+201149173309"
                className="text-lg font-bold text-brand-beige/80 hover:text-brand-beige transition-colors duration-300"
              >
                +20 114 917 3309
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center space-y-2">
            <Link
              href="https://github.com/YoussefEltalyawy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-brand-beige/80 hover:text-brand-beige transition-colors duration-300"
            >
              GitHub ↗
            </Link>
            <Link
              href="https://www.instagram.com/yousefeltalyawy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-brand-beige/80 hover:text-brand-beige transition-colors duration-300"
            >
              Instagram ↗
            </Link>
            <Link
              href="https://wa.me/201149173309"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-brand-beige/80 hover:text-brand-beige transition-colors duration-300"
            >
              WhatsApp ↗
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-brand-beige/10">
          <p className="text-sm text-brand-beige/60">
            © 2025 Youssef Eltalyawy
          </p>
          <p className="text-sm text-brand-beige/60">
            Giza, Egypt
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 