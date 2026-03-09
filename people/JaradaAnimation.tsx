import * as React from "react"
import { useEffect, useState } from "react"
import JaradaStackSectionDesktop from "./JaradaStackSectionDesktop"
import JaradaStackSectionMobile from "./JaradaStackSectionMobile"

const MOBILE_QUERY = "(max-width: 1024px)"

export default function JaradaStackSection() {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === "undefined") return false
        return window.matchMedia(MOBILE_QUERY).matches
    })

    useEffect(() => {
        if (typeof window === "undefined") return

        const mediaQuery = window.matchMedia(MOBILE_QUERY)
        const updateMatch = () => setIsMobile(mediaQuery.matches)

        updateMatch()

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", updateMatch)
            return () => mediaQuery.removeEventListener("change", updateMatch)
        }

        mediaQuery.addListener(updateMatch)
        return () => mediaQuery.removeListener(updateMatch)
    }, [])

    if (isMobile) {
        return <JaradaStackSectionMobile />
    }

    return <JaradaStackSectionDesktop />
}
