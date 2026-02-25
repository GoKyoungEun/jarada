gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = gsap.utils.toArray(".stack-section");
// 만약 sections.length가 5가 아니라면 HTML의 클래스명을 다시 확인해야 합니다.
let currentIndex = 0;
let isAnimating = false;

// 1. 점 생성 (45개 유지)
const dotContainer = document.querySelector(".dot-container");
const dotPositionsPx = [{x: 1629, y: 233}, {x: 1713, y: 299}, {x: 1701, y: 378}, {x: 1746, y: 635}, {x: 1677, y: 604}, {x: 1533, y: 726}, {x: 1456, y: 937}, {x: 1302, y: 823}, {x: 1085, y: 886}, {x: 996, y: 843}, {x: 1064, y: 644}, {x: 1257, y: 650}, {x: 1423, y: 485}, {x: 1397, y: 455}, {x: 1558, y: 149}, {x: 1388, y: 45}, {x: 1165, y: 288}, {x: 1142, y: 264}, {x: 1101, y: 54}, {x: 1054, y: 143}, {x: 973, y: 279}, {x: 933, y: 276}, {x: 808, y: 60}, {x: 840, y: 146}, {x: 712, y: 202}, {x: 691, y: 264}, {x: 709, y: 220}, {x: 383, y: 121}, {x: 319, y: 183}, {x: 482, y: 208}, {x: 490, y: 345}, {x: 252, y: 362}, {x: 189, y: 467}, {x: 277, y: 521}, {x: 347, y: 482}, {x: 359, y: 488}, {x: 404, y: 537}, {x: 674, y: 887}, {x: 811, y: 747}, {x: 259, y: 719}, {x: 398, y: 695}, {x: 461, y: 790}, {x: 526, y: 881}, {x: 628, y: 655}, {x: 703, y: 572}];

while(dotPositionsPx.length < 45) { 
    dotPositionsPx.push({ x: Math.random() * 1920, y: Math.random() * 1000 }); 
}

dotPositionsPx.forEach(pos => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = `${pos.x}px`;
    dot.style.top = `${pos.y}px`;
    dotContainer.appendChild(dot);
});

// 2. 타이핑 함수
const typeLine = (element, text) => {
    return new Promise((resolve) => {
        let i = 0;
        element.innerText = "";
        element.style.opacity = "1";
        const typing = () => {
            if (i <= text.length) {
                element.innerText = text.substring(0, i);
                i++;
                setTimeout(typing, 50);
            } else { resolve(); }
        };
        typing();
    });
};

const playTyping = async (groupElement) => {
    if (!groupElement || groupElement.getAttribute("data-is-done") === "true") return;
    groupElement.setAttribute("data-is-done", "true");
    const lines = groupElement.querySelectorAll(".line");
    for (const line of lines) { 
        await typeLine(line, line.getAttribute("data-text")); 
    }
};

// 3. 1~3번 섹션 트리거 (먼저 생성)
const sectionTriggers = [];
for (let i = 0; i < 3; i++) {
    const st = ScrollTrigger.create({
        trigger: sections[i],
        start: "top top",
        pin: true,
        pinSpacing: false,
        zIndex: i + 1
    });
    sectionTriggers.push(st);
    const groupEl = sections[i].querySelector(".typing-group");
    if(groupEl && i > 0) groupEl.querySelectorAll(".line").forEach(l => l.innerText = "");
}

// 4. 4번 섹션 타임라인
const sec4 = document.querySelector(".bg-4");
const text4 = sec4.querySelector(".typing-4");
const img4 = sec4.querySelector(".bg-image-4");
const blurLayer = sec4.querySelector(".blur-layer");
const text4Content = ["효율을 따졌다면 시작하지 않았을 일들.", "우리는 이 미련한 집요함을 ‘자라다의 방식'이라 부릅니다.", "그저 남들이 보지 않는 수백개의 점까지 끝까지 들여다볼 뿐입니다."];

const tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: sec4,
        start: "top top",
        end: "+=4000",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
    }
});

