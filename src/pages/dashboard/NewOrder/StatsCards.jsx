"use client"
import React from "react"
import { Wallet, Crown, User, Package } from "lucide-react"

const StatsCards = ({ user, formattedBalance, selectedCurrency }) => {
  return (
    <>
      {/* Mobile Stats Cards - Vertical Stack */}
      <div className="lg:hidden space-y-3 w-full">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 shadow-lg shadow-purple-200/50 w-full overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex-shrink-0">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-white/80 mb-1 font-medium">Balance</p>
              <h3 className="text-xl font-bold text-white truncate">{formattedBalance}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-3 flex-shrink-0">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 mb-1 font-medium">Status</p>
              <h3 className="text-lg font-bold text-gray-800 truncate">{user?.status || "NEW"}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl p-3 flex-shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-xs text-gray-500 mb-1 font-medium">Username</p>
              <h3 
                className="text-base font-bold text-gray-800 truncate break-words"
                title={user?.username || "loading.."}
              >
                {user?.username || "loading.."}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-3 flex-shrink-0">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 mb-1 font-medium">Orders</p>
              <h3 className="text-lg font-bold text-gray-800">{user?.total_orders || "0"}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Stats Cards */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl shadow-purple-200/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex-shrink-0">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white/80 mb-2 font-medium">Account Balance</p>
              <h3 className="text-2xl font-bold text-white truncate">{formattedBalance}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-4 flex-shrink-0">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500 mb-2 font-medium">Account Status</p>
              <h3 className="text-xl font-bold text-gray-800 truncate">{user?.status || "NEW"}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl p-4 flex-shrink-0">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-sm text-gray-500 mb-2 font-medium">Username</p>
              <h3 
                className="text-xl font-bold text-gray-800 truncate break-all"
                title={user?.username || "loading.."}
              >
                {user?.username || "loading.."}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 flex-shrink-0">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500 mb-2 font-medium">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-800">{user?.total_orders || "0"}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StatsCards
