import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/dashboard/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import { getUserFromLocalStorage } from "../../utils/helpers";
import { CSS_COLORS } from "../../components/constant/colors";
import toast from "react-hot-toast";
import { fetchCurrencies } from "../../services/services";

// Currency utility functions
const convertAmount = (amount, fromRate, toRate) => {
  if (!amount || !fromRate || !toRate) return 0;
  const amountInUSD = amount / fromRate;
  return amountInUSD * toRate;
};

const formatCurrency = (amount, currency) => {
  if (!currency || amount === null || amount === undefined) return '0.00';
  const formattedAmount = parseFloat(amount).toFixed(2);
  return `${currency.symbol} ${formattedAmount}`;
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState({ 
    code: "NGN", 
    symbol: "₦", 
    rate: 1 
  });
  const [currencies, setCurrencies] = useState([]);

  const navigate = useNavigate();

  // Load currencies from backend
  useEffect(() => {
    const handleFetchCurrencies = async () => {
      try {
        const res = await fetchCurrencies();
        if (res?.data?.success && Array.isArray(res.data.currencies)) {
          setCurrencies(res.data.currencies);

          // Default to NGN if available
          const ngnCurrency = res.data.currencies.find(c => c.code === "NGN");
          if (ngnCurrency) setSelectedCurrency(ngnCurrency);
        }
      } catch (err) {
        console.error("Failed to load currencies", err);
      }
    };

    handleFetchCurrencies();
  }, []);

  // Currency conversion function
  const convertToSelectedCurrency = (amount, sourceCurrency = "NGN") => {
    if (!amount || !selectedCurrency?.rate) return 0;
    
    const sourceCurrencyObj = currencies.find(c => c.code === sourceCurrency) || { rate: 1 };
    const sourceRate = sourceCurrencyObj.rate || 1;
    const targetRate = selectedCurrency.rate || 1;
    
    return convertAmount(amount, sourceRate, targetRate);
  };

  // Load user data
  useEffect(() => {
    const userData = getUserFromLocalStorage();
    if (userData) setUser(userData);
    else handleLogout();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white relative">
      {/* Scattered color blobs - matching homepage style */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-10 w-[300px] h-[300px] bg-pink-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[250px] h-[250px] bg-violet-200/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 right-1/3 w-[300px] h-[300px] bg-fuchsia-200/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-indigo-200/10 rounded-full blur-2xl" />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        currencies={currencies}
        user={user}
        onLogout={handleLogout}
        convertToSelectedCurrency={convertToSelectedCurrency}
        formatCurrency={formatCurrency}
      />

      <div className="flex flex-1 relative z-10">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedCurrency={selectedCurrency}
          convertToSelectedCurrency={convertToSelectedCurrency}
          formatCurrency={formatCurrency}
          user={user}
        />

        <main className="flex-1 pt-16 sm:pt-18 lg:pt-20 lg:ml-64 overflow-x-hidden">
          <div className="w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
            <div className="min-h-full p-3 sm:p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">
              <Outlet context={{
                selectedCurrency,
                setSelectedCurrency,
                currencies,
                convertToSelectedCurrency,
                formatCurrency,
                user
              }} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;