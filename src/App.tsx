import "@radix-ui/themes/styles.css";
import './App.css';
import { Box } from "@radix-ui/themes";
import { Route, Routes } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import Maison from "./pages/Maison";

function App() {

  return (
    <>
    <Box
    width="100%"
    px={{ initial: "3", md: "5" }}
    py={{ initial: "4", md: "6" }}
    style={{ boxSizing: "border-box" }}
    >
     <NavigationMenu/>
     <Routes>
        <Route path='/' element={<Maison/>}/>
        <Route path='documentation' element={<>VΣ Documentation</>}/>
        <Route path='components' element={<>χForm Components</>}/>
        <Route path='showcase' element={<>&Omega; Showcase</>}/>
        <Route path='integrations' element={<>&alpha; Integrations</>}/>
      </Routes>
    </Box> 
    </>
  )
}

export default App
