import React, { useMemo } from 'react';
import { Box } from '@radix-ui/themes';

export type CardDesign = 'outline' | 'material' | 'neumorphic';

export interface CardProps {
  /**
   * * The content to be displayed inside the card.
   */
  children: React.ReactNode;
  /**
   * * The design variation of the Card.
   * Default: 'material'
   */
  design?: CardDesign;
  /**
   * * Forces Dark Mode styling on the component.
   * Default: false
   */
  darkMode?: boolean;
  /**
   * * Optional custom font family for the card content.
   * * @example
   * fontFamily="'Libre Franklin', sans-serif"
   */
  fontFamily?: string;
  /**
   * * Top margin spacing.
   */
  marginTop?: string | number;
  /**
   * * Bottom margin spacing.
   */
  marginBottom?: string | number;
  /**
   * * Left margin spacing.
   */
  marginLeft?: string | number;
  /**
   * * Right margin spacing.
   */
  marginRight?: string | number;
  /**
   * * Optional CSS class name
   */
  className?: string;
  /**
   * * Optional inline styles applied to the outer container
   */
  style?: React.CSSProperties;
}

export const Card = ({
  children,
  design = 'material',
  darkMode = false,
  fontFamily,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  className,
  style
}: CardProps) => {

  const themeVars = useMemo(() => {
    const isNeo = design === 'neumorphic';
    const isOut = design === 'outline';
    
    return {
      bg: darkMode 
        ? (isNeo ? '#1b1c1d' : (isOut ? 'transparent' : '#212529')) 
        : (isNeo ? '#f4f5f7' : (isOut ? 'transparent' : '#ffffff')),
      text: darkMode ? '#f8f9fa' : '#212529',
      
      shadow: isNeo 
        ? (darkMode ? '8px 8px 16px #131313, -8px -8px 16px #292929' : '8px 8px 16px #b8b9be, -8px -8px 16px #ffffff')
        : (isOut ? 'none' : (darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)')),
      border: isOut 
        ? (darkMode ? '1px solid #495057' : '1px solid #dee2e6') 
        : (isNeo ? 'none' : (darkMode ? '1px solid #343a40' : '1px solid #e9ecef')),
    };
  }, [design, darkMode]);

  return (
    <Box 
      className={className} 
      style={{ 
        backgroundColor: themeVars.bg,
        color: themeVars.text,
        boxShadow: themeVars.shadow,
        border: themeVars.border,
        borderRadius: design === 'neumorphic' ? '24px' : '12px',
        padding: '32px',
        fontFamily: fontFamily || 'inherit',
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
        ...style 
      }}
    >
      {children}
    </Box>
  );
};