import * as React from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function JaradaHorizontalSection() {
    const rootRef = React.useRef<HTMLDivElement>(null)

    React.useLayoutEffect(() => {
        if (!rootRef.current) return

        gsap.registerPlugin(ScrollTrigger)

        let horizontalTrackTween: gsap.core.Tween | null = null
        let resizeRaf = 0
        let trackResizeObserver: ResizeObserver | null = null
        const TRACK_END_GAP = 300

        const ctx = gsap.context(() => {
            const pinElement = rootRef.current?.querySelector(
                ".chapterimg-pin"
            ) as HTMLElement | null
            const chapterWrap = rootRef.current?.querySelector(
                ".chapterimg-wrap"
            ) as HTMLElement | null
            const chapterImage = rootRef.current?.querySelector(
                ".chapterimg"
            ) as HTMLElement | null
            const sideTexts = gsap.utils.toArray<HTMLElement>(
                ".chapterimg-pin .text-box",
                rootRef.current
            )
            const titleElements = gsap.utils.toArray<HTMLElement>(
                ".title h3, .title p",
                rootRef.current
            )
            const titleBlock = rootRef.current?.querySelector(
                ".title"
            ) as HTMLElement | null

            const scrollWrapper = document.getElementById(
                "scroll-wrapper"
            ) as HTMLDivElement | null
            const stickyContainer = document.getElementById(
                "sticky-container"
            ) as HTMLDivElement | null
            const contentTrack = document.getElementById(
                "content-track"
            ) as HTMLDivElement | null

            if (!pinElement || !chapterWrap || !chapterImage) return

            const getBaseTrackDistance = () => {
                if (!contentTrack) return 0
                return Math.max(
                    contentTrack.scrollWidth -
                        document.documentElement.clientWidth,
                    0
                )
            }

            const getTrackDistance = () =>
                getBaseTrackDistance() + TRACK_END_GAP

            const resetInlineStyles = () => {
                gsap.set(chapterWrap, {
                    clearProps: "width,height,opacity,visibility",
                })
                gsap.set(sideTexts, {
                    clearProps: "opacity,visibility,transform",
                })

                if (contentTrack) {
                    gsap.set(contentTrack, { clearProps: "x" })
                }
            }

            ScrollTrigger.addEventListener("refreshInit", resetInlineStyles)

            if (titleBlock && titleElements.length) {
                gsap.set(titleElements, {
                    autoAlpha: 0,
                    y: 24,
                })

                gsap.to(titleElements, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: titleBlock,
                        start: "top 60%",
                        toggleActions: "play none none none",
                        once: true,
                        invalidateOnRefresh: true,
                    },
                })
            }

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
            })

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
                        width: () => chapterWrap.getBoundingClientRect().width,
                        height: () =>
                            chapterWrap.getBoundingClientRect().height,
                    },
                    {
                        width: () => document.documentElement.clientWidth,
                        height: () => window.innerHeight,
                        duration: 0.7,
                        ease: "none",
                    },
                    0
                )
                .to(
                    chapterWrap,
                    {
                        width: () => document.documentElement.clientWidth,
                        height: () => window.innerHeight,
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
                )

            const setupHorizontalTrackScroll = () => {
                if (!scrollWrapper || !stickyContainer || !contentTrack) {
                    return
                }

                if (horizontalTrackTween) {
                    horizontalTrackTween.scrollTrigger?.kill()
                    horizontalTrackTween.kill()
                    horizontalTrackTween = null
                }

                gsap.set(contentTrack, { x: 0 })

                const baseDistance = getBaseTrackDistance()
                const distance = getTrackDistance()
                scrollWrapper.style.height = `${Math.ceil(
                    window.innerHeight + distance
                )}px`

                if (baseDistance <= 0) {
                    return
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
                })
            }

            const handleResize = () => {
                if (resizeRaf) {
                    cancelAnimationFrame(resizeRaf)
                }
                resizeRaf = requestAnimationFrame(() => {
                    setupHorizontalTrackScroll()
                    ScrollTrigger.refresh()
                })
            }

            setupHorizontalTrackScroll()
            window.addEventListener("resize", handleResize)

            if ("ResizeObserver" in window && contentTrack) {
                trackResizeObserver = new ResizeObserver(handleResize)
                trackResizeObserver.observe(contentTrack)
            }

            return () => {
                window.removeEventListener("resize", handleResize)
                if (resizeRaf) {
                    cancelAnimationFrame(resizeRaf)
                }
                if (trackResizeObserver) {
                    trackResizeObserver.disconnect()
                }
                ScrollTrigger.removeEventListener(
                    "refreshInit",
                    resetInlineStyles
                )
                if (horizontalTrackTween) {
                    horizontalTrackTween.scrollTrigger?.kill()
                    horizontalTrackTween.kill()
                }
                tl.kill()
            }
        }, rootRef)

        return () => {
            ctx.revert()
        }
    }, [])

    return (
        <div ref={rootRef} style={{ width: "100%" }}>
            <style>{`
                #horizontal {
                    background-color: #FFFBF7;
                    padding-top: 180px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    height: 300vh;
                    position: relative;
                    z-index: 10;
                }
                #horizontal .bg-text {
                    width: calc(1445 / 1920 * 100vw);
                    height: calc(265 / 1920 * 100vw);
                }
                #horizontal .title {
                    width: calc(654 / 1920 * 100vw);
                    height: auto;
                    text-align: center;
                }
                #horizontal .wrapper h3 {
                    font-size: 20px;
                    line-height: 1.6;
                    color: #1C1D1B;
                }
                #horizontal .wrapper p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #1C1D1B;
                    margin-top: calc(20 / 1920 * 100vw);
                }
                #horizontal .wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: calc(-100 / 1920 * 100vw);
                }
                #horizontal .wrapper .chapterimg-pin {
                    width: 100vw;
                    max-width: 100vw;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                }
                #horizontal .wrapper .chapterimg-pin .text-box {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: min(300px, calc(300 / 1920 * 100vw));
                    text-align: center;
                    will-change: opacity, transform;
                    z-index: 3;
                }
                #horizontal .wrapper .chapterimg-pin .text-box:first-child {
                    left: calc(120 / 1920 * 100vw);
                }
                #horizontal .wrapper .chapterimg-pin .text-box:last-child {
                    right: calc(120 / 1920 * 100vw);
                }
                #horizontal .wrapper .chapterimg-pin .text-box img {
                    width: calc(330 / 1920 * 100vw);
                    height: calc(35 / 1920 * 100vw);
                }
                #horizontal .wrapper .chapterimg-pin .text-box p {
                    font-size: 14px;
                    color: #666666;
                    margin-top: calc(15 / 1920 * 100vw);
                }
                #horizontal .wrapper .chapterimg-pin .chapterimg-wrap {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: calc(488 / 1920 * 100vw);
                    height: calc(653 / 1920 * 100vw);
                    overflow: hidden;
                    transform: translate(-50%, -50%);
                    z-index: 2;
                    will-change: width, height;
                    transform-origin: center center;
                }
                #horizontal .wrapper .chapterimg-pin .chapterimg-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    inset: 0;
                    transform-origin: center center;
                    will-change: transform;
                }
            `}</style>

            <div id="horizontal">
                <img
                    src="https://framerusercontent.com/images/5kpStDwfs2UEZ0GNPRTmm9PtT8.png"
                    alt=""
                    className="bg-text"
                />
                <div className="wrapper">
                    <div className="title">
                        <h3 className="pre-bd">
                            탈모는 숨겨야 할 숙제가 아니라, <br />
                            나를 더 아끼고 가꾸기 위한 새로운 시작입니다. <br />
                        </h3>
                        <p className="pre-re">
                            자라다의원에게 모발이식은 단순한 치료를 넘어, 당신의 일상에 자신감을 채워 넣는 '토탈헤어솔루션'입니다. 탈모에 대한 두려움은 내려놓고, 당신이 가장 빛나던 본연의 모습을 되찾아드리는 데 집중하겠습니다.
                        </p>
                    </div>
                    <div className="chapterimg-pin">
                        <div className="text-box">
                            <img
                                src="https://framerusercontent.com/images/9VbJQrU6uAOAmB9fGswZJgHTfiA.png"
                                alt=""
                                className="bg-text"
                            />
                            <p className="pre-re">서울 성동구 광나루로 174(성수동)</p>
                        </div>
                        <div className="chapterimg-wrap">
                            <img
                                src="https://framerusercontent.com/images/4hnMymwMgIhSzbu05E92e68cc.jpg"
                                alt=""
                                className="chapterimg"
                            />
                        </div>
                        <div className="text-box">
                            <img
                                src="https://framerusercontent.com/images/tFatkt0PNCxOOZwxtlDaHDbWlu0.png"
                                alt=""
                                className="bg-text"
                            />
                            <p className="pre-re">174 Gwangnaru-ro, Seongdong-gu, Seoul</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


