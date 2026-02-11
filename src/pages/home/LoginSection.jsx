import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, User, Lock, LogIn, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { loginSchema } from '../../utils/validation';


const LoginSection = ({ variant = "standalone" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const APP_URL = import.meta.env.VITE_APP_BASE_URL;


  const loginUser = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Validate fields
      await loginSchema.validate({ login, password }, { abortEarly: false });

      setIsLoading(true);

      // 3️⃣ Send login to Laravel backend
      const response = await axios.post(`${APP_URL}/login`, {
        login: login.trim(),
        password,
      });

      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      if (err.name === "ValidationError") {
        toast.error(err.inner[0].message);
      } else if (err.response) {
        const errorData = err.response.data;
        const errorMsg =
          errorData.message ||
          (errorData.errors ? Object.values(errorData.errors).flat().join(' ') : 'Login failed');
        toast.error(errorMsg);
      } else {
        toast.error(err.message || "Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ============ HERO VARIANT (desktop, embedded in hero) ============
  if (variant === "hero") {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="relative">
          {/* Glow effect behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 via-pink-400/15 to-purple-400/20 rounded-3xl blur-xl" />
          
          <div className="relative bg-white rounded-3xl p-8 border border-purple-100 shadow-xl shadow-purple-200/40">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <LogIn className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-purple-900">Welcome Back</h2>
                <p className="text-gray-500 text-sm">Sign in to your account</p>
              </div>
            </div>

            <form onSubmit={loginUser} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-purple-400" />
                  </div>
                  <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full bg-purple-50 border border-purple-100 rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                    placeholder="Enter your username"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-purple-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-purple-50 border border-purple-100 rounded-xl pl-11 pr-12 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-purple-300 bg-purple-50 text-purple-500 focus:ring-purple-500/30"
                    disabled={isLoading}
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-800 transition-colors font-medium"
                  onClick={() => console.log('Forgot password clicked')}
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Sign Up */}
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                  Sign up free
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ============ STANDALONE VARIANT (mobile, below hero) ============
  return (
    <div id="login-section" className="relative py-12 px-4 bg-gradient-to-b from-[#faf5ff] to-white">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md mx-auto">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/20 via-pink-400/15 to-purple-400/20 rounded-3xl blur-lg" />
          
          <div className="relative bg-white rounded-3xl p-8 border border-purple-100 shadow-xl shadow-purple-100/50">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 mb-4">
                <LogIn className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
              <p className="text-gray-500 text-sm mt-1">Access your dashboard</p>
            </div>

            <form onSubmit={loginUser} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-purple-400" />
                  </div>
                  <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full bg-purple-50/50 border border-purple-100 rounded-xl pl-11 pr-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                    placeholder="Enter your username"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-purple-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-purple-50/50 border border-purple-100 rounded-xl pl-11 pr-12 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-purple-300 text-purple-600 focus:ring-purple-400"
                    disabled={isLoading}
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-800 transition-colors font-medium"
                  onClick={() => console.log('Forgot password clicked')}
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Sign Up */}
              <p className="text-center text-sm text-gray-500 pt-2">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                  Sign up free
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
