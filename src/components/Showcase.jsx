import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRef = useRef(null);
  const maskImgRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  // Detect screen size using window.innerWidth — works in DevTools AND real devices
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Safe autoplay
  useEffect(() => {
    if (videoRef.current) {
      const p = videoRef.current.play();
      if (p !== undefined) p.catch(() => {});
    }
  }, []);

  // DESKTOP: original GSAP pin
  useGSAP(() => {
    if (!isDesktop) return;

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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [isDesktop]);

  // MOBILE: IntersectionObserver zoom — fires when section enters viewport
  useEffect(() => {
    if (isDesktop) return;
    if (!maskImgRef.current || !contentRef.current || !sectionRef.current) return;

    const styleId = "m4-zoom-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes m4ZoomIn {
          from { transform: scale(0.05); }
          to   { transform: scale(1.1); }
        }
        .m4-zooming {
          animation: m4ZoomIn 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
        }
      `;
      document.head.appendChild(style);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            maskImgRef.current?.classList.add("m4-zooming");
            setTimeout(() => {
              contentRef.current?.classList.add("visible");
            }, 1200);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <section id="showcase" ref={sectionRef}>
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
          <img ref={maskImgRef} src="/Images/mask-logo.svg" alt="" />
        </div>
      </div>

      <div className="content" ref={contentRef}>
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
