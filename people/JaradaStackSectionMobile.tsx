import * as React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function JaradaStackSectionMobile() {
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!rootRef.current) return

        const ctx = gsap.context(() => {
            const root = rootRef.current
            if (!root) return

            const playFadeUp = (groupElement: Element | null) => {
                if (
                    !groupElement ||
                    (groupElement as HTMLElement).getAttribute(
                        "data-is-done"
                    ) === "true"
                ) {
                    return
                }

                ;(groupElement as HTMLElement).setAttribute(
                    "data-is-done",
                    "true"
                )
                const lines = groupElement.querySelectorAll(".line")
                lines.forEach((line) => {
                    const text = line.getAttribute("data-text")
                    if (text) line.textContent = text
                })

                gsap.fromTo(
                    lines,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.3,
                        ease: "power2.out",
                    }
                )
            }

            const stageA = root.querySelector(".stage-a") as HTMLElement | null
            const stageASticky = root.querySelector(
                ".stage-a .mobile-fade-sticky"
            ) as HTMLElement | null
            const sec4ForTransition = root.querySelector(
                ".bg-4"
            ) as HTMLElement | null
            const stageB = root.querySelector(".stage-b") as HTMLElement | null
            const sec1 = root.querySelector(
                ".stage-a .bg-1"
            ) as HTMLElement | null
            const sec2 = root.querySelector(
                ".stage-a .bg-2"
            ) as HTMLElement | null
            const sec3 = root.querySelector(
                ".stage-a .bg-3"
            ) as HTMLElement | null

            if (
                stageA &&
                stageASticky &&
                sec4ForTransition &&
                sec1 &&
                sec2 &&
                sec3
            ) {
                gsap.set([sec2, sec3], { autoAlpha: 0 })
                gsap.set(sec1, { autoAlpha: 1 })
                gsap.set(sec4ForTransition, { autoAlpha: 0 })
                if (stageB) {
                    gsap.set(stageB, { autoAlpha: 0 })
                }

                playFadeUp(sec1.querySelector(".typing-group"))

                gsap.timeline({
                    scrollTrigger: {
                        trigger: stageA,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },
                })
                    .to(sec1, { autoAlpha: 0, duration: 1, ease: "none" }, 0)
                    .to(sec2, { autoAlpha: 1, duration: 1, ease: "none" }, 0)
                    .call(
                        () => playFadeUp(sec2.querySelector(".typing-group")),
                        [],
                        1.6
                    )
                    .to(sec2, { autoAlpha: 0, duration: 1, ease: "none" }, 2.2)
                    .to(sec3, { autoAlpha: 1, duration: 1, ease: "none" }, 2.2)
                    .call(
                        () => playFadeUp(sec3.querySelector(".typing-group")),
                        [],
                        2.8
                    )
                    .to(
                        stageASticky,
                        { autoAlpha: 0, duration: 0.9, ease: "none" },
                        3.8
                    )
                    .to(
                        sec4ForTransition,
                        { autoAlpha: 1, duration: 0.9, ease: "none" },
                        3.8
                    )
            }

            const sec4 = root.querySelector(".bg-4") as HTMLElement | null
            const text4 = sec4?.querySelector(".typing-4") as HTMLElement | null
            const img4 = sec4?.querySelector(
                ".bg-image-4"
            ) as HTMLElement | null
            const blurLayer = sec4?.querySelector(
                ".blur-layer"
            ) as HTMLElement | null
            const dotContainer = sec4?.querySelector(
                ".dot-container"
            ) as HTMLElement | null
            const text4Content = [
                "효율을 따졌다면 시작하지 않았을 일들.",
                "우리는 이 미련한 집요함을 '자라다의 방식'이라 부릅니다.",
                "그저 남들이 보지 않는 수백개의 점까지 끝까지 들여다볼 뿐입니다.",
            ]

            const dotPositionsPx = [
                { x: 1629, y: 233 },
                { x: 1713, y: 299 },
                { x: 1701, y: 378 },
                { x: 1746, y: 635 },
                { x: 1677, y: 604 },
                { x: 1533, y: 726 },
                { x: 1456, y: 937 },
                { x: 1302, y: 823 },
                { x: 1085, y: 886 },
                { x: 996, y: 843 },
                { x: 1064, y: 644 },
                { x: 1257, y: 650 },
                { x: 1423, y: 485 },
                { x: 1397, y: 455 },
                { x: 1558, y: 149 },
                { x: 1388, y: 45 },
                { x: 1165, y: 288 },
                { x: 1142, y: 264 },
                { x: 1101, y: 54 },
                { x: 1054, y: 143 },
                { x: 973, y: 279 },
                { x: 933, y: 276 },
                { x: 808, y: 60 },
                { x: 840, y: 146 },
                { x: 712, y: 202 },
                { x: 691, y: 264 },
                { x: 709, y: 220 },
                { x: 383, y: 121 },
                { x: 319, y: 183 },
                { x: 482, y: 208 },
                { x: 490, y: 345 },
                { x: 252, y: 362 },
                { x: 189, y: 467 },
                { x: 277, y: 521 },
                { x: 347, y: 482 },
                { x: 359, y: 488 },
                { x: 404, y: 537 },
                { x: 674, y: 887 },
                { x: 811, y: 747 },
                { x: 259, y: 719 },
                { x: 398, y: 695 },
                { x: 461, y: 790 },
                { x: 526, y: 881 },
                { x: 628, y: 655 },
                { x: 703, y: 572 },
            ]

            if (dotContainer && !dotContainer.querySelector(".dot")) {
                dotPositionsPx.forEach((pos) => {
                    const dot = document.createElement("div")
                    dot.className = "dot"
                    dot.style.left = `${pos.x}px`
                    dot.style.top = `${pos.y}px`
                    dotContainer.appendChild(dot)
                })
            }

            if (sec4 && text4 && img4 && blurLayer) {
                const dots = sec4.querySelectorAll(".dot")

                const tl4 = gsap.timeline({
                    scrollTrigger: {
                        trigger: sec4,
                        start: "top top",
                        end: "+=4000",
                        scrub: 1,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                    },
                })

                tl4.set(text4, { opacity: 0, y: 30 })
                    .to(text4, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        onStart: () => {
                            text4.innerText = text4Content[0]
                        },
                    })
                    .to(
                        img4,
                        {
                            width: 1977,
                            height: 1321,
                            duration: 3,
                            ease: "none",
                        },
                        "+=0.5"
                    )
                    .to(text4, { opacity: 0, y: -30, duration: 0.2 }, "-=2.5")
                    .add(() => {
                        const isForward =
                            (tl4.scrollTrigger?.direction ?? 1) > 0
                        text4.innerText = isForward
                            ? text4Content[1]
                            : text4Content[0]
                    }, "-=2.3")
                    .to(
                        text4,
                        {
                            opacity: 1,
                            y: 0,
                            startAt: { y: 30 },
                            duration: 0.2,
                        },
                        "-=2.2"
                    )
                    .to(
                        blurLayer,
                        {
                            backdropFilter: "blur(15px)",
                            background: "rgba(255, 255, 255, 0.5)",
                            duration: 2,
                        },
                        "+=0.5"
                    )
                    .to(text4, { opacity: 0, y: -30, duration: 0.2 }, "<")
                    .add(() => {
                        const isForward =
                            (tl4.scrollTrigger?.direction ?? 1) > 0
                        if (isForward) {
                            text4.innerText = text4Content[2]
                            gsap.to(dots, {
                                opacity: 1,
                                scale: 1,
                                duration: 0.6,
                                stagger: { amount: 0.8, from: "random" },
                                ease: "back.out(1.7)",
                                overwrite: true,
                            })
                        } else {
                            text4.innerText = text4Content[1]
                            gsap.to(dots, {
                                opacity: 0,
                                scale: 0,
                                duration: 0.3,
                                overwrite: true,
                            })
                        }
                    }, "<0.1")
                    .to(
                        text4,
                        {
                            opacity: 1,
                            y: 0,
                            startAt: { y: 30 },
                            duration: 0.2,
                        },
                        "<0.2"
                    )

                if (stageB) {
                    tl4.to(
                        sec4,
                        { autoAlpha: 0, duration: 0.9, ease: "none" },
                        "+=0.6"
                    ).to(
                        stageB,
                        { autoAlpha: 1, duration: 0.9, ease: "none" },
                        "<"
                    )
                }
            }

            const sec5 = root.querySelector(
                ".stage-b .bg-5"
            ) as HTMLElement | null
            const sec6 = root.querySelector(
                ".stage-b .bg-6"
            ) as HTMLElement | null
            const sec7 = root.querySelector(
                ".stage-b .bg-7"
            ) as HTMLElement | null
            const img5El = sec5?.querySelector(
                ".bg-image-5"
            ) as HTMLElement | null
            const typingLeft5 = sec5?.querySelector(".typing-group5-left")
            const typingRight5 = sec5?.querySelector(".typing-group5-right")
            let sec5Played = false

            const playSec5 = () => {
                if (sec5Played || !img5El) return
                sec5Played = true
                gsap.to(img5El, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        playFadeUp(typingLeft5)
                        playFadeUp(typingRight5)
                    },
                })
            }

            if (stageB && sec5 && sec6 && sec7) {
                gsap.set([sec6, sec7], { autoAlpha: 0 })
                gsap.set(sec5, { autoAlpha: 1 })

                ScrollTrigger.create({
                    trigger: stageB,
                    start: "top 70%",
                    onEnter: () => playSec5(),
                    onEnterBack: () => playSec5(),
                })

                gsap.timeline({
                    scrollTrigger: {
                        trigger: stageB,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                    },
                })
                    .to(sec5, { autoAlpha: 0, duration: 1, ease: "none" }, 0)
                    .to(sec6, { autoAlpha: 1, duration: 1, ease: "none" }, 0)
                    .call(
                        () => playFadeUp(sec6.querySelector(".typing-group")),
                        [],
                        1
                    )
                    .to(sec6, { autoAlpha: 0, duration: 1, ease: "none" }, 1.6)
                    .to(sec7, { autoAlpha: 1, duration: 1, ease: "none" }, 1.6)
                    .call(
                        () => playFadeUp(sec7.querySelector(".typing-group")),
                        [],
                        2.6
                    )
            }

            ScrollTrigger.refresh()
            window.scrollTo(0, 0)
        }, rootRef)

        return () => {
            ctx.revert()
        }
    }, [])

    return (
        <div ref={rootRef} className="jarada-mobile-root">
            <style>{`

                .pre-re {font-family: "Pretendard Regular", sans-serif;}
                .pre-md {font-family: "Pretendard Medium", sans-serif;}
                .pre-smbd {font-family: "Pretendard SemiBold", sans-serif;}
                .pre-bd {font-family: "Pretendard Bold", sans-serif;}
                .stack-section {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    background-size: cover;
                    background-position: center;
                }

                .bg-1 { z-index: 1; background-image: url('https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img1.png'); }
                .bg-2 { z-index: 2; background-image: url('https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img2.png'); }
                .bg-3 { z-index: 3; background-image: url('https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img3.png'); }
                .bg-4 {
                    z-index: 4;
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    height: 100vh;
                }

                .bg-image-4 {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 2561px;
                    height: 1711px;
                    object-fit: fill;
                    display: block;
                    max-width: none;
                }

                .blur-layer {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    backdrop-filter: blur(0px);
                    background: rgba(255, 255, 255, 0);
                    z-index: 1;
                    transition: backdrop-filter 0.5s;
                }

                .dot-container {
                    position: absolute;
                    width: 1920px;
                    height: 1000px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 5;
                    pointer-events: none;
                }

                .dot {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background-color: #000;
                    border-radius: 50%;
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0);
                }

                .content-wrapper {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                }

                .typing-group {
                    color: #1C1D1B;
                }

                .typing-group1, .typing-group2 {
                    display: inline-block;
                    text-align: left;
                    top: 50%;
                    position: absolute;
                    transform: translateY(-50%);
                    left: calc(172 / 1920 * 100vw);
                }

                .typing-group1 .line, .typing-group2 .line{
                    color: #FFFBF7;
                }

                .typing-group3 {
                    display: inline-block;
                    text-align: left;
                    position: absolute;
                    left: calc(172 / 1920 * 100vw);
                    bottom: calc(285 / 1920 * 100vw);
                    width: 320px;
                }

                .typing-group3 .line{
                    color: #0B0A09;
                    display: inline-block;
                    background-color: #fff;
                    padding:3px
                }

                .line {
                    display: block;
                    min-height: 1.2em;
                    margin-bottom: 5px;
                    font-size: 16px;
                    opacity: 0;
                }

                .typing-4 {color: #1C1D1B; font-size: 16px;}

                .bg-5 {
                    z-index: 5;
                    background: #f5f4f2;
                    position: relative;
                    overflow: hidden;
                }

                .bg-image-5 {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                }

                .typing-group5-left {
                    display: inline-block;
                    text-align: left;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: calc(80 / 1920 * 100vw);
                }

                .typing-group5-left .line {
                    color: #1C1D1B;
                }

                .typing-group5-right {
                    display: inline-block;
                    text-align: right;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: calc(80 / 1920 * 100vw);
                }

                .typing-group5-right .line {
                    color: #1C1D1B;
                }

                .bg-6 {
                    z-index: 6;
                    background-image: url('https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img6.png');
                    background-size: cover;
                    background-position: center;
                }

                .typing-group6 {
                    display: inline-block;
                    text-align: center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    white-space: nowrap;
                }

                .typing-group6 .line {
                    color: #0B0A09;
                }

                .bg-7 {
                    z-index: 7;
                    background-image: url('https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img7.png');
                    background-size: cover;
                    background-position: center;
                }

                .typing-group7 {
                    display: inline-block;
                    text-align: right;
                    position: absolute;
                    bottom: calc(80 / 1080 * 100vh);
                    left: calc(950 / 1920 * 100vw);
                }

                .bg-7 .line.signature-line {
                    font-family: "Waiting for the Sunrise Regular", "Waiting for the Sunrise Regular Placeholder", sans-serif;
                    font-size: 84px;
                    color: #FFFBF7;
                    letter-spacing: 2px;
                }

                .pos-relative{position: relative;}
                .pos-relative .line{position: absolute; top:-5px;}

                @media (max-width: 1024px) {
                    .typing-group1, .typing-group2, .typing-group3{
                        left: 32px;
                        top: 248px;
                    }
                    .bg-image-5 {
                        top: 47%;
                    }
                    .typing-group5-left, .typing-group5-right {
                        left: 50%;
                        top: 82%;
                        transform: translate(-50%, -50%);
                        text-align: center;
                        width:80vw;
                        margin: 0;
                    }
                    .typing-group5-right {
                        top: 85%;
                    }
                    .bg-7 .line.signature-line {
                        font-size: calc(84 / 1024 * 100vw);
                        width:90vw
                    }

                    .typing-group7 {
                        display: inline-block;
                        text-align: right;
                        position: absolute;
                        bottom: calc(80 / 1080 * 100vh);
                        left: 50%;
                        transform: translateX(-50%)
                    }

                    .typing-4 {
                        color: #1C1D1B;
                        font-size: 16px;
                        width: 80vw;
                        text-align: center;
                    }
                    .bg-6 {
                        z-index: 7;
                        background-image: url('https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img6_m.png');
                        background-size: cover;
                        background-position: center;
                    }
                    .bg-7 {
                        z-index: 7;
                        background-image: url('https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img7_m.png');
                        background-size: cover;
                        background-position: center;
                    }
                }

.jarada-mobile-root .mobile-fade-stage {
                    position: relative;
                    width: 100%;
                    height: 280vh;
                }

                .jarada-mobile-root .mobile-fade-sticky {
                    position: sticky;
                    top: 0;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                }

                .jarada-mobile-root .mobile-fade-layer {
                    position: absolute;
                    inset: 0;
                    will-change: opacity;
                }

            `}</style>

            <section className="mobile-fade-stage stage-a">
                <div className="mobile-fade-sticky">
                    <section className="stack-section mobile-fade-layer bg-1">
                        <div className="overlay" />
                        <h1 className="typing-group typing-group1">
                            <div
                                className="line pre-smbd"
                                data-text="이 점들은"
                            ></div>
                            <div
                                className="line pre-smbd"
                                data-text="저마다 다른 속도로 자라날 준비를 하고 있습니다."
                            ></div>
                        </h1>
                    </section>

                    <section className="stack-section mobile-fade-layer bg-2">
                        <div className="overlay" />
                        <h1 className="typing-group typing-group2">
                            <div
                                className="line pre-smbd"
                                data-text="화려한 수식보다 중요한 건, "
                            ></div>
                            <div
                                className="line pre-smbd"
                                data-text="채워진 자리가 원래 당신의 것이었던 것처럼 보이게 하는 일."
                            ></div>
                        </h1>
                    </section>

                    <section className="stack-section mobile-fade-layer bg-3">
                        <div className="overlay" />
                        <h1 className="typing-group typing-group3">
                            <div
                                className="line pre-smbd"
                                data-text="우리의 손끝이 무거워질수록,"
                            ></div>
                            <div className="pos-relative">
                                <div
                                    className="line pre-smbd"
                                    data-text="거울 앞에 선 당신의 어깨는 가벼워질 것을 압니다."
                                ></div>
                            </div>
                        </h1>
                    </section>
                </div>
            </section>

            <section className="stack-section bg-4">
                <img
                    src="https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img4.png"
                    className="bg-image-4"
                    alt="background"
                />
                <div className="blur-layer white-blur" />

                <div className="dot-container" />

                <div className="content-wrapper">
                    <h1 className="typing-4 pre-smbd">
                        효율을 따졌다면 시작하지 않았을 일들.
                    </h1>
                </div>
            </section>

            <section className="mobile-fade-stage stage-b">
                <div className="mobile-fade-sticky">
                    <section className="stack-section mobile-fade-layer bg-5">
                        <picture>
                            <source
                                media="(max-width: 1024px)"
                                srcSet="https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img5_m.png"
                            />
                            <img
                                src="https://sienmucangzvtgbnakre.supabase.co/storage/v1/object/public/images/people_img5.png"
                                className="bg-image-5"
                                alt="background"
                                style={{ width: "100%" }}
                            />
                        </picture>
                        <h1 className="typing-group typing-group5-left">
                            <div
                                className="line pre-smbd"
                                data-text="그것이 바로,"
                            ></div>
                        </h1>
                        <h1 className="typing-group typing-group5-right">
                            <div
                                className="line pre-smbd"
                                data-text="우리 자라다가 하는 일입니다."
                            ></div>
                        </h1>
                    </section>

                    <section className="stack-section mobile-fade-layer bg-6">
                        <div className="overlay" />
                        <h1 className="typing-group typing-group6">
                            <div
                                className="line pre-smbd"
                                data-text="진심을 담아, 자라다가 당신에게"
                            ></div>
                        </h1>
                    </section>

                    <section className="stack-section mobile-fade-layer bg-7">
                        <div className="overlay" />
                        <h1 className="typing-group typing-group7">
                            <div
                                className="line signature-line"
                                data-text="Truly yours, Jarada"
                            ></div>
                        </h1>
                    </section>
                </div>
            </section>
        </div>
    )
}
