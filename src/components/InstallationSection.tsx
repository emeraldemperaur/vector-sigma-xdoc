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

  const sectionBg = darkMode ? "#000000" : "#fafafa";
  const surfaceBg = backgroundColorOverride || (darkMode ? "#0a0a0a" : "#ffffff");
  const txtColor = textColorOverride || (darkMode ? "#f9fafb" : "#111827");
  const mutedTxtColor = darkMode ? "#9ca3af" : "#6b7280";
  const borderColor = darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)";
  const terminalBg = darkMode ? "#000000" : "#f3f4f6";

  const cardStyles = variant === "neumorphic"
    ? {
        boxShadow: darkMode 
          ? "0 20px 40px -10px rgba(0,0,0,0.8)" 
          : "0 20px 40px -10px rgba(0,0,0,0.05)",
        border: `1px solid ${borderColor}`,
        borderRadius: "16px",
      }
    : {
        boxShadow: "none",
        border: `1px solid ${borderColor}`,
        borderRadius: "12px",
      };

  return (
    <Section
      style={{
        backgroundColor: sectionBg,
        width: "100%",
        padding: "80px 24px", 
      }}
    >
      <Container size="3">
        <Card
          style={{
            backgroundColor: surfaceBg,
            color: txtColor,
            maxWidth: "800px", 
            margin: "0 auto",
            ...cardStyles,
            overflow: "hidden"
          }}
        >
          <Flex direction="column" style={{ padding: "40px" }}>
            
            <Box style={{ marginBottom: "24px" }}>
              <Heading 
                size="7" 
                weight="bold" 
                style={{
                  fontFamily: "Libre Baskerville, -apple-system, BlinkMacSystemFont, sans-serif", 
                  fontSize: '24px', 
                  letterSpacing: "-0.02em",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  margin: 0
                }}
              >
                {title} <i className="fa-solid fa-box-archive" style={{ fontSize: "20px", color: mutedTxtColor }}></i>
              </Heading>
              
              {subtitle && (
                <Text 
                  as="p" 
                  size="3" 
                  style={{ 
                    color: mutedTxtColor,
                    fontFamily: "Libre Franklin, -apple-system, BlinkMacSystemFont, sans-serif",
                    letterSpacing: "0.01em",
                    lineHeight: "1.6",
                    marginTop: "8px",
                    marginBottom: 0
                 }}
                >
                  {subtitle}
                </Text>
              )}
            </Box>

            <Flex
              align="center"
              justify="between"
              style={{
                backgroundColor: terminalBg,
                borderRadius: "8px",
                padding: "16px 20px",
                border: `1px solid ${borderColor}`,
                width: "100%",
                boxSizing: "border-box"
              }}
            >
              <Text 
                style={{ 
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", 
                  fontSize: "15px",
                  color: txtColor 
                }}
              >
                {command}
              </Text>
              
              <button
                onClick={handleCopy}
                title="Copy to clipboard"
                aria-label="Copy installation command"
                style={{
                  background: isCopied ? (darkMode ? "rgba(16, 185, 129, 0.1)" : "#d1fae5") : "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: isCopied ? "#10b981" : mutedTxtColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isCopied) e.currentTarget.style.backgroundColor = darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isCopied) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {isCopied ? <CheckIcon width="20" height="20" /> : <CopyIcon width="20" height="20" />}
              </button>
            </Flex>

          </Flex>
        </Card>
      </Container>
    </Section>
  );
};

export default InstallSection;