import React, { useEffect, useState, useRef, Suspense, lazy, useMemo } from "react";
import { Box, Grid, Heading, Text, Section, Container, Card, Flex } from "@radix-ui/themes";
import { NavLink as NavigationLink } from 'react-router-dom';
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useVectorSigma } from '@emeraldemperaur/vector-sigma';
import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { airflowOnboardingData } from "../utils/airflowSchema";


import { 
  statefulUsageSnippet, 
  xForm97, 
  xFormCodeSnippet, 
  xFormCodeUsageSnippet, 
  xFormFileDataCodeString, 
  xFormRegistrationCodeString, 
  xFormRenderOption 
} from "../utils/xFormCodeSnippetStrings";
import { TabItem, TabSwitcher } from "./documentation/TabSwitcher";
import AdRibbon from "./AdRibbon";
import { GoogleAd } from "./GoogleAd";

const loadSyntaxHighlighter = () =>
  import("react-syntax-highlighter").then((module) => ({
    default: module.Prism,
  }));
const LazySyntaxHighlighter = lazy(loadSyntaxHighlighter);

const MacWindow = ({ code, language, title, darkMode, maxHeight }: { code: string; language: string; title: string; darkMode: boolean; maxHeight?: string }) => {
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

  const bg = darkMode ? "rgba(20, 20, 25, 0.65)" : "#0B0D11";
  const border = darkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)";
  const headerBg = darkMode ? "rgba(0, 0, 0, 0.2)" : "#FFFFFF";
  const headerText = darkMode ? "#9CA3AF" : "#4B5563";
  
  const normalizedLang = language.toLowerCase();
  const prismLanguage = ['terminal', 'cmd', 'sh'].includes(normalizedLang) ? 'bash' : normalizedLang;
  
  const showLineNumbers = useMemo(() => code.split('\n').length > 5, [code]);

  return (
    <Box style={{
      background: bg,
      backdropFilter: "blur(16px) saturate(150%)",
      WebkitBackdropFilter: "blur(16px) saturate(150%)",
      border: `1px solid ${border}`,
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: darkMode ? "0 12px 32px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.08)",
      marginBottom: "32px",
      marginTop: "16px",
      transition: "all 0.3s ease"
    }}>
      <Flex 
        align="center"
        justify="between"
        style={{
          width: "100%",
          padding: "10px 16px", 
          background: headerBg, 
          borderBottom: `1px solid ${border}`
        }}
      >
        <Flex align="center" gap="3">
          <Box style={{ display: "flex", gap: "6px", marginRight: "8px" }}>
            <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FF5F56", border: "1px solid rgba(0,0,0,0.1)" }} />
            <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FFBD2E", border: "1px solid rgba(0,0,0,0.1)" }} />
            <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#27C93F", border: "1px solid rgba(0,0,0,0.1)" }} />
          </Box>
          <Text size="2" style={{ 
            color: headerText, 
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace", 
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.02em"
          }}>
            {title}
          </Text>
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
            color: copied ? "#27C93F" : headerText,
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
      <Box style={{ padding: "16px", maxHeight: maxHeight, overflowY: maxHeight ? "auto" : "visible", overflowX: "auto" }}>
        <Suspense fallback={<Text size="2" style={{ color: "#9ca3af" }}>Loading syntax engine...</Text>}>
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
              background: "transparent", 
              fontSize: "13.5px", 
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
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

const DocSection = ({ id, title, children }: { id: string; title: string | React.ReactNode; children?: React.ReactNode }) => (
  <section id={id} style={{ scrollMarginTop: "100px", paddingTop: "32px", paddingBottom: "48px" }}>
    <Heading size="6" 
      style={{ 
        fontFamily: "'Libre Baskerville', serif", 
        fontSize: "24px", 
        marginBottom: "20px", 
        letterSpacing: "-0.01em",
        fontWeight: 600
      }}>
      {title}
    </Heading>
    <Box style={{ 
      opacity: 0.9, 
      lineHeight: "1.75", 
      width: "100%", 
      fontSize: "16px",
      fontFamily: "'Libre Franklin', sans-serif"
    }}>
      {children}
    </Box>
  </section>
);

const NavLink = ({ 
  id, 
  label, 
  activeId, 
  onClick, 
  isSubItem = false,
  activeColor,
  textSecondary
}: { 
  id: string; label: string | React.ReactNode; activeId: string; onClick: (e: React.MouseEvent, id: string) => void; isSubItem?: boolean; activeColor: string; textSecondary: string;
}) => {
  const isActive = activeId === id;
  return (
    <Box asChild style={{ marginBottom: "6px", marginLeft: isSubItem ? "16px" : "0" }}>
      <li>
        <a
          href={`#${id}`}
          onClick={(e) => onClick(e, id)}
          style={{
            textDecoration: "none",
            display: "block",
            padding: "6px 0 6px 16px",
            color: isActive ? activeColor : textSecondary,
            fontWeight: isActive ? 600 : 400,
            borderLeft: isActive ? `2px solid ${activeColor}` : "2px solid transparent",
            transition: "all 0.2s ease-in-out",
            fontSize: isSubItem ? "13.5px" : "14.5px",
          }}
        >
          {label}
        </a>
      </li>
    </Box>
  );
};


interface DocumentationViewerProps {
  darkMode?: boolean;
  variant?: "neumorphic" | "material";
}

export const DocumentationViewer = ({
  darkMode = false,
  variant = "neumorphic",
}: DocumentationViewerProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const xFormBuilder = useVectorSigma(airflowOnboardingData);
  const pageBg = darkMode ? "#000000" : "#FAFAFA";
  const cardBg = darkMode ? "#000000" : "#FFFFFF";
  const textPrimary = darkMode ? "#F3F4F6" : "#111827";
  const textSecondary = darkMode ? "#9CA3AF" : "#6B7280";
  const activeColor = darkMode ? "#800020" : "#800020"; 
  const borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const paneShadow = variant === "neumorphic"
    ? {
        boxShadow: darkMode
          ? "8px 8px 24px rgba(0,0,0,0.6), -8px -8px 24px rgba(255,255,255,0.02)"
          : "8px 8px 24px rgba(0,0,0,0.04), -8px -8px 24px rgba(255,255,255,0.8)",
        border: `1px solid ${borderColor}`,
        borderRadius: "16px",
      }
    : {
        boxShadow: darkMode
          ? "0 4px 24px -1px rgba(0, 0, 0, 0.5)"
          : "0 4px 24px -1px rgba(0, 0, 0, 0.04)",
        border: `1px solid ${borderColor}`,
        borderRadius: "12px",
      };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          setActiveId(visibleSections[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 } 
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      sections.forEach((section) => observerRef.current?.unobserve(section));
    };
  }, []);

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveId(id); 

    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <Section style={{ width: "100%", backgroundColor: pageBg, padding: "80px 0", color: textPrimary }}>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          /* Inline Code Pills */
          .doc-inline-code {
            background: ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"};
            color: ${darkMode ? "#800020" : "#800020"};
            padding: 0.2em 0.4em;
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85em;
          }
          .doc-text p {
            margin-bottom: 1.2rem;
          }
        `}
      </style>

      <Container size="4" px={{ initial: "4", md: "6", lg: "8" }}>
        <Grid columns={{ initial: "1", md: "260px 1fr" }} gap="9">
          
          <Box
            asChild
            style={{
              position: "sticky",
              top: "100px",
              alignSelf: "start",
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
              paddingRight: "16px"
            }}
          >
            <nav>
              <Text size="2" weight="bold" 
              style={{ 
                textTransform: "uppercase", 
                letterSpacing: "0.08em", 
                marginBottom: "20px", 
                display: "block",
                marginLeft: "16px",
                color: textSecondary,
                fontFamily: "'Libre Franklin', sans-serif"  
                }}>
                Getting Started
              </Text>
              <Box asChild 
              style={{ 
                listStyle: "none", 
                padding: 0, 
                margin: 0, 
                borderLeft: `1px solid ${borderColor}`,
                fontFamily: "'Libre Franklin', sans-serif"
                }}>
                <ul>
                  <NavLink id="introduction" label="Introduction" activeId={activeId} onClick={handleScroll} activeColor={activeColor} textSecondary={textSecondary} />
                  <NavLink id="installation" label="Installation" activeId={activeId} onClick={handleScroll} activeColor={activeColor} textSecondary={textSecondary} />
                  <NavLink id="xform-schema" label="χForm Schema" activeId={activeId} onClick={handleScroll} activeColor={activeColor} textSecondary={textSecondary} />
                  <NavLink id="usage" label="Usage" activeId={activeId} onClick={handleScroll} activeColor={activeColor} textSecondary={textSecondary} />
                  
                  <NavLink id="theming" label="Theming" activeId={activeId} onClick={handleScroll} activeColor={activeColor} textSecondary={textSecondary} />
                  <Box asChild style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <ul>
                      <NavLink id="radixui--themes" label="Radix UI Themes" activeId={activeId} onClick={handleScroll} isSubItem activeColor={activeColor} textSecondary={textSecondary} />
                      <NavLink id="render-options" label="VΣ render() Options" activeId={activeId} onClick={handleScroll} isSubItem activeColor={activeColor} textSecondary={textSecondary} />
                      <NavLink id="xform-97-reference" label="xForm '97 Reference" activeId={activeId} onClick={handleScroll} isSubItem activeColor={activeColor} textSecondary={textSecondary} />
                    </ul>
                  </Box>

                  <NavLink id="usevectorsigma-hook" label="useVectorSigma() Hook" activeId={activeId} onClick={handleScroll} activeColor={activeColor} textSecondary={textSecondary} />
                  <NavLink id="xform-state-observers" label="χForm State Observers" activeId={activeId} onClick={handleScroll} activeColor={activeColor} textSecondary={textSecondary} />
                  <NavLink id="xform-onsubmit-formdata" label="onSubmit::FormData" activeId={activeId} onClick={handleScroll} activeColor={activeColor} textSecondary={textSecondary} />
                  <NavLink id="about-me" label="About Developer" activeId={activeId} onClick={handleScroll} activeColor={activeColor} textSecondary={textSecondary} />
                </ul>
              </Box>
            </nav>
          </Box>

          <Card size="4" style={{ backgroundColor: cardBg, ...paneShadow, padding: "48px" }}>
            <main className="doc-text">
              <DocSection id="introduction" title="Introduction">
                <p>
                  VectorSigma is a dual mode package bundled with both CommonJS (CJS), ES Modules (ESM) & Universal Module Definition (UMD) builds to 
                  facilitate universal module compatibility and enable effortless integration across legacy and modern JavaScript ecosystems.
                </p>
                <p>
                  VΣ leverages Formik for robust React state management and Yup for declarative schema validation to adhere strictly to the standard React form lifecycle. 
                  This ensures compatibility with Redux DevTools & standard debugging workflows, with an <span className="doc-inline-code">onSubmit()</span> callback and convenience methods to seamlessly connect χForm instance data to backend workflows, 
                  CRM systems, or databases immediately upon submission.
                </p>
                <p>
                  Reusable <NavigationLink style={{color: activeColor, textDecoration: 'none', fontWeight: 500}} to='/components'>χForm UI components</NavigationLink> with material, outline and neumorphic design variants are explicitly exported 
                  from the package entry point to enable developer-friendly use as a lightweight, ARIA-compliant component library.
                </p>
              </DocSection>

              <DocSection id="installation" title="Installation">
                <Heading size="4" style={{ marginBottom: "12px", fontFamily: "'Libre Franklin', sans-serif" }}>Prerequisites</Heading>
                <p>Before starting a project make sure to install the peer dependencies: <span className="doc-inline-code">react</span>, <span className="doc-inline-code">react-dom</span> & <span className="doc-inline-code">sass-embedded</span></p>
                
                <Heading size="4" style={{ marginTop: "32px", marginBottom: "12px", fontFamily: "'Libre Franklin', sans-serif" }}>Package Installation</Heading>
                <MacWindow title="bash" darkMode={darkMode} language="terminal" code={`npm install @emeraldemperaur/vector-sigma`} />
                
                <Heading size="4" style={{ marginTop: "32px", marginBottom: "12px", fontFamily: "'Libre Franklin', sans-serif" }}>Importing ES (ECMAScript) Module</Heading>
                <MacWindow title="app.tsx" darkMode={darkMode} language="typescript" code={`import { VectorSigma, Teletraan1 } from '@emeraldemperaur/vector-sigma';`} />
                
                <Heading size="4" style={{ marginTop: "32px", marginBottom: "12px", fontFamily: "'Libre Franklin', sans-serif" }}>Importing CommonJS (CJS)</Heading>
                <MacWindow title="app.js" darkMode={darkMode} language="javascript" code={`const { VectorSigma, Teletraan1 } = require('@emeraldemperaur/vector-sigma');`} />

                <Heading size="4" style={{ marginTop: "32px", marginBottom: "12px", fontFamily: "'Libre Franklin', sans-serif" }}>Importing UMD via unpkg CDN</Heading>
                <MacWindow title="index.html" darkMode={darkMode} language="html" maxHeight="350px"
                  code={`<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@emeraldemperaur/vector-sigma/lib/index.umd.js"></script>
