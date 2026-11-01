import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { LockClosedIcon } from '@radix-ui/react-icons';
import devLogoLight from '../assets/mito-dev-icon.png';

export interface AppIconDef {
  id: string;
  name: string;
  iconText?: string;
  iconSrc?: string;
  backgroundColor?: string;
  textColor?: string;
  badgeCount?: number;
  onClick?: () => void;
}

export interface IPadProMockupProps {
  children: React.ReactNode;
  enableSimulation?: boolean;
  darkMode?: boolean;
  simulationBackgroundColor?: string;
  simulationBackgroundImageSrc?: string;
  dockApps?: AppIconDef[];
}

export const IPadProMockup = ({ 
  children, 
  enableSimulation = false, 
  darkMode = false,
  simulationBackgroundColor,
  simulationBackgroundImageSrc,
  dockApps
}: IPadProMockupProps) => {
  const [isPowered, setIsPowered] = useState(true);
  const [isLocked, setIsLocked] = useState(enableSimulation);
  const [inApp, setInApp] = useState(!enableSimulation);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (!enableSimulation) return;
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [enableSimulation]);

  const handlePowerClick = () => {
    if (!isPowered) {
      setIsPowered(true);
      setIsLocked(true);
      setInApp(false);
    } else {
      setIsPowered(false);
    }
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  const clockTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  const simulationBackgroundStyle = simulationBackgroundImageSrc 
    ? { backgroundImage: `url(${simulationBackgroundImageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: simulationBackgroundColor || 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' };

  const isDarkBackground = enableSimulation && !inApp;

  const appsToRender: AppIconDef[] = dockApps || [
    {
      id: 'vectorsigma',
      name: 'VectorSigma',
      iconText: 'VΣ',
      iconSrc: devLogoLight,
      backgroundColor: '#FFFFFF',
      textColor: '#800020',
      onClick: () => setInApp(true)
    }
  ];

  return (
    <Box
      className="ipad-pro-mockup"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#1E1E1E', 
        borderRadius: '24px',
        boxShadow: darkMode ? '0 32px 80px rgba(0,0,0,0.8), inset 0 0 0 2px #333' : '0 32px 80px rgba(0,0,0,0.2), inset 0 0 0 2px #E5E7EB',
        padding: '16px',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Front Facing Camera Dot */}
      <Box 
        className="ipad-camera"
        style={{
          position: 'absolute',
          top: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '6px',
          height: '6px',
          backgroundColor: '#000000',
          borderRadius: '50%',
          boxShadow: 'inset 0 0 2px rgba(255,255,255,0.1)'
        }}
      />

      <Box
        onClick={enableSimulation ? handlePowerClick : undefined}
        style={{
          position: 'absolute',
          top: '-4px',
          left: '48px',
          width: '48px',
          height: '4px',
          backgroundColor: '#4B5563',
          borderRadius: '4px 4px 0 0',
          cursor: enableSimulation ? 'pointer' : 'default',
        }}
      />
      <Box style={{ position: 'absolute', top: '48px', left: '-4px', width: '4px', height: '40px', backgroundColor: '#4B5563', borderRadius: '4px 0 0 4px' }} />
      <Box style={{ position: 'absolute', top: '100px', left: '-4px', width: '4px', height: '40px', backgroundColor: '#4B5563', borderRadius: '4px 0 0 4px' }} />

      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: isPowered ? '#FFFFFF' : '#000000',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'background-color 0.4s ease',
        }}
      >
        {isPowered && (
          <>
            <Flex 
              justify="between" 
              align="center" 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                height: '32px', 
                padding: '0 20px', 
                zIndex: 30,
                color: isDarkBackground ? 'white' : 'black',
                pointerEvents: 'none'
              }}
            >
              <Text style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'sans-serif', letterSpacing: '0.02em' }}>
                {clockTime}
              </Text>
              <Box 
                style={{ 
                  width: '68px', 
                  height: '14px', 
                  backgroundImage: 'url("https://assets.codepen.io/2722301/status.png")',
                  backgroundPosition: 'right center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  filter: isDarkBackground ? 'invert(0)' : 'invert(1)'
                }} 
              />
            </Flex>

            <Box
              style={{
                position: 'absolute',
                inset: 0,
                opacity: inApp ? 1 : 0,
                pointerEvents: inApp ? 'all' : 'none',
                transition: 'opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                overflowY: 'auto',
              }}
            >
              <div className="ipad-app-content" style={{ width: '100%', minHeight: '100%', paddingTop: '40px', paddingBottom: '32px', boxSizing: 'border-box' }}>
                {children}
              </div>
            </Box>

            {enableSimulation && !inApp && (
              <Box
                style={{
                  position: 'absolute',
                  inset: 0,
                  ...simulationBackgroundStyle,
                  opacity: isLocked ? 0 : 1,
                  pointerEvents: isLocked ? 'none' : 'all',
                  transition: 'opacity 0.4s ease',
                }}
              >
                <Flex justify="center" align="end" style={{ width: '100%', height: '100%', paddingBottom: '32px' }}>
                  <Flex gap="4" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', padding: '16px 24px', borderRadius: '24px' }}>
                    {appsToRender.map((app) => (
                      <Flex
                        key={app.id}
                        direction="column"
                        align="center"
                        gap="2"
                        title={app.name}
                        onClick={() => {
                          if (app.onClick) app.onClick();
                          else setInApp(true);
                        }}
                        style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        <Box style={{ position: 'relative' }}>
                          <Flex align="center" justify="center" style={{ width: '56px', height: '56px', background: app.backgroundColor || '#FFFFFF', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                            {app.iconSrc ? (
                              <img src={app.iconSrc} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <Text size="6" style={{ color: app.textColor || '#000000', fontWeight: 'bold' }}>{app.iconText}</Text>
                            )}
                          </Flex>
                          {!!app.badgeCount && app.badgeCount > 0 && (
                            <Flex align="center" justify="center" style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#FF3B30', color: '#FFFFFF', fontSize: '12px', fontWeight: 600, fontFamily: 'system-ui, sans-serif', minWidth: '24px', height: '24px', borderRadius: '12px', padding: '0 6px', boxSizing: 'border-box', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', zIndex: 10 }}>
                              {app.badgeCount > 99 ? '99+' : app.badgeCount}
                            </Flex>
                          )}
                        </Box>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              </Box>
            )}

            {enableSimulation && isLocked && (
              <Box
                onClick={() => setIsLocked(false)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  ...simulationBackgroundStyle,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '72px',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <Box style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: -1 }} />
                
                <LockClosedIcon width="24" height="24" color="white" style={{ marginBottom: '16px' }} />
                <Text className="ipad-lock-time" style={{ color: 'white', fontWeight: 200, lineHeight: 1, fontFamily: "'Libre Franklin', sans-serif" }}>{formattedTime}</Text>
                <Text style={{ color: 'white', fontSize: '18px', opacity: 0.9, marginTop: '8px' }}>{formattedDate}</Text>
                
                <Box
                  style={{
                    position: 'absolute',
                    bottom: '48px',
                    padding: '10px 24px',
                    borderRadius: '30px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <Text style={{ color: 'white', fontSize: '14px', fontWeight: 500, letterSpacing: '0.04em', opacity: 0.95 }}>
                    Click or swipe up to unlock
                  </Text>
                </Box>
              </Box>
            )}

            {enableSimulation && (inApp || !isLocked) && (
              <Box
                onClick={() => setInApp(false)}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '4px',
                  backgroundColor: !inApp ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = !inApp ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = !inApp ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)')}
                title="Go Home"
              />
            )}
          </>
        )}
      </Box>

      <style>
  {`
    .ipad-pro-mockup { aspect-ratio: 1.33 / 1; }
    .ipad-lock-time { font-size: 64px; }
    
    /* Sleek 5px Scrollbar (DemoSection match) */
    .ipad-app-content::-webkit-scrollbar,
    .ipad-app-content *::-webkit-scrollbar { 
      width: 5px !important;
      height: 5px !important;
    }
    
    .ipad-app-content::-webkit-scrollbar-track,
    .ipad-app-content *::-webkit-scrollbar-track { 
      background: transparent !important; 
      /* Margin offsets prevent overlapping the status bar (top) and home indicator (bottom) */
      margin-top: 36px !important; 
      margin-bottom: 12px !important; 
    }
    
    .ipad-app-content::-webkit-scrollbar-thumb,
    .ipad-app-content *::-webkit-scrollbar-thumb { 
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'} !important; 
      border-radius: 10px !important; 
    }
    
    .ipad-app-content::-webkit-scrollbar-thumb:hover,
    .ipad-app-content *::-webkit-scrollbar-thumb:hover { 
      background-color: ${darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'} !important; 
    }

    .ipad-app-content::-webkit-scrollbar-corner,
    .ipad-app-content *::-webkit-scrollbar-corner {
      background: transparent !important;
    }

    /* Mobile Vertical Breakpoint */
    @media (max-width: 768px) {
      .ipad-pro-mockup {
        aspect-ratio: 3 / 4 !important;
        border-radius: 20px !important;
      }
      .ipad-lock-time { font-size: 48px !important; }
    }
  `}
    </style>
    </Box>
  );
};