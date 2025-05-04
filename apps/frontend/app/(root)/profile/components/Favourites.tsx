'use client';

import { Button } from '@/components/ui/button';
import { Globe, Lock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Favourites = () => {
  const { userID } = useParams();

  return (
    <div className="container mx-auto p-6 flex flex-col gap-6">
      <div className="flex sm:items-center items-start flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
        <h1 className="text-2xl font-semibold">My Favourite Pipelines</h1>
        <Link href="/community">
          <Button variant={'secondary'} className="cursor-pointer">
            Discover Community
          </Button>
        </Link>
      </div>

      <div className="">
        <div className="relative inline-block">
          <select className="appearance-none cursor-pointer border rounded-md py-2 pl-3 pr-10 bg-white outline-none text-sm">
            <option>Date updated</option>
            <option>Title</option>
            <option>Recently viewed</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
