import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-[#F2F5F0] text-[#4A5D23] py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Information */}
        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="mt-2 text-sm">
            We are passionate about plants and aim to bring the best products and services to our customers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2">
            <li><Link href="/" className='text-sm'>Home</Link></li>
            <li><Link href="/products" className='text-sm'>Products</Link></li>
            <li><Link href="/services" className='text-sm'>Services</Link></li>
            <li><Link href="/contact" className='text-sm'>Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <ul className="mt-2">
            <li><Link href="/faq"> FAQ</Link></li>
            <li><Link href="/support"> Support</Link></li>
            <li><Link href="/returns"> Returns</Link></li>
            <li><Link href="/shipping"> Shipping Info</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <ul className="mt-2 flex space-x-4">
            <li>
              <Link href="https://facebook.com" className='text-sm' target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-2xl" />
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com" className='text-sm' target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl" />
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com" className='text-sm' target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl" />
              </Link>
            </li>
            <li>
              <Link href="https://pinterest.com" className='text-sm' target="_blank" rel="noopener noreferrer">
              <FaPinterestP className="text-2xl" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto text-center mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Leafyland. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
