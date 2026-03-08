import * as React from "react"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function JaradaStackSection() {
    useEffect(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".stack-section")
        let currentIndex = 0
        let isAnimating = false

        const dotContainer = document.querySelector(".dot-container")
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

        while (dotPositionsPx.length < 45) {
            dotPositionsPx.push({
                x: Math.random() * 1920,
                y: Math.random() * 1000,
            })
        }

        if (dotContainer && !dotContainer.querySelector(".dot")) {
            dotPositionsPx.forEach((pos) => {
                const dot = document.createElement("div")
                dot.className = "dot"
                dot.style.left = `${pos.x}px`
                dot.style.top = `${pos.y}px`
                dotContainer.appendChild(dot)
            })
        }

        const playFadeUp = (groupElement: Element | null) => {
            if (
                !groupElement ||
                (groupElement as HTMLElement).getAttribute("data-is-done") ===
                    "true"
            )
                return
            ;(groupElement as HTMLElement).setAttribute("data-is-done", "true")
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

        const sectionTriggers: ScrollTrigger[] = []
        for (let i = 0; i < 3; i++) {
            const st = ScrollTrigger.create({
                trigger: sections[i],
                start: "top top",
                pin: true,
                pinSpacing: false,
                zIndex: i + 1,
            })
            sectionTriggers.push(st)
        }

        const sec4 = document.querySelector(".bg-4") as HTMLElement | null
        const text4 = sec4?.querySelector(".typing-4") as HTMLElement | null
        const img4 = sec4?.querySelector(".bg-image-4") as HTMLElement | null
        const blurLayer = sec4?.querySelector(
            ".blur-layer"
        ) as HTMLElement | null
        const text4Content = [
            "효율을 따졌다면 시작하지 않았을 일들.",
            "우리는 이 미련한 집요함을 '자라다의 방식'이라 부릅니다.",
            "그저 남들이 보지 않는 수백개의 점까지 끝까지 들여다볼 뿐입니다.",
        ]

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

        if (text4 && img4 && blurLayer) {
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
                    { width: 1977, height: 1321, duration: 3, ease: "none" },
                    "+=0.5"
                )
                .to(text4, { opacity: 0, y: -30, duration: 0.2 }, "-=2.5")
                .add(() => {
                    const isForward = (tl4.scrollTrigger?.direction ?? 1) > 0
                    text4.innerText = isForward
                        ? text4Content[1]
                        : text4Content[0]
                }, "-=2.3")
                .to(
                    text4,
                    { opacity: 1, y: 0, startAt: { y: 30 }, duration: 0.2 },
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
                    const isForward = (tl4.scrollTrigger?.direction ?? 1) > 0
                    if (isForward) {
                        text4.innerText = text4Content[2]
                        gsap.to(".dot", {
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            stagger: { amount: 0.8, from: "random" },
                            ease: "back.out(1.7)",
                            overwrite: true,
                        })
                    } else {
                        text4.innerText = text4Content[1]
                        gsap.to(".dot", {
                            opacity: 0,
                            scale: 0,
                            duration: 0.3,
                            overwrite: true,
                        })
                    }
                }, "<0.1")
                .to(
                    text4,
                    { opacity: 1, y: 0, startAt: { y: 30 }, duration: 0.2 },
                    "<0.2"
                )
        }

        const sec5 = document.querySelector(".bg-5") as HTMLElement | null
        const img5El = sec5?.querySelector(".bg-image-5") as HTMLElement | null
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

        ScrollTrigger.create({
            trigger: sec5,
            start: "top top",
            pin: true,
            pinSpacing: false,
            zIndex: 20,
        })

        const sec6 = document.querySelector(".bg-6") as HTMLElement | null
        ScrollTrigger.create({
            trigger: sec6,
            start: "top top",
            pin: true,
            pinSpacing: false,
            zIndex: 21,
        })

        const sec7 = document.querySelector(".bg-7") as HTMLElement | null
        ScrollTrigger.create({
            trigger: sec7,
            start: "top top",
            pin: true,
            pinSpacing: false,
            zIndex: 22,
        })

        const activateSection = (index: number) => {
            currentIndex = index

            if (index === 4) {
                playSec5()
                return
            }

            const group = sections[index]?.querySelector(".typing-group")
            if (group) {
                playFadeUp(group)
            }
        }

        sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => activateSection(index),
                onEnterBack: () => activateSection(index),
            })
        })

        const goToSection = (index: number) => {
            if (index < 0 || index >= sections.length || isAnimating) return
            isAnimating = true

            let targetScroll
            if (index === 3) {
                targetScroll = tl4.scrollTrigger?.start ?? 0
            } else if (index <= 2) {
                targetScroll = sectionTriggers[index]?.start ?? 0
            } else {
                const offsetFromEnd = (index - 3) * window.innerHeight
                targetScroll = (tl4.scrollTrigger?.end ?? 0) + offsetFromEnd
            }

            window.scrollTo({
                top: targetScroll,
                behavior: "smooth",
            })

            setTimeout(() => {
                isAnimating = false
                activateSection(index)
            }, 800)
        }

        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            if (isAnimating) return

            const delta = e.deltaY
            const progress = tl4.scrollTrigger?.progress ?? 0

            if (currentIndex === 3) {
                if (delta < 0 && progress <= 0.01) {
                    goToSection(2)
                } else if (delta > 0 && progress >= 0.99) {
                    goToSection(4)
                } else {
                    window.scrollTo(0, window.scrollY + delta)
                }
            } else if (currentIndex >= 4 && currentIndex <= 6) {
                if (delta > 0 && currentIndex < sections.length - 1) {
                    goToSection(currentIndex + 1)
                } else if (delta < 0) {
                    goToSection(currentIndex - 1)
                }
            } else {
                if (delta > 0) goToSection(currentIndex + 1)
                else if (delta < 0) goToSection(currentIndex - 1)
            }
        }

        window.addEventListener("wheel", onWheel, { passive: false })
        window.scrollTo(0, 0)

        const onLoad = () => {
            activateSection(0)
            ScrollTrigger.refresh()
        }

        window.addEventListener("load", onLoad)
        onLoad()

        return () => {
            window.removeEventListener("wheel", onWheel)
            window.removeEventListener("load", onLoad)
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [])
}
