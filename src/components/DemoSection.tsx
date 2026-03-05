import { Box, Flex, Text, Section, Container, Heading } from "@radix-ui/themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface TwoColumnSectionProps {
  darkMode?: boolean;
  variant?: "neumorphic" | "material";
  column1DisplayText?: string;
  c1DisplayTextColorOverride?: string;
  column2DisplayText?: string;
  column2backgroundColorOverride?: string;
  c2DisplayTextColorOverride?: string;
}

const CodeDemoSection = ({
  darkMode = false,
  variant = "neumorphic",
  
  column1DisplayText,
  c1DisplayTextColorOverride,
  
  column2DisplayText,
  column2backgroundColorOverride,
  c2DisplayTextColorOverride,
}: TwoColumnSectionProps) => {

  const pageBg = darkMode ? "#121212" : "#f3f4f6";
  const defaultText = darkMode ? "#ffffff" : "#4b5563";
  const defaultHeadingText = darkMode ? "#ffffff" : "#000000";
  
  const col2Bg = column2backgroundColorOverride || (darkMode ? "#1a1a1a" : "#f5f5f5");
  const col2Text = c2DisplayTextColorOverride || defaultText;

  const paneShadow = variant === "neumorphic"
    ? {
        boxShadow: darkMode
          ? "8px 8px 16px #070707, -8px -8px 16px #1d1d1d"
          : "8px 8px 16px #bebebe, -8px -8px 16px #ffffff",
        borderRadius: "0px",
      }
    : {
        boxShadow: darkMode
          ? "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        border: darkMode ? "1px solid #333" : "1px solid #e5e5e5",
        borderRadius: "0px",
      };

const vectorSigmaCode = `
import React from 'react';
import { useVectorSigma } from '@emeraldemperaur/vector-sigma';
import { apiXFormData } from './mockData';

interface VΣRegistrationForm {
    firstName: string;
    lastName: string;
    emailAddress: string;
    isMITUndergraduate: boolean;
}

export const VΣRegistrationForm = () => {
    const xFormBuilder = useVectorSigma(apiXFormData)
        .setName('VΣ Registration Form')
        .setBrand("brandHexColor", "www.exampleurl.com/logoimage.png", 'right');

    return xFormBuilder.render({
        displayMode: 'accordion',
        readOnlyMode: false,
        // Access 'values', 'actions' and 'instance' in global onSubmit callback function
        onSubmit: async (values, actions, instance) => {
            console.log("Email:", values.emailAddress);
            console.log("MIT Undergraduate:", values.isMITUndergraduate);
            const timeTakenMs = 
            (instance.timeSubmitted || Date.now()) - instance.timeCreated;
            console.log(\`VΣ User finished the xForm in \${timeTakenMs / 1000} seconds.\`);
            console.log(\`xForm Status:\`, instance.statusCode);
            
           try {
                // Initiate HTTP POST request with stateful 'values' and 'instance' payload
                await fetch(\`/api/questionnaires/\${instance.formObject.uuid}/responses\`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                formVersion: instance.formObject.uuid,
                                responseTime: instance.timeSubmitted - instance.timeCreated,
                                xFormObject: instance.formObject,
                                answers: values
                            })
                        });
                // Reset form after HTTP POST request success and more 
                // (i.e. https://formik.org/docs/api/formik)
                actions.resetForm(); 
                alert("Thank you for completing the VΣ questionnaire!");
               } catch (error) {
                      console.error("Failed to save responses to VΣ DB", error);
                }
        }
    });
};`;

  return (
    <Section
      style={{
        width: "100%",
        backgroundColor: pageBg,
        padding: "0px 0",
      }}
    >
      <Container size="4">
         <Heading size="7" weight="bold" 
              style={{
                fontSize: '26px', 
                letterSpacing: "0.06em",
                fontFamily: 'Libre Baskerville', 
                marginLeft: '13px',
                marginBottom: '16px',
                color: defaultHeadingText,
                marginTop: '33px'}}>
               Implementation&nbsp;<i className="fa-solid fa-code"></i>
              </Heading>
               <Text 
                  as="p" 
                  size="4" 
                  mt="2" 
                  style={{ 
                    fontFamily: 'Libre Franklin',
                    fontWeight: 400,
                    color: defaultText,
                    letterSpacing: "0.06em",
                    marginBottom: "33px",
                    marginLeft: "13px",
                    marginRight: "13px"
                 }}
                >
                  Form Fields, Input Validation and Submission callback functions can be defined and parametized 
                  predicated on a JSON (JavaScript Object Notation) or native JavaScript&nbsp;
                  <a className={darkMode ? "hyperlink-dark" : "hyperlink-light"} 
                  href="#" target="_blank">xForm schema</a> and form object builder methods.
                </Text>
        <Flex 
          direction={{ initial: "column", md: "row" }} 
          align="stretch" 
          gap="6"
        >
            
          <Box
            className="demo-pane"
            style={{
              flex: 1,
              backgroundColor: "#1e1e1e",
              padding: "24px",
              minHeight: "350px",
              ...paneShadow,
            }}
          >
            <Flex gap="2" mb="4">
              <Box style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
              <Box style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
              <Box style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27c93f" }} />
            </Flex>
            
            <SyntaxHighlighter 
              language="tsx" 
              style={vscDarkPlus}
              customStyle={{ 
                margin: 0, 
                padding: 0, 
                background: "transparent", 
                fontSize: "14px" 
              }}
            >
              {vectorSigmaCode}
            </SyntaxHighlighter>

            {/* Hover Overlay */}
            {column1DisplayText && (
              <Box className="demo-overlay">
                <Text size="6" weight="bold" style={{ color: c1DisplayTextColorOverride || "#ffffff", letterSpacing: "1px" }}>
                  {column1DisplayText}
                </Text>
              </Box>
            )}
          </Box>

          {/* ========================================== */}
          {/* SEPARATOR: Responsive Gradient Line          */}
          {/* ========================================== */}
          <Flex align="center" justify="center">
            <Box className="demo-separator" />
          </Flex>

          {/* ========================================== */}
          {/* COLUMN 2: Visual Canvas                      */}
          {/* ========================================== */}
          <Box
            className="demo-pane"
            style={{
              flex: 1,
              backgroundColor: col2Bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              minHeight: "350px",
              ...paneShadow,
            }}
          >
            {/* Visual Canvas Content (Placeholder) */}
            <Box 
              style={{ 
                width: "100%", 
                maxWidth: "300px",
                height: "200px", 
                border: darkMode ? "2px dashed #444" : "2px dashed #ccc",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: darkMode ? "#888" : "#999" }}>
                [ Rendered Form Image Here ]
              </Text>
            </Box>

            {/* Hover Overlay */}
            {column2DisplayText && (
              <Box className="demo-overlay">
                <Text size="6" weight="bold" style={{ color: col2Text, letterSpacing: "1px" }}>
                  {column2DisplayText}
                </Text>
              </Box>
            )}
          </Box>

        </Flex>
      </Container>
    </Section>
  );
};

export default CodeDemoSection;