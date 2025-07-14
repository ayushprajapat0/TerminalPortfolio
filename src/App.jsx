import './App.css'
import Header from './components/Header'
import Card3d from './components/Card3d'
import Terminal from './components/Terminal'
import Footer from './components/Footer'


function App() {
  return (
     <div className="min-h-screen flex flex-col bg-black text-green-500 font-mono">
      <Header />
      <div className="flex flex-1 border-t border-[#444c56]">
        {/* <div className="hidden md:block w-2/5 items-center justify-center border-r border-green-500">
          <Card3d />
        </div> */}
        <div className="w-full md:w-3/5 h-[calc(100vh-124px)] overflow-y-auto">
          <Terminal />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
