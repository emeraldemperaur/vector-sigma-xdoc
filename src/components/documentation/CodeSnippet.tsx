import React, { useState, useMemo } from 'react';
import { Box, Flex, Text, IconButton } from '@radix-ui/themes';

// Leveraging your existing react-icons library for language/UI icons
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

export type CodeSnippetDesign = 'material' | 'neumorphic';

export interface CodeSnippetProps {
  /**
   * * The raw string of code to display and copy.
   * * @example
   * code={`npm install @emeraldemperaur/vector-sigma`}
   */
  code: string;
  /**
   * * The programming language or context of the snippet. 
   * Used for the header title and to determine the icon.
   * Supported auto-icons: javascript, typescript, react, python, html, css, json, bash, terminal, sh
   * * @example
   * language="typescript"
   */
  language?: string;
  /**
   * * The design variation of the Code Snippet.
   * Default: 'material'
   */
  design?: CodeSnippetDesign;
  /**
   * * Forces Dark Mode styling on the component, regardless of global theme.
   * Default: false
   */
  darkMode?: boolean;
  /**
   * * Option to display the associated language icon in the header.
   * Default: true
   */
  languageIcon?: boolean;
  /**
   * * Optional max-height for the code block area. 
   * Useful for very long code snippets. Enables vertical scrolling while pinning the header.
   * * @example
   * maxHeight="300px"
   */
  maxHeight?: string | number;
  /**
   * * Optional CSS class name
   */
  className?: string;
  /**
   * * Optional inline styles applied to the outer container
   */
  style?: React.CSSProperties;
}

// Helper to map string languages to specific React Icons
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
  
  // Default fallback icon
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

  // --- THEME VARIABLES ---
  const themeVars = useMemo(() => {
    if (design === 'neumorphic') {
      return darkMode ? {
        bg: '#1e1e1e',
        headerBg: '#1e1e1e',
        text: '#e0e0e0',
        headerText: '#a0a0a0',
        shadow: 'inset 5px 5px 10px #131313, inset -5px -5px 10px #292929',
        border: 'none'
      } : {
        bg: '#e0e5ec',
        headerBg: '#e0e5ec',
        text: '#333333',
        headerText: '#666666',
        shadow: 'inset 6px 6px 12px #b8b9be, inset -6px -6px 12px #ffffff',
        border: 'none'
      };
    }

    // Material Design Default (MDBootstrap Style)
    return darkMode ? {
      bg: '#212529', // Deep dark background for code
      headerBg: '#343a40', // Slightly lighter header
      text: '#f8f9fa',
      headerText: '#adb5bd',
      shadow: '0 4px 6px rgba(0,0,0,0.3)',
      border: '1px solid #495057'
    } : {
      bg: '#f8f9fa', // Very light gray background for code
      headerBg: '#e9ecef', // Slightly darker header
      text: '#212529',
      headerText: '#6c757d',
      shadow: '0 2px 4px rgba(0,0,0,0.05)',
      border: '1px solid #dee2e6'
    };
  }, [design, darkMode]);

  return (
    <Box 
      className={className} 
      style={{ 
        width: '100%', 
        borderRadius: design === 'neumorphic' ? '16px' : '8px',
        overflow: 'hidden', // Clips the inner scrolling boxes nicely
        boxShadow: design === 'material' ? themeVars.shadow : 'none',
        border: themeVars.border,
        backgroundColor: themeVars.bg,
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
          padding: '8px 16px', 
          backgroundColor: themeVars.headerBg,
          borderBottom: design === 'material' ? themeVars.border : 'none',
          boxShadow: design === 'neumorphic' && !darkMode 
            ? '4px 4px 8px #b8b9be, -4px -4px 8px #ffffff' 
            : design === 'neumorphic' && darkMode 
            ? '4px 4px 8px #131313, -4px -4px 8px #292929' 
            : 'none',
          zIndex: 2 
        }}
      >
        <Flex align="center" gap="2">
          {languageIcon && getLanguageIcon(language, themeVars.headerText)}
          <Text 
            size="2" 
            weight="bold" 
            style={{ 
              color: themeVars.headerText, 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              userSelect: 'none'
            }}
          >
            &nbsp;{language}
          </Text>
        </Flex>

        <IconButton 
          variant="ghost" 
          size="1" 
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy code"}
          style={{ 
            color: copied ? 'var(--green-9)' : themeVars.headerText, 
            cursor: 'pointer',
            transition: 'color 0.2s ease',
            margin: 0
          }}
        >
          {copied ? <FaCheck size={14} /> : <FaRegCopy size={14} />}
        </IconButton>
      </Flex>

      <Box 
        style={{ 
          width: '100%', 
          padding: '16px', 
          maxHeight: maxHeight || 'auto',
          overflowX: 'auto',
          overflowY: maxHeight ? 'auto' : 'visible',
          boxShadow: design === 'neumorphic' ? themeVars.shadow : 'none',
          boxSizing: 'border-box',
          flexGrow: 1
        }}
      >
        <pre style={{ margin: 0, padding: 0, background: 'transparent' }}>
          <code style={{ 
            fontFamily: 'var(--code-font-family, "Consolas", "Monaco", "Courier New", monospace)',
            fontSize: '14px',
            lineHeight: 1.5,
            color: themeVars.text,
            whiteSpace: 'pre',
            display: 'block',
            minWidth: '100%'
          }}>
            {code}
          </code>
        </pre>
      </Box>
    </Box>
  );
};