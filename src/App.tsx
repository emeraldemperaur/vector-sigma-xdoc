import "@radix-ui/themes/styles.css";
import './App.css';
import { Box } from "@radix-ui/themes";
import { Route, Routes } from "react-router-dom";
import NavigationMenu from "./components/NavigationMenu";
import Maison from "./pages/Maison";
import FooterSection from "./components/FooterSection";
import { useEffect, useState } from "react";
import { DocumentationViewer } from "./components/DocumentationViewer";
import Showcase from "./pages/Showcase";
import Integrations from "./pages/Integrations";
import XFormComponent from "./pages/XFormComponent";
import AirflowDAGShowcase from "./pages/AirflowShowcase";
import N8NShowcase from "./pages/N8NShowcase";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

function App() {

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
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
     <ScrollToTop />
     <Routes>
        <Route path='/' element={<Maison darkMode={isDarkMode}/>}/>
        <Route path='documentation' element={<DocumentationViewer darkMode={isDarkMode}/>}/>
        <Route path='components' element={<XFormComponent darkMode={isDarkMode}/>}/>
        <Route path='showcase' element={<Showcase darkMode={isDarkMode}/>}/>
        <Route path='showcase/n8n' element={<N8NShowcase darkMode={isDarkMode}/>}/>
        <Route path='showcase/airflow' element={<AirflowDAGShowcase darkMode={isDarkMode}/>}/>
        <Route path='integrations' element={<Integrations darkMode={isDarkMode}/>}/>
        <Route path="*" element={<NotFound darkMode={isDarkMode} />} />
      </Routes>
      <FooterSection darkMode={isDarkMode}/>
    </Box> 
    </>
  )
}

export default App
