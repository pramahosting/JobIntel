
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2 } from 'lucide-react';

interface JobFiltersProps {
  searchParams: {
    country: string;
    domain: string;
  };
  setSearchParams: (params: any) => void;
  onSearch: () => void;
  isSearching: boolean;
}

const JobFilters: React.FC<JobFiltersProps> = ({
  searchParams,
  setSearchParams,
  onSearch,
  isSearching
}) => {
  const countries = [
    "Australia", "All Countries", "USA", "UK", "India", "Singapore", "Canada", 
    "Germany", "Japan", "Brazil", "South Africa"
  ];

  const domains = [
    "Banking & Financial Services", "Insurance", "Investment Management", 
    "FinTech", "All Finance", "All Domains", "Government", "Manufacturing", 
    "Mining", "Healthcare", "Retail", "Technology", "Energy", "Education",
    "Telecommunications", "Real Estate", "Transport & Logistics"
  ];

  const updateParam = (key: string, value: string) => {
    setSearchParams({ ...searchParams, [key]: value });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-blue-600" />
          <span>Job Scraping Parameters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select value={searchParams.country || "Australia"} onValueChange={(value) => updateParam('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Australia" />
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

        <div>
          <Label htmlFor="domain">Business Domain</Label>
          <Select value={searchParams.domain || "Banking & Financial Services"} onValueChange={(value) => updateParam('domain', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Banking & Financial Services" />
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

        <Button 
          onClick={onSearch} 
          disabled={isSearching}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scraping Jobs...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Start Job Scraping
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobFilters;
