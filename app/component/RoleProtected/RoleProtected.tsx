"use client"

import { useAuth } from "@/app/_lib/authContext"
import { JSX, ReactElement, ReactNode } from "react"

const RoleProtected = ({
  children,
  requiredRole = "user",
  fallback = null,
}: {
  children: ReactNode
  requiredRole: string
  fallback: ReactElement | null
}) => {
  const { hasRole } = useAuth()

  if (!hasRole(requiredRole)) {
    return (
      fallback || (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>You don&apos;t have permission to access this content.</p>
        </div>
      )
    )
  }

  return children
}

export default RoleProtected
