import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={`relative w-full bg-black text-brand-beige px-4 sm:px-6 md:px-8 lg:px-10 py-8 mt-auto ${
        className || ""
      }`}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          {/* Left: Get In Touch */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Get In Touch</h2>
            <a
              href="mailto:talyawy@proton.me"
              className="text-lg font-medium text-brand-beige/80 hover:text-brand-beige transition-colors duration-300"
            >
              talyawy@proton.me
            </a>
            <a
              href="tel:+201149173309"
              className="text-lg font-medium text-brand-beige/80 hover:text-brand-beige transition-colors duration-300 block"
            >
              +20 114 917 3309
            </a>
          </div>

          {/* Right: Social Links */}
          <div className="flex flex-col items-end space-y-2">
            <Link
              href="https://github.com/YoussefEltalyawy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-base font-normal text-brand-beige/80 hover:text-brand-beige transition-colors duration-300"
            >
              GitHub <ArrowUpRight size={16} />
            </Link>
            <Link
              href="https://www.instagram.com/yousefeltalyawy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-base font-normal text-brand-beige/80 hover:text-brand-beige transition-colors duration-300"
            >
              Instagram <ArrowUpRight size={16} />
            </Link>
            <Link
              href="https://wa.me/201149173309"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-base font-normal text-brand-beige/80 hover:text-brand-beige transition-colors duration-300"
            >
              WhatsApp <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-row justify-between items-center mt-8 pt-8 border-t border-brand-beige/10 text-center sm:text-left">
          <p className="text-sm font-light text-brand-beige/60">
            © 2025 Youssef Eltalyawy
          </p>
          <p className="text-sm font-light text-brand-beige/60">Giza, Egypt</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
