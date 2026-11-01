import React, { useState, useMemo, Suspense, lazy } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';

import { SiJavascript } from '@react-icons/all-files/si/SiJavascript';
import { SiTypescript } from '@react-icons/all-files/si/SiTypescript';
import { SiReact } from '@react-icons/all-files/si/SiReact';
import { SiPython } from '@react-icons/all-files/si/SiPython';
import { SiHtml5 } from '@react-icons/all-files/si/SiHtml5';
import { SiCss3 } from '@react-icons/all-files/si/SiCss3';
import { SiJson } from '@react-icons/all-files/si/SiJson';
import { FaTerminal } from '@react-icons/all-files/fa/FaTerminal';
import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const loadSyntaxHighlighter = () =>
  import("react-syntax-highlighter").then((module) => ({
    default: module.Prism,
  }));
const LazySyntaxHighlighter = lazy(loadSyntaxHighlighter);

export type CodeSnippetDesign = 'material' | 'neumorphic';

export interface CodeSnippetProps {
  code: string;
  language?: string;
  design?: CodeSnippetDesign;
  darkMode?: boolean;
  languageIcon?: boolean;
  maxHeight?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const getLanguageIcon = (lang: string, color: string) => {
  const normalized = lang.toLowerCase();
  const props = { size: 16, color };

  if (['js', 'javascript', 'node'].includes(normalized)) return <SiJavascript {...props} />;
  if (['ts', 'typescript'].includes(normalized)) return <SiTypescript {...props} />;
  if (['jsx', 'tsx', 'react'].includes(normalized)) return <SiReact {...props} />;
  if (['py', 'python'].includes(normalized)) return <SiPython {...props} />;
  if (['html'].includes(normalized)) return <SiHtml5 {...props} />;
  if (['css', 'scss', 'sass'].includes(normalized)) return <SiCss3 {...props} />;
  if (['json'].includes(normalized)) return <SiJson {...props} />;
  if (['bash', 'sh', 'shell', 'terminal', 'cmd'].includes(normalized)) return <FaTerminal {...props} />;
  
  return <FaTerminal {...props} />;
};

export const CodeSnippet = ({
  code,
  language = 'terminal',
  design = 'material',
  darkMode = false,
  languageIcon = true,
  maxHeight,
  className,
  style
}: CodeSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const themeVars = useMemo(() => {
    if (design === 'neumorphic') {
      return darkMode ? {
        bg: 'rgba(30, 30, 35, 0.65)',
        headerBg: 'rgba(0, 0, 0, 0.2)',
        headerText: '#9ca3af',
        shadow: 'inset 5px 5px 10px #131313, inset -5px -5px 10px #292929',
        border: '1px solid rgba(255,255,255,0.08)'
      } : {
        bg: '#0B0D11', // SaaS Standard: Dark terminal bg for code
        headerBg: '#F3F4F6',
        headerText: '#4B5563',
        shadow: 'inset 6px 6px 12px #e5e7eb, inset -6px -6px 12px #ffffff',
        border: '1px solid rgba(0,0,0,0.05)'
      };
    }

    return darkMode ? {
      bg: 'rgba(15, 17, 21, 0.85)',
      headerBg: 'rgba(255, 255, 255, 0.03)',
      headerText: '#9CA3AF',
      shadow: '0 12px 24px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255, 255, 255, 0.08)'
    } : {
      bg: '#0B0D11', 
      headerBg: '#FFFFFF', 
      headerText: '#4B5563',
      shadow: '0 8px 24px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.08)'
    };
  }, [design, darkMode]);

  const normalizedLang = language.toLowerCase();
  const prismLanguage = ['terminal', 'cmd', 'sh'].includes(normalizedLang) ? 'bash' : normalizedLang;
  
  const showLineNumbers = useMemo(() => code.split('\n').length > 5, [code]);

  return (
    <Box 
      className={className} 
      style={{ 
        width: '100%', 
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: design === 'material' ? themeVars.shadow : 'none',
        border: themeVars.border,
        backgroundColor: themeVars.bg,
        backdropFilter: 'blur(16px)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        ...style 
      }}
    >
      <Flex 
        align="center" 
        justify="between" 
        style={{ 
          width: '100%',
          padding: '10px 16px', 
          backgroundColor: themeVars.headerBg,
          borderBottom: design === 'material' ? themeVars.border : 'none',
          zIndex: 2 
        }}
      >
        <Flex align="center" gap="3">
          <Box style={{ display: "flex", gap: "6px", marginRight: "8px" }}>
            <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FF5F56", border: "1px solid rgba(0,0,0,0.1)" }} />
            <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FFBD2E", border: "1px solid rgba(0,0,0,0.1)" }} />
            <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#27C93F", border: "1px solid rgba(0,0,0,0.1)" }} />
          </Box>
          
          <Flex align="center" gap="2">
            {languageIcon && getLanguageIcon(language, themeVars.headerText)}
            <Text 
              size="2" 
              weight="medium" 
              style={{ 
                color: themeVars.headerText, 
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                letterSpacing: '0.02em',
                userSelect: 'none'
              }}
            >
              {language}
            </Text>
          </Flex>
        </Flex>

        <button 
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy code"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "transparent",
            border: "none",
            color: copied ? "#27C93F" : themeVars.headerText,
            cursor: "pointer",
            fontFamily: "'Libre Franklin', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            transition: "all 0.2s ease",
            padding: "4px 8px",
            borderRadius: "6px",
            outline: "none"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          {copied ? <FaCheck size={13} /> : <FaRegCopy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </Flex>

      <Box 
        style={{ 
          width: '100%', 
          padding: '16px', 
          maxHeight: maxHeight || 'auto',
          overflowX: 'auto',
          overflowY: maxHeight ? 'auto' : 'visible',
          boxSizing: 'border-box',
          flexGrow: 1
        }}
      >
        <Suspense fallback={<Text size="2" style={{ color: themeVars.headerText }}>Loading syntax engine...</Text>}>
          <LazySyntaxHighlighter 
            language={prismLanguage} 
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            lineNumberStyle={{
              minWidth: '2.5em',
              paddingRight: '1.2em',
              color: '#6B7280',
              opacity: 0.6,
              textAlign: 'right',
              userSelect: 'none'
            }}
            customStyle={{ 
              margin: 0, 
              padding: 0, 
              background: 'transparent',
              fontSize: '13.5px',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              lineHeight: 1.6
            }}
          >
            {code}
          </LazySyntaxHighlighter>
        </Suspense>
      </Box>
    </Box>
  );
};