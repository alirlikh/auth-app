import { FC, lazy, Suspense, useRef, useState } from "react"
const ArrowIcon = lazy(() => import("../icons/ArrowIcon"))

export interface MenuItem {
  title: string
  link: string
  children?: MenuItem[]
}

export interface MenuProps {
  items: MenuItem[]
  isRoot?: boolean
}

export const menuList: MenuItem[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
    children: [
      { title: "Team", link: "/about/team" },
      {
        title: "Company",
        link: "/about/company",
        children: [
          { title: "History", link: "/about/company/history" },
          { title: "Vision", link: "/about/company/vision" },
        ],
      },
    ],
  },
  { title: "Services", link: "/services" },
]

const Menu: FC<MenuProps> = ({ items, isRoot = false }) => {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  return (
    <ul
      role="menu"
      className={
        isRoot
          ? "flex flex-row space-x-6"
          : "absolute left-[70] top-10 bg-gray-200 z-50 rounded-lg p-2 m-2"
      }
    >
      {items.map((item) => {
        const hasChildren = !!item.children?.length

        const focusSibling = (direction: number) => {
          const parent = buttonRef.current?.closest("ul")
          if (!parent) return
          const buttons = parent.querySelectorAll<HTMLButtonElement>(
            "button[role='menuitem']"
          )
          const currentIndex = Array.from(buttons).indexOf(buttonRef.current!)
          const nextIndex =
            (currentIndex + direction + buttons.length) % buttons.length
          buttons[nextIndex]?.focus()
        }

        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
          switch (e.key) {
            case "Enter":
            case " ":
              e.preventDefault()
              if (hasChildren) setOpen(!open)
              else window.location.href = item.link
              break
            case "ArrowRight":
              if (hasChildren) setOpen(true)
              break
            case "ArrowLeft":
              if (open) setOpen(false)
              break
            case "ArrowDown":
              e.preventDefault()
              focusSibling(1)
              break
            case "ArrowUp":
              e.preventDefault()
              focusSibling(-1)
              break
          }
        }

        return (
          <li key={item.link} className="relative">
            <button
              ref={buttonRef}
              role="menuitem"
              aria-haspopup={hasChildren}
              aria-expanded={hasChildren ? open : undefined}
              tabIndex={0}
              className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
              onClick={(e) => {
                if (hasChildren) {
                  e.preventDefault()
                  setOpen(!open)
                } else {
                  window.location.href = item.link
                }
              }}
              onKeyDown={handleKeyDown}
            >
              <span>{item.title}</span>
              {Boolean(hasChildren) && (
                <span className="w-5 pl-2">
                  <Suspense>
                    {open ? (
                      <ArrowIcon className="rotate-180" />
                    ) : (
                      <ArrowIcon />
                    )}
                  </Suspense>
                </span>
              )}
            </button>
            {hasChildren && open && <Menu items={item.children!} />}
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
