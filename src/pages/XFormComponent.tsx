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
        <ChromaticEmbed src="https://69ae1e2c772d79457e37fbad-azeivijwpt.chromatic.com/"/>
        <AdRibbon darkMode={darkMode}>
                 <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3704334287285175"
                        crossOrigin="anonymous"></script>
                <ins className="adsbygoogle"
                    style={{display:"block"}}
                    data-ad-client="ca-pub-3704334287285175"
                    data-ad-slot="8343960922"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
              </AdRibbon>
        </>
    )

}

export default XFormComponent;