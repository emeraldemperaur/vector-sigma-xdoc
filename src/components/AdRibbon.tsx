import React from "react";
import { Box, Flex, Text, Section } from "@radix-ui/themes";

interface AdSectionProps {
  children?: React.ReactNode;
  darkMode?: boolean;
  backgroundColorOverride?: string;
  textColorOverride?: string;
  variant?: "neumorphic" | "material";
  adLabel?: string;
}

const AdRibbon = ({
  children,
  darkMode = false,
  backgroundColorOverride,
  textColorOverride,
  variant = "neumorphic",
  adLabel = "Advertisement",
}: AdSectionProps) => {

  const defaultBg = darkMode ? "#1a1c1e" : "#e5e7eb"; 
  const defaultText = darkMode ? "#9ca3af" : "#6b7280";
  const bgColor = backgroundColorOverride || defaultBg;
  const txtColor = textColorOverride || defaultText;
  const shadowStyle = variant === "neumorphic"
    ? {
        boxShadow: darkMode
          ? "inset 0px 12px 16px -8px rgba(0,0,0,0.8), inset 0px -12px 16px -8px rgba(255,255,255,0.03)"
          : "inset 0px 12px 16px -8px rgba(0,0,0,0.15), inset 0px -12px 16px -8px rgba(255,255,255,0.8)",
      }
    : {
        boxShadow: darkMode
          ? "inset 0px 6px 10px -4px rgba(0,0,0,0.5)"
          : "inset 0px 6px 10px -4px rgba(0,0,0,0.08)",
        borderTop: darkMode ? "1px solid #2d2d2d" : "1px solid #d1d5db",
        borderBottom: darkMode ? "1px solid #2d2d2d" : "1px solid #d1d5db",
      };

  return (
    <Section
      style={{
        width: "100%",
        backgroundColor: bgColor,
        padding: "16px 0", 
        maxHeight: "200px", 
        overflow: "hidden",
        ...shadowStyle,
      }}
    >
      <Flex direction="column" align="center" justify="center" style={{ width: "100%", height: "100%" }}>
        
        {adLabel && (
          <Text 
            size="1" 
            style={{ 
              color: txtColor, 
              textTransform: "uppercase", 
              letterSpacing: "0.5px",
              marginBottom: "8px",
              fontSize: "10px"
            }}
          >
            - {adLabel} -
          </Text>
        )}

        <Box 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            width: "100%",
            height: "69px",
            maxWidth: "970px", 
            maxHeight: "100px !important"
          }}
        >
          {children ? children : (
             <Text size="2" style={{ color: txtColor, opacity: 0.5 }}>
               Ad Space Available
             </Text>
          )}
        </Box>

      </Flex>
    </Section>
  );
};

export default AdRibbon;