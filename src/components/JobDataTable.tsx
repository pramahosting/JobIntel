import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { JobData } from '@/utils/jobDataGenerator';

interface JobDataTableProps {
  jobData: JobData[];
}

const JobDataTable: React.FC<JobDataTableProps> = ({ jobData }) => {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  // Adjust this width to match your table's total width (sum of min-width of all columns)
  const tableWidth = 2300; 

  // Synchronize scrolling between top and bottom scrollbars
  const handleTopScroll = () => {
    if (bottomScrollRef.current && topScrollRef.current) {
      bottomScrollRef.current.scrollLeft = topScrollRef.current.scrollLeft;
    }
  };

  const handleBottomScroll = () => {
    if (topScrollRef.current && bottomScrollRef.current) {
      topScrollRef.current.scrollLeft = bottomScrollRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    if (topScrollRef.current && bottomScrollRef.current) {
      topScrollRef.current.scrollLeft = bottomScrollRef.current.scrollLeft;
    }
  }, []);

  if (jobData.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="text-gray-500">
            <div className="text-lg font-medium mb-2">No Job Data Available</div>
            <div className="text-sm">Configure the agent and click "Run Agent" to extract job market data</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort jobs by job group to ensure jobs from same group appear together
  const sortedJobData = [...jobData].sort((a, b) => {
    if (a.jobGroup && b.jobGroup) {
      return a.jobGroup.localeCompare(b.jobGroup);
    }
    return 0;
  });

  // Group jobs by jobGroup for cell merging
  const groupedJobs: { [key: string]: JobData[] } = {};
  sortedJobData.forEach(job => {
    const group = job.jobGroup || 'Uncategorized';
    if (!groupedJobs[group]) {
      groupedJobs[group] = [];
    }
    groupedJobs[group].push(job);
  });

  const renderSkillBadges = (skills: string[], color: string, maxShow: number = 3) => {
    const visibleSkills = skills.slice(0, maxShow);
    const remainingCount = skills.length - maxShow;

    return (
      <div className="flex flex-wrap gap-1">
        {visibleSkills.map((skill, index) => (
          <Badge key={index} className={`text-xs ${color}`}>
            {skill}
          </Badge>
        ))}
        {remainingCount > 0 && (
          <Badge variant="outline" className="text-xs">
            +{remainingCount}
          </Badge>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>JobIntel Market Intelligence Data</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Your statistics or analytics above table here, if any */}
        {/* Example: <AnalyticsMetrics jobData={jobData} /> */}

        {/* Top horizontal scrollbar */}
        <div
          ref={topScrollRef}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 h-4 mb-1"
          style={{ overflowY: 'hidden' }}
          onScroll={handleTopScroll}
        >
          {/* Dummy div with exact width of the table */}
          <div style={{ width: tableWidth, height: 1 }} />
        </div>

        {/* Table Header fixed */}
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Job Group</TableHead>
                <TableHead className="min-w-[180px]">Standard Skills</TableHead>
                <TableHead className="min-w-[200px]">Job Title</TableHead>
                <TableHead className="min-w-[150px]">Company</TableHead>
                <TableHead className="min-w-[100px]">Company Type</TableHead>
                <TableHead className="min-w-[120px]">Location</TableHead>
                <TableHead className="min-w-[100px]">Experience</TableHead>
                <TableHead className="min-w-[200px]">Key Skills</TableHead>
                <TableHead className="min-w-[150px]">Soft Skills</TableHead>
                <TableHead className="min-w-[200px]">Tools & Tech</TableHead>
                <TableHead className="min-w-[150px]">Certifications</TableHead>
                <TableHead className="min-w-[100px]">Job Type</TableHead>
                <TableHead className="min-w-[100px]">Source</TableHead>
                <TableHead className="min-w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        {/* Scrollable Table Body */}
        <div
          ref={bottomScrollRef}
          className="overflow-x-auto max-h-[60vh]"
          onScroll={handleBottomScroll}
          style={{ overflowY: 'auto' }}
        >
          <Table>
            <TableBody>
              {Object.entries(groupedJobs).map(([groupName, jobs]) =>
                jobs.map((job, jobIndex) => (
                  <TableRow key={`${groupName}-${jobIndex}`} className="hover:bg-gray-50">
                    {jobIndex === 0 && (
                      <TableCell rowSpan={jobs.length} className="border-r border-gray-200 bg-gray-50/50">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 font-medium">
                          {groupName}
                        </Badge>
                      </TableCell>
                    )}
                    {jobIndex === 0 && (
                      <TableCell rowSpan={jobs.length} className="border-r border-gray-200 bg-blue-50/50">
                        {renderSkillBadges(job.standardSkills || [], 'bg-blue-100 text-blue-800', 4)}
                      </TableCell>
                    )}
                    <TableCell>
                      <div>
                        <div className="font-medium text-blue-600">{job.jobTitle}</div>
                        <div className="text-xs text-gray-500">{job.datePosted}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{job.companyName}</div>
                        <div className="text-xs text-gray-500">{job.businessDomain}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {job.companyType}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.jobLocation}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">
                          {job.experienceYears}
                        </Badge>
                        <div className="text-xs text-gray-500">{job.experienceLevel}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {renderSkillBadges(job.keySkills, 'bg-green-100 text-green-800')}
                    </TableCell>
                    <TableCell>
                      {renderSkillBadges(job.softSkills, 'bg-pink-100 text-pink-800')}
                    </TableCell>
                    <TableCell>
                      {renderSkillBadges(job.toolsTechnologies, 'bg-orange-100 text-orange-800')}
                    </TableCell>
                    <TableCell>
                      {renderSkillBadges(job.certifications, 'border-blue-200 text-blue-700', 2)}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">{job.jobType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 text-purple-800">{job.jobPortalSource}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-7">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDataTable;

