import { useState, useEffect, Suspense, lazy } from "react";
import { Box, Flex, Text, Section, Container, Heading } from "@radix-ui/themes";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useVectorSigma } from '@emeraldemperaur/vector-sigma';
import { xFormN8NPrototypeData } from "../utils/n8nSchema"; 
import devLogoDark from '../assets/mito-dev-icon.png';
import netflixIcon from '../assets/netflix-icon.webp';
import butterflyMXIcon from '../assets/butterfly-mx-icon.png';
import wealthsimpleIcon from '../assets/wealthsimple-icon.jpg';
import aircanadaIcon from '../assets/aircanada-icon.png';
import louvreWallpaper from '../assets/paris-wallpaper.jpg';

const loadSyntaxHighlighter = () => 
  import("react-syntax-highlighter").then((module) => ({
    default: module.Prism,
  }));
const LazySyntaxHighlighter = lazy(loadSyntaxHighlighter);

interface DemoSectionProps {
  darkMode?: boolean;
}

const CodeDemoSection = ({ darkMode = true }: DemoSectionProps) => {
  const [viewMode, setViewMode] = useState<"render" | "code">("render");
  
  const [isAwake, setIsAwake] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const pageBg = darkMode ? "#000000" : "#fafafa";
  const defaultText = darkMode ? "#9ca3af" : "#4b5563";
  const defaultHeadingText = darkMode ? "#f9fafb" : "#111827";

  const xFormBuilder = useVectorSigma(xFormN8NPrototypeData)
    .setName('N8N Reservation Booking')
    .setBrand("#800020", "", 'right');

  useEffect(() => {
    loadSyntaxHighlighter();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);

      const dateString = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
      setCurrentDate(dateString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsAwake(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handlePowerClick = () => {
    if (isAwake) {
      setIsAwake(false);
      setIsUnlocked(false);
      setIsAppOpen(false);
    } else {
      setIsAwake(true);
    }
  };

  const vectorSigmaCode = `import React from 'react';
import { useVectorSigma } from '@emeraldemperaur/vector-sigma';
import { xFormN8NPrototypeData } from './mockData';

export const N8NShowcase = () => {
    const xFormBuilder = useVectorSigma(xFormN8NPrototypeData)
        .setName('N8N Reservation Booking')
        .setBrand("#EA4B71", "", 'right');

    return xFormBuilder.render({
        displayMode: 'codex',
        readOnlyMode: false,
        onSubmit: async (values, actions, instance) => {
            const timeTakenMs = (instance.timeSubmitted || Date.now()) - instance.timeCreated;
            console.log(\`Finished in \${timeTakenMs / 1000} seconds.\`);
            
            try {
                // Dispatch payload to an N8N Webhook trigger
                await fetch('https://your-n8n-instance.com/webhook/reservation-booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        reservationId: instance.formObject.uuid,
                        timestamp: instance.timeSubmitted,
                        guestData: values
                    })
                });
                actions.resetForm(); 
                alert("N8N Reservation Workflow Triggered!");
            } catch (error) {
                console.error("Failed to trigger N8N workflow", error);
            }
        }
    });
};`;

  return (
    <Section
      style={{
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        overflowX: "hidden",
        backgroundColor: pageBg,
        padding: "80px 24px",
        fontFamily: "Inter, -apple-system, sans-serif",
      }}
    >
      <style>
        {`
          .flip-container {
            perspective: 2500px;
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            aspect-ratio: 1.4; 
          }
          @media (max-width: 768px) {
            .flip-container { aspect-ratio: 0.75; } 
          }

          .flipper {
            width: 100%;
            height: 100%;
            position: relative;
            transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
          }
          .flipper.show-code {
            transform: rotate3d(3, 10, 6, 180deg) scale(0.95);
          }

          .face-front, .face-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 24px;
          }

          .face-back {
            transform: rotate3d(3, 10, 6, 180deg);
            background: ${darkMode ? "rgba(20, 20, 25, 0.65)" : "#000000"};
            backdrop-filter: blur(24px) saturate(150%);
            -webkit-backdrop-filter: blur(24px) saturate(150%);
            border: 1px solid ${darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"};
            box-shadow: 0 24px 48px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .mac-header {
            display: flex; align-items: center; padding: 16px 20px;
            background: ${darkMode ? "rgba(0,0,0,0.3)" : "#fff"};
            border-bottom: 1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
            gap: 8px;
          }
          .mac-btn { width: 12px; height: 12px; border-radius: 50%; transition: opacity 0.2s; cursor: pointer; }
          .mac-btn:hover { opacity: 0.7; }
          .mac-close { background: #ff5f56; }
          .mac-min { background: #ffbd2e; }
          .mac-max { background: #27c93f; }

          .ipad-body {
            width: 100%; height: 100%;
            background: #8e8e93; 
            border-radius: 4.5%;
            padding: 3px; 
            box-sizing: border-box;
            box-shadow: inset 0 0 0 1px #a1a1a6, 0 40px 80px rgba(0,0,0,0.4);
            position: relative;
          }
          .ipad-bezel {
            width: 100%; height: 100%;
            background: #111111; 
            border-radius: 4.2%;
            padding: 2.2%;
            box-sizing: border-box;
            box-shadow: inset 0 0 0 2px #222;
          }
          .ipad-screen {
            width: 100%; height: 100%;
            background: #000000;
            border-radius: 1.5%;
            position: relative;
            overflow: hidden;
          }

          .btn-power {
            position: absolute; top: 12%; left: -3px; width: 4px; height: 8%;
            background: #6c6c70; border-radius: 4px 0 0 4px; cursor: pointer; transition: transform 0.1s;
          }
          .btn-power:active { transform: scaleX(0.5); }
          .btn-vol-up {
            position: absolute; top: -3px; left: 10%; width: 4%; height: 4px;
            background: #6c6c70; border-radius: 4px 4px 0 0;
          }
          .btn-vol-down {
            position: absolute; top: -3px; left: 15%; width: 4%; height: 4px;
            background: #6c6c70; border-radius: 4px 4px 0 0;
          }

          .ipad-wallpaper {
            position: absolute; inset: 0;
            background: url(${louvreWallpaper}) center/cover;
            opacity: 0; pointer-events: none;
            transition: opacity 0.5s ease, filter 0.5s ease;
          }
          .ipad-wallpaper.awake { opacity: 1; pointer-events: auto; }
          .ipad-wallpaper.blurred { filter: blur(15px) brightness(0.7); }
          
          .status-bar {
            position: absolute; top: 12px; right: 20px;
            width: 60px; height: 15px;
            background: url("https://assets.codepen.io/2722301/status.png") no-repeat right/contain;
            z-index: 30; pointer-events: none;
            filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
          }
          .app-open .status-bar { filter: invert(1); } 

          .lock-screen {
            position: absolute; inset: 0;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s;
            cursor: pointer; z-index: 20;
            font-family: "Work Sans";
          }
          .lock-screen.unlocked { transform: translateY(-100%); opacity: 0; pointer-events: none; }
          .lock-icon {
            width: 20px; height: 28px; margin-bottom: 12px;
            background: url("https://assets.codepen.io/2722301/lock.png") center/contain no-repeat;
          }
          
          /* Updated Typography based on reference */
          .lock-time {
            font-size: clamp(60px, 12vw, 96px);
            font-weight: 100; color: white;
            text-align: center;
            line-height: 1; letter-spacing: 1px;
          }
          .lock-date {
            font-size: clamp(16px, 3vw, 24px);
            font-weight: 300; color: white;
            text-align: center;
            margin-top: 10px; margin-bottom: 15%;
            letter-spacing: 0.5px;
          }
          
          .swipe-hint {
            position: absolute; bottom: 6%;
            color: white; font-weight: 400; font-size: 15px;
            animation: pulseSwipe 2.5s infinite; letter-spacing: 0.5px;
          }
          @keyframes pulseSwipe {
            0%, 100% { opacity: 0.4; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-10px); }
          }

          .dock-wrapper {
            position: absolute; bottom: 3%; left: 50%; transform: translateX(-50%);
            display: flex; padding: 12px 16px; gap: 16px;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border-radius: 28px; z-index: 15;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
          }
          .dock-wrapper.hidden { transform: translate(-50%, 150%); opacity: 0; pointer-events: none; }
          
          .dock-icon {
            width: clamp(35px, 5vw, 55px); aspect-ratio: 1;
            border-radius: 22%; cursor: pointer;
            background-size: cover; background-position: center;
            transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          }
          .dock-icon:hover { transform: scale(1.15) translateY(-4px); }
          .icon-sf { background-image: url(${devLogoDark}); }
          .icon-tw { background-image: url(${netflixIcon}); }
          .icon-fb { background-image: url(${butterflyMXIcon}); }
          .icon-md { background-image: url(${wealthsimpleIcon}); }
          .icon-cm { background-image: url(${aircanadaIcon}); }

          .app-layer {
            position: absolute; inset: 0; z-index: 18;
            background: #f9fafb;
            transform: scale(0.9) translateY(20px); opacity: 0; pointer-events: none;
            transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .app-layer.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: auto; }

          .app-layer *::-webkit-scrollbar {
            width: 5px;
          }
          .app-layer *::-webkit-scrollbar-track {
            background: transparent;
            margin-top: 36px; /* Prevents the scrollbar from overlapping the status bar */
            margin-bottom: 12px;
          }
          .app-layer *::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.25);
            border-radius: 10px;
          }
          .app-layer *::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.4);
          }
          
          .home-indicator {
            position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
            width: 140px; height: 5px; border-radius: 4px;
            background: rgba(255,255,255,0.8); z-index: 30; cursor: pointer;
            transition: background 0.3s;
          }
          .app-open .home-indicator { background: rgba(0,0,0,0.8); }

          .saas-toggle-container {
            display: inline-flex;
            background: ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
            padding: 4px; border-radius: 12px; margin-bottom: 48px;
            border: 1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
          }
          .saas-tab {
            padding: 8px 24px; border-radius: 8px; font-size: 14px; font-weight: 500;
            color: ${defaultText}; background: transparent; border: none; cursor: pointer;
            transition: all 0.2s ease;
          }
          .saas-tab.active {
            background: ${darkMode ? "#ffffff" : "#ffffff"};
            color: ${darkMode ? "#000000" : "#000000"};
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
        `}
      </style>

      <Container size="4">
        <Flex direction="column" align="center" mb="6">
          <Heading size="7" style={{ color: defaultHeadingText, letterSpacing: "-0.02em", fontFamily: "Libre Baskerville", fontWeight: 600, marginBottom: "16px", textAlign: "center" }}>
            Implementation Engine
          </Heading>
          <Text as="p" size="4" style={{ color: defaultText, maxWidth: "900px", textAlign: "center", marginBottom: "32px", lineHeight: 1.6, fontFamily: "Libre Franklin" }}>
            Configure Form Fields, Input Validation, and Submission callbacks directly via JSON schema or native builder methods.
          </Text>

          <div className="saas-toggle-container" style={{fontFamily: "Libre Franklin"}}>
            <button className={`saas-tab ${viewMode === "render" ? "active" : ""}`} onClick={() => setViewMode("render")}>
              <i className="fa-solid fa-eye"></i>&nbsp; Render
            </button>
            <button className={`saas-tab ${viewMode === "code" ? "active" : ""}`} onClick={() => setViewMode("code")}>
              <i className="fa-solid fa-code"></i>&nbsp; Code
            </button>
          </div>
        </Flex>

        <div className="flip-container">
          <div className={`flipper ${viewMode === "code" ? "show-code" : ""}`}>
            
            <div className="face-front">
              <div className="ipad-body">
                <div className="btn-power" onClick={handlePowerClick} title="Toggle Sleep/Wake" />
                <div className="btn-vol-up" />
                <div className="btn-vol-down" />
                
                <div className="ipad-bezel">
                  <div className={`ipad-screen ${isAppOpen ? "app-open" : ""}`}>
                    
                    <div className={`ipad-wallpaper ${isAwake ? "awake" : ""} ${isAppOpen || !isUnlocked ? "blurred" : ""}`} />
                    {isAwake && <div className="status-bar" />}

                    {isAwake && (
                      <div className={`lock-screen ${isUnlocked ? "unlocked" : ""}`} onClick={() => setIsUnlocked(true)}>
                        <div className="lock-icon" />
                        <div className="lock-time">{currentTime}</div>
                        <div className="lock-date">{currentDate}</div>
                        <div className="swipe-hint">Click or swipe up to open</div>
                      </div>
                    )}

                    {isAwake && (
                      <div className={`dock-wrapper ${!isUnlocked || isAppOpen ? "hidden" : ""}`}>
                        <div className="dock-icon icon-sf" onClick={() => setIsAppOpen(true)} title="Launch VΣ" />
                        <div className="dock-icon icon-tw" />
                        <div className="dock-icon icon-fb" />
                        <div className="dock-icon icon-md" />
                        <div className="dock-icon icon-cm" />
                      </div>
                    )}

                    <div className={`app-layer ${isAppOpen ? "open" : ""}`}>
                      <Flex 
                        direction="column" 
                        style={{ 
                          height: '100%', 
                          paddingTop: '36px', 
                          backgroundColor: 'var(--gray-2)',
                          overflowY: 'auto' 
                        }}
                      >
                        <Box style={{ padding: '1.5rem', backgroundColor: '#800020', color: 'white' }}>
                          <Heading as="h1" size="5" style={{ fontWeight: 400, letterSpacing: '0.06em', fontFamily: 'Libre Franklin'}}>
                            Côte d'Azur Restaurant Reservation System
                          </Heading>
                          <Text size="2" style={{ fontWeight: 200, letterSpacing: '0.06em', fontFamily: 'Libre Franklin', marginTop: '8px', display: 'block' }}>
                            Make a reservation. Help us deliver an unforgettable dining experience
                          </Text>
                        </Box>

                        <Flex justify="center" style={{ padding: '1.5rem 1rem', flexGrow: 1 }}>
                          <Box style={{ width: '100%', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                            {xFormBuilder.render({
                              displayMode: 'codex',
                              readOnlyMode: false,
                              async onSubmit(values, actions, instance) {
                                console.log(`xForm InProgress Timestamp:`, instance.timeInProgress);
                                const timeTakenMs = (instance.timeSubmitted || Date.now()) - instance.timeCreated;
                                console.log(`VΣ User finished the xForm in ${timeTakenMs / 1000} seconds.`);
                                try {
                                  await fetch(`https://your-n8n-instance.com/webhook/reservation-booking`, {
                                    method: 'POST',
                                    mode: 'no-cors',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      reservationId: instance.formObject.uuid,
                                      timestamp: instance.timeSubmitted,
                                      guestData: values
                                    })
                                  });
                                  actions.resetForm(); 
                                  alert("N8N Reservation Workflow Triggered!");
                                } catch (error) {
                                  console.error("Failed to trigger N8N workflow", error);
                                }
                              },
                            })}
                          </Box>
                        </Flex>
                      </Flex>
                    </div>

                    {isAwake && isUnlocked && (
                      <div className="home-indicator" onClick={() => setIsAppOpen(false)} />
                    )}

                  </div>
                </div>
              </div>
            </div>

            <div className="face-back">
              <div className="mac-header">
                <div className="mac-btn mac-close" onClick={() => setViewMode("render")} title="Close Code View" />
                <div className="mac-btn mac-min" />
                <div className="mac-btn mac-max" />
                <Text size="2" style={{ marginLeft: "8px", color: defaultText, fontWeight: 500, fontFamily: 'JetBrains Mono' }}>
                  VectorSigma_Implementation.tsx
                </Text>
              </div>
              <Box style={{ flexGrow: 1, overflow: "auto", padding: "16px", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <Suspense fallback={<Text size="2" style={{ color: "#9ca3af" }}>Loading syntax engine...</Text>}>
                  <LazySyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: "transparent", fontSize: "13px", fontFamily: 'JetBrains Mono' }}>
                    {vectorSigmaCode}
                  </LazySyntaxHighlighter>
                </Suspense>
              </Box>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
};

export default CodeDemoSection;