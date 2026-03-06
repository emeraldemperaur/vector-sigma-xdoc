import "@radix-ui/themes/styles.css";
import './App.css';
import { Box } from "@radix-ui/themes";
import { Route, Routes } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import Maison from "./pages/Maison";
import FooterSection from "./components/FooterSection";
import { useEffect, useState } from "react";
import { DocumentationViewer } from "./components/DocumentationViewer";

function App() {

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  useEffect(() => {

  }, [isDarkMode]);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
    <Box
    width="100%"
    px={{ initial: "3", md: "5" }}
    py={{ initial: "4", md: "6" }}
    style={{ boxSizing: "border-box" }}
    >
     <NavigationMenu darkModeToggle={toggleDarkMode} darkMode={isDarkMode}/>
     <Routes>
        <Route path='/' element={<Maison darkMode={isDarkMode}/>}/>
        <Route path='documentation' element={<DocumentationViewer darkMode={isDarkMode}/>}/>
        <Route path='components' element={<>χForm Components</>}/>
        <Route path='showcase' element={<>&Omega; Showcase</>}/>
        <Route path='integrations' element={<>&alpha; Integrations</>}/>
      </Routes>
      <FooterSection darkMode={isDarkMode}/>
    </Box> 
    </>
  )
}

export default App
