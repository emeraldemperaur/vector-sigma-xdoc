import { Suspense, lazy } from "react";
import CursorTrail from "./CursorTrail";
import "../styles/ProductRibbon.scss";

const HeroGlobe = lazy(() => import("./HeroGlobe"));

interface RibbonProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  backgroundColorOverride?: string;
  textColorOverride?: string;
  darkMode?: boolean;
}

const ProductRibbon = ({
  title,
  subtitle,
  icon,
  description,
  backgroundColorOverride,
  textColorOverride,
}: RibbonProps) => {
  const customSectionStyle = backgroundColorOverride
    ? { backgroundColor: backgroundColorOverride }
    : undefined;

  const customTextStyle = textColorOverride
    ? { color: textColorOverride }
    : undefined;

  return (
    <section className="product-ribbon-section" style={customSectionStyle}>
      <Suspense fallback={<div style={{ position: "absolute", inset: 0, opacity: 0 }} />}>
        <HeroGlobe darkMode={true} />
      </Suspense>

      <CursorTrail darkMode={true} />

      <div className="product-ribbon-container">
        <div className="product-ribbon-content">
          <h1 className="product-ribbon-title" style={customTextStyle}>
            {title}
          </h1>

          {subtitle && (
            <p className="product-ribbon-subtitle">
              {subtitle}
            </p>
          )}

          {icon && (
            <div className="product-ribbon-icon">
              <a
                href="https://www.npmjs.com/package/@emeraldemperaur/vector-sigma"
                target="_blank"
                rel="noreferrer"
                style={customTextStyle}
              >
                {icon}
              </a>
            </div>
          )}

          <p className="product-ribbon-description">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductRibbon;