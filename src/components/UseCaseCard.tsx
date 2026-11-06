import React, { useMemo, useState, Suspense, lazy } from 'react';
import { Box, Flex, Text, IconButton } from '@radix-ui/themes';
import { CodeIcon, ImageIcon, CopyIcon, CheckIcon, FileTextIcon } from '@radix-ui/react-icons';
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IPadProMockup } from './IPadProMockup'; 

const loadSyntaxHighlighter = () =>
  import("react-syntax-highlighter").then((module) => ({
    default: module.Prism,
  }));
const LazySyntaxHighlighter = lazy(loadSyntaxHighlighter);

export type UseCaseDesign = 'outline' | 'material' | 'neumorphic';

export interface UseCaseProps {
  useCaseLabel: string;
  useCaseDescription: string;
  useCaseSynopsis?: string;
  fileNameLabel?: string;
  schemaFileNameLabel?: string;
  icon?: React.ReactNode;
  design?: UseCaseDesign;
  darkMode?: boolean;
  codeString: string;
  schemaString?: string;
  renderComponent: React.ReactNode;
  enableSimulation?: boolean; 
  contentHeight?: string | number;
  tabFontSize?: string;
  backgroundImage?: string | null;
}

export const UseCaseCard = ({
  useCaseLabel,
  useCaseDescription,
  useCaseSynopsis,
  fileNameLabel,
  schemaFileNameLabel,
  icon,
  darkMode = false,
  codeString,
  schemaString,
  renderComponent,
  enableSimulation = true,
  contentHeight = '650px',
  tabFontSize = '14px', 
  backgroundImage = null
}: UseCaseProps) => {

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'render' | 'schema' | 'code'>('render');

  const handleCopy = async () => {
    const textToCopy = activeTab === 'schema' ? schemaString : codeString;
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const themeVars = useMemo(() => {
    return {
      bg: darkMode ? '#000000a6' : '#FFFFFF',
      text: darkMode ? '#111827' : '#111827',
      subText: darkMode ? '#9CA3AF' : '#6B7280',
      accent: darkMode ? '#800020' : '#800020', 
      containerShadow: darkMode ? '0 24px 60px rgba(0,0,0,0.6)' : '0 12px 32px rgba(0,0,0,0.06)',
      containerBorder: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
      toggleBg: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
      toggleActiveBg: darkMode ? '#FFFFFF' : '#FFFFFF',
      toggleActiveShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.08)',
      screenBg: darkMode ? '#0B0D11' : '#FFFFFF'
    };
  }, [darkMode]);

  return (
    <Box 
      className="use-case-container"
      style={{ 
        backgroundColor: themeVars.bg,
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        boxShadow: themeVars.containerShadow,
        border: themeVars.containerBorder,
        boxSizing: 'border-box',
        transition: 'all 0.3s ease'
      }}
    >
      <Flex justify="between" align="start" style={{ marginBottom: '32px' }}>
        <Flex direction="column" gap="2">
          <Text size="2" weight="bold" style={{ color: themeVars.accent, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Libre Franklin', sans-serif" }}>
            {useCaseLabel}
          </Text>
          <Text size="6" weight="bold" style={{ color: themeVars.text, fontFamily: "'Libre Baskerville', serif", letterSpacing: "-0.01em" }}>
            {useCaseDescription}
          </Text>
          {useCaseSynopsis && (
            <Text as="p" style={{ color: themeVars.subText, lineHeight: 1.6, fontFamily: "'Libre Franklin', sans-serif", fontSize: "15px", maxWidth: "800px" }}>
              {useCaseSynopsis}
            </Text>
          )}
        </Flex>
        {icon && (
          <Flex align="center" justify="center" style={{ color: themeVars.text, paddingLeft: '16px' }}>
            {icon}
          </Flex>
        )}
      </Flex>

      <Flex justify="center" style={{ marginBottom: '32px' }}>
        <Flex 
          align="center" 
          style={{ 
            background: themeVars.toggleBg, 
            padding: '6px', 
            borderRadius: '12px',
            border: themeVars.containerBorder
          }}
        >
          {[
            { id: 'render', label: 'Render', icon: <ImageIcon width="16" height="16" /> },
            ...(schemaString ? [{ id: 'schema', label: 'Schema', icon: <FileTextIcon width="16" height="16" /> }] : []),
            { id: 'code', label: 'Code', icon: <CodeIcon width="16" height="16" /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Box
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'render' | 'schema' | 'code')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 24px', cursor: 'pointer', borderRadius: '8px',
                  background: isActive ? themeVars.toggleActiveBg : 'transparent',
                  color: isActive ? themeVars.text : themeVars.subText,
                  boxShadow: isActive ? themeVars.toggleActiveShadow : 'none',
                  border: isActive && darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                  transition: 'all 0.25s ease',
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: "'Libre Franklin', sans-serif",
                  fontSize: tabFontSize,
                }}
              >
                {tab.icon} {tab.label}
              </Box>
            );
          })}
        </Flex>
      </Flex>

      <Flex justify="center" style={{ width: '100%', minHeight: contentHeight }}>
        <Box style={{ width: '100%', maxWidth: '1000px' }}>
          
          {activeTab === 'render' && (
            <IPadProMockup simulationBackgroundImageSrc={backgroundImage ? backgroundImage : undefined} enableSimulation={enableSimulation} darkMode={darkMode}>
              <Box style={{ padding: '24px' }}>
                {renderComponent}
              </Box>
            </IPadProMockup>
          )}

          {(activeTab === 'schema' || activeTab === 'code') && (
            <Box
              style={{
                width: '100%',
                height: contentHeight,
                backgroundColor: darkMode ? '#0B0D11' : '#000000',
                border: themeVars.containerBorder,
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Flex 
                align="center" 
                justify="between" 
                style={{ 
                  padding: '12px 20px', 
                  background: darkMode ? 'rgba(255,255,255,0.03)' : '#F3F4F6',
                  borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
                  zIndex: 2 
                }}
              >
                <Text size="2" style={{ color: themeVars.subText, fontFamily: "'JetBrains Mono', monospace" }}>
                  {activeTab === 'schema' ? (schemaFileNameLabel || "schema.ts") : (fileNameLabel || "component.tsx")}
                </Text>

                <IconButton 
                  variant="ghost" size="1" onClick={handleCopy}
                  title={copied ? "Copied!" : "Copy"}
                  style={{ color: copied ? '#27c93f' : themeVars.subText, cursor: 'pointer', margin: 0 }}
                >
                  {copied ? <CheckIcon width="16" height="16" /> : <CopyIcon width="16" height="16" />}
                </IconButton>
              </Flex>

              <Box style={{ flexGrow: 1, padding: '16px', overflowY: 'auto' }}>
                <Suspense fallback={
                  <Text size="2" style={{fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: themeVars.subText }}>Loading syntax engine...</Text>}>
                  <LazySyntaxHighlighter 
                    language="typescript" 
                    style={vscDarkPlus} 
                    customStyle={{ 
                      margin: 0, padding: 0, background: "transparent", 
                      fontSize: "13.5px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                      lineHeight: 1.6
                    }}
                  >
                    {activeTab === 'schema' ? (schemaString || '') : codeString}
                  </LazySyntaxHighlighter>
                </Suspense>
              </Box>
            </Box>
          )}
        </Box>
      </Flex>
      
      <style>
        {`
          .use-case-container { padding: 32px; }
          @media (max-width: 768px) {
            .use-case-container { padding: 16px; }
          }
        `}
      </style>
    </Box>
  );
};