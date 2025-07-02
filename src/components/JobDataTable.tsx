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

  // Keep scrolls in sync
  const syncScroll = (source: 'top' | 'bottom') => {
    if (topScrollRef.current && bottomScrollRef.current) {
      const sourceEl = source === 'top' ? topScrollRef.current : bottomScrollRef.current;
      const targetEl = source === 'top' ? bottomScrollRef.current : topScrollRef.current;
      targetEl.scrollLeft = sourceEl.scrollLeft;
    }
  };

  useEffect(() => {
    if (topScrollRef.current && bottomScrollRef.current) {
      topScrollRef.current.scrollLeft = 0;
      bottomScrollRef.current.scrollLeft = 0;
    }
  }, [jobData]);

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

  const sortedJobData = [...jobData].sort((a, b) => a.jobGroup?.localeCompare(b.jobGroup || '') || 0);
  const groupedJobs: { [key: string]: JobData[] } = {};
  sortedJobData.forEach(job => {
    const group = job.jobGroup || 'Uncategorized';
    if (!groupedJobs[group]) groupedJobs[group] = [];
    groupedJobs[group].push(job);
  });

  const renderSkillBadges = (skills: string[], color: string, maxShow = 3) => {
    const visibleSkills = skills.slice(0, maxShow);
    const remainingCount = skills.length - maxShow;

    return (
      <div className="flex flex-wrap gap-1">
        {visibleSkills.map((skill, i) => (
          <Badge key={i} className={`text-xs ${color}`}>{skill}</Badge>
        ))}
        {remainingCount > 0 && (
          <Badge variant="outline" className="text-xs">+{remainingCount}</Badge>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>JobIntel Market Intelligence Data</CardTitle>
      </CardHeader>

      {/* Top scroll bar */}
      <div
        ref={topScrollRef}
        onScroll={() => syncScroll('top')}
        className="overflow-x-auto h-4 mb-1"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="w-[2000px] h-1 bg-transparent" />
      </div>

      <CardContent>
        <div
          ref={bottomScrollRef}
          onScroll={() => syncScroll('bottom')}
          className="overflow-x-auto"
        >
          <Table className="min-w-[2000px]">
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
            <TableBody>
              {Object.entries(groupedJobs).map(([group, jobs]) =>
                jobs.map((job, idx) => (
                  <TableRow key={`${group}-${idx}`} className="hover:bg-gray-50">
                    {idx === 0 && (
                      <TableCell rowSpan={jobs.length} className="bg-gray-50/50 border-r">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 font-medium">
                          {group}
                        </Badge>
                      </TableCell>
                    )}
                    {idx === 0 && (
                      <TableCell rowSpan={jobs.length} className="bg-blue-50/50 border-r">
                        {renderSkillBadges(job.standardSkills || [], 'bg-blue-100 text-blue-800', 4)}
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="font-medium text-blue-600">{job.jobTitle}</div>
                      <div className="text-xs text-gray-500">{job.datePosted}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{job.companyName}</div>
                      <div className="text-xs text-gray-500">{job.businessDomain}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {job.companyType}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.jobLocation}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{job.experienceYears}</Badge>
                      <div className="text-xs text-gray-500">{job.experienceLevel}</div>
                    </TableCell>
                    <TableCell>{renderSkillBadges(job.keySkills, 'bg-green-100 text-green-800')}</TableCell>
                    <TableCell>{renderSkillBadges(job.softSkills, 'bg-pink-100 text-pink-800')}</TableCell>
                    <TableCell>{renderSkillBadges(job.toolsTechnologies, 'bg-orange-100 text-orange-800')}</TableCell>
                    <TableCell>{renderSkillBadges(job.certifications, 'border-blue-200 text-blue-700', 2)}</TableCell>
                    <TableCell><Badge className="bg-blue-100 text-blue-800">{job.jobType}</Badge></TableCell>
                    <TableCell><Badge className="bg-purple-100 text-purple-800">{job.jobPortalSource}</Badge></TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-7"><ExternalLink className="w-3 h-3" /></Button>
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
