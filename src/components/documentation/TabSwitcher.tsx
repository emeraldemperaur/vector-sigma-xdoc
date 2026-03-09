import React, { useState, useMemo, useRef, type ReactElement } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
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
  children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
  /**
   * * Optional height for the content display area.
   * Default: '400px'
   */
  contentHeight?: string | number;
}

export const TabItem: React.FC<TabItemProps> = () => null;

const DataStreamParticles = ({ color }: { color: string }) => {
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
    if (!pointsRef.current) return;
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
  design = 'outline',
  darkMode = false,
  defaultValue,
  neonColor = '#00f3ff', 
  contentHeight = '400px',
  children
}: TabSwitcherProps) => {
  
  const tabs = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === TabItem
  ) as ReactElement<TabItemProps>[];

  const [activeTab, setActiveTab] = useState<string>(defaultValue || tabs[0]?.props.value);
  const [renderedTab, setRenderedTab] = useState<string>(activeTab);
  
  const [isTransitioning, setIsTransitioning] = useState(false); 
  const [renderCanvas, setRenderCanvas] = useState(false);       

  const currentTabData = tabs.find((tab) => tab.props.value === renderedTab)?.props;

  const handleTabChange = (newValue: string) => {
    if (newValue === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setRenderCanvas(true); 
    setActiveTab(newValue);

    setTimeout(() => {
      setRenderedTab(newValue);
    }, 400);

    setTimeout(() => {
      setIsTransitioning(false); 
      
      setTimeout(() => {
        setRenderCanvas(false); 
      }, 300);
      
    }, 800);
  };

  const theme = useMemo(() => {
    const isNeo = design === 'neumorphic';
    const isOut = design === 'outline';
    
    return {
      bg: darkMode ? (isNeo ? '#1a1a1a' : '#0a0a0a') : (isNeo ? '#e0e5ec' : '#ffffff'),
      text: darkMode ? '#ffffff' : '#111111',
      mutedText: darkMode ? '#ffffff' : '#888888',
      containerShadow: isNeo 
        ? (darkMode ? '8px 8px 16px #0d0d0d, -8px -8px 16px #272727' : '8px 8px 16px #b8b9be, -8px -8px 16px #ffffff')
        : (isOut ? `0 0 10px ${neonColor}33` : '0 4px 20px rgba(0,0,0,0.1)'),
      containerBorder: isOut ? `1px solid ${neonColor}66` : 'none',
      activeTabBg: isNeo 
        ? (darkMode ? 'inset 4px 4px 8px #0d0d0d, inset -4px -4px 8px #272727' : 'inset 4px 4px 8px #b8b9be, inset -4px -4px 8px #ffffff')
        : (isOut ? `${neonColor}22` : neonColor),
      activeTabColor: isOut || isNeo ? neonColor : (darkMode ? '#000' : '#fff'),
      activeTabBorder: isOut ? `1px solid ${neonColor}` : 'transparent',
    };
  }, [design, darkMode, neonColor]);

  return (
    <Box 
      style={{ 
        width: '100%', 
        backgroundColor: theme.bg,
        borderRadius: '12px',
        boxShadow: theme.containerShadow,
        border: theme.containerBorder,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Flex 
        justify="center" 
        style={{ 
          padding: '8px', 
          gap: '8px', 
          borderBottom: `1px solid ${darkMode ? '#333' : '#eee'}`,
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
                padding: '10px 24px',
                cursor: 'pointer',
                borderRadius: '8px',
                background: isActive ? theme.activeTabBg : 'transparent',
                color: isActive ? theme.activeTabColor : theme.mutedText,
                border: isActive ? theme.activeTabBorder : '1px solid transparent',
                transition: 'all 0.3s ease',
                fontWeight: isActive ? 'bold' : 'normal',
                textTransform: 'uppercase',
                fontFamily: 'Libre Franklin',
                letterSpacing: '1px',
                fontSize: '12px',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.props.label}
            </Box>
          );
        })}
      </Flex>

      <Box style={{ position: 'relative', width: '100%', minHeight: contentHeight, backgroundColor: '#000', flexGrow: 1 }}>
        <Box 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            transition: 'opacity 0.4s ease, filter 0.4s ease',
            opacity: isTransitioning ? 0 : 1,
            filter: isTransitioning ? `blur(8px)` : 'blur(0px)',
            zIndex: 1
          }}
        >
          {currentTabData?.imageSrc && (
            <img 
              src={currentTabData.imageSrc} 
              alt={currentTabData.label}
              style={{ 
                position: 'absolute', 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                opacity: 0.6 
              }} 
            />
          )}

          <Box style={{ position: 'relative', zIndex: 2, padding: '24px', width: '100%' }}>
            {currentTabData?.children || (
               <Text size="3" style={{ color: neonColor, textShadow: `0 0 10px ${neonColor}` }}>
               </Text>
            )}
          </Box>
        </Box>

        <Box
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none', 
            transition: 'opacity 0.3s ease',
            opacity: isTransitioning ? 1 : 0
          }}
        >
          {renderCanvas && (
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <DataStreamParticles color={neonColor} />
            </Canvas>
          )}
        </Box>

      </Box>
    </Box>
  );
};