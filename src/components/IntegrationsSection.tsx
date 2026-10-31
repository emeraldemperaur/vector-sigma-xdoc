import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text, Heading, Section, Container, Card } from "@radix-ui/themes";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

export interface IntegrationOptionItemProps {
  integrationLogoUrl: string;
  integrationName: string;
  integrationUrl: string;
  darkMode?: boolean;
}

export const IntegrationOptionItem = ({
  integrationLogoUrl,
  integrationName,
  integrationUrl,
  darkMode = false,
}: IntegrationOptionItemProps) => {
  return (
    <Box
      asChild
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "130px", 
        padding: "16px",
        textDecoration: "none",
        cursor: "pointer",
        borderRadius: "16px",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        backgroundColor: "transparent",
        border: "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)";
        e.currentTarget.style.border = darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.04)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = darkMode ? "0 10px 20px rgba(0,0,0,0.3)" : "0 10px 20px rgba(0,0,0,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.border = "1px solid transparent";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <a href={integrationUrl} target="_blank" rel="noopener noreferrer">
        <Box
          style={{
            width: "48px",
            height: "48px",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <img
            src={integrationLogoUrl}
            alt={`${integrationName} logo`}
            style={{ 
              maxWidth: "100%", 
              maxHeight: "100%", 
              objectFit: "contain",
              filter: darkMode ? "drop-shadow(0 4px 12px rgba(0,0,0,0.6))" : "drop-shadow(0 4px 8px rgba(0,0,0,0.05))"
            }}
          />
        </Box>
        <Text
          size="2"
          weight="medium"
          style={{ 
            color: darkMode ? "#e5e7eb" : "#4b5563", 
            textAlign: "center",
            fontFamily: "Libre Baskerville",
            letterSpacing: "0.02em"
          }}
        >
          {integrationName}
        </Text>
      </a>
    </Box>
  );
};

interface IntegrationsCarouselProps {
  darkMode?: boolean;
  variant?: "neumorphic" | "material";
  items: Omit<IntegrationOptionItemProps, "darkMode">[];
}

const IntegrationsSection = ({
  darkMode = false,
  items,
}: IntegrationsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const duplicatedItems = [...items, ...items];

  const sectionBg = darkMode 
    ? "radial-gradient(ellipse at top, #000000 0%, #000000 100%)" 
    : "radial-gradient(ellipse at top, #f0f4f8 0%, #e5e7eb 100%)";
  
  const glassBg = darkMode ? "rgba(20, 20, 25, 0.45)" : "rgba(255, 255, 255, 0.65)";
  const iconColor = darkMode ? "#9ca3af" : "#6b7280";
  const borderColor = darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.8)";

  const glassStyles = {
    boxShadow: darkMode 
      ? "0 24px 48px -12px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.05)" 
      : "0 24px 48px -12px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,1)",
    border: `1px solid ${borderColor}`,
    borderRadius: "24px",
    backdropFilter: "blur(24px) saturate(150%)", 
    WebkitBackdropFilter: "blur(24px) saturate(150%)",
  };

  useEffect(() => {
    if (items.length <= 5 || isHovered || isTouched) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let exactScroll = scrollContainer.scrollLeft;
    const scrollSpeed = 0.65; 

    const scrollLoop = () => {
      exactScroll += scrollSpeed;
      const halfWidth = scrollContainer.scrollWidth / 2;
      
      if (exactScroll >= halfWidth) {
        exactScroll -= halfWidth;
      }
      
      scrollContainer.scrollLeft = exactScroll;
      
      if (Math.abs(exactScroll - scrollContainer.scrollLeft) > 2) {
        exactScroll = scrollContainer.scrollLeft;
      }

      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [items.length, isHovered, isTouched]); 

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section
      style={{
        width: "100%",
        background: sectionBg,
        padding: "80px 24px", 
      }}
    >
      <Container style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <Card
          style={{
            backgroundColor: glassBg,
            ...glassStyles,
            overflow: "hidden", 
            position: "relative",
            width: "100%",
            touchAction: "pan-y pinch-zoom", 
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsTouched(true)}
          onTouchEnd={() => setIsTouched(false)}
          onTouchCancel={() => setIsTouched(false)}
        >
          <Flex direction="column" align="center" style={{ padding: "32px 40px" }}>
            
            <Heading 
              size="6" 
              style={{ 
                color: darkMode ? "#ffffff" : "#111827", 
                fontFamily: "Libre Baskerville",
                fontSize: "20px",
                letterSpacing: "-0.01em",
                margin: "0 0 24px 0",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textShadow: darkMode ? "0 2px 10px rgba(0,0,0,0.5)" : "none"
              }}
            >
              Prospective API Integrations <i className="fa-solid fa-circle-nodes" style={{ color: iconColor, fontSize: "16px" }}></i>
            </Heading>

            <Flex 
              align="center" 
              style={{ 
                width: "100%", 
                position: "relative",
                padding: "0 12px" 
              }}
            >
              {items.length > 5 && (
                <button
                  onClick={() => scroll("left")}
                  aria-label="Scroll left"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px",
                    marginRight: "8px",
                    color: iconColor,
                    zIndex: 10,
                    transition: "color 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = darkMode ? "#fff" : "#000";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = iconColor;
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <DoubleArrowLeftIcon width="24" height="24" />
                </button>
              )}

              <Box
                ref={scrollRef}
                style={{
                  display: "flex",
                  overflowX: "auto",
                  scrollBehavior: (isHovered || isTouched) ? "smooth" : "auto", 
                  scrollbarWidth: "none", 
                  msOverflowStyle: "none", 
                  flex: 1,
                  gap: "16px",
                  padding: "8px 0",
                  maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
                className="hide-scrollbar"
              >
                {duplicatedItems.map((item, index) => (
                  <IntegrationOptionItem
                    key={index}
                    darkMode={darkMode}
                    integrationLogoUrl={item.integrationLogoUrl}
                    integrationName={item.integrationName}
                    integrationUrl={item.integrationUrl}
                  />
                ))}
              </Box>

              {items.length > 5 && (
                <button
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px",
                    marginLeft: "8px",
                    color: iconColor,
                    zIndex: 10,
                    transition: "color 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = darkMode ? "#fff" : "#000";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = iconColor;
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <DoubleArrowRightIcon width="24" height="24" />
                </button>
              )}
              
            </Flex>
          </Flex>
        </Card>
      </Container>
    </Section>
  );
};

export default IntegrationsSection;