import { useEffect } from "react";
import { PageTitle } from "../components/PageTitle";
import AdRibbon from "../components/AdRibbon";
import { UseCaseCard } from "../components/UseCaseCard";
import { xFormAirflowDAGSchemaSnippet, xFormCodeAirflowUsageSnippet, xFormCodeN8NUsageSnippet, xFormN8NSchemaSnippet } from "../utils/xFormSchemaSnippetStrings";
import airflowDemoImage from "../assets/airflow_dagnode_render.png";
import n8nwebhookDemoImage from "../assets/n8n_webhook_render.png";


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
        codeString={xFormCodeN8NUsageSnippet}
        pageUrl="/showcase/n8n"
        schemaFileNameLabel="xFormN8NSchema.ts"
        schemaString={xFormN8NSchemaSnippet}
        imageSrc={n8nwebhookDemoImage}
        contentHeight={"763px"}
        tabFontSize="19px"
        marginLeft={"33px"}
        marginRight={"33px"}
        marginTop={"69px"}
        marginBottom={"69px"}/>
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
        <UseCaseCard design="neumorphic" darkMode={darkMode} useCaseLabel="USECASE #002"
        useCaseDescription="Client Onboarding Data Pipeline"
        useCaseSynopsis="Client information data capture DAG node for onboarding normalized new user account details into a SaaS application, database or data warehouse."
        fileNameLabel="AirflowDAGNode.tsx"
        codeString={xFormCodeAirflowUsageSnippet}
        pageUrl="/showcase/airflow"
        schemaFileNameLabel="xFormDAGSchema.ts"
        schemaString={xFormAirflowDAGSchemaSnippet}
        imageSrc={airflowDemoImage}
        contentHeight={"1000px"}
        tabFontSize="19px"
        marginLeft={"33px"}
        marginRight={"33px"}
        marginTop={"69px"}
        marginBottom={"69px"}/>
        </>
    )

}

export default Showcase;