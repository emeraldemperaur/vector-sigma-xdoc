import { Box, Flex, Text, Heading, Link, Container } from "@radix-ui/themes";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

interface FooterSectionProps {
  darkMode?: boolean;
  variant?: "neumorphic" | "material";
  backgroundColorOverride?: string;
  textColorOverride?: string;
}

const openPortfolio = () => {
    window.open('https://www.mekaegwim.ca', '_blank')
}

const FooterSection = ({
  darkMode = false,
  variant = "neumorphic",
  backgroundColorOverride,
  textColorOverride,
}: FooterSectionProps) => {

  const defaultBg = darkMode ? "#121316" : "#e5e7eb"; 
  const defaultText = darkMode ? "#9ca3af" : "#4b5563"; 
  const headingColor = darkMode ? "#f3f4f6" : "#111827"; 
  const bgColor = backgroundColorOverride || defaultBg;
  const txtColor = textColorOverride || defaultText;

  const footerShadow = variant === "neumorphic"
    ? {
        boxShadow: darkMode
          ? "inset 0px 12px 16px -8px rgba(0,0,0,0.6)" 
          : "inset 0px 12px 16px -8px rgba(0,0,0,0.05), inset 0px -12px 16px -8px rgba(255,255,255,0.8)",
      }
    : {
        borderTop: darkMode ? "1px solid #2d2d2d" : "1px solid #d1d5db",
      };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: bgColor,
        color: txtColor,
        padding: "64px 24px 32px 24px", 
        ...footerShadow,
      }}
    >
      <Container size="4">
        <Flex 
          direction={{ initial: "column", md: "row" }} 
          justify="between" 
          gap="6"
          mb="6"
        >
          <Box style={{ flex: 1, maxWidth: "300px" }}>
            <Heading size="5" 
            style={{ 
                color: headingColor, 
                letterSpacing: "0.06em",
                fontFamily: "Libre Franklin",
                fontWeight: 500,
                }} mb="3">
              VΣ :: VectorSigma
            </Heading>
            <Text size="2" as="p"
            style={{ 
                lineHeight: "1.6",
                fontFamily: "Libre Franklin",
                textAlign: "justify",
                marginTop: "13px",
                marginBottom: "23px",
                fontWeight: 300
                }}>
              Flexible, type-safe, and extensible form builder for React. Level up your data pipelines, automation workflows and API integrations with convenience methods and robust validation.
            </Text>
          </Box>

          <Flex direction="column" gap="2" style={{fontFamily: "Libre Franklin"}}>
            <Heading size="3" 
            style={{ 
                color: headingColor,
                letterSpacing: "0.03em",
                textTransform: "capitalize",
                fontWeight: 600 
                }} mb="1">Resources</Heading>
            <Link style={{ cursor: "pointer", fontWeight: 500, color: txtColor }} 
            target="_blank"
            href="https://n8n.io/" color="gray" size="2">λ N8N Workflow Automation</Link>
            <Link style={{ cursor: "pointer", fontWeight: 500, color: txtColor }} 
            href="https://cloud.ibm.com/apidocs/watsonx-ai" 
            target="_blank" color="gray" size="2">δ IBM Watsonx Orchestrate</Link>
            <Link style={{ cursor: "pointer", fontWeight: 500, color: txtColor }} 
            href="https://developer.adobe.com/firefly-services/docs/firefly-api/api/"
            target="_blank" 
            color="gray" size="2">Δ Adobe Firefly API</Link>
            <Link style={{ cursor: "pointer", fontWeight: 500, color: txtColor }} 
            href="https://lumalabs.ai/" target="_blank" color="gray" size="2">β Luma AI API</Link>
          </Flex>
          
        </Flex>

        <Box 
          style={{ 
            height: "1px", 
            backgroundColor: darkMode ? "#2d2d2d" : "#d1d5db",
            marginBottom: "24px"
          }} 
        />

        <Flex 
          direction={{ initial: "column", sm: "row" }} 
          justify="between" 
          align="center"
          gap="4"
        >
          <Text onClick={() => openPortfolio()} style={{
            fontFamily: "Libre Franklin",
            fontWeight: 500,
            letterSpacing: "0.06em",
            cursor: "pointer",
            }} size="2">
            &copy; {currentYear} VectorSigma | BUILD by ME
          </Text>

          <Flex gap="4">
            <Link href="https://www.github.com/emeraldemperaur" color="gray" target="_blank"
            style={{ display: "flex", alignItems: "center", cursor: "pointer", color: txtColor }}>
              <GitHubLogoIcon width="20" height="20" />
            </Link>
            <Link href="https://www.instagram.com/chromito.me" color="gray" target="_blank"
            style={{ display: "flex", alignItems: "center", cursor: "pointer", color: txtColor }}>
              <InstagramLogoIcon width="20" height="20" />
            </Link>
            <Link href="https://ca.linkedin.com/in/emekaegwimdeveloper" color="gray" target="_blank"
            style={{ display: "flex", alignItems: "center", cursor: "pointer", color: txtColor }}>
              <LinkedInLogoIcon width="20" height="20" />
            </Link>
          </Flex>
        </Flex>

      </Container>
    </footer>
  );
};

export default FooterSection;