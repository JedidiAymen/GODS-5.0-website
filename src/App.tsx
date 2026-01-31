import './App.css'
import Homepage from './components/pages/homepage.tsx';
import Layout from './components/pages/layout.tsx'
import Register from './components/pages/register.tsx';
import { BrowserRouter, Routes, Route } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(ScrollTrigger, SplitText, Draggable);

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
