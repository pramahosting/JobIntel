import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface JobDataTableProps {
  jobs: any[];
}

const JobDataTable: React.FC<JobDataTableProps> = ({ jobs }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-blue-700">{job.title}</CardTitle>
            <div className="text-sm text-gray-600">{job.company} | {job.location} | {job.datePosted}</div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold flex items-center"><Star className="w-4 h-4 mr-1" /> Key Skills</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.keySkills.map((s: string, i: number) => (
                    <Badge key={i} className="text-xs" variant="secondary">{s}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Soft Skills</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.softSkills.map((s: string, i: number) => (
                    <Badge key={i} className="text-xs bg-pink-100 text-pink-800">{s}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Experience</h4>
                <div className="space-y-1 mt-1 text-xs">
                  <Badge variant="outline">{job.experienceYears} years</Badge>
                  <Badge variant="outline">{job.experienceLevel}</Badge>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.toolsAndTechnology.map((tool: string, i: number) => (
                    <Badge key={i} className="text-xs">{tool}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold flex items-center"><Award className="w-4 h-4 mr-1" /> Certifications</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.certifications.map((cert: string, i: number) => (
                    <Badge key={i} className="text-xs bg-orange-100 text-orange-800">{cert}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold flex items-center"><GraduationCap className="w-4 h-4 mr-1" /> Education</h4>
              <p className="text-sm text-gray-700 mt-1">{job.education}</p>
            </div>

            <div className="flex justify-end mt-4">
              <a href={job.sourceUrl} target="_blank" rel="noreferrer">
                <Badge variant="outline" className="flex items-center gap-1 text-blue-700">
                  <ExternalLink className="w-3 h-3" /> View Original
                </Badge>
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobDataTable;