tl4.set(text4, { opacity: 0, y: 30 })
    .to(text4, { opacity: 1, y: 0, duration: 0.5, onStart: () => { text4.innerText = text4Content[0]; } })
    .to(img4, { width: 1977, height: 1321, duration: 3, ease: "none" }, "+=0.5")
    .to(text4, { opacity: 0, y: -30, duration: 0.2 }, "-=2.5")
    .add(() => {
        const isForward = tl4.scrollTrigger.direction > 0;
        text4.innerText = isForward ? text4Content[1] : text4Content[0];
    }, "-=2.3")
    .to(text4, { opacity: 1, y: 0, startAt: { y: 30 }, duration: 0.2 }, "-=2.2")
    .to(blurLayer, { backdropFilter: "blur(15px)", background: "rgba(255, 255, 255, 0.5)", duration: 2 }, "+=0.5")
    .to(text4, { opacity: 0, y: -30, duration: 0.2 }, "<")
    .add(() => {
        const isForward = tl4.scrollTrigger.direction > 0;
        if (isForward) {
            text4.innerText = text4Content[2];
            gsap.to(".dot", { opacity: 1, scale: 1, duration: 0.6, stagger: { amount: 0.8, from: "random" }, ease: "back.out(1.7)", overwrite: true });
        } else {
            text4.innerText = text4Content[1];
            gsap.to(".dot", { opacity: 0, scale: 0, duration: 0.3, overwrite: true });
        }
    }, "<0.1")
    .to(text4, { opacity: 1, y: 0, startAt: { y: 30 }, duration: 0.2 }, "<0.2");

// 5. 5번 섹션 트리거 (강력하게 분리 및 Z-index 조정)
const sec5 = document.querySelector(".bg-5");
const typing5 = sec5.querySelector(".typing-group");

const st5 = ScrollTrigger.create({
    trigger: sec5,
    start: () => tl4.scrollTrigger.end,  // .bg-4 타임라인이 정확히 끝나는 위치에서 시작
    pin: true,
    pinSpacing: false,
    zIndex: 20,
    onEnter: () => {
        if (typing5) playTyping(typing5);
    }
});

// 6. 이동 함수 (정확한 인덱스 기반 목적지 설정)
const goToSection = (index) => {
    if (index < 0 || index >= sections.length || isAnimating) return;
    isAnimating = true;
    
    let targetScroll;
    if (index === 4) {
        targetScroll = tl4.scrollTrigger.end; // 5번 섹션
    } else if (index === 3) {
        targetScroll = tl4.scrollTrigger.start; // 4번 섹션
    } else {
        targetScroll = sectionTriggers[index].start; // 1~3번 섹션
    }

    gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
            currentIndex = index;
            isAnimating = false;
            // 타이핑은 모든 섹션의 .typing-group 공통 처리
            const group = sections[currentIndex].querySelector(".typing-group");
            if (group) playTyping(group);
        }
    });
};

// 7. 휠 핸들러 (5번 섹션 진입 차단 현상 해결)
window.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (isAnimating) return;

    const delta = e.deltaY;
    const progress = tl4.scrollTrigger.progress;

    if (currentIndex === 3) {
        // 4번 섹션 내부일 때
        if (delta < 0 && progress <= 0.01) {
            goToSection(2);
        } else if (delta > 0 && progress >= 0.99) {
            goToSection(4); // 5번으로 강제 점프
        } else {
            // 직접 윈도우 스크롤을 delta만큼 움직여서 scrub 유도
            window.scrollTo(0, window.scrollY + delta);
        }
    } else if (currentIndex === 4) {
        // 5번 섹션일 때 위로 올리면 다시 4번으로
        if (delta < 0) goToSection(3);
    } else {
        // 1~3번 섹션
        if (delta > 0) goToSection(currentIndex + 1);
        else if (delta < 0) goToSection(currentIndex - 1);
    }
}, { passive: false });

// 8. 페이지 로드 초기화
window.scrollTo(0, 0);
window.addEventListener("load", () => {
    const firstGroup = sections[0].querySelector(".typing-group");
    if (firstGroup) playTyping(firstGroup);
    // 모든 좌표를 다시 계산하도록 리프레시
    ScrollTrigger.refresh();
});