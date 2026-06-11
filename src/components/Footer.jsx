import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".footer-section");

      gsap.from(".footer-title", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      sections.forEach((section) => {
        gsap.from(section.children, {
          y: 25,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="bg-white py-20 rounded-t-4xl text-gray-800 px-6 md:px-20"
    >
      <h2 className="footer-title text-3xl md:text-5xl lg:text-6xl font-bold">
        Mac
      </h2>

      <div className="mt-12 grid gap-10 md:grid-cols-3 max-w-5xl">
        
        {/* Explore */}
        <div className="footer-section space-y-3">
          <p className="text-gray-400 font-medium">Explore Mac</p>
          <ul className="space-y-2 font-medium">
            <li>Explore All Mac</li>
            <li>MacBook Air</li>
            <li>MacBook Pro</li>
            <li>iMac</li>
            <li>Mac mini</li>
            <li>Mac Studio</li>
            <li>Mac Pro</li>
            <li>Displays</li>
            <li>Compare Mac</li>
            <li>Switch from PC to Mac</li>
          </ul>
        </div>

        {/* Shop */}
        <div className="footer-section space-y-3">
          <p className="text-gray-400 font-medium">Shop Mac</p>
          <ul className="space-y-2 font-medium">
            <li>Shop</li>
            <li>Mac Accessories</li>
            <li>Ways to Buy</li>
            <li>Personal Setup</li>
          </ul>
        </div>

        {/* More */}
        <div className="footer-section space-y-3">
          <p className="text-gray-400 font-medium">More from Mac</p>
          <ul className="space-y-2 font-medium">
            <li>Mac Support</li>
            <li>AppleCare</li>
            <li>macOS Tahoe</li>
            <li>Apple Intelligence</li>
            <li>Apps by Apple</li>
            <li>Apple Creator Studio</li>
            <li>Better with iPhone</li>
            <li>iCloud+</li>
            <li>Mac for Business</li>
            <li>Education</li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;