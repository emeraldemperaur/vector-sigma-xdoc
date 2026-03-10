import React, { useMemo, useState } from 'react';
import { Box, Flex, Text, Tabs, IconButton } from '@radix-ui/themes';
import { CodeIcon, ImageIcon, CopyIcon, CheckIcon, FileTextIcon } from '@radix-ui/react-icons';
import { NavLink } from 'react-router-dom';

export type UseCaseDesign = 'outline' | 'material' | 'neumorphic';

export interface UseCaseProps {
  /**
   * * The small, uppercase label at the top (e.g., "USECASE #001")
   */
  useCaseLabel: string;
  /**
   * * The larger description/title (e.g., "N8N Webhook Trigger Node")
   */
  useCaseDescription: string;
  /**
   * * Optional brief summary or explanation of the use case.
   */
  useCaseSynopsis?: string;
  /**
   * * Optional file name label for the code snippet.
   */
  fileNameLabel?: string;
  /**
   * * Optional file name label for the schema snippet.
   */
  schemaFileNameLabel?: string;
  /**
   * * Optional React Node for the icon aligned to the far right.
   */
  icon?: React.ReactNode;
  /**
   * * The design variation of the Card.
   * Default: 'material'
   */
  design?: UseCaseDesign;
  /**
   * * Forces Dark Mode styling on the component.
   * Default: false
   */
  darkMode?: boolean;
  /**
   * * The raw code string to display in the Code tab.
   */
  codeString: string;
  /**
   * * The raw schema string (JSON/JS object) to display in the Schema tab.
   */
  schemaString?: string;
  /**
   * * The URL of the image/screenshot to display in the Render tab.
   */
  imageSrc: string;
  /**
   * * Optional max height for the tab content area. 
   * Render the code and image layout in alignment.
   * Default: '400px'
   */
  contentHeight?: string | number;
  /**
   * * Controls the font and icon size of the Code/Render tab triggers.
   * Default: '18px'
   */
  tabFontSize?: string;
  /**
   * * Top margin spacing.
   */
  marginTop?: string | number;
  /**
   * * Bottom margin spacing.
   */
  marginBottom?: string | number;
  /**
   * * Left margin spacing.
   */
  marginLeft?: string | number;
  /**
   * * Right margin spacing.
   */
  marginRight?: string | number;
  /**
   * * Optional screenshot url for React Router NavLink.
   */
  pageUrl?: string;
}

