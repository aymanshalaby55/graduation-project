import Image from 'next/image';
import Link from 'next/link';

const Footer = () => (
  <footer className=" text-white py-10 px-6 sm:px-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="flex flex-col items-start gap-6">
        <Image
          src="/images/logo.svg"
          alt="VisionAI Chrono"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="text-base">
          VisionAI Chrono {new Date().getFullYear()} <br />
          All Rights Reserved &copy;
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="font-bold text-base">Quick Links</h3>
        <div className="flex flex-col gap-5">
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/" className="text-white">
            Features
          </Link>
          <Link href="/" className="text-white">
            Contact
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="font-bold text-base">Contact Us</h3>
        <div className="flex flex-col">
          <p>absolute-work-space@gmail.com</p>
          <p>+20 123 456 789</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
