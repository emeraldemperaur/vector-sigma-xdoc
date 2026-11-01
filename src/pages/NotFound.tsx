import { useEffect, useMemo } from 'react';
import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';
import { ArrowLeftIcon, FileTextIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import BreathingPulseText from '../components/BreathingPulseText';

const NotFound = ({ darkMode }: { darkMode: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000000' : '#FAFAFA';
    document.body.style.transition = 'background-color 0.3s ease';
  }, [darkMode]);

  const themeVars = useMemo(() => {
    return darkMode
      ? {
          titleColor: '#F3F4F6',
          subtitleColor: '#9CA3AF',
          pulseColor: [255, 255, 255] as [number, number, number],
          toggleBg: 'rgba(255, 255, 255, 0.05)',
          containerBorder: '1px solid rgba(255, 255, 255, 0.08)',
          primaryBtnBg: '#FFFFFF',
          primaryBtnShadow: 'none',
          primaryBtnBorder: '1px solid rgba(255, 255, 255, 0.1)',
          primaryBtnText: '#000000',
          secondaryBtnText: '#9CA3AF',
          secondaryBtnHover: 'rgba(255, 255, 255, 0.1)',
        }
      : {
          titleColor: '#111827',
          subtitleColor: '#6B7280',
          pulseColor: [0, 0, 0] as [number, number, number], 
          toggleBg: 'rgba(0, 0, 0, 0.04)',
          containerBorder: '1px solid rgba(0, 0, 0, 0.08)',
          primaryBtnBg: '#FFFFFF',
          primaryBtnShadow: '0 2px 8px rgba(0,0,0,0.08)',
          primaryBtnBorder: '1px solid transparent',
          primaryBtnText: '#000000',
          secondaryBtnText: '#6B7280',
          secondaryBtnHover: 'rgba(0, 0, 0, 0.05)',
        };
  }, [darkMode]);

  return (
    <Box style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container size="3" px={{ initial: '4', md: '6' }}>
        <Flex direction="column" align="center" style={{ textAlign: 'center' }}>
          
          <Box 
            style={{ 
              width: '100%', 
              maxWidth: '600px', 
              height: '240px', 
              marginBottom: '24px',
              animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
            }}
          >
            <BreathingPulseText
              
                text="404" 
                rgbColor={themeVars.pulseColor} 
                density={4} 
                particleRadius={1.5}
                enableMouseInteract={true}
                repelRadius={100}
                repulsionForce={50}
                />
          </Box>

          <Box style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards', opacity: 0 }}>
            <Heading
              size="8"
              style={{
                fontFamily: "'Libre Baskerville', serif",
                letterSpacing: '-0.02em',
                color: themeVars.titleColor,
                marginBottom: '16px',
              }}
            >
              Resource Not Found
            </Heading>
            
            <Text
              as="p"
              size="4"
              style={{
                color: themeVars.subtitleColor,
                maxWidth: '560px',
                margin: '0 auto 40px auto',
                lineHeight: 1.6,
                fontFamily: "'Libre Franklin', sans-serif",
              }}
            >
              The page you are looking for has been moved or does not exist.
            </Text>
          </Box>

          <Flex 
            align="center"
            style={{ 
              background: themeVars.toggleBg, 
              padding: '6px', 
              borderRadius: '12px',
              border: themeVars.containerBorder,
              animation: 'fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards', 
              opacity: 0 
            }}
          >
            <Box
              onClick={() => navigate('/')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 24px', cursor: 'pointer', borderRadius: '8px',
                background: themeVars.primaryBtnBg,
                color: themeVars.primaryBtnText,
                boxShadow: themeVars.primaryBtnShadow,
                border: themeVars.primaryBtnBorder,
                transition: 'all 0.25s ease',
                fontWeight: 600,
                fontFamily: "'Libre Franklin', sans-serif",
                fontSize: '14px',
              }}
            >
              <ArrowLeftIcon width="16" height="16" />
              Return to Home
            </Box>
            
            <Box
              onClick={() => navigate('/documentation')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 24px', cursor: 'pointer', borderRadius: '8px',
                background: 'transparent',
                color: themeVars.secondaryBtnText,
                transition: 'all 0.25s ease',
                fontWeight: 500,
                fontFamily: "'Libre Franklin', sans-serif",
                fontSize: '14px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = themeVars.secondaryBtnHover;
                e.currentTarget.style.color = themeVars.titleColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = themeVars.secondaryBtnText;
              }}
            >
              <FileTextIcon width="16" height="16" />
              View Documentation
            </Box>
          </Flex>

        </Flex>
      </Container>

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default NotFound;