(() => {
  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  const pinElement = document.querySelector(".chapterimg-pin");
  const chapterWrap = document.querySelector(".chapterimg-wrap");
  const chapterImage = document.querySelector(".chapterimg");
  const sideTexts = gsap.utils.toArray(".chapterimg-pin .text-box");
  const scrollWrapper = document.querySelector("#scroll-wrapper");
  const stickyContainer = document.querySelector("#sticky-container");
  const contentTrack = document.querySelector("#content-track");

  if (!pinElement || !chapterWrap || !chapterImage) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const getSize = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
    };
  };
  const getViewportWidth = () => document.documentElement.clientWidth;
  const getViewportHeight = () => window.innerHeight;
  const getTrackDistance = () => {
    if (!contentTrack) {
      return 0;
    }
    return Math.max(contentTrack.scrollWidth - document.documentElement.clientWidth, 0);
  };

  const resetInlineStyles = () => {
    gsap.set(chapterWrap, { clearProps: "width,height,opacity,visibility" });
    gsap.set(sideTexts, { clearProps: "opacity,visibility,transform" });
    if (contentTrack) {
      gsap.set(contentTrack, { clearProps: "x" });
    }
  };

  ScrollTrigger.addEventListener("refreshInit", resetInlineStyles);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: pinElement,
      start: "center center",
      end: () => `+=${Math.round(window.innerHeight * 2.4)}`,
      scrub: 1.15,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(
    sideTexts,
    {
      autoAlpha: 0,
      y: 24,
      duration: 0.24,
      ease: "power1.out",
      stagger: 0.05,
    },
    0
  )
    .fromTo(
      chapterWrap,
      {
        width: () => getSize(chapterWrap).width,
        height: () => getSize(chapterWrap).height,
      },
      {
        width: getViewportWidth,
        height: getViewportHeight,
        duration: 0.7,
        ease: "none",
      },
      0
    )
    .to(
      chapterWrap,
      {
        width: getViewportWidth,
        height: getViewportHeight,
        duration: 0.3,
        ease: "none",
      },
      0.7
    )
    .fromTo(
      chapterImage,
      {
        scale: 1.17,
      },
      {
        scale: 1,
        duration: 0.7,
        ease: "none",
      },
      0
    )
    .to(
      chapterImage,
      {
        scale: 1,
        duration: 0.3,
        ease: "none",
      },
      0.7
    )
    .to(
      chapterWrap,
      {
        autoAlpha: 0,
        duration: 0.35,
        ease: "none",
      },
      1
    );

  let horizontalTrackTween = null;
  let resizeRaf = 0;

  const setupHorizontalTrackScroll = () => {
    if (!scrollWrapper || !stickyContainer || !contentTrack) {
      return;
    }

    if (horizontalTrackTween) {
      horizontalTrackTween.scrollTrigger.kill();
      horizontalTrackTween.kill();
      horizontalTrackTween = null;
    }

    gsap.set(contentTrack, { x: 0 });

    const distance = getTrackDistance();
    scrollWrapper.style.height = `${Math.ceil(window.innerHeight + distance)}px`;

    if (distance <= 0) {
      return;
    }

    horizontalTrackTween = gsap.to(contentTrack, {
      x: () => -getTrackDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: scrollWrapper,
        start: "top top",
        end: () => `+=${getTrackDistance()}`,
        scrub: true,
        pin: stickyContainer,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  };

  const handleResize = () => {
    if (resizeRaf) {
      cancelAnimationFrame(resizeRaf);
    }
    resizeRaf = requestAnimationFrame(() => {
      setupHorizontalTrackScroll();
      ScrollTrigger.refresh();
    });
  };

  setupHorizontalTrackScroll();
  window.addEventListener("resize", handleResize);

  if ("ResizeObserver" in window && contentTrack) {
    const trackResizeObserver = new ResizeObserver(handleResize);
    trackResizeObserver.observe(contentTrack);
  }
})();
