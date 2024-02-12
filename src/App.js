import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/search?:key" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
