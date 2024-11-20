import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import { motion, useTransform } from 'motion/react'; 
import Nav from '../section/Nav';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { FaSquarePlus } from 'react-icons/fa6';

const App = () => {

    const auth = getAuth(); 
    const db = getFirestore(); 
    const provider = new GoogleAuthProvider();
    const alertRef = collection(db, 'alerts');

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [data, setData] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [alerts, setAlerts] = useState([]);

    const [newAlertName, setNewAlertName] = useState('')
    const [newTargetRate, setNewTargetRate] = useState()

    useEffect(() => {
        
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });
        console.log(currentUser);
        
        
        const fetchData = async () => {
            // i am using a CORS proxy here that is why the end point is different from the given one 
            const response = await fetch('https://api.allorigins.win/raw?url=https://web-api.vance.club/public/api/currency-converter/forex?code=AEDINR%3DX&timeline=1M',{
                method: 'GET',
            })
            const data = await response.json();       
            console.log(data);     
            setData(data.slice(0, 20)); // Take only the first 20 elements
            return data.slice(0, 20);
        }
        fetchData();   

        const fetchAlerts = async () => {
            if (currentUser) {
                const q = query(alertRef, where("userId", "==", currentUser.uid));
                const alertSnapshot = await getDocs(q);
                const alertList = alertSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAlerts(alertList);
            }
        }
        fetchAlerts();
        
        return () => unsubscribe();     
    }, [auth, currentUser]);

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setCurrentUser(result.user);
            })
            .catch((error) => {
                console.error("Error signing in: ", error);
            });
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setCurrentUser(null);
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    }

    const handleAddAlert = async (e) => {
        e.preventDefault();
        
        const newAlert = {
            name: newAlertName,
            targetRate: newTargetRate,
            savedDate: new Date().toLocaleDateString('en-GB'),
            userId: currentUser.uid
        };

        await addDoc(alertRef, newAlert);
        setAlerts(prevAlerts => [...prevAlerts, newAlert]);
        setNewAlertName('')
        setNewTargetRate()
        setShowModal(false);
    }

  if (loading) {
    return (
      <div className='w-full h-screen bg-vanceGray'>
        <Nav />
        
        <div className="flex items-center justify-center h-screen">
            <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='h-[100vh] bg-vanceGray'>
        <div
        className='absolute top-0 left-0 z-10 w-full h-full'
        style={!currentUser ? {
            background: "radial-gradient(50% 50% at 50% 50%, #4602D9 0%, #111111 100%)",
            opacity: 0.35
        } : {}}
        >
            
        </div>
        <div className='absolute z-50 w-full h-full'>
            <Nav />   
            {
                !currentUser ? (

                    <div className='flex flex-col items-center justify-center'>
                        {/* blue gradient background */}
                        <div className='mt-36' >
                            <img src="megaphone.svg" alt="megaphone Logo" className="" />
                        </div>

                        <div className=''>
                            <div className='flex flex-col items-center justify-center gap-2 text-5xl font-bold text-white'>
                                <p>Access</p> <p>rate alert dashboard</p>
                            </div>
                        </div>

                        <div>
                            <p className='mt-12 text-center text-gray-400 w-96'>Stay updated with real-time currency rates and manage your alerts.</p>
                        </div>

                        <div>
                            {!currentUser ? (
                                <motion.img 
                                    src="googleBtn.svg" 
                                    alt=""  
                                    className='mt-12'
                                    whileHover={{ scale: 1.05 }}
                                    onClick={handleLogin}
                                />
                            ) : (
                                <p className='mt-24 text-3xl font-extrabold text-white'>You are logged in</p>
                            )}
                        </div>

                        <div
                            className='mt-24'
                        >
                            <p className='font-semibold text-center text-gray-500 w-80'>By creating an account or signing you agree to our <span className='text-gray-400 underline cursor-pointer'>Terms and Conditions</span></p>
                            
                        </div>
                    
                        

                    </div>
                    
                ) : (
                    <div className='flex flex-col items-center justify-center mt-4'>
                        
                        <div className='flex flex-col bg-[#222222] rounded-xl '>
                            
                            <AreaChart
                            className='text-orange-500 '
                            width={650}
                            height={400}
                            data={data}
                            margin={{
                                top: 40,
                                right: 55,
                                left: 10,
                                bottom: 40,
                            }}
                            style={{
                                backgroundColor: '#222222',
                                borderRadius: '10px',
                                
                            }}
                            >
                            <CartesianGrid  />
                            <XAxis dataKey="resDate" stroke="#FFFFFF" tickSize={30}/>
                            <YAxis stroke="#FFFFFF"  type="number" domain={[22.55, 23]} allowDataOverflow />
                            <Tooltip itemStyle={{color: '#000'}} />
                            <Area type="monotone" dataKey="high" stackId="1" stroke="#cde779" fill="#cde779" />
                            <Area type="monotone" dataKey="low" stackId="2" stroke="#e77980" fill="#e77980" />
                            <Area type="monotone" dataKey="close" stackId="3" stroke="#8079e7" fill="#8079e7" />
                            </AreaChart>
                            
                            <div className='flex justify-between px-6 pb-4'>
                                <span className="text-2xl font-bold text-white">₹84.00</span>                                

                                <div>
                                    <motion.div className="relative" whileHover={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 150 }}>
                                        <button 
                                            className="px-4 py-2 pl-2 font-semibold text-black rounded-full bg-vanceGreen pr-7"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Set Alert
                                        </button>
                                        <div className="rounded-full ">
                                            <FaSquarePlus size={24} className='absolute top-0 right-[5px] mt-[13px] mr-1 h-4 w-4' />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                            
                        </div>

                        {showModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="p-8 bg-[#222222] rounded-xl w-96 ">
                                    <h2 className="mb-4 text-2xl font-bold text-center text-white">Set rate alert!</h2>
                                    <div className='flex flex-col items-center w-full gap-2 pb-4'>
                                        <img  src="ukLogo.svg" alt="UK Flag" className="w-24 h-24 " />
                                        <span className="text-white">UK <span className='text-gray-500'>£(GBP)</span></span>

                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <form onSubmit={handleAddAlert}>
                                            
                                            <label  className='text-[#D5D6DE] '>Title</label>
                                            <br/>
                                            <input 
                                                value={newAlertName}
                                                onChange={(e)=> setNewAlertName(e.target.value)}
                                                type="text" 
                                                required
                                                placeholder="Alert Name"                                            
                                                className="p-2 bg-[#333333] text-white rounded-lg my-2 w-full"
                                            />
                                            <br/>
                                            <label  className='text-[#D5D6DE] '>Rate alert value</label>
                                            <br/>
                                            <input 
                                                value={newTargetRate}
                                                onChange={(e)=> setNewTargetRate(e.target.value)}
                                                type="number"
                                                required 
                                                placeholder="Target Rate"                                            
                                                className="p-2 bg-[#333333] text-white rounded-lg my-2 w-full mb-4"
                                            />
                                            <div className="flex flex-col justify-end gap-4 mt-4">
                                                <motion.div className="relative w-full" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 150 }}>
                                                    <button 
                                                        type="submit"
                                                        className="w-full px-4 py-2 pl-2 font-semibold text-black rounded-full bg-vanceGreen pr-7"
                                                    >
                                                        Set Alert
                                                    </button>
                                                    <div className="rounded-full ">
                                                        <FaSquarePlus size={24} className='absolute top-0 right-28 mt-[13px] mr-1 h-4 w-4' />
                                                    </div>
                                                </motion.div>                                          
                                                <motion.button 
                                                    whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 150 }}
                                                    className="px-4 py-2 text-gray-400 bg-[#333333] rounded-full"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Cancel
                                                </motion.button>
                                                
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className='h-[400px] overflow-auto hide-scrollbar mt-6'>
                            {/* alerts */}
                            {alerts.map((alert) => (
                                <div key={alert.id} className="flex items-start gap-4 mt-8 p-4 bg-[#222222] rounded-xl w-96 justify-between px-6">
                                    <div className="flex flex-col justify-between gap-2">
                                        <div className='flex flex-col'>
                                            <span className="text-sm text-gray-400">{alert.name}</span>
                                            <span className="text-2xl font-bold text-white">₹{alert.targetRate}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <img src="ukLogo.svg" alt="UK Flag" className="w-5 h-5" />
                                            <span className="text-white">UK <span className='text-gray-500'>£(GBP)</span></span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 text-white">
                                        <span className='bg-[#333333] p-1 px-2 rounded-md'>{alert?.savedDate?.slice(0, 2) || "12"}</span>
                                        <span className='text-gray-500'>/</span>
                                        <span className='bg-[#333333] p-1 px-2 rounded-md'>{alert?.savedDate?.slice(3, 5) || "10"}</span>
                                        <span className='text-gray-500'>/</span>
                                        <span className='bg-[#333333] p-1 px-2 rounded-md'>{alert?.savedDate?.slice(6, 8) || "24"}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                )
            }
            
        </div>
    </div>
  )
}

export default App