import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const videoRef = useRef(null);

  // Safe autoplay
  useGSAP(() => {
    if (videoRef.current) {
      const p = videoRef.current.play();
      if (p !== undefined) p.catch(() => {});
    }
  }, []);

  // DESKTOP: original pinned scroll — unchanged, already works
  useGSAP(() => {
    if (isDesktop) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });
      tl.to(".mask img", { transform: "scale(1.1)" })
        .to(".content", { opacity: 1, y: 0, ease: "power1.in" });
    }
  }, [isDesktop]);

  // MOBILE: same cinematic zoom — pin the section, zoom logo from scale(0.06) → 1
  useGSAP(() => {
    if (!isDesktop) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "+=200%",   // pin for 2x screen-height of scroll distance
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: M4 logo zooms from tiny dot → fills screen (game video visible behind it)
      tl.to(".mask img", {
        scale: 1.1,
        ease: "none",
        duration: 3,
      });

      // Phase 2: Rocket Chip content fades in
      tl.to(".content", {
        opacity: 1,
        y: 0,
        ease: "power1.in",
        duration: 1,
      });
    }
  }, [isDesktop]);

  return (
    <section id="showcase">
      <div className="media">
        <video
          ref={videoRef}
          src="/Videos/game.mp4"
          loop
          muted
          playsInline
          autoPlay
          preload="none"
        />
        <div className="mask">
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
                <span className="text-white">M4, the next generation of Apple silicon</span>
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
              <p>pro rendering performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
