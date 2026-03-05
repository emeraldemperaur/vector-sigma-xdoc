import { Box, Flex, Text, Heading, Link, Container } from "@radix-ui/themes";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

interface FooterSectionProps {
  darkMode?: boolean;
  variant?: "neumorphic" | "material";
  backgroundColorOverride?: string;
  textColorOverride?: string;
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
            <Heading size="5" style={{ color: headingColor, letterSpacing: "1px" }} mb="3">
              VΣ :: VectorSigma
            </Heading>
            <Text size="2" style={{ lineHeight: "1.6" }}>
              A highly flexible, type-safe, and extensible form builder for React. Level up your data pipelines, automation workflows and API integrations with convenience methods and robust validation.
            </Text>
          </Box>

          {/* Resources Column Only */}
          <Flex direction="column" gap="2">
            <Heading size="3" style={{ color: headingColor }} mb="1">Resources</Heading>
            <Link href="#" color="gray" size="2">Documentation</Link>
            <Link href="#" color="gray" size="2">API Reference</Link>
            <Link href="#" color="gray" size="2">Examples</Link>
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
          <Text size="2">
            &copy; {currentYear} VectorSigma | BUILD by ME
          </Text>

          <Flex gap="4">
            <Link href="#" color="gray" style={{ display: "flex", alignItems: "center" }}>
              <GitHubLogoIcon width="20" height="20" />
            </Link>
            <Link href="#" color="gray" style={{ display: "flex", alignItems: "center" }}>
              <InstagramLogoIcon width="20" height="20" />
            </Link>
            <Link href="#" color="gray" style={{ display: "flex", alignItems: "center" }}>
              <LinkedInLogoIcon width="20" height="20" />
            </Link>
          </Flex>
        </Flex>

      </Container>
    </footer>
  );
};

export default FooterSection;