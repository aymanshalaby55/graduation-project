import Sidebar from '@/app/(dashboard)/dashboard/components/Sidebar';
import '../globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
import { Readex_Pro } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
// import Navbar from '@/components/shared/Navbar';

export const metadata = {
  title: 'Dashboard',
};

const inter = Readex_Pro({ subsets: ['arabic'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <QueryProvider>
            <div className="flex h-screen">
              <div className="w-1/6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  border-r border-gray-200 dark:border-gray-700">
                <Sidebar />
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                {/* <Navbar /> */}
                {children}
              </div>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
