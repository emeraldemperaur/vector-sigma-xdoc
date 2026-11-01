import { useEffect, useMemo } from "react";
import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { useVectorSigma } from '@emeraldemperaur/vector-sigma';
import AdRibbon from "../components/AdRibbon";
import { UseCaseCard } from "../components/UseCaseCard";
import romeWallpaper from '../assets/rome-wallpaper.webp';
import florenceWallpaper from '../assets/florence-wallpaper.jpg';
import { xFormN8NPrototypeData } from "../utils/n8nSchema";
import { airflowOnboardingData } from "../utils/airflowSchema";
import { xFormAirflowDAGSchemaSnippet, xFormCodeAirflowUsageSnippet, xFormCodeN8NUsageSnippet, xFormN8NSchemaSnippet } from "../utils/xFormSchemaSnippetStrings";

const Showcase = ({ darkMode }: { darkMode: boolean }) => {
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

  const n8nBuilder = useVectorSigma(xFormN8NPrototypeData)
    .setName('Côte d\'Azur Restaurant Reservation')
    .setBrand("#800020", "", 'right');

  const airflowBuilder = useVectorSigma(airflowOnboardingData)
    .setName('Apache Airflow DAG Provisioning')
    .setBrand("#017CEE", "", 'left');

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
            Showcase Sandbox
          </Heading>
          <Text 
            as="p" 
            size="4" 
            style={{ 
              color: themeVars.subtitleColor, 
              maxWidth: "9694px", 
              margin: "0 auto", 
              lineHeight: 1.6, 
              fontFamily: "'Libre Franklin', sans-serif" 
            }}
          >
            Explore real-world production deployments of VectorSigma. Toggle between the live UI renders, dynamic schemas, and React integration code within the interactive device previews.
          </Text>
        </Box>

        <Box style={{ display: "flex", flexDirection: "column", gap: "64px", animation: "fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards", opacity: 0 }}>
          <UseCaseCard 
            design="neumorphic" 
            darkMode={darkMode} 
            useCaseLabel="USECASE #001"
            useCaseDescription="N8N Webhook Trigger Node"
            useCaseSynopsis="Guest details data capture for N8N Webhook Trigger Node of a hospitality automation workflow to capture reservation requests and manage confirmations using AI voice agents."
            fileNameLabel="N8NAutomation.tsx"
            codeString={xFormCodeN8NUsageSnippet}
            schemaFileNameLabel="xFormN8NSchema.ts"
            schemaString={xFormN8NSchemaSnippet}
            backgroundImage={romeWallpaper}
            enableSimulation={true} 
            renderComponent={
              n8nBuilder.render({ 
                displayMode: 'codex', 
                readOnlyMode: false,
                onSubmit: (values, actions) => { 
                    console.log("N8N Payload:", values);
                    alert("N8N Simulation Triggered!"); 
                    actions.resetForm(); }
              })
            }
          />

          <UseCaseCard 
            design="neumorphic" 
            darkMode={darkMode} 
            useCaseLabel="USECASE #002"
            useCaseDescription="Client Onboarding Data Pipeline"
            useCaseSynopsis="Client information data capture DAG node for onboarding normalized new user account details into a SaaS application, database or data warehouse."
            fileNameLabel="AirflowDAGNode.tsx"
            codeString={xFormCodeAirflowUsageSnippet}
            schemaFileNameLabel="xFormDAGSchema.ts"
            schemaString={xFormAirflowDAGSchemaSnippet}
            backgroundImage={florenceWallpaper}
            enableSimulation={true}
            renderComponent={
              airflowBuilder.render({ 
                displayMode: 'accordion', 
                readOnlyMode: false,
                onSubmit: (values, actions) => { 
                    alert("DAG Provisioned!"); 
                    actions.resetForm(); 
                    console.log("N8N Payload:", values);
                }
              })
            }
          />
        </Box>

        <Box style={{ marginTop: "80px", animation: "fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards", opacity: 0 }}>
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
        `}
      </style>
    </Box>
  );
};

export default Showcase;