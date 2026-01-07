import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";

const Navbar = () => {
  const linkClass = (isActive: boolean) =>
  isActive
    ? "font-semibold border-b-2 border-blue-500 pb-1"
    : "pb-1";

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="container mx-auto navbar ">
        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* MOBILE MENU */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" end>
                  {({ isActive }: NavLinkRenderProps) => (
                    <a className={linkClass(isActive)}>Home</a>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/pricing">
                  {({ isActive }: NavLinkRenderProps) => (
                    <a className={linkClass(isActive)}>Pricing</a>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">
                  {({ isActive }: NavLinkRenderProps) => (
                    <a className={linkClass(isActive)}>About</a>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>

          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>

        {/* CENTER (DESKTOP) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" end>
                {({ isActive }: NavLinkRenderProps) => (
                  <a className={linkClass(isActive)}>Home</a>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/pricing">
                {({ isActive }: NavLinkRenderProps) => (
                  <a className={linkClass(isActive)}>Pricing</a>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
                {({ isActive }: NavLinkRenderProps) => (
                  <a className={linkClass(isActive)}>About</a>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
