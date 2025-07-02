import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink, MapPin, Calendar, Building, Award, Star, Briefcase, GraduationCap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface JobResultsProps {
  searchParams: any;
  onExport: () => void;
}

const JobResults: React.FC<JobResultsProps> = ({ searchParams, onExport }) => {
  const scrapedJobData = [
    {
      id: 1,
      title: "Senior Risk Manager",
      company: "Commonwealth Bank",
      location: "Sydney, NSW",
      domain: "Banking & Financial Services",
      datePosted: "2024-05-28",
      jobType: "Full-time",
      workingFunction: "Risk Management",
      experienceYears: "5-7",
      experienceLevel: "Senior",
      responsibilities: [
        "Oversee credit risk assessment and portfolio management",
        "Ensure compliance with APRA prudential standards",
        "Develop and maintain risk frameworks and policies",
        "Lead stress testing and scenario analysis"
      ],
      keySkills: ["Risk Management", "Credit Analysis", "APRA Guidelines", "Basel III", "Financial Modeling", "Portfolio Management"],
      softSkills: ["Leadership", "Communication", "Problem Solving", "Analytical Thinking", "Team Management"],
      toolsAndTechnology: ["SAS", "MATLAB", "Python", "Moody's Analytics", "Core Banking Systems", "SQL", "Excel"],
      certifications: ["FRM", "CFA", "APRA Certification"],
      education: "Bachelor's in Finance, Economics or related field. Master's preferred",
      sourceUrl: "https://example.com/job1",
      sourceSite: "CBA Careers"
    },
    {
      id: 2,
      title: "Anti-Money Laundering Analyst",
      company: "Westpac Banking Corporation",
      location: "Melbourne, VIC",
      domain: "Banking & Financial Services",
      datePosted: "2024-05-27",
      jobType: "Contract",
      workingFunction: "Compliance & Legal",
      experienceYears: "3-5",
      experienceLevel: "Mid-Senior",
      responsibilities: [
        "Monitor and investigate suspicious transaction activities",
        "Ensure compliance with AML/CTF regulations",
        "Prepare regulatory reports for AUSTRAC",
        "Conduct customer due diligence and enhanced screening"
      ],
      keySkills: ["AML/CTF", "Transaction Monitoring", "Regulatory Reporting", "KYC", "Sanctions Screening", "Financial Crime"],
      softSkills: ["Attention to Detail", "Critical Thinking", "Communication", "Time Management", "Integrity"],
      toolsAndTechnology: ["Actimize", "World-Check", "SWIFT", "Oracle Financial Services", "SAS", "Python"],
      certifications: ["CAMS", "RG146", "ACAMS"],
      education: "Bachelor's in Finance, Law or Criminology",
      sourceUrl: "https://example.com/job2",
      sourceSite: "Westpac Careers"
    },
    {
      id: 3,
      title: "Data Scientist - Banking Analytics",
      company: "ANZ Bank",
      location: "Brisbane, QLD",
      domain: "Banking & Financial Services",
      datePosted: "2024-05-26",
      jobType: "Full-time",
      workingFunction: "Data Science & Analytics",
      experienceYears: "2-4",
      experienceLevel: "Mid-Level",
      responsibilities: [
        "Develop predictive models for customer behavior",
        "Analyze banking data for business insights",
        "Build machine learning solutions for fraud detection",
        "Create data visualizations and reports"
      ],
      keySkills: ["Machine Learning", "Data Analysis", "Python", "SQL", "Statistical Modeling", "Banking Domain"],
      softSkills: ["Innovation", "Collaboration", "Presentation Skills", "Curiosity", "Adaptability"],
      toolsAndTechnology: ["Python", "R", "Tableau", "SQL Server", "AWS", "Jupyter", "Git", "Docker"],
      certifications: ["AWS Certified", "Google Analytics", "Tableau Certified"],
      education: "Bachelor's/Master's in Data Science, Statistics, Computer Science or related field",
      sourceUrl: "https://example.com/job3",
      sourceSite: "ANZ Careers"
    }
  ];

  const generateExcelData = () => {
    const excelData = scrapedJobData.map(job => ({
      "Job Title": job.title,
      "Company": job.company,
      "Location": job.location,
      "Business Domain": job.domain,
      "Date Posted": job.datePosted,
      "Job Type": job.jobType,
      "Working Function": job.workingFunction,
      "Experience Years": job.experienceYears,
      "Experience Level": job.experienceLevel,
      "Key Skills": job.keySkills.join(", "),
      "Soft Skills": job.softSkills.join(", "),
      "Tools & Technology": job.toolsAndTechnology.join(", "),
      "Certifications": job.certifications.join(", "),
      "Education": job.education,
      "Responsibilities": job.responsibilities.join(" | "),
      "Source Site": job.sourceSite,
      "Source URL": job.sourceUrl
    }));

    const headers = Object.keys(excelData[0]);
    const csvContent = [
      headers.join(","),
      ...excelData.map(row => headers.map(header => `"${row[header]}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `job_scraping_${searchParams.country}_${searchParams.domain.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Export and Summary */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Scraping Results</h2>
          <p className="text-gray-600">Found {scrapedJobData.length} jobs in {searchParams.country} - {searchParams.domain}</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={generateExcelData} className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Download Excel/CSV
          </Button>
          <Button onClick={onExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* 🔁 Horizontally Scrollable Job Cards Container */}
      <div className="overflow-x-auto w-full">
        <div className="min-w-[1000px] space-y-4">
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
                    <Badge className="bg-purple-100 text-purple-800">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {job.workingFunction}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {job.keySkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Soft Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.softSkills.map((skill, index) => (
                        <Badge key={index} className="text-xs bg-pink-100 text-pink-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-xs block w-fit">
                        {job.experienceYears} years
                      </Badge>
                      <Badge variant="outline" className="text-xs block w-fit">
                        {job.experienceLevel}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.toolsAndTechnology.map((tool, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Certifications Required</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.certifications.map((cert, index) => (
                        <Badge key={index} className="text-xs bg-orange-100 text-orange-800">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    Education Requirements
                  </h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{job.education}</p>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-gray-600">
                    <strong>Source:</strong> {job.sourceSite} | <strong>Function:</strong> {job.workingFunction}
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Original
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobResults;
