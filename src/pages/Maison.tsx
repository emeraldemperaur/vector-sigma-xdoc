import { useEffect } from "react";
import AdRibbon from "../components/AdRibbon";
import CodeDemoSection  from "../components/DemoSection";
import FeaturesRibbon from "../components/FeaturesRibbon";
import InstallSection from "../components/InstallationSection";
import IntegrationsSection from "../components/IntegrationsSection";
import ProductRibbon from "../components/ProductRibbon";

const Maison = ( {darkMode}: {darkMode: boolean}) => {
    let n8nLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/N8n-logo-new.svg/1280px-N8n-logo-new.svg.png";
    let watsonxLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/IBM_watsonx_logo.svg/1280px-IBM_watsonx_logo.svg.png";
    let lumaAILogoUrl = "https://logos-world.net/wp-content/uploads/2024/11/Luma-Labs-Logo.png";
    let xAILogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/XAI_Logo.svg/1280px-XAI_Logo.svg.png";
    let notionLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png";
    darkMode ? n8nLogoUrl = "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/n8n.png" : n8nLogoUrl = n8nLogoUrl
    darkMode ? watsonxLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1280px-IBM_logo.svg.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/IBM_watsonx_logo.svg/1280px-IBM_watsonx_logo.svg.png";
    darkMode ? lumaAILogoUrl = "https://www.silverside.ai/partner_logos/luma_white.png" : lumaAILogoUrl = lumaAILogoUrl;
    darkMode ? xAILogoUrl = "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/xai.png" 
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/XAI_Logo.svg/1280px-XAI_Logo.svg.png";
    darkMode ? notionLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" 
    : notionLogoUrl = notionLogoUrl;

    useEffect(()=>{
        document.body.style.backgroundColor = darkMode ? "#1b1c1d" : "#ffffff";
    }, [darkMode]);

    return(
        <>
        <br/>
        <ProductRibbon darkMode={darkMode} title="V&Sigma;CTOR &Sigma;" subtitle="Dynamic Form Orchestrator"
        description="Vector Sigma is a dynamic form orchestrator package for rapidly creating and managing the complex lifecycle of interactive extensible input forms 
        that can be easily embedded into a React front-end client interface for use in data pipelines, onboarding applications or automation workflows. 
        Customizable to fit seamlessly into an existing design system and enable agile developer control of the visual layer and theming." 
        icon={<i className="fa-brands fa-npm"></i>} />
        <InstallSection darkMode={darkMode} subtitle="ΣχTANT VERSION v1.5.0" variant="material"/>
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
        <FeaturesRibbon darkMode={darkMode}/>
        <CodeDemoSection darkMode={darkMode}/>
        <IntegrationsSection darkMode={darkMode}
        items={[
            {
                integrationUrl: "https://n8n.io/",
                integrationLogoUrl: n8nLogoUrl,
                integrationName: "N8N Automation"
            },
            {
                integrationUrl: "https://airflow.apache.org/docs/apache-airflow/stable//stable-rest-api-ref.html",
                integrationLogoUrl: "https://airflow.apache.org/docs/apache-airflow/1.10.15/_images/pin_large.png",
                integrationName: "Apache Airflow"
            },
            {
                integrationUrl: "https://cloud.ibm.com/apidocs/watsonx-ai",
                integrationLogoUrl: watsonxLogoUrl,
                integrationName: "Watsonx API"
            },
            {
                integrationUrl: "https://developer.adobe.com/firefly-services/docs/firefly-api/api/",
                integrationLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Adobe_Firefly_Logo.svg/960px-Adobe_Firefly_Logo.svg.png",
                integrationName: "Adobe Firefly"
            },
            {
                integrationUrl: "https://docs.lumalabs.ai/docs/api",
                integrationLogoUrl: lumaAILogoUrl,
                integrationName: "Luma AI API"
            },
            {
                integrationUrl: "https://x.ai/api",
                integrationLogoUrl: xAILogoUrl,
                integrationName: "xAI API"
            },
            {
                integrationUrl: "https://developers.openai.com/api/docs",
                integrationLogoUrl: "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png",
                integrationName: "OpenAI API"
            },
            {
                integrationUrl: "https://docs.speechify.ai/docs/get-started/overview",
                integrationLogoUrl: "https://thriiver.co.uk/wp-content/uploads/Speechify-Logo@3.png",
                integrationName: "Speechify SIMBA"
            },
             {
                integrationUrl: "https://ai.google.dev/gemini-api/docs",
                integrationLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/250px-Google_Gemini_icon_2025.svg.png",
                integrationName: "Gemini API"
            },
            {
                integrationUrl: "https://docs.opentable.com/",
                integrationLogoUrl: "https://m.media-amazon.com/images/I/51SdVVc+rBL._h1_.png",
                integrationName: "OpenTable API"
            },
            {
                integrationUrl: "https://developers.notion.com/reference/intro",
                integrationLogoUrl: notionLogoUrl,
                integrationName: "Notion API"
            },
            {
                integrationUrl: "https://developer.salesforce.com/docs/apis",
                integrationLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/3840px-Salesforce.com_logo.svg.png",
                integrationName: "Salesforce REST API"
            },
            {
                integrationUrl: "https://api.sap.com/",
                integrationLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/3840px-SAP_2011_logo.svg.png",
                integrationName: "SAP ERP API"
            }

            ]}/>
        </>
    )

}

export default Maison;