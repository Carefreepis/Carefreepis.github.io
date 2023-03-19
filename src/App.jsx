import { Navbar, Welcome, Footer, Services, Transactions,Deploy,LiquidityMining} from "./components";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";


const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
        {/* <ul>
          <li><Link to="/deploy">111</Link></li>
          <li><Link to="/">222</Link></li>
        </ul> */}
      <Routes>
        <Route path="/" element={<Welcome/>}/>    
        <Route path="/deploy" element={<Deploy/>}/>
        <Route path="/liquiditymining" element={<LiquidityMining/>}/>
      </Routes>
      
    </div>
    <Services />
    <Transactions />
    <Footer /> 
  </div>
);

export default App;
