"use client"

import { useState, useEffect } from "react"
import { CreditCard, Bitcoin, ChevronDown, Plus, History, Clock, Loader2, Banknote, MessageCircle, Copy, CheckCircle2, X, Mail, Phone } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { fetchUserData, initiatePayment, initiateManualPayment, paymentHistory } from "../../services/userService"
import { CSS_COLORS } from "../../components/constant/colors"

const AddFunds = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState({ symbol: "₦", code: "NGN" })
  const [selectedMethod, setSelectedMethod] = useState("korapay")
  const [amount, setAmount] = useState("")
  const [activeTab, setActiveTab] = useState("add-funds")
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [transactionHistory, setTransactionHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingData, setIsFetchingData] = useState(true)
  const [showOpayModal, setShowOpayModal] = useState(false)
  const [copiedField, setCopiedField] = useState(null)
  const [submittingProof, setSubmittingProof] = useState(false)

  const opayDetails = {
    bankName: "OPay",
    accountName: "FabulousBoost",
    accountNumber: "8108905252",
    whatsapp: "+08108905252",
    email: "eddyblues13@gmail.com",
  }

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopiedField(null), 2000)
  }

  const paymentMethods = [
    // {
    //   id: "flutterwave",
    //   name: "Flutterwave",
    //   description: "Secure payments via cards, bank transfers, and mobile money. Minimum 100 NGN.",
    //   icon: <CreditCard className="w-5 h-5" style={{ color: CSS_COLORS.primary }} />,
    //   minAmount: 100,
    //   supportedCurrencies: ["NGN", "USD", "GHS", "KES"],
    // },
    {
      id: "korapay",
      name: "Korapay",
      description: "Pay via cards, bank transfers, mobile money, and EFTs. Minimum 100 NGN.",
      icon: <CreditCard className="w-5 h-5" style={{ color: CSS_COLORS.primary }} />,
      minAmount: 100,
      supportedCurrencies: ["NGN", "KES", "GHS", "XAF", "XOF", "EGP", "TZS", "ZAR"],
    },
    {
      id: "opay_manual",
      name: "OPay (Bank Transfer)",
      description: "Transfer directly to our OPay account. Submit proof of payment via WhatsApp or email.",
      icon: <Banknote className="w-5 h-5" style={{ color: CSS_COLORS.primary }} />,
      minAmount: 100,
      supportedCurrencies: ["NGN"],
    },
  ]

  const currencies = [
    { code: "NGN", symbol: "₦", name: "Naira" },
    // { code: "USD", symbol: "$", name: "US Dollar" },
    // { code: "GHS", symbol: "₵", name: "Ghana Cedi" },
    // { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  ]

  const currentMethod = paymentMethods.find((method) => method.id === selectedMethod)
  const supportedCurrencies = currencies.filter(currency =>
    currentMethod?.supportedCurrencies?.includes(currency.code)
  )

  const faqItems = [
    {
      id: "payment-methods",
      title: "What payment methods are available?",
      content: "We support Korapay for instant card & bank payments, and OPay for direct bank transfers. With OPay, simply transfer to our account and submit your proof of payment via WhatsApp or email for quick processing.",
    },
    {
      id: "deposit-time",
      title: "How long do deposits take?",
      content: "Card payments are instant. Bank transfers may take a few minutes to process. Once confirmed, your funds will be added to your account immediately.",
    },
    {
      id: "failed-payments",
      title: "What if my payment fails?",
      content: "Check your payment details and try again. If issues persist, contact support with your transaction reference. Funds from failed transactions are typically refunded within 24 hours.",
    },
  ]

  // Fetch user data and transaction history
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetchingData(true)
        const [userResponse, historyResponse] = await Promise.all([
          fetchUserData(),
          paymentHistory(),
        ])

        setUser(userResponse.data)
        setTransactionHistory(historyResponse.data || [])

        // Set user's currency if available
        if (userResponse.data?.currency) {
          const userCurrency = currencies.find(c => c.code === userResponse.data.currency)
          if (userCurrency) {
            setSelectedCurrency(userCurrency)
          }
        }
      } catch (err) {
        toast.error("Failed to fetch data. Please refresh the page.")
      } finally {
        setIsFetchingData(false)
      }
    }
    fetchData()
  }, [])

  const handlePayment = async () => {
    if (!amount || isNaN(amount)) {
      toast.error("Please enter a valid amount")
      return
    }

    const numericAmount = Number(amount)
    if (numericAmount < currentMethod?.minAmount) {
      toast.error(`Minimum amount is ${currentMethod?.minAmount} ${selectedCurrency.code}`)
      return
    }

    // For OPay manual payment, show modal with account details
    if (selectedMethod === "opay_manual") {
      setShowOpayModal(true)
      return
    }

    setIsLoading(true)

    try {
      const paymentData = {
        amount: numericAmount,
        payment_method: selectedMethod,
      }

      const response = await initiatePayment(paymentData)

      if (response.success && response.payment_url) {
        // Simply redirect to payment URL - no localStorage needed
        window.location.href = response.payment_url
      } else {
        throw new Error(response.message || 'Payment gateway error')
      }
    } catch (error) {
      console.error('Payment error:', {
        error: error,
        response: error.response,
        message: error.message
      })
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Payment initiation failed. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleProofSubmit = async (proofMethod) => {
    setSubmittingProof(true)
    try {
      // Create pending transaction in backend
      const response = await initiateManualPayment({
        amount: Number(amount),
        payment_method: 'opay_manual',
        proof_method: proofMethod,
      })

      if (response.success) {
        const txRef = response.transaction_id

        toast.success('Transaction recorded! Redirecting you to submit proof...')

        // Construct the WhatsApp/email URL with transaction reference
        if (proofMethod === 'whatsapp') {
          const waMessage = encodeURIComponent(
            `Hi, I just made a bank transfer of ${formatCurrency(amount, selectedCurrency.code)} to your OPay account (${opayDetails.accountNumber}).\n\nTransaction Reference: ${txRef}\nMy account email: ${user?.email || ''}\n\nPlease verify and credit my account. Thank you!`
          )
          window.open(`https://wa.me/${opayDetails.whatsapp.replace(/[^0-9]/g, '')}?text=${waMessage}`, '_blank')
        } else {
          const emailSubject = encodeURIComponent(`Payment Proof - ${formatCurrency(amount, selectedCurrency.code)} - Ref: ${txRef}`)
          const emailBody = encodeURIComponent(
            `Hello,\n\nI have made a bank transfer of ${formatCurrency(amount, selectedCurrency.code)} to your OPay account (${opayDetails.accountNumber}).\n\nTransaction Reference: ${txRef}\nMy account email: ${user?.email || ''}\n\nPlease find attached the proof of payment.\n\nThank you!`
          )
          window.open(`mailto:${opayDetails.email}?subject=${emailSubject}&body=${emailBody}`, '_blank')
        }

        // Close modal, reset amount, refresh history
        setShowOpayModal(false)
        setAmount('')

        // Refresh transaction history
        try {
          const historyResponse = await paymentHistory()
          setTransactionHistory(historyResponse.data || [])
        } catch (e) {
          // Non-critical, don't show error
        }
      } else {
        throw new Error(response.message || 'Failed to record transaction')
      }
    } catch (error) {
      console.error('Manual payment error:', error)
      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Failed to record transaction. Please try again.'
      )
    } finally {
      setSubmittingProof(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatCurrency = (amount, currency = 'NGN') => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  // OPay Modal component
  const OpayModal = () => {
    if (!showOpayModal) return null
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                <Banknote className="w-5 h-5" style={{ color: '#2E7D32' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Bank Transfer Details</h3>
                <p className="text-sm text-gray-500">Send exactly the amount below</p>
              </div>
            </div>
            <button onClick={() => setShowOpayModal(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Amount Display */}
          <div className="mx-6 mt-6 p-4 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <p className="text-white/80 text-sm mb-1">Amount to Transfer</p>
            <p className="text-white text-3xl font-bold">{formatCurrency(amount, selectedCurrency.code)}</p>
          </div>

          {/* Account Details */}
          <div className="p-6 space-y-4">
            <div className="space-y-3">
              {/* Bank Name */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Bank</p>
                  <p className="text-base font-semibold text-gray-900">{opayDetails.bankName}</p>
                </div>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Account Number</p>
                  <p className="text-base font-semibold text-gray-900 font-mono">{opayDetails.accountNumber}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(opayDetails.accountNumber, 'account')}
                  className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Copy account number"
                >
                  {copiedField === 'account' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
                </button>
              </div>

              {/* Account Name */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Account Name</p>
                  <p className="text-base font-semibold text-gray-900">{opayDetails.accountName}</p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-800 font-medium">⚠️ Important</p>
              <p className="text-sm text-amber-700 mt-1">Transfer the exact amount shown above. Your account will be credited after payment verification.</p>
            </div>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-sm text-gray-500">Submit Proof of Payment</span>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-3">
              <button
                onClick={() => handleProofSubmit('whatsapp')}
                disabled={submittingProof}
                className="flex items-center justify-center space-x-3 w-full py-3.5 px-4 rounded-xl font-medium transition-all duration-200 hover:opacity-90 hover:scale-[1.01] text-white disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#25D366' }}
              >
                {submittingProof ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageCircle className="w-5 h-5" />}
                <span>{submittingProof ? 'Recording...' : 'Send Proof via WhatsApp'}</span>
              </button>

              <button
                onClick={() => handleProofSubmit('email')}
                disabled={submittingProof}
                className="flex items-center justify-center space-x-3 w-full py-3.5 px-4 rounded-xl font-medium transition-all duration-200 hover:opacity-90 hover:scale-[1.01] border-2 text-gray-700 border-gray-200 hover:border-gray-300 bg-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submittingProof ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                <span>{submittingProof ? 'Recording...' : 'Send Proof via Email'}</span>
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center">Verification typically takes 5–30 minutes during business hours.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "transparent" }}>
      {/* OPay Transfer Modal */}
      <OpayModal />
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="w-full p-4 space-y-6">
          {/* Tab Navigation */}
          <div className="flex rounded-full p-1" style={{ backgroundColor: CSS_COLORS.background.muted }}>
            <button
              onClick={() => setActiveTab("add-funds")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-full font-medium transition-all ${activeTab === "add-funds" ? "text-white shadow-lg" : "text-gray-600"
                }`}
              style={{
                backgroundColor: activeTab === "add-funds" ? CSS_COLORS.primary : "transparent",
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Funds</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-full font-medium transition-all ${activeTab === "history" ? "text-white shadow-lg" : "text-gray-600"
                }`}
              style={{
                backgroundColor: activeTab === "history" ? CSS_COLORS.primary : "transparent",
              }}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>
          </div>

          {activeTab === "add-funds" ? (
            <>
              {/* Deposit Form */}
              <div
                className="rounded-2xl p-6 shadow-lg border border-purple-100 bg-white/80 backdrop-blur-sm"
                style={{ backgroundColor: CSS_COLORS.background.card }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Deposit Funds</h2>

                <div className="space-y-4">
                  {/* Currency Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Currency</label>
                    <div className="relative">
                      <select
                        value={selectedCurrency.code}
                        onChange={(e) => {
                          const currency = currencies.find(c => c.code === e.target.value)
                          setSelectedCurrency(currency || selectedCurrency)
                        }}
                        className="w-full px-4 py-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 appearance-none bg-white hover:border-purple-300"
                        style={{ backgroundColor: CSS_COLORS.background.muted }}
                        disabled={isLoading}
                      >
                        {supportedCurrencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.name} ({currency.symbol})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                    <div className="relative">
                      <select
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="w-full px-4 py-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 appearance-none bg-white hover:border-purple-300"
                        style={{ backgroundColor: CSS_COLORS.background.muted }}
                        disabled={isLoading}
                      >
                        {paymentMethods.map((method) => (
                          <option
                            key={method.id}
                            value={method.id}
                            disabled={!method.supportedCurrencies.includes(selectedCurrency.code)}
                          >
                            {method.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{currentMethod?.description}</p>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Amount</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder={`Enter amount (min ${currentMethod?.minAmount} ${selectedCurrency.code})`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white hover:border-purple-300"
                        style={{ backgroundColor: CSS_COLORS.background.muted }}
                        disabled={isLoading}
                        min={currentMethod?.minAmount}
                        step="any"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {selectedCurrency.symbol}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Minimum: {formatCurrency(currentMethod?.minAmount, selectedCurrency.code)}
                    </p>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handlePayment}
                    disabled={!amount || Number(amount) < currentMethod?.minAmount || isLoading}
                    className="w-full flex items-center justify-center text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ${amount ? formatCurrency(amount, selectedCurrency.code) : ''}`
                    )}
                  </button>
                </div>
              </div>

              {/* FAQ Section */}
              <div
                className="rounded-2xl p-6 shadow-lg border border-purple-100 bg-white/80 backdrop-blur-sm"
                style={{ backgroundColor: CSS_COLORS.background.card }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Deposit Help</h3>

                <div className="space-y-3">
                  {faqItems.map((item) => (
                    <div key={item.id} className="border border-purple-100 rounded-xl overflow-hidden bg-white/50 hover:border-purple-200 transition-colors">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-50 transition-colors duration-200"
                      >
                        <span className="font-medium text-gray-800">{item.title}</span>
                        <Plus
                          className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === item.id ? "rotate-45" : ""
                            }`}
                        />
                      </button>
                      {expandedFaq === item.id && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-gray-600">{item.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Transaction History */
            <div
              className="rounded-2xl p-6 shadow-sm border border-white/50 backdrop-blur-sm"
              style={{ backgroundColor: CSS_COLORS.background.card }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>

              <div className="space-y-3">
                {isFetchingData ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : transactionHistory.length > 0 ? (
                  transactionHistory.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border border-purple-100 rounded-xl bg-white/50 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200"
                    >
                      <div>
                        <p className="font-medium text-gray-800 capitalize">
                          {tx.transaction_id}
                        </p>
                        <p className="font-medium text-gray-800 capitalize">
                          {tx.transaction_type}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(tx.created_at)}
                        </p>
                        <p className="text-sm text-gray-400">
                          {tx.description || 'No description'}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold" style={{ color: CSS_COLORS.primary }}>
                          {formatCurrency(tx.amount, tx.currency || 'NGN')}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${tx.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : tx.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                            }`}>
                            {tx.status}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Fee: {formatCurrency(tx.charge)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No transactions found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="w-full p-4 xl:p-6">
          <div className="flex gap-6">
            {/* Left Column - Deposit Form */}
            <div className="flex-1 max-w-2xl">
              {/* Tab Navigation */}
              <div className="flex rounded-full p-1 mb-6" style={{ backgroundColor: CSS_COLORS.background.muted }}>
                <button
                  onClick={() => setActiveTab("add-funds")}
                  className={`flex items-center space-x-2 py-3 px-6 rounded-full font-medium transition-all ${activeTab === "add-funds" ? "text-white shadow-lg" : "text-gray-600"
                    }`}
                  style={{
                    backgroundColor: activeTab === "add-funds" ? CSS_COLORS.primary : "transparent",
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Funds</span>
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex items-center space-x-2 py-3 px-6 rounded-full font-medium transition-all ${activeTab === "history" ? "text-white shadow-lg" : "text-gray-600"
                    }`}
                  style={{
                    backgroundColor: activeTab === "history" ? CSS_COLORS.primary : "transparent",
                  }}
                >
                  <History className="w-4 h-4" />
                  <span>History</span>
                </button>
              </div>

              {activeTab === "add-funds" ? (
                /* Deposit Form */
                <div
                  className="rounded-2xl p-8 shadow-lg border border-purple-100 bg-white/80 backdrop-blur-sm"
                  style={{ backgroundColor: CSS_COLORS.background.card }}
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-8">Deposit Funds</h2>

                  <div className="space-y-6">
                    {/* Currency Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Currency</label>
                      <div className="relative">
                        <select
                          value={selectedCurrency.code}
                          onChange={(e) => {
                            const currency = currencies.find(c => c.code === e.target.value)
                            setSelectedCurrency(currency || selectedCurrency)
                          }}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors appearance-none text-base"
                          style={{ backgroundColor: CSS_COLORS.background.muted }}
                          disabled={isLoading}
                        >
                          {supportedCurrencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                              {currency.name} ({currency.symbol})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Method Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                      <div className="relative">
                        <select
                          value={selectedMethod}
                          onChange={(e) => setSelectedMethod(e.target.value)}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors appearance-none text-base"
                          style={{ backgroundColor: CSS_COLORS.background.muted }}
                          disabled={isLoading}
                        >
                          {paymentMethods.map((method) => (
                            <option
                              key={method.id}
                              value={method.id}
                              disabled={!method.supportedCurrencies.includes(selectedCurrency.code)}
                            >
                              {method.name} {method.bonus ? `(${method.bonus})` : ""}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{currentMethod?.description}</p>
                    </div>

                    {/* Amount Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Amount</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder={`Enter amount (min ${currentMethod?.minAmount} ${selectedCurrency.code})`}
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base"
                          style={{ backgroundColor: CSS_COLORS.background.muted }}
                          disabled={isLoading}
                          min={currentMethod?.minAmount}
                          step="any"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {selectedCurrency.symbol}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Minimum: {formatCurrency(currentMethod?.minAmount, selectedCurrency.code)}
                      </p>
                    </div>

                    {/* Pay Button */}
                    <button
                      onClick={handlePayment}
                      disabled={!amount || Number(amount) < currentMethod?.minAmount || isLoading}
                      className="w-full flex items-center justify-center text-white font-semibold py-4 px-6 rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                      style={{ backgroundColor: CSS_COLORS.primary }}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay ${amount ? formatCurrency(amount, selectedCurrency.code) : ''}`
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Transaction History */
                <div
                  className="rounded-2xl p-8 shadow-lg border border-purple-100 bg-white/80 backdrop-blur-sm"
                  style={{ backgroundColor: CSS_COLORS.background.card }}
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">Transaction History</h3>

                  <div className="overflow-hidden border border-gray-200 rounded-xl">
                    <table className="w-full">
                      <thead style={{ backgroundColor: CSS_COLORS.background.muted }}>
                        <tr>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700">Transaction ID</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700">Type</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                          <th className="text-right py-4 px-6 font-semibold text-gray-700">Amount</th>
                          <th className="text-right py-4 px-6 font-semibold text-gray-700">Charge</th>
                          <th className="text-center py-4 px-6 font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isFetchingData ? (
                          <tr>
                            <td colSpan={6} className="text-center py-8">
                              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                            </td>
                          </tr>
                        ) : transactionHistory.length > 0 ? (
                          transactionHistory.map((tx) => (
                            <tr
                              key={tx.id}
                              className="border-t border-gray-200 hover:bg-gray-50"
                            >
                              <td className="py-4 px-6 font-medium text-gray-800 capitalize">
                                {tx.transaction_id}
                              </td>
                              <td className="py-4 px-6 font-medium text-gray-800 capitalize">
                                {tx.transaction_type}
                              </td>
                              <td className="py-4 px-6 text-gray-600">
                                {formatDate(tx.created_at)}
                              </td>
                              <td className="py-4 px-6 text-right font-semibold" style={{ color: CSS_COLORS.primary }}>
                                {formatCurrency(tx.amount, tx.currency || 'NGN')}
                              </td>
                              <td className="py-4 px-6 text-right text-gray-600">
                                {formatCurrency(tx.charge)}
                              </td>
                              <td className="py-4 px-6 text-center">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${tx.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}
                                >
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center py-12">
                              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                              <p className="text-gray-500">No transactions found</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - FAQ */}
            <div className="w-96">
              <div
                className="rounded-2xl p-6 shadow-sm border border-white/50 backdrop-blur-sm sticky top-24"
                style={{ backgroundColor: CSS_COLORS.background.card }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Deposit Information</h3>

                <div className="space-y-3">
                  {faqItems.map((item) => (
                    <div key={item.id} className="border border-purple-100 rounded-xl overflow-hidden bg-white/50 hover:border-purple-200 transition-colors">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-purple-50 transition-colors duration-200"
                      >
                        <span className="font-medium text-gray-800 text-sm">{item.title}</span>
                        <Plus
                          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2 ${expandedFaq === item.id ? "rotate-45" : ""
                            }`}
                        />
                      </button>
                      {expandedFaq === item.id && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600 mt-3">{item.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFunds