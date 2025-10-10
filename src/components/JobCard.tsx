import { memo, useMemo, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Bookmark } from "lucide-react";
import { MockJob } from "@/data/mockJobs";

interface JobCardProps {
  job: MockJob;
  onSave: (id: string) => void;
}

// Global counters for instrumentation (dev only)
let globalRenderCount = 0;
const renderTimes: number[] = [];

// Reset function for instrumentation
export const resetJobCardInstrumentation = () => {
  globalRenderCount = 0;
  renderTimes.length = 0;
};

// Expensive computation to test memoization
const expensiveComputation = (jobId: string): string => {
  let result = 0;
  // Simulate CPU-bound work
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  return `${jobId}-computed-${result.toFixed(2)}`;
};

const JobCard = ({ job, onSave }: JobCardProps) => {
  const renderStartTime = useRef(performance.now());

  // Memoize expensive computation
  const computedValue = useMemo(() => {
    return expensiveComputation(job.id);
  }, [job.id]);

  // Track render count and time (dev only)
  useEffect(() => {
    if (import.meta.env.DEV) {
      const renderTime = performance.now() - renderStartTime.current;
      globalRenderCount++;
      renderTimes.push(renderTime);

      // Keep only last 100 render times
      if (renderTimes.length > 100) {
        renderTimes.shift();
      }

      // Update instrumentation elements
      const renderCountEl = document.getElementById("pm-card-renders");
      const avgTimeEl = document.getElementById("pm-card-avg");

      if (renderCountEl) {
        renderCountEl.textContent = globalRenderCount.toString();
      }

      if (avgTimeEl) {
        const avgTime =
          renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length;
        avgTimeEl.textContent = avgTime.toFixed(2);
      }
    }
  });

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Building2 className="h-4 w-4" />
              {job.company}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSave(job.id)}
            aria-label="Save job"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Job ID: {job.id}</p>
        {import.meta.env.DEV && (
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Computed: {computedValue.substring(0, 30)}...
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(JobCard);
