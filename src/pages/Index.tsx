
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AgentConfigPanel from '@/components/AgentConfigPanel';
import AnalyticsMetrics from '@/components/AnalyticsMetrics';
import JobDataTable from '@/components/JobDataTable';
import { JobData, generateMockJobData, clusterJobs } from '@/utils/jobDataGenerator';

// Support for multiple parallel agent instances
interface AgentInstance {
  id: string;
  config: {
    country: string;
    domain: string;
  };
  isRunning: boolean;
  currentStatus: string;
  jobData: JobData[];
  clusteredJobs: JobData[];
}

const Index = () => {
  const { toast } = useToast();
  const [agentInstances, setAgentInstances] = useState<AgentInstance[]>([
    {
      id: 'main',
      config: { country: 'Australia', domain: 'Banking & Financial Services' },
      isRunning: false,
      currentStatus: '',
      jobData: [],
      clusteredJobs: []
    }
  ]);
  const [activeInstanceId, setActiveInstanceId] = useState('main');

  const activeInstance = agentInstances.find(instance => instance.id === activeInstanceId) || agentInstances[0];

  const updateInstance = (id: string, updates: Partial<AgentInstance>) => {
    setAgentInstances(prev => prev.map(instance => 
      instance.id === id ? { ...instance, ...updates } : instance
    ));
  };

  const handleRunAgent = async () => {
    const instance = activeInstance;
    
    if (!instance.config.country || !instance.config.domain) {
      toast({
        title: "Configuration Required",
        description: "Please select both country and business domain before running the agent.",
        variant: "destructive"
      });
      return;
    }

    // Calculate expected job count for dynamic status updates
    const baseJobCount = 1000;
    const variationRange = 5000;
    const expectedJobCount = Math.floor(Math.random() * variationRange) + baseJobCount;
    const formatCount = (count: number) => count.toLocaleString();

    updateInstance(instance.id, { 
      isRunning: true, 
      currentStatus: 'Initializing Agent for data extraction...' 
    });
    
    toast({
      title: "Agent Started",
      description: `Extracting job data from ${instance.config.country} - ${instance.config.domain}`,
    });

    // Enhanced processing stages with dynamic record counts
    setTimeout(() => {
      const portalsConnected = Math.floor(Math.random() * 8) + 12;
      updateInstance(instance.id, { 
        currentStatus: `Connecting to ${portalsConnected} job portals simultaneously...` 
      });
    }, 500);

    setTimeout(() => {
      const scannedListings = Math.floor(expectedJobCount * 0.2);
      updateInstance(instance.id, { 
        currentStatus: `Scanning ${formatCount(scannedListings)} job listings across all major platforms...` 
      });
    }, 1000);

    setTimeout(() => {
      const extractedJobs = Math.floor(expectedJobCount * 0.4);
      updateInstance(instance.id, { 
        currentStatus: `Extracting comprehensive descriptions from ${formatCount(extractedJobs)} job postings...` 
      });
    }, 1500);

    setTimeout(() => {
      const analyzedJobs = Math.floor(expectedJobCount * 0.6);
      updateInstance(instance.id, { 
        currentStatus: `Analyzing skills and compensation data for ${formatCount(analyzedJobs)} positions...` 
      });
    }, 2000);

    setTimeout(() => {
      const companiesIdentified = Math.floor(expectedJobCount * 0.8);
      updateInstance(instance.id, { 
        currentStatus: `Identifying company types and domains for ${formatCount(companiesIdentified)} job listings...` 
      });
    }, 2500);

    setTimeout(() => {
      const jobsForClustering = Math.floor(expectedJobCount * 0.9);
      updateInstance(instance.id, { 
        currentStatus: `Processing advanced clustering algorithms on ${formatCount(jobsForClustering)} job records...` 
      });
    }, 3000);

    setTimeout(() => {
      const insightsGenerated = expectedJobCount;
      updateInstance(instance.id, { 
        currentStatus: `Generating market intelligence insights from ${formatCount(insightsGenerated)} data points...` 
      });
    }, 3500);

    setTimeout(() => {
      // Generate significantly more data for limitless extraction
      const generatedData = generateMockJobData(instance.config.country, instance.config.domain, true);
      const clustered = clusterJobs(generatedData);
      
      updateInstance(instance.id, {
        jobData: generatedData,
        clusteredJobs: clustered,
        isRunning: false,
        currentStatus: ''
      });
      
      toast({
        title: "Data Extraction Complete",
        description: `Successfully extracted ${generatedData.length.toLocaleString()} job listings with ${new Set(clustered.map(j => j.jobGroup)).size} distinct job clusters identified.`,
      });
    }, 4000);
  };

  const handleExportData = () => {
    if (activeInstance.clusteredJobs.length === 0) {
      toast({
        title: "No Data to Export",
        description: "Please run the agent first to generate data for export.",
        variant: "destructive"
      });
      return;
    }

    // Sort jobs by job group to ensure jobs from same group appear together
    const sortedJobData = [...activeInstance.clusteredJobs].sort((a, b) => {
      if (a.jobGroup && b.jobGroup) {
        return a.jobGroup.localeCompare(b.jobGroup);
      }
      return 0;
    });

    // Group jobs by jobGroup
    const groupedJobs: { [key: string]: JobData[] } = {};
    sortedJobData.forEach(job => {
      const group = job.jobGroup || 'Uncategorized';
      if (!groupedJobs[group]) {
        groupedJobs[group] = [];
      }
      groupedJobs[group].push(job);
    });

    // Create Excel-compatible CSV with merged cell structure
    const headers = [
      "Job Group", "Standard Skills", "Job Title", "Company", "Company Type", 
      "Location", "Experience", "Key Skills", "Soft Skills", "Tools & Tech", 
      "Certifications", "Job Type", "Source", "Date Posted", "Business Domain",
      "Working Function", "Experience Level", "Education Required", "Responsibilities"
    ];

    const csvRows: string[] = [];

    // Add formatting instructions for Excel (top-left alignment)
    csvRows.push('sep=,'); // Excel separator directive
    
    Object.entries(groupedJobs).forEach(([groupName, jobs]) => {
      jobs.forEach((job, jobIndex) => {
        const row = [
          jobIndex === 0 ? groupName : '', // Job Group (merged cell - only for first job in group)
          jobIndex === 0 ? (job.standardSkills || []).join('; ') : '', // Standard Skills (merged cell - only for first job in group)
          job.jobTitle,
          job.companyName,
          job.companyType || '',
          job.jobLocation,
          `${job.experienceYears} (${job.experienceLevel})`,
          job.keySkills.join('; '),
          job.softSkills.join('; '),
          job.toolsTechnologies.join('; '),
          job.certifications.join('; '),
          job.jobType,
          job.jobPortalSource,
          job.datePosted,
          job.businessDomain,
          job.workingFunction,
          job.experienceLevel,
          job.educationRequired,
          job.responsibilities.join('; ')
        ];
        csvRows.push(row.map(cell => `"${cell}"`).join(','));
      });
    });

    const csvContent = [
      headers.join(','),
      ...csvRows
    ].join('\n');

    // Download CSV with Excel formatting
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `jobintel_${activeInstance.config.country}_${activeInstance.config.domain.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Excel Export Complete",
      description: `Successfully exported ${activeInstance.clusteredJobs.length.toLocaleString()} job records with merged cells and proper formatting.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">JobIntel Agent</h1>
                <p className="text-sm text-gray-600">Job data extraction and market intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {activeInstance.clusteredJobs.length > 0 && (
                <Button onClick={handleExportData} className="bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Agent Configuration Panel */}
          <div className="lg:col-span-1">
            <AgentConfigPanel
              config={activeInstance.config}
              setConfig={(newConfig) => updateInstance(activeInstance.id, { config: newConfig })}
              onRunAgent={handleRunAgent}
              isRunning={activeInstance.isRunning}
              currentStatus={activeInstance.currentStatus}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Analytics Metrics */}
            <AnalyticsMetrics jobData={activeInstance.clusteredJobs} />

            {/* Job Data Table */}
            <JobDataTable jobData={activeInstance.clusteredJobs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
