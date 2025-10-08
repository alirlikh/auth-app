import { useEffect, useRef, useState } from "react"

export interface ScrollSelectionOptions {
  threshold?: number
  rootMargin?: string
}

export interface ScrollSelectionReturn {
  activeIndex: number
  scrollToSection: (index: number) => void
  setSectionRef: (index: number) => (el: HTMLElement | null) => void
}

export function useScrollSelection(
  itemsCount: number,
  options: ScrollSelectionOptions = {}
): ScrollSelectionReturn {
  const { threshold = 0.5, rootMargin = "-20% 0px -20% 0px" } = options

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLElement
            )

            console.log(index)

            if (index !== -1) {
              setActiveIndex(index)
            }
          }
        })
      },
      { threshold, rootMargin }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  //   useEffect(() => {
  //     const observer = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           let elem = entry.target

  //           console.log(elem)
  //         }
  //       })
  //     })
  //   }, [threshold, rootMargin])

  const scrollToSection = (index: number): void => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  const setSectionRef =
    (index: number) =>
    (el: HTMLElement | null): void => {
      sectionRefs.current[index] = el
    }

  return {
    activeIndex,
    scrollToSection,
    setSectionRef,
  }
}
