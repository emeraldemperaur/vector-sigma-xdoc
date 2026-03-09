import { useEffect } from "react";
import { PageTitle } from "../components/PageTitle";
import AdRibbon from "../components/AdRibbon";
import ChromaticEmbed from "../components/ChromaticEmbed";

const XFormComponent = ({darkMode}: {darkMode: boolean}) => {
    useEffect(()=>{
        document.body.style.backgroundColor = darkMode ? "#1b1c1d" : "#ffffff";
    }, [darkMode]);
    return(
        <>
        <PageTitle variant="material" title="Form Components" darkMode={darkMode} icon={<>χ</>}/>
        <ChromaticEmbed src="https://69ae1e2c772d79457e37fbad-zhvolbxhpp.chromatic.com/"/>
        <AdRibbon darkMode={darkMode}/>
        </>
    )

}

export default XFormComponent;