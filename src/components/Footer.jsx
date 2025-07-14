import React ,{useState , useEffect}from 'react'


const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  const formatTime = (date) =>
    date.toLocaleString('en-GB', {
      dateStyle: 'short',
      timeStyle: 'medium',
    });

  return (
    <footer className="w-full border-t border-[#444c56] text-[#adbac7] flex justify-between items-center px-4 py-2 text-sm font-mono">
      <span>ayush@prajapat:~$</span>
      <span>{formatTime(currentTime)}</span>
    </footer>
  );
};

export default Footer