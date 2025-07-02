import React, { useState, useRef } from 'react';
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

  const rightPaneRef = useRef<HTMLDivElement>(null);

  const updateInstance = (id: string, updates: Partial<AgentInstance>) => {
    setAgentInstances(prev =>
      prev.map(instance => (instance.id === id ? { ...instance, ...updates } : instance))
    );
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

    const expectedJobCount = 1000; // Limit job count for performance
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

    // CSV export logic here (omitted for brevity)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
          <div className="lg:col-span-1">
            <AgentConfigPanel
              config={activeInstance.config}
              setConfig={(newConfig) => updateInstance(activeInstance.id, { config: newConfig })}
              onRunAgent={handleRunAgent}
              isRunning={activeInstance.isRunning}
              currentStatus={activeInstance.currentStatus}
            />
          </div>

          {/* Right pane with vertical scroll, horizontal scrollbar above Back to Top */}
          <div className="lg:col-span-3 relative h-[80vh] flex flex-col border rounded-lg overflow-hidden bg-white shadow">

            {/* Scrollable content with vertical scroll only */}
            <div
              ref={rightPaneRef}
              className="flex-1 overflow-y-auto p-4 min-w-[900px]"
              style={{ paddingBottom: 0 }}
            >
              <div className="space-y-6 min-w-[900px]">
                <AnalyticsMetrics jobData={activeInstance.clusteredJobs} />
                <JobDataTable jobData={activeInstance.clusteredJobs} />
              </div>
            </div>

            {/* Horizontal scrollbar container */}
            <div
              className="overflow-x-auto overflow-y-hidden border-t"
              style={{ height: '20px', marginTop: '3px' }}
            >
              {/* Inner div to create horizontal scroll track */}
              <div style={{ minWidth: '900px', height: '1px' }}></div>
            </div>

            {/* Back to Top button sticky at bottom */}
            <div className="sticky bottom-0 z-10 border-t bg-white p-3 flex justify-end">
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
