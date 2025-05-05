import Sidebar from "@/app/(dashboard)/dashboard/components/Sidebar";
import "../globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { Readex_Pro } from "next/font/google";

export const metadata = {
  title: "Dashboard",
};

const inter = Readex_Pro({ subsets: ["arabic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <div className="flex h-screen">
            <div className="w-1/6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
              <Sidebar />
            </div>
            <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
              {/* <Navbar /> */}
              {children}
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
