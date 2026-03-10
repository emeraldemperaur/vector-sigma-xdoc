import React, { useEffect, useState } from "react";
import { Box, Grid, Heading, Text, Section, Container, Card } from "@radix-ui/themes";
import { NavLink as NavigationLink } from 'react-router-dom';
import { CodeSnippet } from "./documentation/CodeSnippet";
import { statefulUsageSnippet, xForm97, xFormCodeSnippet, xFormCodeUsageSnippet, xFormFileDataCodeString, xFormRegistrationCodeString, xFormRenderOption } from "../utils/xFormCodeSnippetStrings";
import { TabItem, TabSwitcher } from "./documentation/TabSwitcher";
import AdRibbon from "./AdRibbon";
import { GoogleAd } from "./GoogleAd";
import accordionDisplayMode from '../assets/accordion_display_mode.png';
import codexDisplayMode from '../assets/codex_display_mode.png';
import codiceDisplayMode from '../assets/codice_display_mode.png';
import dualDisplayMode from '../assets/dual_display_mode.png';


const DocSection = ({ id, title, children }: { id: string; title: string | React.ReactNode; children?: React.ReactNode }) => (
  <section id={id} style={{ paddingTop: "24px", paddingBottom: "80px" }}>
    <Heading size="6" 
    style={{ 
        fontFamily: "Libre Baskerville", 
        fontSize: "23px", 
        marginBottom: "16px", 
        letterSpacing: "0.06em", 
        }}>
      {title}
    </Heading>
    <Text as="div" size="3" style={{ opacity: 0.8, lineHeight: "1.6" }}>
      {children || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."}
    </Text>
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
    <Box asChild style={{ marginBottom: "8px", marginLeft: isSubItem ? "16px" : "0" }}>
      <li>
        <a
          href={`#${id}`}
          onClick={(e) => onClick(e, id)}
          style={{
            textDecoration: "none",
            display: "block",
            padding: "4px 0 4px 16px",
            color: isActive ? activeColor : textSecondary,
            fontWeight: isActive ? 600 : 400,
            borderLeft: isActive ? `3px solid ${activeColor}` : "3px solid transparent",
            transition: "all 0.2s ease-in-out",
            fontSize: isSubItem ? "14px" : "16px",
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

  const pageBg = darkMode ? "#121212" : "#f4f5f7";
  const cardBg = darkMode ? "#1e1e1e" : "#ffffff";
  const textPrimary = darkMode ? "#f3f4f6" : "#111827";
  const textSecondary = darkMode ? "#9ca3af" : "#6b7280";
  const activeColor = darkMode ? "#800020" : "#820c29"; 
  const borderColor = darkMode ? "#374151" : "#e5e7eb";

  const paneShadow = variant === "neumorphic"
    ? {
        boxShadow: darkMode
          ? "8px 8px 16px #0a0a0a, -8px -8px 16px #1e1e1e"
          : "8px 8px 16px #d1d5db, -8px -8px 16px #ffffff",
        border: "none",
        borderRadius: "16px",
      }
    : {
        boxShadow: darkMode
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.5)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        border: `1px solid ${borderColor}`,
        borderRadius: "12px",
      };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" } 
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveId(id); 

    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 69;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <Section style={{ width: "100%", backgroundColor: pageBg, padding: "64px 0", color: textPrimary, marginTop: "33px" }}>
      <Container size="4" px={{ initial: "4", md: "6" }}>
        <Grid columns={{ initial: "1", md: "250px 1fr" }} gap="8">
          
          <Box
            asChild
            style={{
              position: "sticky",
              top: "24px",
              alignSelf: "start",
              maxHeight: "calc(100vh - 48px)",
              overflowY: "auto",
            }}
          >
            <nav>
              <Text size="2" weight="bold" 
              style={{ 
                textTransform: "uppercase", 
                letterSpacing: "1px", 
                marginTop: "69px", 
                marginBottom: "16px", 
                display: "block",
                marginLeft: "13px",
                fontFamily: "Libre Franklin"  
                }}>
                Getting Started
              </Text>
              <Box asChild 
              style={{ 
                listStyle: "none", 
                padding: 0, 
                margin: 0, 
                borderLeft: `1px solid ${borderColor}`,
                fontFamily: "Libre Franklin",
                letterSpacing: "0.06em" 
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

          <Card size="4" style={{ backgroundColor: cardBg, ...paneShadow, padding: "40px", marginRight: "23px" }}>
            <main>
              <DocSection id="introduction" title="Introduction">
                <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>
                    VectorSigma is a dual mode package bundled with both CommonJS (CJS), ES Modules (ESM) & Universal Module Definition (UMD) builds to 
                    facilitate universal module compatibility and enable effortless integration across legacy and modern JavaScript ecosystems.
                </p>
                <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>
                    VΣ leverages Formik for robust React state management and Yup for declarative schema validation to adhere strictly to the standard React form lifecycle, 
                    ensuring compatibility with Redux DevTools & standard debugging workflows, 
                    with an <code>onSubmit()</code> callback and convenience methods to seamlessly connect χForm instance data to backend workflows, 
                    CRM systems, or databases immediately upon submission.
                </p>
                <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>
                    Reusable <NavigationLink style={{color: textPrimary, textDecoration: 'none'}} to='/components'><em>χForm UI components</em></NavigationLink> with material, outline and neumorphic design variants are explicitly exported 
                    from package entry point to enable developer-friendly use as a lightweight ARIA compliant component library.
                </p>
              </DocSection>
              <DocSection id="installation" title="Installation">
                <h3 className="doc-text">Prerequisites</h3>
                <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}} 
                className="doc-text">Before starting a project make sure to install the peer dependencies: &nbsp;<code>react</code>, &nbsp;<code>react-dom</code>&nbsp; & <code>&nbsp;sass-embedded</code></p>
                <h3 className="doc-text">To install VectorSigma in your project, enter the following command in terminal:</h3>
                <CodeSnippet darkMode={darkMode} language="terminal" code={`npm install vector-sigma`}/>
                <h3 className="doc-text">Importing ES (ECMAScript) Module</h3>
                <CodeSnippet darkMode={darkMode} language="typescript" 
                code={`import { VectorSigma, Teletraan1 } from '@emeraldemperaur/vector-sigma';`} 
                />
                <h3 className="doc-text">Importing CommonJS (CJS)</h3>
                <CodeSnippet darkMode={darkMode} language="javascript" 
                code={`const { VectorSigma, Teletraan1 } = require('@emeraldemperaur/vector-sigma');`} 
                />
                <h3 className="doc-text">Importing UMD (Universal Module Definition) via unpkg CDN</h3>
                 <CodeSnippet darkMode={darkMode} language="html" 
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
              <AdRibbon darkMode={darkMode}>
                <GoogleAd 
                    client="ca-pub-3704334287285175" 
                    slot="8343960922" 
                    format="auto" 
                    responsive={true} 
                  />
              </AdRibbon>
              <DocSection id="xform-schema" title="χForm Schema">
                <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>
                    Declarative JSON or JavaScript object schema attributes <code>isRequired</code> and <code>errorText</code> facilitate a validation engine that is comprehensive, accessible and easy to maintain. 
                    <code> onChange()</code>, <code> onBlur()</code> input event control state updates, errors and values are handled automatically. 
                    <code> onSubmit()</code> handler is automatically blocked if the input vs. validation schema is invalid.
                </p>
                <CodeSnippet darkMode={darkMode} language="typescript" 
                code={xFormCodeSnippet} maxHeight={"400px"}
                />
              </DocSection>
              <DocSection id="usage" title="Usage">
                <h3 className="doc-text">Code Implementation</h3>
                <CodeSnippet darkMode={darkMode} language="typescript" maxHeight={"400px"} 
                code={xFormCodeUsageSnippet} 
                />
                <h3 className="doc-text">Display Mode Variants</h3>
                <TabSwitcher design="outline" darkMode={darkMode} neonColor={activeColor} contentHeight={"696px"}>
                  <TabItem value="codex" label="Codex" imageSrc={codexDisplayMode}></TabItem>
                  <TabItem value="codice" label="Codice" imageSrc={codiceDisplayMode}></TabItem>
                  <TabItem value="accordion" label="Accordion" imageSrc={accordionDisplayMode}></TabItem>
                  <TabItem value="dual" label="Dual" imageSrc={dualDisplayMode}></TabItem>
                </TabSwitcher>
              </DocSection>
              
              <section id="theming" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
                <Heading size="6" 
                style={{ 
                    marginBottom: "16px",
                    fontFamily: "Libre Baskerville", 
                    fontSize: "23px", 
                    letterSpacing: "0.06em"
                 }}>
                    Theming</Heading>
                <Box pl="4" style={{ borderLeft: `2px double ${borderColor}`, paddingLeft: '13px' }}>
                  <DocSection id="radixui--themes" title="Radix UI Themes" >
                    <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>
                      Theming extensibility enabled using Radix's <a style={{color: textPrimary}} href="https://www.radix-ui.com/themes/docs/theme/overview" 
                      target="_blank">ThemeProps</a> to allow developers to conveniently blend an χForm instance 
                      into any application's design system via<code> theme </code> object without having to write custom CSS overrides.
                    </p>       
                  </DocSection>
                  <DocSection id="render-options" title={<>VΣ <code>render()</code> Options</>}>
                     <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>
                      Inject <code> theme </code>options into VectorSigma's <code> transform() </code> and <code> render() </code>methods to override 
                      a range of <code> theme </code> properties such as <code> accentColor</code>, <code> grayColor</code>, <code> panelBackground</code>, <code> radius</code>, <code> scaling </code> 
                      and <code>appearance</code>.
                    </p>
                    <CodeSnippet darkMode={darkMode} language="typescript" 
                    code={xFormRenderOption} 
                    />
                  </DocSection>
                  <DocSection id="xform-97-reference" title="xForm '97 Reference">
                    <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>
                      <code>theme</code> object for reference with the aesthetic of X-Men '97 with the classic 90's Jim Lee era 
                      - deep blue & high-contrast yellow design theme. 
                    </p>
                    <CodeSnippet darkMode={darkMode} language="typescript" 
                    code={xForm97} 
                    />
                  </DocSection>
                </Box>
              </section>

              <DocSection id="usevectorsigma-hook" title={<><code>useVectorSigma()</code> Hook for stateful implementation</>}>
                 <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}><code>useVectorSigma()</code> hook method utilizes <code>React</code> lazy initialization in tandem with <code>useRef</code> to guarantee 
                  VectorSigma class object instance is created in a singleton-ish fashion when the VΣ component mounts, 
                  and safely persists across DOM re-renders.</p>
                  <CodeSnippet darkMode={darkMode} language="typescript" maxHeight={"400px"}
                  code={statefulUsageSnippet} 
                  />
              </DocSection>
              <DocSection id="xform-state-observers" title="χForm State Observers">
                <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>
                  Access to <strong>VectorSigma</strong> <code>class instance</code> properties as well as 
                  <a style={{color: textPrimary, fontWeight: "bold", textDecoration: 'none'}} href="https://formik.org/docs/api/formik" target="_blank"> Formik </a> <code>values</code> and <code>action</code> methods allow developers to 
                  trigger form submissions, resets, or validation checks predicated on their application integration or logic.
                </p>
                <CodeSnippet darkMode={darkMode} language="typescript" maxHeight={"600px"}
                code={xFormRegistrationCodeString} 
                />
              </DocSection>
              <DocSection id="xform-onsubmit-formdata" title="onSubmit::FormData">
                <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>
                  Send raw <code>File</code> objects (e.g. Images, Documents, PDFs) to an API integration as <code>multipart/form-data</code>
                </p>
                <CodeSnippet darkMode={darkMode} language="typescript" maxHeight={"600px"}
                code={xFormFileDataCodeString} 
                />
              </DocSection>
              <DocSection id="about-me" title="About Developer">
                <p style={{textAlign: "justify", fontSize:"16px", fontFamily: "Libre Franklin"}}>GitHub | <a style={{color: textPrimary, fontWeight: "bold", textDecoration: 'none'}}
                href="https://github.com/emeraldemperaur" target="_blank">@emeraldemperaur</a></p>
              </DocSection>
            </main>
          </Card>

        </Grid>
      </Container>
    </Section>
  );
};