import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const normalLinkClass =
    '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50';
  const activeLinkClass = `${normalLinkClass} bg-gray-50`;

  const menuItem = ({ to, title }: { to: string; title: string }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? activeLinkClass : normalLinkClass
      }
    >
      {title}
    </NavLink>
  );

  return (
    <header className="bg-white">
      <>
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Logo />
          </div>
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:justify-end lg:gap-x-12">
            {menuItem({ to: '/', title: 'Gallery' })}
            {menuItem({ to: 'apod', title: 'APOD' })}
            {menuItem({ to: 'about', title: 'About' })}
          </div>
        </nav>
        {isOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10"></div>
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {menuItem({ to: '/', title: 'Gallery' })}
                    {menuItem({ to: 'apod', title: 'APOD' })}
                    {menuItem({ to: 'about', title: 'About' })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </header>
  );
}
