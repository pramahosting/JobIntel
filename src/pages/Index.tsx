import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Database, Download, ArrowUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AgentConfigPanel from '@/components/AgentConfigPanel';
import AnalyticsMetrics from '@/components/AnalyticsMetrics';
import JobDataTable from '@/components/JobDataTable';
import { JobData, generateMockJobData, clusterJobs } from '@/utils/jobDataGenerator';

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
  const rightPaneRef = useRef<HTMLDivElement>(null);

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

    const expectedJobCount = 1000;
    const formatCount = (count: number) => count.toLocaleString();

    updateInstance(instance.id, {
      isRunning: true,
      currentStatus: 'Initializing Agent for data extraction...'
    });

    toast({
      title: "Agent Started",
      description: `Extracting job data from ${instance.config.country} - ${instance.config.domain}`,
    });

    setTimeout(() => updateInstance(instance.id, { currentStatus: `Connecting to 15 job portals simultaneously...` }), 200);
    setTimeout(() => updateInstance(instance.id, { currentStatus: `Scanning ${formatCount(Math.floor(expectedJobCount * 0.2))} job listings...` }), 400);
    setTimeout(() => updateInstance(instance.id, { currentStatus: `Extracting descriptions from ${formatCount(Math.floor(expectedJobCount * 0.4))} postings...` }), 600);
    setTimeout(() => updateInstance(instance.id, { currentStatus: `Analyzing data for ${formatCount(Math.floor(expectedJobCount * 0.6))} positions...` }), 800);
    setTimeout(() => updateInstance(instance.id, { currentStatus: `Identifying companies for ${formatCount(Math.floor(expectedJobCount * 0.8))} jobs...` }), 1000);
    setTimeout(() => updateInstance(instance.id, { currentStatus: `Running clustering on ${formatCount(expectedJobCount)} records...` }), 1200);

    setTimeout(() => {
      const generatedData = generateMockJobData(instance.config.country, instance.config.domain, false);
      const clustered = clusterJobs(generatedData).slice(0, 1000);
      updateInstance(instance.id, {
        jobData: generatedData,
        clusteredJobs: clustered,
        isRunning: false,
        currentStatus: ''
      });
      toast({
        title: "Data Extraction Complete",
        description: `Extracted ${clustered.length.toLocaleString()} job listings in ${new Set(clustered.map(j => j.jobGroup)).size} clusters.`,
      });
    }, 1500);
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

    const headers = [
      "Job Group", "Standard Skills", "Job Title", "Company", "Company Type",
      "Location", "Experience", "Key Skills", "Soft Skills", "Tools & Tech",
      "Certifications", "Job Type", "Source", "Date Posted", "Business Domain",
      "Working Function", "Experience Level", "Education Required", "Responsibilities"
    ];

    const groupedJobs: { [key: string]: JobData[] } = {};
    activeInstance.clusteredJobs.forEach(job => {
      const group = job.jobGroup || 'Uncategorized';
      if (!groupedJobs[group]) groupedJobs[group] = [];
      groupedJobs[group].push(job);
    });

    const csvRows = ['sep=,'];
    Object.entries(groupedJobs).forEach(([groupName, jobs]) => {
      jobs.forEach((job, index) => {
        const row = [
          index === 0 ? groupName : '',
          index === 0 ? (job.standardSkills || []).join('; ') : '',
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

    const blob = new Blob([headers.join(',') + '\n' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `jobintel_${activeInstance.config.country}_${activeInstance.config.domain.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast({ title: "Excel Export Complete", description: `Exported ${activeInstance.clusteredJobs.length.toLocaleString()} job records.` });
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

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-1">
            <AgentConfigPanel
              config={activeInstance.config}
              setConfig={(newConfig) => updateInstance(activeInstance.id, { config: newConfig })}
              onRunAgent={handleRunAgent}
              isRunning={activeInstance.isRunning}
              currentStatus={activeInstance.currentStatus}
            />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3 relative h-[80vh] flex flex-col border rounded-lg overflow-hidden bg-white shadow">
            {/* Scrollable content */}
            <div ref={rightPaneRef} className="flex-1 overflow-y-auto p-4">
              {/* Top horizontal scroll area */}
              <div className="overflow-x-auto pb-2 border-b border-gray-200 mb-2">
                <div className="h-2.5 bg-gray-100 w-full overflow-x-auto">
                  <div className="h-0.5 w-[2000px]"></div>
                </div>
              </div>

              <div className="overflow-x-auto min-w-[900px] space-y-6">
                <AnalyticsMetrics jobData={activeInstance.clusteredJobs} />
                <JobDataTable jobData={activeInstance.clusteredJobs} />
              </div>
            </div>

            {/* Bottom Bar with Back to Top */}
            <div className="flex justify-end items-center border-t p-3 bg-white sticky bottom-0">
              <button
                onClick={() => {
                  if (rightPaneRef.current) {
                    rightPaneRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                <ArrowUp className="w-4 h-4 mr-1" />
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

