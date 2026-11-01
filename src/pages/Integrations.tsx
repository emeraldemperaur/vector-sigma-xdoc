import { useEffect, useMemo } from "react";
import { Box, Container, Heading, Text } from "@radix-ui/themes";
import IntegrationsSection from "../components/IntegrationsSection";
import AdRibbon from "../components/AdRibbon";
import n8n from '../assets/n8n-icon.png';
import airflow from '../assets/airflow-icon.png';
import watsonx from '../assets/watsonx-icon.png';
import firefly from '../assets/firefly-icon.webp';
import luma from '../assets/luma.png'
import spacexsiLight from '../assets/spacex-light-icon.png';
import spacexsiDark from '../assets/spacex-dark-icon.png';
import openai from '../assets/openai.png';
import speechify from '../assets/speechify-icon.png';
import gemini from '../assets/gemini.png';
import opentable from '../assets/opentable-icon.png';
import notionLight from '../assets/notion-dark.png';
import notionDark from '../assets/notion-light.png';
import salesforce from '../assets/salesforce-icon.png';
import sap from '../assets/sap-icon.png';
import uipath from '../assets/uipath-logo.png';


const Integrations = ({ darkMode }: { darkMode: boolean }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#000000" : "#FAFAFA";
    document.body.style.transition = "background-color 0.3s ease";
  }, [darkMode]);

  const themeVars = useMemo(() => {
    return darkMode ? {
      titleColor: "#F3F4F6",
      subtitleColor: "#9CA3AF"
    } : {
      titleColor: "#111827",
      subtitleColor: "#6B7280"
    };
  }, [darkMode]);

  const integrationItems = useMemo(() => [
    {
      integrationUrl: "https://n8n.io/",
      integrationLogoUrl: darkMode 
        ? n8n 
        : n8n,
      integrationName: "N8N Automation"
    },
    {
      integrationUrl: "https://www.uipath.com/product/orchestrator",
      integrationLogoUrl: darkMode 
        ? uipath 
        : uipath,
      integrationName: "UiPath Orchestrator"
    },
    {
      integrationUrl: "https://airflow.apache.org/docs/apache-airflow/stable//stable-rest-api-ref.html",
      integrationLogoUrl: airflow,
      integrationName: "Apache Airflow"
    },
    {
      integrationUrl: "https://cloud.ibm.com/apidocs/watsonx-ai",
      integrationLogoUrl: watsonx,
      integrationName: "Watsonx API"
    },
    {
      integrationUrl: "https://developer.adobe.com/firefly-services/docs/firefly-api/api/",
      integrationLogoUrl: firefly,
      integrationName: "Adobe Firefly"
    },
    {
      integrationUrl: "https://docs.lumalabs.ai/docs/api",
      integrationLogoUrl: darkMode 
        ? luma 
        : luma,
      integrationName: "Luma API"
    },
    {
      integrationUrl: "https://x.ai/api",
      integrationLogoUrl: darkMode 
        ? spacexsiDark 
        : spacexsiLight,
      integrationName: "SpaceXSI API"
    },
    {
      integrationUrl: "https://developers.openai.com/api/docs",
      integrationLogoUrl: openai,
      integrationName: "OpenAI API"
    },
    {
      integrationUrl: "https://docs.speechify.ai/docs/get-started/overview",
      integrationLogoUrl: speechify,
      integrationName: "Speechify SIMBA"
    },
    {
      integrationUrl: "https://ai.google.dev/gemini-api/docs",
      integrationLogoUrl: gemini,
      integrationName: "Gemini API"
    },
    {
      integrationUrl: "https://docs.opentable.com/",
      integrationLogoUrl: opentable,
      integrationName: "OpenTable API"
    },
    {
      integrationUrl: "https://developers.notion.com/reference/intro",
      integrationLogoUrl: darkMode ? notionDark : notionLight,
      integrationName: "Notion API"
    },
    {
      integrationUrl: "https://developer.salesforce.com/docs/apis",
      integrationLogoUrl: salesforce,
      integrationName: "Salesforce REST API"
    },
    {
      integrationUrl: "https://api.sap.com/",
      integrationLogoUrl: sap,
      integrationName: "SAP ERP API"
    }
  ], [darkMode]);

  return (
    <Box style={{ paddingBottom: "120px" }}>
      <Container size="4" px={{ initial: "4", md: "6", lg: "8" }} style={{ marginTop: "64px" }}>
        
        <Box style={{ textAlign: "center", marginBottom: "64px", animation: "fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards" }}>
          <Heading 
            size="8" 
            style={{ 
              fontFamily: "'Libre Baskerville', serif", 
              letterSpacing: "-0.02em", 
              color: themeVars.titleColor,
              marginBottom: "16px",
              marginTop: "23px"
            }}
          >
            Prospective Integrations
          </Heading>
          <Text 
            as="p" 
            size="4" 
            style={{ 
              color: themeVars.subtitleColor, 
              maxWidth: "800px", 
              margin: "0 auto", 
              lineHeight: 1.6, 
              fontFamily: "'Libre Franklin', sans-serif" 
            }}
          >
            Future <span className="integration-inline-code">VectorSigma</span> package version releases will include convenience methods for effortless integration with popular AI, Data Engineering, and Productivity APIs.
          </Text>
        </Box>

        <Box style={{ animation: "fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards", opacity: 0 }}>
          <IntegrationsSection darkMode={darkMode} items={integrationItems} />
        </Box>

        <Box style={{ marginTop: "0px", animation: "fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards", opacity: 0 }}>
          <AdRibbon darkMode={darkMode}>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3704334287285175" crossOrigin="anonymous"></script>
            <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-3704334287285175"
              data-ad-slot="8343960922"
              data-ad-format="auto"
              data-full-width-responsive="true">
            </ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </AdRibbon>
        </Box>

      </Container>
      
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .integration-inline-code {
            background: ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"};
            color: ${darkMode ? "#800020" : "#800020"};
            padding: 0.2em 0.4em;
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85em;
          }
        `}
      </style>
    </Box>
  );
};

export default Integrations;