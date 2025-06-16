import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink, MapPin, Calendar, Building, Award, Star, Briefcase, GraduationCap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import JobDataTable from './JobDataTable';

interface JobResultsProps {
  jobs: any[];
  searchParams: any;
  onExport: () => void;
}

const PAGE_SIZE = 10;

const JobResults: React.FC<JobResultsProps> = ({ jobs, searchParams, onExport }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return jobs.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, jobs]);

  const totalPages = Math.ceil(jobs.length / PAGE_SIZE);

  const handleExportCSV = () => {
    const headers = [
      "Job Title", "Company", "Location", "Domain", "Date Posted", "Job Type", "Working Function",
      "Experience Years", "Experience Level", "Key Skills", "Soft Skills", "Tools & Technology",
      "Certifications", "Education", "Responsibilities", "Source Site", "Source URL"
    ];

    const rows = jobs.map(job => headers.map(header => {
      const value = job[header.replace(/\s+/g, '')] ?? '';
      return `"${Array.isArray(value) ? value.join(", ") : value}"`;
    }));

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `jobs_${searchParams.country}_${searchParams.domain}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Job Scraping Results</h2>
          <p className="text-gray-600">
            Found {jobs.length} jobs in {searchParams.country} - {searchParams.domain}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" /> Download CSV
          </Button>
          <Button onClick={onExport} variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export JSON
          </Button>
        </div>
      </div>

      <JobDataTable jobs={paginatedJobs} />

      <div className="flex justify-center gap-2 pt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? 'default' : 'outline'}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default JobResults;
