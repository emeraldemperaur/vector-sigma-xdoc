import React from "react";
import { Box, Flex, Heading, Text, Section, Container } from "@radix-ui/themes";

interface PageTitleProps {
  darkMode?: boolean;
  variant?: "neumorphic" | "material" | "outline";
  icon?: React.ReactNode;
  title: string | React.ReactNode;
  subtitle?: string;
  titleSize?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  subtitleSize?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
}

export const PageTitle = ({
  darkMode = false,
  variant = "neumorphic",
  icon,
  title,
  subtitle,
  titleSize = "8",    
  subtitleSize = "4", 
}: PageTitleProps) => {

  const pageBg = darkMode ? "#121212" : "#f4f5f7";
  
  const containerBg = variant === "neumorphic" 
    ? pageBg 
    : (darkMode ? "#1e1e1e" : "#ffffff"); 

  const textPrimary = darkMode ? "#f3f4f6" : "#111827";
  const textSecondary = darkMode ? "#9ca3af" : "#6b7280";
  const borderColor = darkMode ? "#374151" : "#e5e7eb";

  let variantStyles = {};
  
  switch (variant) {
    case "neumorphic":
      variantStyles = {
        boxShadow: darkMode
          ? "8px 8px 16px #0a0a0a, -8px -8px 16px #1a1a1a"
          : "8px 8px 16px #d1d5db, -8px -8px 16px #ffffff",
        border: "none",
        borderRadius: "24px",
      };
      break;
    case "material":
      variantStyles = {
        boxShadow: darkMode
          ? "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
        border: "1px solid",
        borderRadius: "0px",
      };
      break;
    case "outline":
      variantStyles = {
        boxShadow: "none",
        border: `2px solid ${borderColor}`,
        borderRadius: "16px",
        backgroundColor: "transparent",
      };
      break;
  }

  return (
    <Section
      style={{
        width: "100%",
        backgroundColor: pageBg,
        padding: "64px 0", // Adequate spacing around the component
      }}
    >
      <Container size="3" px={{ initial: "4", md: "6" }}>
        <Box
          p={{ initial: "6", md: "8" }} // Inner padding for the content
          style={{
            backgroundColor: containerBg,
            ...variantStyles,
          }}
        >
          <Flex 
            direction="column" 
            align="center" 
            justify="center" 
            gap="4" 
            style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
          >
            
            {icon && (
              <Box 
                style={{ 
                  color: textPrimary, 
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "0px",
                  fontSize: "69px"
                }}
              >
                {icon}
              </Box>
            )}

            <Heading 
              as="h1" 
              size={titleSize} 
              weight="bold" 
              style={{ 
                color: textPrimary, 
                letterSpacing: "0.13em",
                fontFamily: "Libre Baskerville",
                fontWeight: 300,
                fontSize: "23px",
                textTransform: "uppercase",
                marginBottom: "23px"

            }}
            >
              {title}
            </Heading>

            {/* 3. Optional Subtitle */}
            {subtitle && (
              <Text 
                as="p" 
                size={subtitleSize} 
                style={{ color: textSecondary, lineHeight: "1.6", maxWidth: "600px" }}
              >
                {subtitle}
              </Text>
            )}

          </Flex>
        </Box>
      </Container>
    </Section>
  );
};