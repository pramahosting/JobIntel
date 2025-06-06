
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';

const AnalyticsDashboard = () => {
  // Mock analytics data
  const skillsData = [
    { skill: 'Python', demand: 85, growth: 12 },
    { skill: 'SQL', demand: 78, growth: 8 },
    { skill: 'AWS', demand: 72, growth: 25 },
    { skill: 'React', demand: 68, growth: 15 },
    { skill: 'Machine Learning', demand: 65, growth: 30 },
    { skill: 'Tableau', demand: 58, growth: 18 }
  ];

  const domainData = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Finance', value: 22, color: '#10b981' },
    { name: 'Healthcare', value: 18, color: '#f59e0b' },
    { name: 'Manufacturing', value: 15, color: '#ef4444' },
    { name: 'Other', value: 10, color: '#8b5cf6' }
  ];

  const trendData = [
    { month: 'Jan', jobs: 1200, applications: 3400 },
    { month: 'Feb', jobs: 1400, applications: 3800 },
    { month: 'Mar', jobs: 1800, applications: 4200 },
    { month: 'Apr', jobs: 2200, applications: 4800 },
    { month: 'May', jobs: 2400, applications: 5200 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs Analyzed</p>
                <p className="text-2xl font-bold text-blue-600">142,847</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Countries</p>
                <p className="text-2xl font-bold text-green-600">47</p>
              </div>
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">↑ 3 new regions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Skills Tracked</p>
                <p className="text-2xl font-bold text-purple-600">1,247</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">↑ 89 new skills</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-orange-600">23.4%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">Month over month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Skills in Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="demand" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jobs by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={domainData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="jobs" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
