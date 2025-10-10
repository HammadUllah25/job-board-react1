import { useState, useCallback, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Moon, Sun, Search, X } from 'lucide-react';
import JobCard, { resetJobCardInstrumentation } from './JobCard';
import { MockJob } from '@/data/mockJobs';

interface JobListProps {
  jobs: MockJob[];
}

const JobList = ({ jobs }: JobListProps) => {
  // Unrelated state that should NOT cause JobCard re-renders when memoized
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchTerm, setSearchTerm] = useState('');

  // Stable callback using useCallback
  const handleSave = useCallback((jobId: string) => {
    console.log('Saved job:', jobId);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Efficiently filter jobs using useMemo
  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return jobs;
    
    const lowerSearch = searchTerm.toLowerCase();
    return jobs.filter(job => 
      job.title.toLowerCase().includes(lowerSearch) ||
      job.company.toLowerCase().includes(lowerSearch)
    );
  }, [jobs, searchTerm]);

  const clearSearch = () => setSearchTerm('');

  // Reset instrumentation on mount
  useEffect(() => {
    resetJobCardInstrumentation();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with theme toggle */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Job List - Memoization Test</h1>
            <p className="text-muted-foreground mt-1">
              Testing React.memo, useMemo, and useCallback performance
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={toggleTheme}
            className="gap-2"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            Toggle Theme (Current: {theme})
          </Button>
        </div>

        {/* Filter Section */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Filter by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Instrumentation Panel (dev only) */}
      {import.meta.env.DEV && (
        <Card className="p-4 mb-6 bg-accent/50">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            JobCard Render Instrumentation
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Card Renders:</span>
              <span id="pm-card-renders" className="font-mono font-semibold">
                0
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Render Time:</span>
              <span className="font-mono font-semibold">
                <span id="pm-card-avg">0.00</span>ms
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            💡 Click "Toggle Theme" - memoized JobCards should NOT re-render
          </p>
        </Card>
      )}

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map(job => (
          <JobCard key={job.id} job={job} onSave={handleSave} />
        ))}
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-center text-muted-foreground mt-6">
          No jobs found matching "{searchTerm}"
        </p>
      ) : (
        <p className="text-center text-muted-foreground mt-6">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
      )}
    </div>
  );
};

export default JobList;
