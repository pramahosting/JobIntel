import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Bot, Play } from 'lucide-react';

interface AgentConfig {
  country: string;
  domain: string;
}

interface AgentConfigPanelProps {
  config: AgentConfig;
  setConfig: React.Dispatch<React.SetStateAction<AgentConfig>>;
  onRunAgent: () => void;
  isRunning: boolean;
  currentStatus?: string;
}

const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({
  config,
  setConfig,
  onRunAgent,
  isRunning,
  currentStatus
}) => {
  const countries = [
    "Australia", "USA", "UK", "India", "Singapore", "Canada", 
    "Germany", "France", "Japan", "Netherlands", "Sweden", "All Countries"
  ];

  const domains = [
    "Banking & Financial Services", "Government", "Manufacturing", "Mining", 
    "Healthcare", "Retail", "Technology", "Energy & Utilities", "Aviation Infrastructure",
    "Telecommunications", "Education", "Real Estate", "Consulting", "All Domains"
  ];

  const updateConfig = (key: keyof AgentConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="sticky top-24">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span>Agent Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        
        {/* Country Selector */}
        <div>
          <Label htmlFor="country" className="text-sm font-medium">Target Country</Label>
          <Select value={config.country} onValueChange={(value) => updateConfig('country', value)}>
            <SelectTrigger id="country" className="mt-1">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Domain Selector */}
        <div>
          <Label htmlFor="domain" className="text-sm font-medium">Business Domain</Label>
          <Select value={config.domain} onValueChange={(value) => updateConfig('domain', value)}>
            <SelectTrigger id="domain" className="mt-1">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              {domains.map((domain) => (
                <SelectItem key={domain} value={domain}>
                  {domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Configuration Summary */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Selected Configuration:</Label>
          <div className="space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {config.country}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {config.domain}
            </Badge>
          </div>
        </div>

        {/* Run Agent Button */}
        <Button 
          onClick={onRunAgent} 
          disabled={isRunning || !config.country || !config.domain}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Running Agent...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Agent
            </>
          )}
        </Button>

        {/* Agent Status Display */}
        {isRunning && currentStatus && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800">
              <div className="font-medium">Agent Status:</div>
              <div>{currentStatus}</div>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default AgentConfigPanel;
