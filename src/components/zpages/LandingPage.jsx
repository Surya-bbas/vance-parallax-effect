import { FaApple } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import Nav from "../section/Nav"
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const [activeTab, setActiveTab] = useState("convert"); // convert, live, alert
  const { scrollY } = useScroll()
  
  const testimonialContent1 = [
    { name: "Joline", review: "Nice app that gives the best transfer rate", url: "JolinePhoto.png", top_position: "top-0", left_position: "-left-[24rem]" },
    { name: "Premjith Mp", review: "Nice app that gives the best transfer rate", url: "PremjithPhoto.png", top_position: "top-24", left_position: "-left-[26rem]" },
    { name: "Hardik Pandiya", review: "Nice app that gives the best transfer rate", url: "HardikPhoto.png", top_position: "top-48", left_position: "-left-[28rem]" },
    { name: "Premjith Mp", review: "Nice app that gives the best transfer rate", url: "PremjithPhoto.png", top_position: "top-72", left_position: "-left-[25rem]" },
    { name: "Joline", review: "Nice app that gives the best transfer rate", url: "JolinePhoto.png", top_position: "top-[24rem]", left_position: "-left-[24rem]" },
  ];

  const testimonialContent2 = [    
    { name: "Hardik Pandiya", review: "Nice app that gives the best transfer rate", url: "HardikPhoto.png", top_position: "-top-4", right_position: "-right-[24rem]" },
    { name: "Premjith Mp", review: "Nice app that gives the best transfer rate", url: "PremjithPhoto.png", top_position: "top-24", right_position: "-right-[26rem]" },
    { name: "Premjith Mp", review: "Nice app that gives the best transfer rate", url: "PremjithPhoto.png", top_position: "top-48", right_position: "-right-[28rem]" },
    { name: "Premjith Mp", review: "Nice app that gives the best transfer rate", url: "PremjithPhoto.png", top_position: "top-72", right_position: "-right-[25rem]" },
    { name: "Premjith Mp", review: "Nice app that gives the best transfer rate", url: "PremjithPhoto.png", top_position: "top-[24rem]", right_position: "-right-[25rem]" },    
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 800) {
        setActiveTab("convert");
      } else if (scrollPosition >= 800 && scrollPosition < 1750) {
        setActiveTab("live");
      } else {
        setActiveTab("alert");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const p2 = useTransform(scrollY, [0, 500], [0, -100]);
  const p3 = useTransform(scrollY, [500, 1000], [100, 0]);
  const p4 = useTransform(scrollY, [1000, 1500], [0, -100]);
  const yTestimonials = useTransform(scrollY, [ 2000, 2500], [0, 100]);
  const opacityP2 = useTransform(scrollY, [0, 500], [1, 0]);
  const opacityP3 = useTransform(scrollY, [500, 1000, 1500, 1500, 2000], [0, 1, 1, 1, 0]);
  const opacityP4 = useTransform(scrollY, [1500, 2000 ], [0, 1]);
  const opacityAlert = useTransform(scrollY, [2000, 2500], [0, 1]);
  const opacityTestimonials = useTransform(scrollY, [0, 1500, 2000, 2500], [1, 0.2, 0.2, 0.4])

  const scaleAlert = useTransform(scrollY, [2000, 2500], [0, 1]);

  const handleScrollTo = (position) => {
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }

  return (
    <>
        <motion.div className="min-h-[350vh]  relative " 
          style={{
            backgroundColor: useTransform(scrollY, [0, 350], ["#fff", "#111111"])
          }}
        >
          <Nav />

          <div style={{ position: "fixed", width: "100%", height: "100vh" }}>
            {/* blue gradient background */}
            <motion.div className="absolute top-0 left-0 w-full h-full" 
              style={{
                background: "radial-gradient(50% 50% at 50% 50%, #4602D9 0%, #111111 100%)",
                opacity: useTransform(scrollY, [0, 1000, 1500, 2000], [0, 1, 1, 0])
              }}
            >
            </motion.div>

            
            {/* red gradient background */}
            <motion.div className="absolute top-0 left-0 w-full h-full" 
                style={{
                  background: "radial-gradient(50% 50% at 50% 50%, #C31111 0%, #111111 100%)",
                  opacity: useTransform(scrollY, [2000, 2500], [0, 1])
                }}
            >
            </motion.div>
          

            <main className="max-w-[1440px] mx-auto px-10 pt-14 ">


              <div className="flex flex-col items-center text-center ">
                {/* text model 1 */}
                <motion.div
                  style={{
                    opacity: opacityP2,
                    x: useTransform(scrollY, [0, 500], [0, 100])
                  }}
                  className="absolute top-16"
                >
                  <h1 className="mb-4 text-5xl font-bold">Send money to India at Google rates.</h1>
                  <p className="mb-8 text-vanceGray">Say goodbye to forex-fees, get the best value for your transfers</p>
                </motion.div>
                
                {/* text model 2 */}
                <motion.div
                  style={{
                    opacity: useTransform(scrollY, [500, 1000], [0, 1]),
                    x: useTransform(scrollY, [500, 1000], [-100, 0])
                  }}
                  className="absolute flex flex-col items-center text-white top-16"
                >
                  <h1 className="mb-4 text-5xl font-bold">Always know when it&apos;s a
                  good time to transfer with</h1>
                  <p className="text-gray-400 mb-8  max-w-[500px]">Whether you&apos;re sending money home, paying for services in a different currency, or managing investments - Set a desired rate, and we&apos;ll notify you when it&apos;s time to make your move.</p>
                </motion.div>
                
                {/* download buttons */}
                <motion.div className="absolute flex gap-4 top-56"
                  style={{
                    y: useTransform(scrollY, [0, 1000], [0, 40]),
                  }}
                >
                  <div className="flex justify-center ">
                    <Link to="/app">
                      <motion.button 
                        className="flex items-center px-3 py-2 text-white bg-black rounded-full" 
                        whileHover={{ scale: 0.95, rotate: 2 }} 
                        transition={{ type: "spring", stiffness: 150 }}
                        style={{
                          opacity: useTransform(scrollY, [0, 1000], [1, 0.45]),
                          backgroundColor: useTransform(scrollY, [0, 1000], ["#000", "rgba(250, 250, 250, 0)"]),
                          border: useTransform(scrollY, [0, 1000], ["none", "1px solid #fff"])
                        }}
                      >
                        <FaApple size={28} className="mb-1 mr-2" />
                        <span>Download on the<br />App Store</span>
                      </motion.button>
                    </Link>
                  </div>

                  <div className="flex justify-center ">
                    <Link to="/app">
                      <motion.button 
                        className="flex items-center px-3 py-2 text-white bg-black rounded-full" 
                        whileHover={{ scale: 0.95, rotate: -2 }} 
                        transition={{ type: "spring", stiffness: 150 }}
                        style={{
                          opacity: useTransform(scrollY, [0, 1000], [1, 0.45]),
                          backgroundColor: useTransform(scrollY, [0, 1000], ["#000", "rgba(250, 250, 250, 0)"]),                        
                          border: useTransform(scrollY, [0, 1000], ["none", "1px solid #fff"])
                        }}
                      >
                        <img src="appStore.png" alt="Play Store" className="w-6 h-6 mr-2" />
                        <span>Download on the<br />App Store</span>
                      </motion.button>
                    </Link>
                  </div>

                </motion.div>
                
                {/* all phone models */}
                <div className="z-20">                  
                  {/* phone model 2 */}
                  <motion.img src="phoneState2.svg" alt="phoneState2" className="w-[25vw]  absolute bottom-0 right-[33%]"
                    
                    style={{ 
                      y: p2,
                      opacity: opacityP2
                    }}
                  />

                  {/* phone model 3 */}
                  <motion.img src="phoneState3.svg" alt="phoneState3" className="w-[25vw]  absolute bottom-20 right-[33%]"
                    
                    style={{ 
                      y: p3,
                      opacity: opacityP3
                    }}
                  />
                  
                  {/* phone model 4 */}
                  <motion.img src="phoneState4.svg" alt="phoneState4" className="w-[25vw] absolute -bottom-6 right-[33%]"
                    
                    style={{ 
                      y: p4,
                      opacity: opacityP4
                    }}
                  />
                </div>


                {/* tool bar */}
                <motion.div className="absolute z-30 flex justify-center bottom-36"
                  variants={
                    {
                      hidden: { opacity: 0, y: 100 },
                      visible: { opacity: 1, y: -100 },
                    }
                  }
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 1 }}
                >

                  <div className="bg-vanceGreen p-1.5 rounded-full flex gap-1">
                    <motion.button
                      className={`relative px-6 py-2 rounded-full transition-colors duration-500 ${activeTab === "convert" ? "text-white" : "text-black"}`}
                      onClick={() => {
                        setActiveTab("convert");
                        handleScrollTo(0);
                      }}
                    >
                      {activeTab === "convert" && (
                        <motion.div
                          className="absolute inset-0 rounded-full shadow-sm bg-vancePurple"
                          layoutId="bubble"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative">Currency Converter ₹</span>
                    </motion.button>

                    <motion.button
                      className={`relative px-6 py-2 rounded-full transition-colors duration-500 ${activeTab === "live" ? "text-white " : "text-black"}`}
                      onClick={() => {
                        setActiveTab("live");
                        handleScrollTo(1500);
                      }}
                    >
                      {activeTab === "live" && (
                        <motion.div
                          className="absolute inset-0 rounded-full shadow-sm bg-vancePurple"
                          layoutId="bubble"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative">Live rates ⟳</span>
                    </motion.button>

                    <motion.button
                      className={`relative px-6 py-2 rounded-full transition-colors duration-500 ${activeTab === "alert" ? "text-white" : "text-black"}`}
                      onClick={() => {
                        setActiveTab("alert");
                        handleScrollTo(2500);
                      }}
                    >
                      {activeTab === "alert" && (
                        <motion.div
                          className="absolute inset-0 rounded-full shadow-sm bg-vancePurple"
                          layoutId="bubble"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative">Set rate alert ⚠</span>
                    </motion.button>
                  </div>

                </motion.div>
                
                

                {/* call to action */}
                <motion.div 
                  className="absolute z-30 flex items-center gap-4 px-2 py-3 ml-5 text-white transform -translate-y-1/2 rounded-lg shadow-lg top-1/2 bg-vancePurple"
                  style={{
                    opacity: opacityAlert,
                    scale: scaleAlert,                    
                  }}
                >
                  <div className="p-2 rounded-full">
                    <FaSquarePlus size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="">Set your first</span>
                    <span className="pr-4">Rate alert</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/app">
                      <motion.button 
                        className="px-3 py-2 text-sm text-white bg-green-400 rounded-full" 
                        whileHover={{ scale: 0.95, rotate: 2 }} 
                        transition={{ type: "spring", stiffness: 150 }}
                      >
                        Accept
                      </motion.button>
                    </Link>
                    <Link to="/app">
                      <motion.button 
                        className="px-3 py-2 text-sm text-white bg-gray-900 rounded-full"  
                        whileHover={{ scale: 0.95, rotate: -2 }} 
                        transition={{ type: "spring", stiffness: 150 }}
                      >
                        Ignore
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>

                
                {/* testimonials */}
                <motion.div className="absolute z-10 flex transform -translate-y-1/4 top-[35%] gap-36"
                  style={{
                    opacity: opacityTestimonials,
                    y: yTestimonials,                    
                  }}
                >
                  
                    <div className="flex flex-col gap-4 ">                    
                      {testimonialContent1.map((testimonial, index) => (
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          key={index}
                          className={`z-10 absolute cursor-pointer bg-white rounded-xl shadow-lg p-4 flex items-center gap-4 max-w-md   ${testimonial.top_position} ${testimonial.left_position}`}
                        >
                          <div className="flex-shrink-0 pr">
                            <img 
                              src={testimonial.url}
                              alt={testimonial.name} 
                              className="object-cover w-12 h-12 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col flex-grow">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">&quot;{testimonial.review}&quot;</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col gap-4">                    
                      {testimonialContent2.map((testimonial, index) => (
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          key={index}
                          className={`z-10 absolute cursor-pointer bg-white rounded-xl shadow-lg p-4 flex items-center gap-4 max-w-md ${testimonial.top_position} ${testimonial.right_position}`}
                        >
                          <div className="flex-shrink-0">
                            <img 
                              src={testimonial.url}
                              alt={testimonial.name} 
                              className="object-cover w-12 h-12 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col flex-grow">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">&quot;{testimonial.review}&quot;</p>
                          </div>
                        </motion.div>
                      ))}                    
                    </div>
                  
                </motion.div>
                

              </div>

            </main>
          </div>

        </motion.div>
    </>
  )
}

export default LandingPage
