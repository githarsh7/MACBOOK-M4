import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const Hero = () => {
  const container = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const priceRef = useRef(null);

  useGSAP(
    () => {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(videoRef.current, { x: "-50%", duration: 1.2 });
      tl.from(textRef.current.children, { x: 80, duration: 0.6 }, "<");
      tl.from(
        priceRef.current.children,
        { y: 30, ease: "power1.inOut", stagger: 0.15, duration: 0.6 },
        "<"
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full min-h-screen relative text-white flex flex-col lg:flex-row items-center overflow-x-hidden"
    >
      <div className="w-full lg:w-[70%] aspect-video overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/Videos/macbook2.mp4"
          muted
          playsInline
          preload="metadata"
          poster="/Images/macbook-poster.webp"
        />
      </div>

      <div className="w-full lg:absolute lg:w-[40%] lg:right-10 text-center lg:text-right px-6 py-8 lg:py-0">
        <div ref={textRef} className="mt-4 lg:mt-10">
          <h1 className="text-4xl sm:text-5xl lg:text-[4vw] lg:leading-[5vw] font-bold bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent leading-tight">
            MacBook Pro 14″ Now supercharged by M4 Chip.
          </h1>
        </div>

        <div ref={priceRef} className="space-y-3">
          <div className="text-lg sm:text-xl mt-5 lg:text-[1.5vw] font-bold">
            <p className="translate-y-7.5">From $1699.00 or $2665.00/mo.</p>
            <p className="translate-y-7.5">for 6 mo. at $299.00.</p>
          </div>
          <div className="flex mt-5 pb-10 text-base lg:text-[1.3vw] items-center lg:justify-end justify-center gap-5">
            <button className="translate-y-7.5 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition duration-150 px-6 py-2 rounded-full">
              Buy
            </button>
            <button className="translate-y-7.5 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition duration-150 px-6 py-2 rounded-full">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
