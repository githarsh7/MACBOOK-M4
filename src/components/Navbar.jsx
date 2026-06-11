import { useGSAP } from "@gsap/react";
import {
  RiAppleFill,
  RiMenu3Fill,
  RiSearchLine,
  RiShoppingBagLine,
  RiCloseLine,
} from "@remixicon/react";

import gsap from "gsap";
import React, { useRef, useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const listRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Logo
      tl.from(logoRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Desktop list (only if visible)
      if (window.innerWidth >= 1024 && listRef.current) {
        tl.from(
          listRef.current,
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }

      // Right buttons
      if (btnRef.current) {
        tl.from(
          btnRef.current.children,
          {
            x: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }
    },
    { scope: navRef },
  );

  return (
    <nav
      ref={navRef}
      className="bg-black text-white px-5 lg:px-20 py-5 relative"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <RiAppleFill ref={logoRef} size={22} className="text-gray-300" />

        {/* Desktop Nav */}
        <ul
          ref={listRef}
          className="hidden lg:flex items-center gap-8 text-sm text-gray-300"
        >
          {[
            "Home",
            "Mac",
            "iPad",
            "iPhone",
            "Watch",
            "AirPods",
            "TV & Home",
            "Entertainment",
            "Accessories",
            "Support",
          ].map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-white transition"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div ref={btnRef} className="flex items-center gap-6">
          <RiSearchLine size={20} className="text-gray-300 cursor-pointer" />
          <RiShoppingBagLine
            size={20}
            className="text-gray-300 cursor-pointer"
          />

          <RiMenu3Fill
            className="lg:hidden cursor-pointer text-gray-300"
            size={22}
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#161617] z-50 backdrop-blur-xl
        transform transition-transform duration-500 ease-out
        ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-gray-300"
        >
          <RiCloseLine size={28} />
        </button>

        <ul className="flex flex-col pt-24 pl-10 gap-6 text-3xl text-gray-300 font-semibold">
          {[
            "Store",
            "Mac",
            "iPad",
            "iPhone",
            "Watch",
            "AirPods",
            "TV & Home",
            "Entertainment",
            "Accessories",
            "Support",
          ].map((item) => (
            <li
              key={item}
              className="hover:translate-x-2 transition-transform duration-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
