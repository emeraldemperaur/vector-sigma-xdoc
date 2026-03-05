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
        minWidth: "120px",
        padding: "16px",
        textDecoration: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease, opacity 0.2s ease",
        opacity: 0.85,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.opacity = "0.85";
      }}
    >
      <a href={integrationUrl} target="_blank" rel="noopener noreferrer">
        <Box
          style={{
            width: "64px",
            height: "64px",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: darkMode ? "#1f2023" : "#ffffff",
            borderRadius: "16px",
            boxShadow: darkMode
              ? "0 4px 6px rgba(0,0,0,0.3)"
              : "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src={integrationLogoUrl}
            alt={`${integrationName} logo`}
            style={{ maxWidth: "40px", maxHeight: "40px", objectFit: "contain" }}
          />
        </Box>
        <Text
          size="2"
          weight="medium"
          style={{ 
            color: darkMode ? "#d1d5db" : "#4b5563", 
            textAlign: "center",
            fontFamily: "Libre Franklin",
            fontWeight: 400,
            letterSpacing: "0.09em"
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
  variant = "neumorphic",
  items,
}: IntegrationsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const pageBg = darkMode ? "#1b1c1d" : "#f9f9f9";
  const cardBg = darkMode ? "#1a1a1a" : "#ffffff";
  const iconColor = darkMode ? "#9ca3af" : "#6b7280";
  const cardShadows = variant === "neumorphic"
    ? {
        boxShadow: darkMode
          ? "10px 10px 20px #0a0a0a, -10px -10px 20px #242424"
          : "10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff",
        border: "none",
        borderRadius: "24px",
      }
    : {
        boxShadow: darkMode
          ? "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
        border: darkMode ? "1px solid #333" : "1px solid #f0f0f0",
        borderRadius: "16px",
      };

  useEffect(() => {
    if (items.length <= 5 || isHovered) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;
        
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth - 1
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 30); 

    return () => clearInterval(scrollInterval);
  }, [items.length, isHovered]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200; 
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
        backgroundColor: pageBg,
        padding: "64px 0",
      }}
    >
      <Container size="4">
        <Box px={{ initial: "4", md: "8" }}> 
          
          <Card
            size="4"
            style={{
              backgroundColor: cardBg,
              ...cardShadows,
              overflow: "hidden", 
              position: "relative",
              marginLeft: "33px",
              marginRight: "33px",
              paddingBottom: "23px"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Flex direction="column" align="center" gap="4">
              
              <Heading size="6" 
              style={{ 
                color: darkMode ? "#fff" : "#111", 
                fontFamily: "Libre Baskerville",
                fontSize: "23px",
                letterSpacing: "0.06em",
                marginTop: "23px",
                marginBottom: "8px" }}>
                Prospective API Integrations&nbsp;<i className="fa-solid fa-network-wired"></i>
              </Heading>

              <Flex align="center" 
              style={{ 
                width: "100%", 
                position: "relative" }}>
                
                {items.length > 5 && (
                  <button
                    onClick={() => scroll("left")}
                    aria-label="Scroll left"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "16px",
                      color: iconColor,
                      zIndex: 10,
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
                    scrollBehavior: isHovered ? "smooth" : "auto", 
                    scrollbarWidth: "none", 
                    msOverflowStyle: "none", 
                    flex: 1,
                    gap: "16px",
                    padding: "8px 0",
                  }}
                  className="hide-scrollbar"
                >
                  {items.map((item, index) => (
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
                      color: iconColor,
                      zIndex: 10,
                    }}
                  >
                    <DoubleArrowRightIcon width="24" height="24" />
                  </button>
                )}
                
              </Flex>
            </Flex>
          </Card>
        </Box>
      </Container>
    </Section>
  );
};

export default IntegrationsSection;