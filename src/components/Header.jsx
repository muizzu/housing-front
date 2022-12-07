import React from 'react';
export function Header({ user }) {
  return (
    <header className="bg-white shadow-xl">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            {/* <a href="/">
              <img className="h-10 w-auto" src={Logo} alt="" />
            </a> */}
            <p className="pl-3 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-customGreen to-customBlue">Housing api</p>
          </div>
            <div className="ml-10 space-x-4">
              <a
                href="/login"
                className="rounded-md border border-transparent bg-green-700 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75 hidden md:inline-block"
              >
                Sign in
              </a>
              <a
                href="/register"
                className="rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-green-700 hover:bg-indigo-50 inline-block"
              >
                Sign up
              </a>
            </div>
        </div>
      </nav>
    </header>
  );
}
