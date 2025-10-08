"use client"

import { HorizontalScrollNav } from "@/app/component/HorizontalScrollNav/HorizontalScrollNav"
import { useScrollSelection } from "@/app/hooks/useScrollSelection"
import { useState } from "react"

export default function SettingsPage() {
  const [items] = useState<any[]>([
    { id: 1, title: "Introduction", color: "bg-blue-500" },
    { id: 2, title: "Features", color: "bg-purple-500" },
    { id: 3, title: "Technology", color: "bg-green-500" },
    { id: 4, title: "Team", color: "bg-orange-500" },
    { id: 5, title: "Pricing", color: "bg-red-500" },
    { id: 6, title: "Testimonials", color: "bg-pink-500" },
    { id: 7, title: "Contact", color: "bg-indigo-500" },
    { id: 8, title: "Contact", color: "bg-indigo-400" },
    { id: 9, title: "Contact", color: "bg-indigo-300" },
    { id: 10, title: "Contact", color: "bg-indigo-200" },
    { id: 11, title: "Contact", color: "bg-indigo-100" },
  ])

  const { activeIndex, scrollToSection, setSectionRef } = useScrollSelection(
    items.length
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Application Settings</h3>
        <p className="text-gray-600">
          Configure your application preferences here.
        </p>
      </div>

      <div className="sticky -top-9 z-30">
        <HorizontalScrollNav
          items={items}
          activeIndex={activeIndex}
          onItemClick={scrollToSection}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={setSectionRef(index)}
            className={`min-h-screen flex items-center justify-center ${item.color}`}
          >
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-4">{item.title}</h1>
              <p className="text-2xl opacity-90">Section {item.id}</p>
              <p className="mt-4 text-lg opacity-75">
                Scroll down to see the navigation update
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
