import { useEffect } from "react";
import AdRibbon from "../components/AdRibbon";
import CodeDemoSection  from "../components/DemoSection";
import FeaturesRibbon from "../components/FeaturesRibbon";
import InstallSection from "../components/InstallationSection";
import IntegrationsSection from "../components/IntegrationsSection";
import ProductRibbon from "../components/ProductRibbon";
import n8n from '../assets/n8n-icon.png';
import airflow from '../assets/airflow-icon.png';
import watsonx from '../assets/watsonx-icon.png';
import firefly from '../assets/firefly-icon.webp';
import luma from '../assets/luma.png'
import spacexsiDark from '../assets/spacex-dark-icon.png';
import openaiDark from '../assets/openai-light.png';
import speechify from '../assets/speechify-icon.png';
import gemini from '../assets/gemini.png';
import opentable from '../assets/opentable-icon.png';
import notionDark from '../assets/notion-light.png';
import salesforce from '../assets/salesforce-icon.png';
import sap from '../assets/sap-icon.png';
import uipath from '../assets/uipath-logo.png';
import sanityDark from '../assets/sanity-dark.png';
import formstack from '../assets/formstack.png';

const Maison = ( {darkMode}: {darkMode: boolean}) => { 

    useEffect(()=>{
        document.body.style.backgroundColor = darkMode ? "#1b1c1d" : "#ffffff";
    }, [darkMode]);

    return(
        <>
        <br/>
        <ProductRibbon darkMode={darkMode} title="V&Sigma;CTOR &Sigma;" subtitle="Declarative Form Engine"
        description="Vector Sigma is a lightweight declarative form engine package for rapidly creating and managing the complex lifecycle of interactive extensible input forms 
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
        <IntegrationsSection darkMode={true}
        items={[
            {
                integrationUrl: "https://n8n.io/",
                integrationLogoUrl: darkMode ? n8n : n8n,
                integrationName: "N8N Automation"
            },
            {
                integrationUrl: "https://airflow.apache.org/docs/apache-airflow/stable//stable-rest-api-ref.html",
                integrationLogoUrl: darkMode ? airflow : airflow,
                integrationName: "Apache Airflow"
            },
            {
                integrationUrl: "https://www.uipath.com/product/orchestrator",
                integrationLogoUrl: darkMode ? uipath : uipath,
                integrationName: "UiPath Orchestrator"
            },
            {
                integrationUrl: "https://www.sanity.io/docs/http-reference",
                integrationLogoUrl: darkMode ? sanityDark : sanityDark,
                integrationName: "Sanity CMS API"
            },
            {
                integrationUrl: "https://developers.formstack.com/reference/api-overview",
                integrationLogoUrl: darkMode ? formstack : formstack,
                integrationName: "Formstack API"
            },
            {
                integrationUrl: "https://cloud.ibm.com/apidocs/watsonx-ai",
                integrationLogoUrl: darkMode ? watsonx : watsonx,
                integrationName: "Watsonx API"
            },
            {
                integrationUrl: "https://developer.adobe.com/firefly-services/docs/firefly-api/api/",
                integrationLogoUrl: darkMode ? firefly : firefly,
                integrationName: "Adobe Firefly"
            },
            {
                integrationUrl: "https://docs.lumalabs.ai/docs/api",
                integrationLogoUrl: darkMode ? luma : luma,
                integrationName: "Luma AI API"
            },
            {
                integrationUrl: "https://x.ai/api",
                integrationLogoUrl: darkMode ? spacexsiDark : spacexsiDark,
                integrationName: "xAI API"
            },
            {
                integrationUrl: "https://developers.openai.com/api/docs",
                integrationLogoUrl: darkMode ? openaiDark : openaiDark,
                integrationName: "OpenAI API"
            },
            {
                integrationUrl: "https://docs.speechify.ai/docs/get-started/overview",
                integrationLogoUrl: darkMode ? speechify : speechify,
                integrationName: "Speechify SIMBA"
            },
             {
                integrationUrl: "https://ai.google.dev/gemini-api/docs",
                integrationLogoUrl: darkMode ? gemini : gemini,
                integrationName: "Gemini API"
            },
            {
                integrationUrl: "https://docs.opentable.com/",
                integrationLogoUrl: darkMode ? opentable : opentable,
                integrationName: "OpenTable API"
            },
            {
                integrationUrl: "https://developers.notion.com/reference/intro",
                integrationLogoUrl: darkMode ? notionDark : notionDark,
                integrationName: "Notion API"
            },
            {
                integrationUrl: "https://developer.salesforce.com/docs/apis",
                integrationLogoUrl: darkMode ? salesforce : salesforce,
                integrationName: "Salesforce REST API"
            },
            {
                integrationUrl: "https://api.sap.com/",
                integrationLogoUrl: darkMode ? sap : sap,
                integrationName: "SAP ERP API"
            }

            ]}/>
        </>
    )

}

export default Maison;