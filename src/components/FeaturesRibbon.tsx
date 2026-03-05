import React from "react";
import { Box, Flex, Text, Heading, Section, Container } from "@radix-ui/themes";
import { 
  LightningBoltIcon, 
  LockClosedIcon, 
  MagicWandIcon, 
  MixerHorizontalIcon 
} from "@radix-ui/react-icons";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturesRibbonProps {
  darkMode?: boolean;
  variant?: "neumorphic" | "material";
  features?: Feature[];
}

const FeaturesRibbon = ({
  darkMode = false,
  variant = "neumorphic",
  features,
}: FeaturesRibbonProps) => {

  const defaultFeatures: Feature[] = [
    {
      title: "Blazing Fast",
      description: "Optimized rendering for maximum application UI performance.",
      icon: <LightningBoltIcon width="32" height="32" />,
    },
    {
      title: "Type Safe",
      description: "Built strictly with TypeScript to catch errors before production.",
      icon: <LockClosedIcon width="32" height="32" />,
    },
    {
      title: "Auto-Magical Validation",
      description: "Cleverly handles the heavy lifting of form validation automatically.",
      icon: <MagicWandIcon width="32" height="32" />,
    },
    {
      title: "Highly Extensible",
      description: "Customize everything from implementation to UI styling.",
      icon: <MixerHorizontalIcon width="32" height="32" />,
    },
  ];

  const data = features || defaultFeatures;
  const ribbonBg = darkMode ? "#1b1c1d" : "#f3f4f6";
  const iconColor = darkMode ? "#9ca3af" : "#6b7280"; 
  const titleColor = darkMode ? "#d1d5db" : "#111827"; 
  const descColor = darkMode ? "#8b929e" : "#4b5563"; 

  const depthStyle = variant === "neumorphic"
    ? {
        boxShadow: darkMode
          ? "inset 0px 12px 16px -8px rgba(0,0,0,0.9), inset 0px -12px 16px -8px rgba(255,255,255,0.03)"
          : "inset 0px 12px 16px -8px rgba(0,0,0,0.1), inset 0px -12px 16px -8px rgba(255,255,255,0.8)",
      }
    : {
        boxShadow: darkMode
          ? "inset 0px 4px 8px -2px rgba(0,0,0,0.5)"
          : "inset 0px 4px 8px -2px rgba(0,0,0,0.05)",
        borderTop: darkMode ? "1px solid #1f2023" : "1px solid #e5e7eb",
        borderBottom: darkMode ? "1px solid #1f2023" : "1px solid #e5e7eb",
      };

  return (
    <Section
      style={{
        width: "100%",
        backgroundColor: ribbonBg,
        fontFamily: "Libre Franklin",
        minHeight: "200px", 
        display: "flex",
        alignItems: "center",
        padding: "48px 0",
        ...depthStyle,
      }}
    >
      <Container size="4">
        <Flex 
          direction={{ initial: "column", md: "row" }} 
          align="center" 
          justify="between"
        >
          {data.map((item, index) => (
            <React.Fragment key={index}>
              
              <Flex 
                direction="column" 
                align="center" 
                style={{ 
                  flex: 1, 
                  textAlign: "center", 
                  padding: "0 16px",
                  maxWidth: "280px"
                }}
              >
                <Box style={{ color: iconColor, marginBottom: "16px" }}>
                  {item.icon}
                </Box>
                
                <Heading 
                  size="4" 
                  style={{ color: titleColor, marginBottom: "8px", letterSpacing: "0.5px" }}
                >
                  {item.title}
                </Heading>
                
                <Text 
                  size="2" 
                  style={{ color: descColor, lineHeight: "1.5" }}
                >
                  {item.description}
                </Text>
              </Flex>

              {index < data.length - 1 && (
                <Box className="feature-separator" />
              )}
              
            </React.Fragment>
          ))}
        </Flex>
      </Container>
    </Section>
  );
};

export default FeaturesRibbon;