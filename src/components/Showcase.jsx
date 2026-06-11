import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const videoRef = useRef(null);

  useGSAP(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  // Desktop-only GSAP pin (unchanged — already correct)
  useGSAP(() => {
    if (!isTablet) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });
      timeline
        .to(".mask img", { transform: "scale(1.1)" })
        .to(".content", { opacity: 1, y: 0, ease: "power1.in" });
    }
  }, [isTablet]);

  return (
    <section id="showcase">
      <div className="media">
        {
        <video
          ref={videoRef}
          src="/Videos/game.mp4"
          loop
          muted
          playsInline
          autoPlay
          preload="none"
          className="w-full h-[56vw] min-h-[260px] lg:h-auto object-cover object-center"
        />
        <div className="mask lg:-mt-[2vw]">
          <img src="/Images/mask-logo.svg" alt="" />
        </div>
      </div>

      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Rocket Chip</h2>
            <div className="space-y-5 mt-7 lg:pe-10">
              <p className="text-gray-400">
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 powers
              </p>
              <p className="text-gray-400">
                It drives Apple Intelligence on iPad Pro, so you can
              </p>
              <p className="text-gray-400">
                A brand-new display engine delivers breathtaking precision,
                color accuracy, and brightness. And a next-gen GPU with
                hardware-accelerated ray tracing brings console-level graphics
                to your fingertips.
              </p>
              <p className="text-blue-500">Learn more about Apple Intelligence</p>
            </div>
          </div>

          <div className="space-y-10 lg:space-y-14">
            <div className="space-y-2 text-gray-400">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="space-y-2 text-gray-400">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