export const UseCaseCard = ({
  useCaseLabel,
  useCaseDescription,
  useCaseSynopsis,
  fileNameLabel,
  schemaFileNameLabel,
  icon,
  design = 'material',
  darkMode = false,
  codeString,
  schemaString,
  imageSrc,
  contentHeight = '400px',
  tabFontSize = '18px', 
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  pageUrl = '/showcase'
}: UseCaseProps) => {

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeTab, setActiveTab] = useState('render');

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const handleCopySchema = async () => {
    if (!schemaString) return;
    try {
      await navigator.clipboard.writeText(schemaString);
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    } catch (err) {
      console.error('Failed to copy schema: ', err);
    }
  };

  const themeVars = useMemo(() => {
    const isNeo = design === 'neumorphic';
    const isOut = design === 'outline';
    
    return {
      bg: darkMode ? (isNeo ? '#1a1a1a' : '#212529') : (isNeo ? '#e0e5ec' : '#ffffff'),
      text: darkMode ? '#ffffff' : '#212529',
      subText: darkMode ? '#adb5bd' : '#6c757d',
      accent: darkMode ? '#800020' : '#820c29', 
      
      containerShadow: isNeo 
        ? (darkMode ? '8px 8px 16px #0d0d0d, -8px -8px 16px #272727' : '8px 8px 16px #b8b9be, -8px -8px 16px #ffffff')
        : (isOut ? 'none' : (darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)')),
      containerBorder: isOut ? (darkMode ? '1px solid #495057' : '1px solid #dee2e6') : 'none',
      
      innerBg: darkMode ? '#121212' : '#f8f9fa',
      innerHeaderBg: darkMode ? '#1e1e1e' : '#e9ecef', // Slightly offset from innerBg for the code header
      innerBorder: darkMode ? '1px solid #333' : '1px solid #e9ecef',
    };
  }, [design, darkMode]);

  return (
    <Box 
      style={{ 
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        backgroundColor: themeVars.bg,
        borderRadius: design === 'neumorphic' ? '20px' : '12px',
        boxShadow: themeVars.containerShadow,
        border: themeVars.containerBorder,
        padding: '24px',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease'
      }}
    >
      <Flex justify="between" align="start" style={{ marginBottom: '24px' }}>
        <Flex direction="column" gap="1">
          <Text 
            size="2" 
            weight="bold" 
            style={{ 
              color: themeVars.accent, 
              textTransform: 'uppercase', 
              letterSpacing: '0.06em',
              fontSize: "19px",
              fontFamily: "Libre Franklin",
              fontWeight: 300
            }}
          >
            {useCaseLabel}
          </Text>
          <Text 
            size="5" 
            weight="bold" 
            style={{ 
              color: themeVars.text, 
              lineHeight: 1.2,
              fontFamily: "Libre Baskerville",
              fontSize: "23px",
              letterSpacing: "0.03em",
              fontWeight: 500 
            }}
          >
            {useCaseDescription}
          </Text>
          
          {/* Use Case Synopsis Section */}
          {useCaseSynopsis && (
            <Text 
              as="p"
              style={{ 
                color: themeVars.subText, 
                lineHeight: 1.6,
                fontFamily: "Libre Franklin",
                letterSpacing: "0.06em",
                fontSize: "15px",
                fontWeight: 400,
                marginTop: "8px",
                textAlign: "justify",
                maxWidth: "700px" // Prevents text from stretching too wide on large screens
              }}
            >
              {useCaseSynopsis}
            </Text>
          )}
        </Flex>

        {icon && (
          <Flex 
            align="center" 
            justify="center" 
            style={{ 
              color: themeVars.text,
              paddingLeft: '16px',
            }}
          >
            {icon}
          </Flex>
        )}
      </Flex>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Flex gap="8" justify="center" style={{ marginBottom: '16px', borderBottom: themeVars.innerBorder }}>
          <Tabs.List 
            size="2" 
            style={{ 
              justifyContent: 'center',
              borderBottom: 'none',
              gap: '24px'
            }}
          >
            <Tabs.Trigger 
                value="render" 
                style={{ 
                  cursor: 'pointer', 
                  color: activeTab === 'render' ? themeVars.accent : themeVars.subText,
                  fontSize: tabFontSize,
                  fontWeight: 500,
                  fontFamily: "Libre Franklin",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  transition: 'color 0.2s ease'
                }}
              >
              <Flex align="center" gap="2">
                <ImageIcon width={tabFontSize} height={tabFontSize} />
                &nbsp;Render
              </Flex>
            </Tabs.Trigger>

            {/* NEW SCHEMA TAB */}
            {schemaString && (
              <Tabs.Trigger 
                value="schema" 
                style={{ 
                  cursor: 'pointer', 
                  color: activeTab === 'schema' ? themeVars.accent : themeVars.subText, 
                  fontSize: tabFontSize,
                  fontWeight: 500,
                  fontFamily: "Libre Franklin",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  transition: 'color 0.2s ease'
                }}
              >
              <Flex align="center" gap="2">
                <FileTextIcon width={tabFontSize} height={tabFontSize} />
                &nbsp;Schema
              </Flex>
              </Tabs.Trigger>
            )}

            <Tabs.Trigger 
                value="code" 
                style={{ 
                  cursor: 'pointer', 
                  color: activeTab === 'code' ? themeVars.accent : themeVars.subText, 
                  fontSize: tabFontSize,
                  fontWeight: 500,
                  fontFamily: "Libre Franklin",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  transition: 'color 0.2s ease'
                }}
              >
              <Flex align="center" gap="2">
                <CodeIcon width={tabFontSize} height={tabFontSize} />
                &nbsp;Code
              </Flex>
            </Tabs.Trigger>
          </Tabs.List>
        </Flex>

        <Box 
          style={{ 
            height: contentHeight,
            backgroundColor: themeVars.innerBg,
            borderRadius: '8px',
            border: themeVars.innerBorder,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Tabs.Content value="render" style={{ height: '100%', margin: 0 }}>
            <NavLink to={pageUrl} target='_self'>
            <img 
              src={imageSrc} 
              alt={useCaseDescription}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'fill', 
                padding: '16px',
                boxSizing: 'border-box'
              }}
            />
            </NavLink>
          </Tabs.Content>

          {/* NEW SCHEMA TAB CONTENT */}
          {schemaString && (
            <Tabs.Content value="schema" style={{ height: '100%', margin: 0 }}>
              <Flex direction="column" style={{ height: '100%' }}>
                <Flex 
                  align="center" 
                  justify="between" 
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: themeVars.innerHeaderBg,
                    borderBottom: themeVars.innerBorder,
                    zIndex: 2 
                  }}
                >
                  <Text size="2" style={{ color: themeVars.subText, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                    {schemaFileNameLabel || "schema.ts"}
                  </Text>

                  <IconButton 
                    variant="ghost" 
                    size="1" 
                    onClick={handleCopySchema}
                    title={copiedSchema ? "Copied!" : "Copy schema"}
                    style={{ 
                      color: copiedSchema ? 'var(--green-9)' : themeVars.subText, 
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      margin: 0
                    }}
                  >
                    {copiedSchema ? <CheckIcon width="16" height="16" /> : <CopyIcon width="16" height="16" />}
                  </IconButton>
                </Flex>

                <Box style={{ flexGrow: 1, overflow: 'auto', padding: '16px' }}>
                  <pre style={{ margin: 0, padding: 0, background: 'transparent' }}>
                    <code style={{ 
                      fontFamily: 'var(--code-font-family, "Consolas", "Monaco", monospace)',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: darkMode ? '#e0e0e0' : '#24292e',
                      whiteSpace: 'pre',
                    }}>
                      {schemaString}
                    </code>
                  </pre>
                </Box>
              </Flex>
            </Tabs.Content>
          )}

          {/* CODE TAB CONTENT */}
          <Tabs.Content value="code" style={{ height: '100%', margin: 0 }}>
            <Flex direction="column" style={{ height: '100%' }}>
              <Flex 
                align="center" 
                justify="between" 
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: themeVars.innerHeaderBg,
                  borderBottom: themeVars.innerBorder,
                  zIndex: 2 
                }}
              >
                <Text size="2" style={{ color: themeVars.subText, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                  {fileNameLabel}
                </Text>

                <IconButton 
                  variant="ghost" 
                  size="1" 
                  onClick={handleCopyCode}
                  title={copiedCode ? "Copied!" : "Copy code"}
                  style={{ 
                    color: copiedCode ? 'var(--green-9)' : themeVars.subText, 
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    margin: 0
                  }}
                >
                  {copiedCode ? <CheckIcon width="16" height="16" /> : <CopyIcon width="16" height="16" />}
                </IconButton>
              </Flex>

              <Box style={{ flexGrow: 1, overflow: 'auto', padding: '16px' }}>
                <pre style={{ margin: 0, padding: 0, background: 'transparent' }}>
                  <code style={{ 
                    fontFamily: 'var(--code-font-family, "Consolas", "Monaco", monospace)',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: darkMode ? '#e0e0e0' : '#24292e',
                    whiteSpace: 'pre',
                  }}>
                    {codeString}
                  </code>
                </pre>
              </Box>
            </Flex>
          </Tabs.Content>

        </Box>
      </Tabs.Root>

    </Box>
  );
};