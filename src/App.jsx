import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Welcome, Footer, Services, Transactions, Deploy, LiquidityMining, Sidebar} from "./components";

// const Sidebar = () => (
//   <div className="bg-white w-1/7 h-screen fixed left-0 top-0">
//     <ul className="h-full flex flex-col items-center justify-center" />
//   </div>
// );

const App = () => (

  <div className="min-h-screen flex">
    <Sidebar />
    <div className="w-full" >
      <div className="gradient-bg-welcome">
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/deploy" element={<Deploy />} />
          <Route path="/liquiditymining" element={<LiquidityMining />} />
        </Routes>
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  </div>
);


export default App;
