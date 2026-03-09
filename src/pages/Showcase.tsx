import { useEffect } from "react";
import { PageTitle } from "../components/PageTitle";
import AdRibbon from "../components/AdRibbon";
import { UseCaseCard } from "../components/UseCaseCard";
import { xFormCodeUsageSnippet } from "../utils/xFormCodeSnippetString";

const Showcase = ({darkMode}: {darkMode: boolean}) => {
    useEffect(()=>{
        document.body.style.backgroundColor = darkMode ? "#1b1c1d" : "#ffffff";
    }, [darkMode]);
    return(
        <>
        <PageTitle variant="material" title="Showcase Sandbox" darkMode={darkMode} icon={<>&Omega;</>}/>
        <UseCaseCard design="neumorphic" darkMode={darkMode} useCaseLabel="USECASE #001"
        useCaseDescription="N8N Webhook Trigger Node"
        useCaseSynopsis="Guest details data capture for N8N Webhook Trigger Node of a hospitality automation workflow to capture reservation requests and manage confirmations using AI voice agents."
        fileNameLabel="N8NAutomation.tsx"
        codeString={xFormCodeUsageSnippet}
        imageSrc="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80"
        contentHeight={"400px"}
        tabFontSize="19px"
        marginLeft={"33px"}
        marginRight={"33px"}
        marginTop={"69px"}
        marginBottom={"69px"}/>
        <AdRibbon darkMode={darkMode}/>
        <UseCaseCard design="neumorphic" darkMode={darkMode} useCaseLabel="USECASE #002"
        useCaseDescription="Client Onboarding Data Pipeline"
        useCaseSynopsis="Client profile information data capture node for onboarding normalized or sanitized new user account details into a SaaS application, database or data warehouse."
        fileNameLabel="AirflowDAGNode.tsx"
        codeString={xFormCodeUsageSnippet}
        imageSrc="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80"
        contentHeight={"400px"}
        tabFontSize="19px"
        marginLeft={"33px"}
        marginRight={"33px"}
        marginTop={"69px"}
        marginBottom={"69px"}/>
        </>
    )

}

export default Showcase;