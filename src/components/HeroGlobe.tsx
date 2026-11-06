import { useEffect, useRef } from "react";

interface HeroGlobeProps {
  darkMode?: boolean;
}

const HeroGlobe = ({ darkMode = true }: HeroGlobeProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let view: any = null;
    let schedulerHandler: any = null;
    let memoryWatchdog: number | null = null;
    let inactivityTimer: number | null = null;
    let isMounted = true;
    let isInitializing = false;
    let isIntersecting = false;
    let isPausedByWatchdog = false;

    const nav = typeof navigator !== "undefined" ? (navigator as any) : {};
    const deviceMemory = nav.deviceMemory || 8; 
    const cpuCores = nav.hardwareConcurrency || 4;
    const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
    const isLowPower = deviceMemory <= 4 || cpuCores <= 4 || isMobile;
    const targetFpsInterval = isLowPower ? 66 : 33;
    const stepSize = isLowPower ? 80000 : 40000;
    const memoryCeilingBytes = (isLowPower ? 200 : 450) * 1024 * 1024;

    const destroyGlobe = () => {
      if (memoryWatchdog !== null) {
        window.clearInterval(memoryWatchdog);
        memoryWatchdog = null;
      }
      if (inactivityTimer !== null) {
        window.clearTimeout(inactivityTimer);
        inactivityTimer = null;
      }
      if (schedulerHandler) {
        schedulerHandler.remove();
        schedulerHandler = null;
      }
      if (view) {
        view.container = null;
        view.destroy();
        view = null;
      }
      isInitializing = false;
    };

    const resetInactivityTimer = () => {
      if (isPausedByWatchdog) return;
      if (inactivityTimer !== null) {
        window.clearTimeout(inactivityTimer);
      }

      inactivityTimer = window.setTimeout(() => {
        isPausedByWatchdog = true;
      }, 45000);

      isPausedByWatchdog = false;
    };

    const loadArcGIS = async () => {
      if (!isIntersecting || document.visibilityState === "hidden") return;

      if (!document.getElementById("arcgis-css")) {
        const link = document.createElement("link");
        link.id = "arcgis-css";
        link.rel = "stylesheet";
        link.href = "https://js.arcgis.com/4.30/esri/themes/dark/main.css";
        document.head.appendChild(link);
      }

      const existingScript = document.getElementById("arcgis-js") as HTMLScriptElement;

      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "arcgis-js";
        script.src = "https://js.arcgis.com/4.30/";
        script.onload = () => {
          if (isMounted) initGlobe();
        };
        document.body.appendChild(script);
      } else {
        if ((window as any).require) {
          if (isMounted) initGlobe();
        } else {
          existingScript.addEventListener("load", () => {
            if (isMounted) initGlobe();
          });
        }
      }
    };

    const initGlobe = () => {
      if (
        !(window as any).require ||
        view ||
        isInitializing ||
        !isIntersecting ||
        document.visibilityState === "hidden"
      ) {
        return;
      }

      isInitializing = true;

      (window as any).require(
        [
          "esri/Map",
          "esri/views/SceneView",
          "esri/layers/SceneLayer",
          "esri/layers/FeatureLayer",
          "esri/core/scheduling",
        ],
        (Map: any, SceneView: any, SceneLayer: any, FeatureLayer: any, scheduling: any) => {
          if (!isMounted || !mapRef.current || view || !isIntersecting) {
            isInitializing = false;
            return;
          }

          const sceneLayer = new SceneLayer({
            url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Airports_PointSceneLayer/SceneServer/layers/0",
            definitionExpression: "type_airport IN (0)",
            renderer: {
              type: "simple",
              symbol: { type: "point-3d", symbolLayers: [{ type: "icon", size: 1.8 }] },
              visualVariables: [
                {
                  type: "color",
                  field: "type_airport",
                  stops: [{ value: 1, color: [0, 100, 0, 0.9] }],
                },
              ],
            },
          });

          const countries = new FeatureLayer({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_(Generalized)/FeatureServer",
            elevationInfo: { mode: "on-the-ground" },
            renderer: {
              type: "simple",
              symbol: {
                type: "polygon-3d",
                symbolLayers: [
                  {
                    type: "fill",
                    material: { color: [0, 0, 0, 0] },
                    outline: { color: [0, 100, 0, 0.9], size: 1.0 },
                  },
                ],
              },
            },
          });

          const map = new Map({ layers: [countries, sceneLayer], ground: { opacity: 0 } });

          view = new SceneView({
            container: mapRef.current,
            map: map,
            qualityProfile: "low",
            ui: { components: [] },
            camera: {
              position: { x: 0, y: 20, z: 28000000 },
              heading: 0,
              tilt: 0,
            },
            environment: {
              starsEnabled: false,
              atmosphereEnabled: false,
              background: { type: "color", color: [0, 0, 0, 0] },
            },
          });

          view.on("mouse-wheel", (e: any) => e.stopPropagation());
          view.on("drag", (e: any) => e.stopPropagation());

          view.when(() => {
            if (!isMounted) return;

            let lastUpdate = performance.now();
            resetInactivityTimer();

            schedulerHandler = scheduling.addFrameTask({
              update: () => {
                if (isPausedByWatchdog) return;

                const now = performance.now();
                if (now - lastUpdate > targetFpsInterval) {
                  if (view && view.center) {
                    let center = view.center.clone();
                    center.x += stepSize;
                    view.center = center;
                  }
                  lastUpdate = now;
                }
              },
            });

            memoryWatchdog = window.setInterval(() => {
              if (!view || !view.performanceInfo) return;

              const { usedMemory, totalMemory } = view.performanceInfo;
              const memoryPressure = totalMemory > 0 ? usedMemory / totalMemory : 0;

              if (usedMemory > memoryCeilingBytes || memoryPressure > 0.75) {
                isPausedByWatchdog = true;
              }
            }, 4000);
          });
        }
      );
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        destroyGlobe();
      } else if (document.visibilityState === "visible") {
        loadArcGIS();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("mousemove", resetInactivityTimer, { passive: true });
    window.addEventListener("touchstart", resetInactivityTimer, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry.isIntersecting;

        if (isIntersecting) {
          loadArcGIS();
        } else {
          destroyGlobe();
        }
      },
      {
        threshold: 0,
        rootMargin: "400px 0px 400px 0px",
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      isMounted = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("touchstart", resetInactivityTimer);
      observer.disconnect();
      destroyGlobe();
    };
  }, [darkMode]);

  return (
    <>
      <style>
        {`
          @keyframes globeFadeIn {
            from { opacity: 0; filter: blur(10px); }
            to { opacity: 0.85; filter: blur(0px); }
          }
          .globe-animated-reveal {
            animation: globeFadeIn 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
        `}
      </style>

      <div
        ref={mapRef}
        className="globe-animated-reveal"
        style={{
          position: "absolute",
          top: "-5%",
          left: 0,
          width: "100%",
          height: "110%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default HeroGlobe;