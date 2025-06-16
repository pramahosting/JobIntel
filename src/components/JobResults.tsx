import React, { useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  ExternalLink,
  MapPin,
  Calendar,
  Building,
  Award,
  Star,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  domain: string;
  datePosted: string;
  jobType: string;
  workingFunction: string;
  experienceYears: string;
  experienceLevel: string;
  responsibilities: string[];
  keySkills: string[];
  softSkills: string[];
  toolsAndTechnology: string[];
  certifications: string[];
  education: string;
  sourceUrl: string;
  sourceSite: string;
}

interface JobResultsProps {
  searchParams: {
    country: string;
    domain: string;
  };
  onExport: () => void;
}

const JobResults: React.FC<JobResultsProps> = ({ searchParams, onExport }) => {
  // Memoized job data to avoid re-creating on every render
  const scrapedJobData: Job[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Senior Risk Manager',
        company: 'Commonwealth Bank',
        location: 'Sydney, NSW',
        domain: 'Banking & Financial Services',
        datePosted: '2024-05-28',
        jobType: 'Full-time',
        workingFunction: 'Risk Management',
        experienceYears: '5-7',
        experienceLevel: 'Senior',
        responsibilities: [
          'Oversee credit risk assessment and portfolio management',
          'Ensure compliance with APRA prudential standards',
          'Develop and maintain risk frameworks and policies',
          'Lead stress testing and scenario analysis',
        ],
        keySkills: ['Risk Management', 'Credit Analysis', 'APRA Guidelines', 'Basel III', 'Financial Modeling', 'Portfolio Management'],
        softSkills: ['Leadership', 'Communication', 'Problem Solving', 'Analytical Thinking', 'Team Management'],
        toolsAndTechnology: ['SAS', 'MATLAB', 'Python', "Moody's Analytics", 'Core Banking Systems', 'SQL', 'Excel'],
        certifications: ['FRM', 'CFA', 'APRA Certification'],
        education: "Bachelor's in Finance, Economics or related field. Master's preferred",
        sourceUrl: 'https://example.com/job1',
        sourceSite: 'CBA Careers',
      },
      {
        id: 2,
        title: 'Anti-Money Laundering Analyst',
        company: 'Westpac Banking Corporation',
        location: 'Melbourne, VIC',
        domain: 'Banking & Financial Services',
        datePosted: '2024-05-27',
        jobType: 'Contract',
        workingFunction: 'Compliance & Legal',
        experienceYears: '3-5',
        experienceLevel: 'Mid-Senior',
        responsibilities: [
          'Monitor and investigate suspicious transaction activities',
          'Ensure compliance with AML/CTF regulations',
          'Prepare regulatory reports for AUSTRAC',
          'Conduct customer due diligence and enhanced screening',
        ],
        keySkills: ['AML/CTF', 'Transaction Monitoring', 'Regulatory Reporting', 'KYC', 'Sanctions Screening', 'Financial Crime'],
        softSkills: ['Attention to Detail', 'Critical Thinking', 'Communication', 'Time Management', 'Integrity'],
        toolsAndTechnology: ['Actimize', 'World-Check', 'SWIFT', 'Oracle Financial Services', 'SAS', 'Python'],
        certifications: ['CAMS', 'RG146', 'ACAMS'],
        education: "Bachelor's in Finance, Law or Criminology",
        sourceUrl: 'https://example.com/job2',
        sourceSite: 'Westpac Careers',
      },
      {
        id: 3,
        title: 'Data Scientist - Banking Analytics',
        company: 'ANZ Bank',
        location: 'Brisbane, QLD',
        domain: 'Banking & Financial Services',
        datePosted: '2024-05-26',
        jobType: 'Full-time',
        workingFunction: 'Data Science & Analytics',
        experienceYears: '2-4',
        experienceLevel: 'Mid-Level',
        responsibilities: [
          'Develop predictive models for customer behavior',
          'Analyze banking data for business insights',
          'Build machine learning solutions for fraud detection',
          'Create data visualizations and reports',
        ],
        keySkills: ['Machine Learning', 'Data Analysis', 'Python', 'SQL', 'Statistical Modeling', 'Banking Domain'],
        softSkills: ['Innovation', 'Collaboration', 'Presentation Skills', 'Curiosity', 'Adaptability'],
        toolsAndTechnology: ['Python', 'R', 'Tableau', 'SQL Server', 'AWS', 'Jupyter', 'Git', 'Docker'],
        certifications: ['AWS Certified', 'Google Analytics', 'Tableau Certified'],
        education: "Bachelor's/Master's in Data Science, Statistics, Computer Science or related field",
        sourceUrl: 'https://example.com/job3',
        sourceSite: 'ANZ Careers',
      },
    ],
    []
  );

  // Export CSV - memoized for performance
  const generateExcelData = useCallback(() => {
    if (!scrapedJobData.length) return;

    const excelData = scrapedJobData.map((job) => ({
      'Job Title': job.title,
      Company: job.company,
      Location: job.location,
      'Business Domain': job.domain,
      'Date Posted': job.datePosted,
      'Job Type': job.jobType,
      'Working Function': job.workingFunction,
      'Experience Years': job.experienceYears,
      'Experience Level': job.experienceLevel,
      'Key Skills': job.keySkills.join(', '),
      'Soft Skills': job.softSkills.join(', '),
      'Tools & Technology': job.toolsAndTechnology.join(', '),
      Certifications: job.certifications.join(', '),
      Education: job.education,
      Responsibilities: job.responsibilities.join(' | '),
      'Source Site': job.sourceSite,
      'Source URL': job.sourceUrl,
    }));

    const headers = Object.keys(excelData[0]);
    const csvContent = [
      headers.join(','),
      ...excelData.map((row) =>
        headers
          .map((header) => {
            const cell = row[header] ?? '';
            // Escape quotes by doubling them
            return `"${String(cell).replace(/"/g, '""')}"`;
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `job_scraping_${searchParams.country}_${searchParams.domain.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [scrapedJobData, searchParams.country, searchParams.domain]);

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Scraping Results</h2>
          <p className="text-gray-600">
            Found {scrapedJobData.length} jobs in {searchParams.country} - {searchParams.domain}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={generateExcelData} className="bg-green-600 hover:bg-green-700" aria-label="Download CSV">
            <Download className="w-4 h-4 mr-2" />
            Download Excel/CSV
          </Button>
          <Button onClick={onExport} variant="outline" aria-label="Export JSON">
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {scrapedJobData.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-blue-600">{job.title}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {job.datePosted}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Badge variant="secondary">{job.jobType}</Badge>
                    <Badge variant="outline">{job.experienceLevel}</Badge>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 flex items-center">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {job.workingFunction}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <section>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {job.keySkills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">Soft Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.softSkills.map((skill, i) => (
                      <Badge key={i} className="text-xs bg-pink-100 text-pink-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">Experience</h4>
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-xs block w-fit">
                      {job.experienceYears} years
                    </Badge>
                    <Badge variant="outline" className="text-xs block w-fit">
                      {job.experienceLevel}
                    </Badge>
                  </div>
                </section>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-4">
                <section>
                  <h4 className="font-semibold mb-2">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.toolsAndTechnology.map((tool, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="font-semibold mb-2">Certifications Required</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.certifications.map((cert, i) => (
                      <Badge key={i} className="text-xs bg-orange-100 text-orange-800 flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </section>
              </div>

              <section>
                <h4 className="font-semibold mb-2 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Education Requirements
                </h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{job.education}</p>
              </section>

              <div className="flex justify-between items-center pt-4">
                <div className="text-sm text-gray-600">
                  <strong>Source:</strong> {job.sourceSite} | <strong>Function:</strong> {job.workingFunction}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  as="a"
                  href={job.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View original job posting for ${job.title}`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Original
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobResults;
