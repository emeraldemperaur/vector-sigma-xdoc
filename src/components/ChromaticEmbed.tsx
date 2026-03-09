import React from 'react';

export interface ChromaticEmbedProps {
  /**
   * The Chromatic Storybook URL.
   * Example: "https://<app-id>.chromatic.com/"
   */
  src: string;
  /**
   * Title for iframe accessibility.
   */
  title?: string;
  /**
   * Height of the iframe. Defaults to '100vh' to fill the viewport vertically 
   * so Storybook can handle its own internal scrolling.
   */
  height?: string | number;
  /**
   * Hide the left navigation sidebar. Perfect for embedding a single component.
   */
  hideSidebar?: boolean;
}

const ChromaticEmbed = ({ 
  src, 
  title = "VΣ Storybook Library", 
  height = "100vh",
  hideSidebar = false
}: ChromaticEmbedProps) => {
  
  const embedUrl = React.useMemo(() => {
    if (!hideSidebar) return src;
    const url = new URL(src);
    url.searchParams.set('nav', '0');
    return url.toString();
  }, [src, hideSidebar]);

  return (
    <div 
      style={{ 
        width: '100%', 
        height: height, 
        overflowX: 'hidden', 
        overflowY: 'hidden',
        backgroundColor: 'var(--gray-2, #f8f9fa)'
      }}
    >
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height="100%"
        style={{
          border: 'none',
          display: 'block',
          margin: 0,
          padding: 0,
        }}
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
};

export default ChromaticEmbed;