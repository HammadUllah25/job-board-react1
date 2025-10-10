import { useEffect, useState, useRef } from "react";

interface PerformanceMetrics {
  renderCount: number;
  avgRenderTime: number;
  currentFPS: number;
}

const PerformanceMonitor = () => {
  // Only show in development
  if (import.meta.env.PROD) return null;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    avgRenderTime: 0,
    currentFPS: 0,
  });

  const renderCountRef = useRef(0);
  const renderTimesRef = useRef<number[]>([]);
  const lastRenderTimeRef = useRef(performance.now());
  const frameCountRef = useRef(0);
  const lastFpsUpdateRef = useRef(performance.now());

  // Track render count and render time
  useEffect(() => {
    const now = performance.now();
    const renderTime = now - lastRenderTimeRef.current;

    renderCountRef.current += 1;
    renderTimesRef.current.push(renderTime);

    // Keep only last 10 render times for average
    if (renderTimesRef.current.length > 10) {
      renderTimesRef.current.shift();
    }

    const avgTime =
      renderTimesRef.current.reduce((a, b) => a + b, 0) /
      renderTimesRef.current.length;

    lastRenderTimeRef.current = now;

    setMetrics((prev) => ({
      ...prev,
      renderCount: renderCountRef.current,
      avgRenderTime: avgTime,
    }));
  }, []); // Empty dependency array to run only once per mount

  // Track FPS
  useEffect(() => {
    let animationFrameId: number;

    const measureFPS = () => {
      frameCountRef.current += 1;
      const now = performance.now();
      const elapsed = now - lastFpsUpdateRef.current;

      // Update FPS every second
      if (elapsed >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / elapsed);
        setMetrics((prev) => ({
          ...prev,
          currentFPS: fps,
        }));
        frameCountRef.current = 0;
        lastFpsUpdateRef.current = now;
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
      <div className="bg-background/80 backdrop-blur-lg border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Performance Monitor
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Render Count:</span>
            <span className="font-mono font-semibold text-foreground">
              {metrics.renderCount}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Avg Render Time:</span>
            <span className="font-mono font-semibold text-foreground">
              {metrics.avgRenderTime.toFixed(2)}ms
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current FPS:</span>
            <span
              className={`font-mono font-semibold ${
                metrics.currentFPS >= 50
                  ? "text-green-500"
                  : metrics.currentFPS >= 30
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {metrics.currentFPS}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
