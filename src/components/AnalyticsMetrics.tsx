
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin, Users, TrendingUp } from 'lucide-react';
import { JobData } from '@/utils/jobDataGenerator';

interface AnalyticsMetricsProps {
  jobData: JobData[];
}

const AnalyticsMetrics: React.FC<AnalyticsMetricsProps> = ({ jobData }) => {
  if (jobData.length === 0) {
    return null;
  }

  const uniqueCompanies = new Set(jobData.map(job => job.companyName)).size;
  const uniqueLocations = new Set(jobData.map(job => job.jobLocation)).size;
  
  // Find top skill by frequency
  const skillCounts = jobData.flatMap(job => job.keySkills)
    .reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  const topSkill = Object.entries(skillCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

  const metrics = [
    {
      title: 'Total Job Listings',
      value: jobData.length.toLocaleString(),
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Unique Companies',
      value: uniqueCompanies.toString(),
      icon: Building,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Job Locations',
      value: uniqueLocations.toString(),
      icon: MapPin,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Top Skill Demand',
      value: topSkill,
      icon: TrendingUp,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className={`text-2xl font-bold ${metric.textColor}`}>
                  {metric.value}
                </p>
              </div>
              <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.textColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsMetrics;
