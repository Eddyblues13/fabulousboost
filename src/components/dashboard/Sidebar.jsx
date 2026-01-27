"use client"

import { NavLink, useLocation } from "react-router-dom"
import {
  ShoppingCart,
  CreditCard,
  History,
  Headphones,
  Settings,
  DollarSign,
  Server,
  RefreshCw,
  Bell,
  BookOpen,
  Menu,
  Layers
} from "lucide-react"
import { CSS_COLORS, THEME_COLORS } from "../constant/colors"
import { useEffect } from "react"

const Sidebar = ({ sidebarOpen, setSidebarOpen, user }) => {
  const location = useLocation()

  // Collapse sidebar on mobile after route change
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [location.pathname])

  const sidebarItems = [
    { icon: ShoppingCart, label: "New order", to: "/dashboard" },
    { icon: CreditCard, label: "Add funds", to: "/dashboard/add-funds" },
    { icon: History, label: "Order history", to: "/dashboard/orders" },
    { icon: Headphones, label: "Customer Support", to: "/dashboard/support" },
    { icon: Settings, label: "Services", to: "/dashboard/services" },
    { icon: DollarSign, label: "Make money", to: "/dashboard/affiliate" },
    { icon: Layers, label: "Child Panel", to: "/dashboard/child-panel" },
    { icon: Server, label: "API", to: "/dashboard/api" },
    { icon: Bell, label: "Notifications", to: "/dashboard/notifications" },
    { icon: RefreshCw, label: "Updates", to: "/dashboard/updates" },
    { icon: BookOpen, label: "Tutorials", to: "/dashboard/tutorials" }
  ]

  return (
    <>
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 sm:w-72 lg:w-64
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto text-white
        `}
        style={{
          background: CSS_COLORS.background.sidebar,
          boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Toggle */}
          <div className={`p-4 sm:p-5 lg:p-6 border-b ${THEME_COLORS.border.primary200}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-base sm:text-lg truncate">fabulousboost.com</span>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-1 rounded-lg transition-colors flex-shrink-0 ${THEME_COLORS.hover.primary100}`}
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className={`p-4 sm:p-5 lg:p-6 border-b border-white/10`}>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border-2 border-white/20 shadow-lg">
                  {user?.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.username || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl sm:text-2xl">
                      {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-800"></div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white font-semibold text-sm sm:text-base truncate">{user?.username || "Loading..."}</div>
                <div className="text-xs sm:text-sm text-white/60">Active now</div>
              </div>
            </div>
          </div>

          {/* Menu Title */}
          <div className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4">
            <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
              Menu
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 sm:px-4 pb-4">
            <div className="space-y-1.5">
              {sidebarItems.map((item, index) => {
                const isActive = location.pathname === item.to
                return (
                  <NavLink
                    key={index}
                    to={item.to}
                    className={`relative w-full flex items-center space-x-3 sm:space-x-3 px-4 sm:px-4 py-3 sm:py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "text-white font-semibold shadow-lg"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    style={
                      isActive
                        ? { 
                            background: CSS_COLORS.background.activeSidebar,
                            transform: "scale(1.02)"
                          }
                        : {}
                    }
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                    )}
                    <item.icon
                      className={`w-5 h-5 transition-all duration-200 flex-shrink-0 ${
                        isActive
                          ? "text-white scale-110"
                          : "text-white/70 group-hover:text-white group-hover:scale-105"
                      }`}
                    />
                    <span className="relative z-10 text-sm sm:text-base truncate">{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
