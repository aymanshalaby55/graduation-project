'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname} from 'next/navigation';

const Sidebar = () => {
  const links = [
    {
      name: 'Containers',
      navTo: 'containers',
    },
    {
      name: 'Users',
      navTo: 'users',
    },
    // {
    //   name: 'Edit Model',
    //   navTo: 'models/editModel',
    // },
    {
      name: 'Models',
      navTo: 'models',
    },
    {
      name: 'Videos',
      navTo: 'videos',
    },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-4">
      <Link
        href="/"
        className="flex flex-row justify-center gap-5 mb-10 border-b-2 border-gray-200 dark:border-gray-500 p-4"
      >
        <Image
          src="/images/logo.svg"
          alt="VisionAI Chrono"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>
      <div className="flex flex-col gap-7 p-5">
        {links.map((link) => (
          <Link
            href={`/dashboard/${link.navTo}`}
            key={link.name}
            className={`mb-4 p-3 rounded-lg font-semibold dark:text-white text-black dark:hover:bg-primary/60 dark:hover:text-white hover:bg-primary/20 hover:text-primary ${
              pathname === `/dashboard/${link.navTo}`
                ? 'shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'
                : ''
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
