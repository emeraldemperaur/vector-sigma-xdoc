import { useEffect } from "react";

const N8NShowcase = ({darkMode}: {darkMode: boolean}) => {
    useEffect(()=>{
        document.body.style.backgroundColor = darkMode ? "#1b1c1d" : "#ffffff";
    }, [darkMode]);
 
    return(<>
    N8N Showcase
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>)
}

export default N8NShowcase;