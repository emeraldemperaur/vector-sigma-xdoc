import { Box, Flex, Heading, Text, Section, Container } from "@radix-ui/themes";

interface RibbonProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  backgroundColorOverride?: string,
  textColorOverride?: string,
  darkMode?: boolean;
  variant?: "neumorphic" | "material";
}

const ProductRibbon = ({
  title,
  subtitle,
  icon,
  description,
  darkMode = false,
  variant = "material",
  backgroundColorOverride,
  textColorOverride
}: RibbonProps) => {

  const backgroundColor = darkMode ? backgroundColorOverride || "#000000" : backgroundColorOverride || "#000000";
  const textColor = darkMode ? textColorOverride || "#cdcdcd" : textColorOverride || "#ffffff";

  const shadowStyle = variant === "neumorphic"
    ? {
        boxShadow: darkMode 
          ? `10px 10px 20px #080808, -10px -10px 20px #1c1c1c` 
          : `20px 20px 60px #bebebe, -20px -20px 60px #ffffff`,
        borderRadius: "12px",
      }
    : {
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      };

  return (
    <Section 
      size="3" 
      style={{ 
        backgroundColor: backgroundColor, 
        width: "100%",
        paddingTop: "64px", 
        fontFamily: "Libre Baskerville",
        letterSpacing: "0.13em"
      }}
    >
      <Container size="2">
        <Box
          p="6"
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
            ...shadowStyle
          }}
        >
          <Flex direction="column" align="center" gap="4">
            <Heading 
            style={{
                fontFamily: "Libre Baskerville", 
                fontSize: "23px", 
                letterSpacing: "0.13em"
            }} 
            size="8" align="center" weight="bold">
              {title}
            </Heading>

            <Text size="4" 
            style={{ 
                letterSpacing: '0.10em', 
                fontFamily: "Libre Franklin",
                textTransform: 'uppercase', 
                fontWeight: 200,
                color: textColor 
                }}>
              {subtitle}
            </Text>

            <Box style={{ fontSize: "48px" }}>
              {icon}
            </Box>

            <Text 
              as="p" 
              size="3" 
              style={{ 
                fontFamily: "Libre Franklin",
                textAlign: "justify", 
                lineHeight: "1.6",
                maxWidth: "100%",
                marginLeft: "111px",
                marginRight: "111px",
                marginBottom: "33px",
                fontWeight: 300 
              }}
            >
              {description}
            </Text>
          </Flex>
        </Box>
      </Container>
    </Section>
  );
};

export default ProductRibbon;