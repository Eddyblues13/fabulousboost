import { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Sparkles, Rocket, TrendingUp, ArrowRight, Zap } from 'lucide-react';
import LoginSection from "./LoginSection";
import StatsDashboard from '../sections/Statistics';
import Why from '../sections/why';
import HomeFeatures from '../sections/features';
import RiseSocial from '../sections/Ready';
import SmmServicesInsight from '../sections/ServicesInsight';
import PaymentSection from '../sections/PaymentSection';
import BoostSection from '../sections/BoostSection';
import HowItWorks from '../sections/how';
import FaqSection from '../sections/Faq';
import TestimonialsSection from '../sections/CustomerStories';
import GetStarted from '../sections/Getstarted';

const HomePage = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded', container);
  }, []);

  const particlesOptions = {
    fpsLimit: 120,
    particles: {
      number: {
        value: 150,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["#a855f7", "#c084fc", "#d946ef", "#ec4899", "#f472b6", "#f9a8d4"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: { min: 0.5, max: 1 },
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.5,
          sync: false
        }
      },
      size: {
        value: { min: 2, max: 5 },
        random: true,
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#c084fc",
        opacity: 0.6,
        width: 1.5
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "bounce"
        },
        attract: {
          enable: false
        }
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 250,
          links: {
            opacity: 1,
            blink: false,
            consent: false,
            triangles: {
              enable: false
            }
          }
        },
        push: {
          quantity: 6
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    detectRetina: true,
    background: {
      color: {
        value: "transparent"
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -25, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.15, 0.25, 0.15],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
    <section className="relative min-h-screen pt-20 sm:pt-24 md:pt-28 lg:pt-32 overflow-hidden flex items-center justify-center py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Particles Background */}
      <div 
        id="particles-container"
        className="absolute inset-0 z-0"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          zIndex: 1
        }}
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOptions}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </div>

      {/* Enhanced Animated Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-pink-500/20 rounded-full blur-3xl"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/25 to-purple-500/15 rounded-full blur-3xl"
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 0.5, duration: 5 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-r from-fuchsia-500/25 to-pink-600/20 rounded-full blur-3xl"
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 1, duration: 6 }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/2 w-[550px] h-[550px] bg-gradient-to-r from-pink-500/20 to-purple-500/15 rounded-full blur-3xl"
          variants={floatVariants}
          animate="animate"
          transition={{ delay: 1.5, duration: 4.5 }}
        />
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        style={{ zIndex: 10 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section: Text Content */}
        <motion.div 
          className="text-center lg:text-left relative z-10"
          variants={itemVariants}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/30 mb-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Zap className="text-purple-400 w-5 h-5" />
            </motion.div>
            <span className="text-purple-200 font-semibold text-sm tracking-wide">Premium SMM Platform</span>
            <Sparkles className="text-purple-400 w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.div 
            className="mb-6"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Boost Your
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent animate-gradient mt-2">
                Social Media
              </span>
              <span className="block bg-gradient-to-r from-pink-300 via-purple-200 to-pink-300 bg-clip-text text-transparent mt-2">
                Presence
              </span>
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 font-medium mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            variants={itemVariants}
          >
            Grow your social media fast with <span className="font-bold text-white">premium quality services</span>. <span className="text-purple-400 font-semibold">Fabulousboost.com</span> offers top-tier solutions for YouTube, Instagram, TikTok, Facebook, Twitter, and more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.button 
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border border-purple-400/50"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 30px 60px rgba(168, 85, 247, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Rocket className="w-6 h-6 mr-3 relative z-10" />
              </motion.div>
              <span className="relative z-10">Explore Services</span>
              <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>

            <motion.button 
              className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-lg rounded-2xl shadow-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <TrendingUp className="w-6 h-6 mr-3" />
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div 
            className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="text-center lg:text-left">
              <div className="text-3xl font-black text-white mb-1">50K+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-black text-white mb-1">1M+</div>
              <div className="text-sm text-gray-400">Orders Completed</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-black text-white mb-1">99%</div>
              <div className="text-sm text-gray-400">Satisfaction Rate</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section: Illustration Image */}
        <motion.div 
          className="relative flex justify-center items-center p-8 lg:p-12"
          variants={imageVariants}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            {/* Enhanced Glow Effects */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-purple-500/40 via-pink-500/30 to-purple-500/40 rounded-3xl blur-3xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Image Container with Glassmorphism */}
            <motion.div
              className="relative rounded-3xl p-2 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <motion.img
                src="/social-home.svg"
                alt="Social Media Growth Illustration"
                className="relative max-w-full h-auto rounded-2xl"
                whileHover={{ 
                  scale: 1.02,
                }}
                transition={{ 
                  scale: { duration: 0.3 }
                }}
              />
            </motion.div>
            
            {/* Enhanced Floating Decorative Elements */}
            <motion.div
              className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-70"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-2xl opacity-70"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.2, 1],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>

    {/* Sections */}
    <LoginSection /> 
    <StatsDashboard /> 
    <Why />
    <HomeFeatures/> 
    <RiseSocial/>
    <SmmServicesInsight/>
    <PaymentSection/>
    <BoostSection/>
    <HowItWorks/>
    <FaqSection/>
    <TestimonialsSection/>
    <GetStarted/>
    </> 
  );
};

export default HomePage;
