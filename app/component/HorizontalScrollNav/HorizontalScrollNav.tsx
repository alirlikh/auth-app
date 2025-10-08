import { useEffect, useRef } from "react"

export interface HorizontalScrollNavProps {
  items: any[]
  activeIndex: number
  onItemClick: (index: number) => void
}

export function HorizontalScrollNav({
  items,
  activeIndex,
  onItemClick,
}: HorizontalScrollNavProps) {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (listRef.current) {
      const container = listRef.current
      const activeItem = container.querySelector(
        `button:nth-child(${activeIndex + 1})`
      ) as HTMLElement
      if (activeItem) {
        const containerRect = container.getBoundingClientRect()
        const itemRect = activeItem.getBoundingClientRect()
        const scrollLeft =
          itemRect.left -
          containerRect.left +
          container.scrollLeft -
          containerRect.width / 2 +
          itemRect.width / 2

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [activeIndex])

  return (
    <div className="bg-white border-b border-gray-200 shadow-lg">
      <div className="px-6 py-3 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
        <p className="text-sm text-gray-500 mt-1">Scroll to explore</p>
      </div>

      <div ref={listRef} className="overflow-x-auto px-6 py-4">
        <div className="flex gap-3 min-w-max">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onItemClick(index)}
              className={`px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                activeIndex === index
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activeIndex === index ? "bg-white" : "bg-gray-400"
                  }`}
                />
                <span className="font-medium">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
