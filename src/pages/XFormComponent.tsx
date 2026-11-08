import { useEffect, useMemo, useState } from "react";
import { Box, Container, Flex, Text, Heading } from "@radix-ui/themes";
import AdRibbon from "../components/AdRibbon";
import ChromaticEmbed from "../components/ChromaticEmbed";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { FaShapes } from "@react-icons/all-files/fa/FaShapes";

const XFormComponent = ({ darkMode }: { darkMode: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const storybookUrl = "https://69ae1e2c772d79457e37fbad-vnnbfkvqja.chromatic.com/";

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#000000" : "#FAFAFA";
    document.body.style.transition = "background-color 0.3s ease";
  }, [darkMode]);

  const themeVars = useMemo(() => {
    return darkMode ? {
      windowBg: "rgba(15, 17, 21, 0.75)",
      windowBorder: "1px solid rgba(255, 255, 255, 0.1)",
      windowShadow: isHovered 
        ? "0 40px 100px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(122, 115, 255, 0.15)"
        : "0 40px 100px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(122, 115, 255, 0.05)",
      headerBg: "rgba(255, 255, 255, 0.03)",
      headerBorder: "1px solid rgba(255, 255, 255, 0.08)",
      textColor: "#9CA3AF",
      textHover: "#FFFFFF",
      titleColor: "#F3F4F6",
      subtitleColor: "#9CA3AF"
    } : {
      windowBg: "rgba(255, 255, 255, 0.75)",
      windowBorder: isHovered ? "1px solid rgba(122, 115, 255, 0.4)" : "1px solid rgba(0, 0, 0, 0.1)",
      windowShadow: isHovered 
        ? "0 30px 80px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(0, 0, 0, 0.02)"
        : "0 30px 80px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.02)",
      headerBg: "rgba(0, 0, 0, 0.02)",
      headerBorder: "1px solid rgba(0, 0, 0, 0.08)",
      textColor: "#6B7280",
      textHover: "#111827",
      titleColor: "#111827",
      subtitleColor: "#6B7280"
    };
  }, [darkMode, isHovered]);

  return (
    <Box style={{ paddingBottom: "120px" }}>
      <Container size="4" px={{ initial: "4", md: "6", lg: "8" }} style={{ marginTop: "64px" }}>
        
        <Box style={{ textAlign: "center", marginBottom: "48px", animation: "fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards" }}>
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
            χForm Components
          </Heading>
          <Text 
            as="p" 
            size="4" 
            style={{ 
              color: themeVars.subtitleColor, 
              maxWidth: "900px", 
              margin: "0 auto", 
              lineHeight: 1.6, 
              fontFamily: "'Libre Franklin', sans-serif" 
            }}
          >
            Explore the complete VectorSigma component ecosystem. Interact with rendered UI controls, review strict TypeScript interfaces, and validate design system constraints directly within our embedded Storybook playground.
          </Text>
        </Box>

        <Box 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "100%",
            background: themeVars.windowBg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: themeVars.windowBorder,
            borderRadius: "12px",
            boxShadow: themeVars.windowShadow,
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            animation: "fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards",
            opacity: 0
          }}
        >
          <Flex 
            align="center" 
            justify="between" 
            style={{
              height: "48px",
              padding: "0 20px",
              background: themeVars.headerBg,
              borderBottom: themeVars.headerBorder,
            }}
          >
            <Flex align="center" gap="2" style={{ width: "120px" }}>
              <Box style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56", border: "1px solid rgba(0,0,0,0.1)" }} />
              <Box style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E", border: "1px solid rgba(0,0,0,0.1)" }} />
              <Box style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F", border: "1px solid rgba(0,0,0,0.1)" }} />
            </Flex>

            <Flex align="center" gap="2" style={{ color: themeVars.textColor }}>
              <FaShapes size={14} />
              <Text style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "13px", fontWeight: 500 }}>
                &nbsp;VΣ Storybook Library
              </Text>
            </Flex>

            <Flex justify="end" style={{ width: "120px" }}>
              <a 
                href={storybookUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsLinkHovered(true)}
                onMouseLeave={() => setIsLinkHovered(false)}
                title="Open Sandbox in new tab"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: isLinkHovered ? themeVars.textHover : themeVars.textColor,
                  textDecoration: "none",
                  fontFamily: "'Libre Franklin', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  transition: "color 0.2s ease"
                }}
              >
                Open Externally <FaExternalLinkAlt size={11} />
              </a>
            </Flex>
          </Flex>

          <Box style={{ 
            width: "100%", 
            height: "92vh", 
            minHeight: "850px", 
            padding: "24px", 
            boxSizing: "border-box" 
          }}>
            <Box style={{
              width: "100%", 
              height: "100%", 
              borderRadius: "8px", 
              overflow: "hidden", 
              boxShadow: darkMode ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.05)"
            }}>
              <ChromaticEmbed 
                src={storybookUrl} 
                darkMode={darkMode}
                height="100%" 
                hideSidebar={false} 
              />
            </Box>
          </Box>
        </Box>

        <Box style={{ marginTop: "64px" }}>
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

export default XFormComponent;