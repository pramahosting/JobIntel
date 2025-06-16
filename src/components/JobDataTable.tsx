import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { JobData } from '@/utils/jobDataGenerator';

interface JobDataTableProps {
  jobData: JobData[];
}

const PAGE_SIZE = 50;

const JobDataTable: React.FC<JobDataTableProps> = ({ jobData }) => {
  const [currentPage, setCurrentPage] = useState(1);

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

  // Memoize grouping and sorting of jobs by jobGroup
  const groupedJobs = useMemo(() => {
    const sortedJobData = [...jobData].sort((a, b) => {
      if (a.jobGroup && b.jobGroup) {
        return a.jobGroup.localeCompare(b.jobGroup);
      }
      return 0;
    });

    const groups: { [key: string]: JobData[] } = {};
    sortedJobData.forEach(job => {
      const group = job.jobGroup || 'Uncategorized';
      if (!groups[group]) groups[group] = [];
      groups[group].push(job);
    });
    return groups;
  }, [jobData]);

  // Flatten grouped jobs back into array for pagination
  const flatJobs: { groupName: string; job: JobData }[] = [];
  Object.entries(groupedJobs).forEach(([groupName, jobs]) => {
    jobs.forEach(job => flatJobs.push({ groupName, job }));
  });

  const totalPages = Math.ceil(flatJobs.length / PAGE_SIZE);

  // Slice jobs for current page
  const currentPageJobs = flatJobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // For rendering rowSpan, calculate how many jobs from same group in current page
  // Create a map groupName -> count of jobs on current page
  const groupCountMap = currentPageJobs.reduce((acc, { groupName }) => {
    acc[groupName] = (acc[groupName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Track which groups already rendered for rowSpan
  const renderedGroups = new Set<string>();

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
        <div className="overflow-x-auto">
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
            <TableBody>
              {currentPageJobs.map(({ groupName, job }, index) => {
                const isFirstRowInGroup = !renderedGroups.has(groupName);
                if (isFirstRowInGroup) renderedGroups.add(groupName);
                const rowSpanCount = groupCountMap[groupName];

                return (
                  <TableRow key={`${groupName}-${index}`} className="hover:bg-gray-50">
                    {isFirstRowInGroup && (
                      <TableCell rowSpan={rowSpanCount} className="border-r border-gray-200 bg-gray-50/50">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 font-medium">
                          {groupName}
                        </Badge>
                      </TableCell>
                    )}
                    {isFirstRowInGroup && (
                      <TableCell rowSpan={rowSpanCount} className="border-r border-gray-200 bg-blue-50/50">
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
                    <TableCell>{renderSkillBadges(job.keySkills, 'bg-green-100 text-green-800')}</TableCell>
                    <TableCell>{renderSkillBadges(job.softSkills, 'bg-pink-100 text-pink-800')}</TableCell>
                    <TableCell>{renderSkillBadges(job.toolsTechnologies, 'bg-orange-100 text-orange-800')}</TableCell>
                    <TableCell>{renderSkillBadges(job.certifications, 'border-blue-200 text-blue-700', 2)}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">{job.jobType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-purple-100 text-purple-800">{job.jobPortalSource}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-7" onClick={() => window.open(job.jobUrl, '_blank')}>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <div className="flex items-center text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDataTable;
