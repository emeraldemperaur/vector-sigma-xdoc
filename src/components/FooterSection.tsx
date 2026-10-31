import { Text, Heading, Link, Container } from "@radix-ui/themes";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import devLogoLight from '../assets/me-dev-logo-black.png';
import devLogoDark from '../assets/me-dev-logo-white.png';


interface FooterSectionProps {
  darkMode?: boolean;
  variant?: "neumorphic" | "material"; 
  backgroundColorOverride?: string;
  textColorOverride?: string;
}

const FooterSection = ({
  darkMode = false,
  backgroundColorOverride,
  textColorOverride,
}: FooterSectionProps) => {

  const bgColor = backgroundColorOverride || (darkMode ? "#000000" : "#fafafa");
  const txtColor = textColorOverride || (darkMode ? "#9ca3af" : "#6b7280");
  const headingColor = darkMode ? "#f9fafb" : "#111827";
  const hoverColor = darkMode ? "#ffffff" : "#000000";
  const borderColor = darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)";

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: bgColor,
        color: txtColor,
        padding: "64px 24px 32px 24px", 
        borderTop: `1px solid ${borderColor}`,
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <Container size="4" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            flexWrap: "wrap", 
            gap: "48px", 
            marginBottom: "48px" 
          }}
        >
          <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
            <Heading 
              as="h3"
              style={{ 
                color: headingColor, 
                letterSpacing: "-0.02em",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                margin: "0 0 16px 0", 
              }} 
            >
              VΣCTOR Σ
            </Heading>
            <Text 
              as="p"
              style={{ 
                lineHeight: "1.6",
                color: txtColor,
                fontFamily: "Libre Franklin",
                fontWeight: 400,
                fontSize: "15px",
                margin: 0,
                textAlign: 'justify'
              }}
            >
              Flexible, type-safe, and extensible declarative form engine for React. Level up your data pipelines, automation workflows and API integrations with convenience methods and robust validation.
            </Text>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "200px" }}>
            <Heading 
              as="h4"
              style={{ 
                color: headingColor,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontSize: "14px",
                margin: "0 0 4px 0",
              }} 
            >
              Resources
            </Heading>
            
            {[
              { label: "λ N8N Workflow Automation", href: "https://n8n.io/" },
              { label: "δ IBM Watsonx Orchestrate", href: "https://cloud.ibm.com/apidocs/watsonx-ai" },
              { label: "Δ Adobe Firefly API", href: "https://developer.adobe.com/firefly-services/docs/firefly-api/api/" },
              { label: "β Luma AI API", href: "https://lumalabs.ai/" }
            ].map((link, idx) => (
              <Link 
                key={idx}
                href={link.href}
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  cursor: "pointer", 
                  fontWeight: 400, 
                  color: txtColor,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  fontSize: "14px",
                  fontFamily: 'Libre Franklin'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
                onMouseLeave={(e) => e.currentTarget.style.color = txtColor}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div 
          style={{ 
            height: "1px", 
            width: "100%",
            backgroundColor: borderColor,
            margin: "0 0 24px 0" 
          }} 
        />

        <div 
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px"
          }}
        >
          <Text 
            style={{
              fontFamily: "Libre Baskerville",
              fontWeight: 400,
              color: txtColor,
              fontSize: "14px",
              margin: 0
            }}
          >
            &copy; {currentYear} VectorSigma |{" "}
            <a 
              href="https://www.mekaegwim.ca" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: txtColor,
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = txtColor}
            >
              BUILD by 
              <img 
                src={darkMode ? devLogoDark : devLogoLight} 
                alt="Developer Logo" 
                style={{ height: "33px", width: "auto", display: "block" }} 
              />
            </a>
          </Text>

          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { Icon: GitHubLogoIcon, href: "https://www.github.com/emeraldemperaur" },
              { Icon: InstagramLogoIcon, href: "https://www.instagram.com/chromito.me" },
              { Icon: LinkedInLogoIcon, href: "https://ca.linkedin.com/in/emekaegwimdeveloper" }
            ].map((social, idx) => (
              <Link 
                key={idx}
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  cursor: "pointer", 
                  color: txtColor,
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
                onMouseLeave={(e) => e.currentTarget.style.color = txtColor}
              >
                <social.Icon width="24" height="24" />
              </Link>
            ))}
          </div>
        </div>

      </Container>
    </footer>
  );
};

export default FooterSection;