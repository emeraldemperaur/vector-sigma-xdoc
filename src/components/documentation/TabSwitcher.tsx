import React, { useState, useMemo, useRef, type ReactElement, useEffect } from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type TabDesign = 'outline' | 'material' | 'neumorphic';

export interface TabItemProps {
  value: string;
  label: string;
  imageSrc?: string;
  children?: React.ReactNode;
}

export interface TabSwitcherProps {
  design?: TabDesign;
  darkMode?: boolean;
  defaultValue?: string;
  neonColor?: string;
  contentHeight?: string | number;
  formInstance?: any; 
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
}

export const TabItem: React.FC<TabItemProps> = () => null;

const DataStreamParticles = ({ color, isActive }: { color: string; isActive: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500 * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;     
      positions[i + 1] = (Math.random() - 0.5) * 20; 
      positions[i + 2] = (Math.random() - 0.5) * 15; 
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || !isActive) return;
    
    const safeDelta = Math.min(delta, 0.1); 
    const attrs = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    for (let i = 2; i < attrs.array.length; i += 3) {
      attrs.array[i] += safeDelta * 15; 
      if (attrs.array[i] > 5) {
        attrs.array[i] = -10; 
      }
    }
    attrs.needsUpdate = true;
    pointsRef.current.rotation.z += safeDelta * 0.1; 
  });

  useEffect(() => {
    return () => {
      if (pointsRef.current) {
        pointsRef.current.geometry.dispose();
        (pointsRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
          usage={THREE.DynamicDrawUsage} 
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const TabSwitcher = ({
  darkMode = false,
  defaultValue,
  neonColor = '#023020', 
  contentHeight = '650px',
  formInstance,
  children
}: TabSwitcherProps) => {
  
  const tabs = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === TabItem
  ) as ReactElement<TabItemProps>[];

  const [activeTab, setActiveTab] = useState<string>(defaultValue || tabs[0]?.props.value);
  const [renderedTab, setRenderedTab] = useState<string>(activeTab);
  const [isTransitioning, setIsTransitioning] = useState(false); 

  const currentTabData = tabs.find((tab) => tab.props.value === renderedTab)?.props;

  const handleTabChange = (newValue: string) => {
    if (newValue === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveTab(newValue);

    setTimeout(() => {
      setRenderedTab(newValue);
    }, 400);

    setTimeout(() => {
      setIsTransitioning(false); 
    }, 800);
  };

  const theme = useMemo(() => {
    return {
      bg: darkMode ? '#000000' : '#FAFAFA',
      canvasBg: '#FFFFFF', 
      text: darkMode ? '#F3F4F6' : '#111827',
      mutedText: darkMode ? '#9CA3AF' : '#6B7280',
      containerShadow: darkMode ? '0 12px 40px rgba(0,0,0,0.8)' : '0 12px 32px rgba(0,0,0,0.06)',
      containerBorder: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
      activeTabBg: darkMode ? 'rgba(255,255,255,0.1)' : '#FFFFFF',
      activeTabColor: darkMode ? '#FFFFFF' : '#111827',
      activeTabShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
    };
  }, [darkMode]);

  return (
    <Box 
      style={{ 
        width: '100%', 
        backgroundColor: theme.bg,
        borderRadius: '16px',
        boxShadow: theme.containerShadow,
        border: theme.containerBorder,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <style>
        {`
          .tab-content-scroll {
            width: 100%; 
            height: 100%;
            position: relative;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 16px; 
          }
          /* WebKit Scrollbar Styling */
          .tab-content-scroll::-webkit-scrollbar { width: 6px; }
          .tab-content-scroll::-webkit-scrollbar-track { background: transparent; margin: 8px 0; }
          .tab-content-scroll::-webkit-scrollbar-thumb { background: rgba(150, 150, 150, 0.4); border-radius: 10px; }
        `}
      </style>

      <Flex 
        justify="center" 
        style={{ 
          padding: '12px', 
          gap: '8px', 
          background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          borderBottom: theme.containerBorder,
          overflowX: 'auto',
          zIndex: 20
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.props.value;
          return (
            <Box
              key={tab.props.value}
              onClick={() => handleTabChange(tab.props.value)}
              style={{
                padding: '8px 20px',
                cursor: 'pointer',
                borderRadius: '8px',
                background: isActive ? theme.activeTabBg : 'transparent',
                color: isActive ? theme.activeTabColor : theme.mutedText,
                boxShadow: isActive ? theme.activeTabShadow : 'none',
                border: isActive && darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                transition: 'all 0.25s ease',
                fontWeight: isActive ? 600 : 400,
                fontFamily: "'Libre Franklin', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.props.label}
            </Box>
          );
        })}
      </Flex>

      <Box style={{ position: 'relative', width: '100%', minHeight: contentHeight, backgroundColor: theme.canvasBg, flexGrow: 1 }}>
        <Box 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            padding: '24px 8px 24px 24px',
            transition: 'opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease',
            opacity: isTransitioning ? 0 : 1,
            filter: isTransitioning ? `blur(8px)` : 'blur(0px)',
            transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
            zIndex: 2
          }}
        >
          <div className="tab-content-scroll">
            {formInstance ? (
              <Box style={{ width: '100%', minHeight: '100%' }}>
                {formInstance.render({ displayMode: currentTabData?.value, readOnlyMode: false })}
              </Box>
            ) : currentTabData?.imageSrc ? (
              <img 
                src={currentTabData.imageSrc} 
                alt={currentTabData.label}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            ) : (
              <Box style={{ width: '100%', minHeight: '100%' }}>{currentTabData?.children}</Box>
            )}
          </div>
        </Box>

        <Box
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none', 
            transition: 'opacity 0.3s ease',
            opacity: isTransitioning ? 1 : 0
          }}
        >
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }} 
            frameloop={isTransitioning ? "always" : "demand"}
          >
            <DataStreamParticles color={neonColor} isActive={isTransitioning} />
          </Canvas>
        </Box>
      </Box>
    </Box>
  );
};