import { useRef, useEffect, useMemo } from 'react';

export interface ChromaticEmbedProps {
  src: string;
  title?: string;
  height?: string | number;
  hideSidebar?: boolean;
  darkMode?: boolean;
}

const ChromaticEmbed = ({ 
  src, 
  title = "VΣ Storybook Library", 
  height = "100vh",
  hideSidebar = false,
  darkMode = false
}: ChromaticEmbedProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const embedUrl = useMemo(() => {
    const url = new URL(src);
    if (hideSidebar) url.searchParams.set('nav', '0');
    
    url.searchParams.set('theme', darkMode ? 'dark' : 'light');
    url.searchParams.set('globals', `theme:${darkMode ? 'dark' : 'light'}`);
    
    return url.toString();
  }, [src, hideSidebar]); 

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const themeString = darkMode ? 'dark' : 'light';
      const updateGlobalsMsg = {
        key: 'storybook-channel',
        source: 'external-manager', 
        from: 'external-manager',
        event: {
          type: 'updateGlobals',
          args: [{ theme: themeString }],
          source: 'external-manager', 
          from: 'external-manager'
        }
      };
      
      const darkModeAddonMsg = {
        key: 'storybook-channel',
        source: 'external-manager',
        from: 'external-manager',
        event: {
          type: 'DARK_MODE',
          args: [darkMode],
          source: 'external-manager',
          from: 'external-manager'
        }
      };

      iframeRef.current.contentWindow.postMessage(JSON.stringify(updateGlobalsMsg), '*');
      iframeRef.current.contentWindow.postMessage(JSON.stringify(darkModeAddonMsg), '*');
    }
  }, [darkMode]);

  return (
    <div 
      style={{ 
        width: '100%', 
        height: height, 
        overflow: 'hidden',
        backgroundColor: darkMode ? '#0B0D11' : '#FAFAFA',
        transition: 'background-color 0.3s ease'
      }}
    >
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 'none', display: 'block', margin: 0, padding: 0 }}
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
};

export default ChromaticEmbed;