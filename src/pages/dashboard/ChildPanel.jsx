"use client"

import { useState, useEffect } from "react"
import { 
  Eye, EyeOff, Copy, Check, Globe, Shield, DollarSign, User, Info, AlertCircle,
  Plus, Layers, ExternalLink, RefreshCw, Edit, Trash2, X, Settings, TrendingUp,
  Users as UsersIcon, ShoppingCart, CreditCard, Loader2, Mail
} from "lucide-react"
import { toast } from "react-hot-toast"
import { CSS_COLORS, THEME_COLORS } from "../../components/constant/colors"
import {
  getChildPanels,
  createChildPanel,
  deleteChildPanel,
  getChildPanelStats,
  toggleChildPanelStatus,
  generateChildPanelApiKey
} from "../../services/childPanelService"

const currencies = [
  { value: "usd", label: "United States Dollars (USD)", symbol: "$" },
  { value: "ngn", label: "Nigerian Naira (NGN)", symbol: "₦" },
  { value: "eur", label: "Euro (EUR)", symbol: "€" },
  { value: "gbp", label: "British Pound (GBP)", symbol: "£" },
]

const nameservers = ["ns1.perfectdns.com", "ns2.perfectdns.com"]

const ChildPanel = () => {
  const [view, setView] = useState("list") // "list" or "create"
  const [panels, setPanels] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState({
    domain: "",
    panel_name: "",
    currency: "usd",
    admin_username: "",
    admin_email: "",
    admin_password: "",
    confirm_password: "",
    price_per_month: "",
    markup_percentage: "0",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [copiedNameserver, setCopiedNameserver] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadPanels()
  }, [])

  const loadPanels = async () => {
    try {
      setLoading(true)
      const response = await getChildPanels()
      const data = response?.data || response || []
      setPanels(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error loading child panels:", error)
      toast.error(error?.response?.data?.message || "Failed to load child panels")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const copyNameserver = async (nameserver) => {
    try {
      await navigator.clipboard.writeText(nameserver)
      setCopiedNameserver(nameserver)
      toast.success("Nameserver copied!")
      setTimeout(() => setCopiedNameserver(null), 2000)
    } catch (err) {
      console.error("Failed to copy nameserver:", err)
      toast.error("Failed to copy")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.domain.trim()) {
      newErrors.domain = "Domain is required"
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(formData.domain)) {
      newErrors.domain = "Please enter a valid domain name"
    }

    if (!formData.panel_name.trim()) {
      newErrors.panel_name = "Panel name is required"
    }

    if (!formData.admin_username.trim()) {
      newErrors.admin_username = "Admin username is required"
    } else if (formData.admin_username.length < 3) {
      newErrors.admin_username = "Username must be at least 3 characters"
    }

    if (!formData.admin_email.trim()) {
      newErrors.admin_email = "Admin email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.admin_email)) {
      newErrors.admin_email = "Please enter a valid email address"
    }

    if (!formData.admin_password) {
      newErrors.admin_password = "Admin password is required"
    } else if (formData.admin_password.length < 8) {
      newErrors.admin_password = "Password must be at least 8 characters"
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please confirm your password"
    } else if (formData.admin_password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match"
    }

    if (!formData.price_per_month.trim()) {
      newErrors.price_per_month = "Price per month is required"
    } else if (isNaN(Number(formData.price_per_month)) || Number(formData.price_per_month) <= 0) {
      newErrors.price_per_month = "Please enter a valid price"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setCreating(true)
    try {
      const payload = {
        domain: formData.domain.trim(),
        panel_name: formData.panel_name.trim(),
        currency: formData.currency,
        admin_username: formData.admin_username.trim(),
        admin_email: formData.admin_email.trim(),
        admin_password: formData.admin_password,
        price_per_month: Number(formData.price_per_month),
        markup_percentage: Number(formData.markup_percentage) || 0,
        nameservers: nameservers,
      }

      const response = await createChildPanel(payload)
      toast.success(response?.message || "Child panel created successfully!")
      setView("list")
      setFormData({
        domain: "",
        panel_name: "",
        currency: "usd",
        admin_username: "",
        admin_email: "",
        admin_password: "",
        confirm_password: "",
        price_per_month: "",
        markup_percentage: "0",
      })
      await loadPanels()
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message || "Failed to create child panel"
      toast.error(errorMsg)
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (panelId) => {
    if (!confirm("Are you sure you want to delete this child panel? This action cannot be undone.")) {
      return
    }

    try {
      await deleteChildPanel(panelId)
      toast.success("Child panel deleted successfully")
      await loadPanels()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete child panel")
    }
  }

  const handleToggleStatus = async (panelId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "suspended" : "active"
      await toggleChildPanelStatus(panelId, newStatus)
      toast.success(`Child panel ${newStatus === "active" ? "activated" : "suspended"}`)
      await loadPanels()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status")
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-800",
      active: "bg-green-100 text-green-800",
      suspended: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800",
    }
    return badges[status] || badges.pending
  }

  const selectedCurrency = currencies.find((c) => c.value === formData.currency)

  if (view === "create") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-purple-50 p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Create Child Panel</h1>
              <p className="text-gray-600 mt-1">Set up your reseller panel</p>
            </div>
            <button
              onClick={() => setView("list")}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Domain Configuration */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 md:p-6 text-white">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <h2 className="text-xl font-bold">Domain Configuration</h2>
              </div>
              <p className="text-purple-100 mt-1">Set up your custom domain for the child panel</p>
            </div>
            
            <div className="p-4 md:p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="domain" className="block text-sm font-semibold text-gray-700 mb-1">
                  Domain Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="domain"
                  placeholder="example.com"
                  value={formData.domain}
                  onChange={(e) => handleInputChange("domain", e.target.value)}
                  className={`w-full h-12 px-4 py-2 border-2 rounded-lg focus:outline-none ${
                    errors.domain ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                  }`}
                />
                {errors.domain && (
                  <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.domain}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="panel_name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Panel Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="panel_name"
                  placeholder="My SMM Panel"
                  value={formData.panel_name}
                  onChange={(e) => handleInputChange("panel_name", e.target.value)}
                  className={`w-full h-12 px-4 py-2 border-2 rounded-lg focus:outline-none ${
                    errors.panel_name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                  }`}
                />
                {errors.panel_name && (
                  <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.panel_name}
                  </p>
                )}
              </div>

              {/* Nameserver Instructions */}
              <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div className="text-purple-800">
                    <div className="font-semibold mb-2">Please change nameservers to:</div>
                    <div className="space-y-2">
                      {nameservers.map((ns, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                          <code className="font-mono text-sm text-purple-700">{ns}</code>
                          <button
                            onClick={() => copyNameserver(ns)}
                            className="px-3 py-1.5 border border-purple-200 rounded-md text-purple-600 hover:bg-purple-50 transition-colors"
                          >
                            {copiedNameserver === ns ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Configuration */}
          <div className="bg-white rounded-xl shadow-lg border border-purple-100">
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-purple-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Panel Configuration</h2>
                  <p className="text-gray-600">Configure your panel settings and admin credentials</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="currency" className="block text-sm font-semibold text-gray-700 mb-1">
                      Currency <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="currency"
                      value={formData.currency}
                      onChange={(e) => handleInputChange("currency", e.target.value)}
                      className="w-full h-12 px-4 py-2 border-2 border-gray-200 focus:border-purple-500 rounded-lg focus:outline-none"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                          {currency.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pricePerMonth" className="block text-sm font-semibold text-gray-700 mb-1">
                      Price per Month <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-mono">
                        {selectedCurrency?.symbol}
                      </span>
                      <input
                        id="pricePerMonth"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price_per_month}
                        onChange={(e) => handleInputChange("price_per_month", e.target.value)}
                        className={`w-full h-12 pl-8 px-4 py-2 border-2 rounded-lg focus:outline-none ${
                          errors.price_per_month ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                        }`}
                      />
                    </div>
                    {errors.price_per_month && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.price_per_month}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="markup_percentage" className="block text-sm font-semibold text-gray-700 mb-1">
                    Markup Percentage (Optional)
                  </label>
                  <input
                    id="markup_percentage"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    value={formData.markup_percentage}
                    onChange={(e) => handleInputChange("markup_percentage", e.target.value)}
                    className="w-full h-12 px-4 py-2 border-2 border-gray-200 focus:border-purple-500 rounded-lg focus:outline-none"
                  />
                  <p className="text-xs text-gray-500">Additional percentage markup on service prices</p>
                </div>

                <hr className="border-t border-gray-200" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Admin Credentials
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="adminUsername" className="block text-sm font-semibold text-gray-700 mb-1">
                        Admin Username <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="adminUsername"
                        placeholder="Enter admin username"
                        value={formData.admin_username}
                        onChange={(e) => handleInputChange("admin_username", e.target.value)}
                        className={`w-full h-12 px-4 py-2 border-2 rounded-lg focus:outline-none ${
                          errors.admin_username ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                        }`}
                      />
                      {errors.admin_username && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.admin_username}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="adminEmail" className="block text-sm font-semibold text-gray-700 mb-1">
                        Admin Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@example.com"
                        value={formData.admin_email}
                        onChange={(e) => handleInputChange("admin_email", e.target.value)}
                        className={`w-full h-12 px-4 py-2 border-2 rounded-lg focus:outline-none ${
                          errors.admin_email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                        }`}
                      />
                      {errors.admin_email && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.admin_email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="adminPassword" className="block text-sm font-semibold text-gray-700 mb-1">
                        Admin Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="adminPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter admin password"
                          value={formData.admin_password}
                          onChange={(e) => handleInputChange("admin_password", e.target.value)}
                          className={`w-full h-12 px-4 py-2 pr-10 border-2 rounded-lg focus:outline-none ${
                            errors.admin_password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-0 h-12 px-3 hover:bg-gray-50 rounded-r-lg transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                        </button>
                      </div>
                      {errors.admin_password && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.admin_password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm admin password"
                          value={formData.confirm_password}
                          onChange={(e) => handleInputChange("confirm_password", e.target.value)}
                          className={`w-full h-12 px-4 py-2 pr-10 border-2 rounded-lg focus:outline-none ${
                            errors.confirm_password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-purple-500"
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute right-0 top-0 h-12 px-3 hover:bg-gray-50 rounded-r-lg transition-colors"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                        </button>
                      </div>
                      {errors.confirm_password && (
                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.confirm_password}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary and Submit */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-purple-100">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
              <div className="bg-purple-50 p-4 rounded-lg space-y-2 border border-purple-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Domain:</span>
                  <span className="font-medium">{formData.domain || "Not specified"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Panel Name:</span>
                  <span className="font-medium">{formData.panel_name || "Not specified"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Currency:</span>
                  <span className="font-medium">{selectedCurrency?.label}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Price:</span>
                  <span className="font-semibold text-purple-600">
                    {selectedCurrency?.symbol}
                    {formData.price_per_month || "0.00"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={creating}
                className="w-full h-14 px-4 py-2 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg shadow-lg transition-all duration-200 disabled:opacity-70 flex items-center justify-center"
              >
                {creating ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Creating Panel...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5 mr-2" />
                    Create Child Panel
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Child Panels</h1>
            <p className="text-gray-600 mt-1">Manage your reseller panels</p>
          </div>
          <button
            onClick={() => setView("create")}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Create New Panel
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-purple-600" />
          </div>
        ) : panels.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-purple-100">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Child Panels Yet</h3>
            <p className="text-gray-600 mb-6">Create your first child panel to start reselling services</p>
            <button
              onClick={() => setView("create")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Create Your First Panel
            </button>
          </div>
        ) : (
          /* Panels Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {panels.map((panel) => (
              <div
                key={panel.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{panel.panel_name || panel.domain}</h3>
                      <p className="text-purple-100 text-sm">{panel.domain}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(panel.status)}`}>
                      {panel.status?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Currency</div>
                      <div className="font-semibold text-gray-900 uppercase">{panel.currency || "USD"}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Monthly Price</div>
                      <div className="font-semibold text-gray-900">
                        {currencies.find(c => c.value === panel.currency)?.symbol || "$"}
                        {Number(panel.price_per_month || 0).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Balance</div>
                      <div className="font-semibold text-purple-600">
                        {currencies.find(c => c.value === panel.currency)?.symbol || "$"}
                        {Number(panel.balance || 0).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Markup</div>
                      <div className="font-semibold text-gray-900">{Number(panel.markup_percentage || 0).toFixed(1)}%</div>
                    </div>
                  </div>

                  {panel.expires_at && (
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Expires: {new Date(panel.expires_at).toLocaleDateString()}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleToggleStatus(panel.id, panel.status)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        panel.status === "active"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                      }`}
                    >
                      {panel.status === "active" ? "Suspend" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDelete(panel.id)}
                      className="px-3 py-2 bg-red-100 text-red-800 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChildPanel
