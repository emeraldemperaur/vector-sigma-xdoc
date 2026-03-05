import { useState } from "react";
import { Flex, Heading, Text, Section, Container, Card, Box } from "@radix-ui/themes";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

interface InstallSectionProps {
  title?: string;
  subtitle?: string;
  darkMode?: boolean;
  backgroundColorOverride?: string;
  textColorOverride?: string;
  variant?: "neumorphic" | "material";
}

const InstallSection = ({
  title = "Installation",
  subtitle,
  darkMode = false,
  backgroundColorOverride,
  textColorOverride,
  variant = "material",
}: InstallSectionProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const command = "npm install vector-sigma";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // 1. Theme Colors
  const defaultBg = darkMode ? "#000000" : "#ffffff";
  const defaultText = darkMode ? "#ffffff" : "#000000";

  const cardBg = backgroundColorOverride || defaultBg;
  const txtColor = textColorOverride || defaultText;

  // 2. Card-Specific Shadows & Borders
  const cardStyles = variant === "neumorphic"
    ? {
        boxShadow: darkMode
          ? "10px 10px 20px #0a0a0a, -10px -10px 20px #242424" 
          : "10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff", 
        border: "none", // Neumorphism relies purely on shadows, no borders
        borderRadius: "16px",
      }
    : {
        boxShadow: darkMode
          ? "0 8px 12px -2px rgba(255, 255, 255, 0.05)"
          : "0 8px 24px -4px rgba(0, 0, 0, 0.1)", // A softer, wider shadow for Material cards
        border: darkMode ? "1px solid #333333" : "1px solid #eaeaea",
        borderRadius: "12px",
      };

  return (
    <Section
      style={{
        backgroundColor: darkMode ? "#000000" : "#ffffff", // Slight contrast behind the card
        width: "100%",
        padding: "57px 0",
      }}
    >
      <Container size="3">
        <Card
          size="4"
          style={{
            marginLeft:" 23px",
            marginRight: "23px",
            backgroundColor: cardBg,
            color: txtColor,
            ...cardStyles,
          }}
        >
          <Flex direction="column" gap="5" p="4">
            
            <Box style={{ marginLeft: "23px" }}>
              <Heading size="7" weight="bold" 
              style={{
                fontSize: '26px', 
                letterSpacing: "0.06em",
                fontFamily: 'Libre Baskerville', 
                marginTop: '13px'}}>
               {title}&nbsp;<i className="fa-solid fa-box-archive"></i>
              </Heading>
              {subtitle && (
                <Text 
                  as="p" 
                  size="4" 
                  mt="2" 
                  style={{ 
                    opacity: 0.7,
                    fontFamily: 'Libre Franklin',
                    letterSpacing: "0.06em",
                    marginBottom: "13px"
                 }}
                >
                  {subtitle}
                </Text>
              )}
            </Box>
            <Box
              style={{
                marginLeft: "33px",
                marginRight: "33px",
                marginBottom: "33px",
                backgroundColor: darkMode ? "#1a1a1a" : "#f4f4f5",
                borderRadius: "8px",
                padding: "16px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: variant === "material" && !darkMode ? "1px solid #e4e4e7" : "none",
              }}
            >
              <Text 
                style={{ 
                  fontFamily: "monospace", 
                  fontSize: "16px",
                  color: darkMode ? "#e5e5e5" : "#111827" 
                }}
              >
                {command}
              </Text>
              
              <button
                onClick={handleCopy}
                title="Copy to clipboard"
                aria-label="Copy installation command"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: darkMode ? "#a1a1aa" : "#52525b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  transition: "color 0.2s ease",
                }}
              >
                {isCopied ? <CheckIcon width="20" height="20" color="#10b981" /> : <CopyIcon width="20" height="20" />}
              </button>
            </Box>

          </Flex>
        </Card>
      </Container>
    </Section>
  );
};

export default InstallSection;