</head>
<body>
    <div id="root"></div>

    <script>
        // Access the package directly from the global window object
        const { VectorSigma } = window.VectorSigma; 
        const formInstance = new VectorSigma(apiJSONSchema);
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(formInstance.render());
    </script>
</body>
</html>`} 
                />
              </DocSection>

              <Box style={{ margin: "48px 0" }}>
                <AdRibbon darkMode={darkMode}>
                  <GoogleAd 
                      client="ca-pub-3704334287285175" 
                      slot="8343960922" 
                      format="auto" 
                      responsive={true} 
                    />
                </AdRibbon>
              </Box>

              <DocSection id="xform-schema" title="χForm Schema">
                <p>
                  Declarative JSON or JavaScript object schema attributes <span className="doc-inline-code">isRequired</span> and <span className="doc-inline-code">errorText</span> facilitate a validation engine that is comprehensive, accessible and easy to maintain. 
                  <span className="doc-inline-code">onChange()</span> and <span className="doc-inline-code">onBlur()</span> input event control state updates, errors and values are handled automatically. 
                  The <span className="doc-inline-code">onSubmit()</span> handler is automatically blocked if the input vs. validation schema is invalid.
                </p>
                <MacWindow title="schema.ts" darkMode={darkMode} language="typescript" maxHeight="400px" code={xFormCodeSnippet} />
              </DocSection>

              <DocSection id="usage" title="Usage">
                <Heading size="4" style={{ marginBottom: "12px", fontFamily: "'Libre Franklin', sans-serif" }}>Code Implementation</Heading>
                <MacWindow title="FormImplementation.tsx" darkMode={darkMode} language="typescript" maxHeight="400px" code={xFormCodeUsageSnippet} />
                
                <Heading size="4" style={{ marginTop: "40px", marginBottom: "20px", fontFamily: "'Libre Franklin', sans-serif" }}>Display Mode Variants</Heading>
                <Box style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${borderColor}` }}>
                  <TabSwitcher 
                    design="outline" 
                    darkMode={darkMode} 
                    neonColor={'#023020'} 
                    contentHeight={"696px"}
                    formInstance={xFormBuilder} 
                  >
                    <TabItem value="codex" label="Codex" />
                    <TabItem value="codice" label="Codice" />
                    <TabItem value="accordion" label="Accordion" />
                    <TabItem value="dual" label="Dual" />
                  </TabSwitcher>
                </Box>
              </DocSection>
              
              <section id="theming" style={{ scrollMarginTop: "100px", paddingTop: "48px", paddingBottom: "24px" }}>
                <Heading size="6" 
                style={{ 
                    marginBottom: "24px",
                    fontFamily: "'Libre Baskerville', serif", 
                    fontSize: "24px", 
                    letterSpacing: "-0.01em"
                 }}>
                    Theming
                </Heading>
                
                <Box pl="4" style={{ borderLeft: `2px solid ${borderColor}`, paddingLeft: '24px', marginLeft: '8px' }}>
                  <DocSection id="radixui--themes" title="Radix UI Themes" >
                    <p>
                      Theming extensibility enabled using Radix's <a style={{color: activeColor, textDecoration: 'none', fontWeight: 500}} href="https://www.radix-ui.com/themes/docs/theme/overview" 
                      target="_blank" rel="noreferrer">ThemeProps</a> to allow developers to conveniently blend an χForm instance 
                      into any application's design system via the <span className="doc-inline-code">theme</span> object without having to write custom CSS overrides.
                    </p>       
                  </DocSection>

                  <DocSection id="render-options" title={<>VΣ <span className="doc-inline-code" style={{fontSize: "20px"}}>render()</span> Options</>}>
                     <p>
                      Inject <span className="doc-inline-code">theme</span> options into VectorSigma's <span className="doc-inline-code">transform()</span> and <span className="doc-inline-code">render()</span> methods to override 
                      a range of theme properties such as <span className="doc-inline-code">accentColor</span>, <span className="doc-inline-code">grayColor</span>, <span className="doc-inline-code">panelBackground</span>, <span className="doc-inline-code">radius</span>, <span className="doc-inline-code">scaling</span> 
                      and <span className="doc-inline-code">appearance</span>.
                    </p>
                    <MacWindow title="themeConfig.ts" darkMode={darkMode} language="typescript" code={xFormRenderOption} />
                  </DocSection>

                  <DocSection id="xform-97-reference" title="xForm '97 Reference">
                    <p>
                      <span className="doc-inline-code">theme</span> object for reference with the aesthetic of X-Men '97 with the classic 90's Jim Lee era 
                      - deep blue & high-contrast yellow design theme. 
                    </p>
                    <MacWindow title="xForm97.ts" darkMode={darkMode} language="typescript" code={xForm97} />
                  </DocSection>
                </Box>
              </section>

              <DocSection id="usevectorsigma-hook" title={<><span className="doc-inline-code" style={{fontSize: "20px"}}>useVectorSigma()</span> Hook for stateful implementation</>}>
                 <p>The <span className="doc-inline-code">useVectorSigma()</span> hook method utilizes React lazy initialization in tandem with <span className="doc-inline-code">useRef</span> to guarantee 
                 VectorSigma class object instance is created in a singleton-ish fashion when the VΣ component mounts, 
                 and safely persists across DOM re-renders.</p>
                 <MacWindow title="HookUsage.tsx" darkMode={darkMode} language="typescript" maxHeight="400px" code={statefulUsageSnippet} />
              </DocSection>

              <DocSection id="xform-state-observers" title="χForm State Observers">
                <p>
                  Access to <strong>VectorSigma</strong> class instance properties as well as 
                  <a style={{color: activeColor, fontWeight: 500, textDecoration: 'none', padding: '0 4px'}} href="https://formik.org/docs/api/formik" target="_blank" rel="noreferrer"> Formik </a> <span className="doc-inline-code">values</span> and <span className="doc-inline-code">action</span> methods allow developers to 
                  trigger form submissions, resets, or validation checks predicated on their application integration or logic.
                </p>
                <MacWindow title="StateObserver.tsx" darkMode={darkMode} language="typescript" maxHeight="600px" code={xFormRegistrationCodeString} />
              </DocSection>

              <DocSection id="xform-onsubmit-formdata" title="onSubmit::FormData">
                <p>
                  Send raw <span className="doc-inline-code">File</span> objects (e.g. Images, Documents, PDFs) to an API integration as <span className="doc-inline-code">multipart/form-data</span>.
                </p>
                <MacWindow title="SubmitHandler.ts" darkMode={darkMode} language="typescript" maxHeight="600px" code={xFormFileDataCodeString} />
              </DocSection>

              <DocSection id="about-me" title="About Developer">
                <p>
                  GitHub | <a style={{color: activeColor, fontWeight: 500, textDecoration: 'none'}} href="https://github.com/emeraldemperaur" target="_blank" rel="noreferrer">@emeraldemperaur</a>
                </p>
              </DocSection>
            </main>
          </Card>

        </Grid>
      </Container>
    </Section>
  );
};