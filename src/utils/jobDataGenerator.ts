export interface JobData {
  jobGroup?: string;
  jobTitle: string;
  businessDomain: string;
  companyName: string;
  companyType?: string;
  jobLocation: string;
  jobType: string;
  datePosted: string;
  responsibilities: string[];
  keySkills: string[];
  softSkills: string[];
  toolsTechnologies: string[];
  experienceYears: string;
  experienceLevel: string;
  certifications: string[];
  educationRequired: string;
  industryKeywords: string[];
  workingFunction: string;
  jobPortalSource: string;
  sourceUrl: string;
  standardSkills?: string[];
}

// Expanded company data for different countries and domains
const companyData = {
  'Australia': {
    'Banking & Financial Services': {
      companies: [
        'Commonwealth Bank of Australia', 'Westpac Banking Corporation', 'Australia and New Zealand Banking Group (ANZ)',
        'National Australia Bank (NAB)', 'Macquarie Bank', 'Suncorp Group', 'QBE Insurance Group',
        'Insurance Australia Group (IAG)', 'AMP Limited', 'Bendigo and Adelaide Bank'
      ],
      types: {
        'Commonwealth Bank of Australia': 'Banking',
        'Westpac Banking Corporation': 'Banking',
        'Australia and New Zealand Banking Group (ANZ)': 'Banking',
        'National Australia Bank (NAB)': 'Banking',
        'Macquarie Bank': 'Investment Banking',
        'Suncorp Group': 'Banking & Insurance',
        'QBE Insurance Group': 'Insurance',
        'Insurance Australia Group (IAG)': 'Insurance',
        'AMP Limited': 'Super & Insurance',
        'Bendigo and Adelaide Bank': 'Banking'
      }
    },
    'Healthcare': {
      companies: [
        'Ramsay Health Care', 'Healius Limited', 'Sonic Healthcare', 'CSL Limited',
        'Cochlear Limited', 'ResMed Inc', 'Medibank Private', 'Bupa Australia',
        'HCF Health Insurance', 'NIB Health Insurance', 'Australian Unity'
      ],
      types: {
        'Ramsay Health Care': 'Healthcare Provider',
        'Healius Limited': 'Medical Services',
        'Sonic Healthcare': 'Pathology Services',
        'CSL Limited': 'Biotechnology',
        'Cochlear Limited': 'Medical Technology',
        'ResMed Inc': 'Medical Equipment',
        'Medibank Private': 'Health Insurance',
        'Bupa Australia': 'Health Insurance',
        'HCF Health Insurance': 'Health Insurance',
        'NIB Health Insurance': 'Health Insurance',
        'Australian Unity': 'Health & Financial Services'
      }
    },
    'Government': {
      companies: [
        'Department of Finance', 'Australian Taxation Office', 'Department of Defence',
        'Department of Health', 'Services Australia', 'Australian Bureau of Statistics',
        'Department of Education', 'Department of Infrastructure'
      ],
      types: {
        'Department of Finance': 'Government',
        'Australian Taxation Office': 'Government',
        'Department of Defence': 'Government',
        'Department of Health': 'Government',
        'Services Australia': 'Government',
        'Australian Bureau of Statistics': 'Government',
        'Department of Education': 'Government',
        'Department of Infrastructure': 'Government'
      }
    },
    'Technology': {
      companies: [
        'Atlassian', 'Canva', 'Afterpay', 'Xero', 'REA Group', 'Seek Limited',
        'WiseTech Global', 'TechnologyOne', 'Computershare', 'NextDC'
      ],
      types: {
        'Atlassian': 'Software',
        'Canva': 'Software',
        'Afterpay': 'Fintech',
        'Xero': 'Software',
        'REA Group': 'Technology',
        'Seek Limited': 'Technology',
        'WiseTech Global': 'Software',
        'TechnologyOne': 'Software',
        'Computershare': 'Technology Services',
        'NextDC': 'Data Centers'
      }
    }
  },
  'USA': {
    'Government': {
      companies: [
        'Department of Treasury', 'Federal Reserve', 'Internal Revenue Service',
        'Department of Defense', 'Department of Homeland Security', 'Centers for Disease Control',
        'Department of Veterans Affairs', 'Social Security Administration'
      ],
      types: {
        'Department of Treasury': 'Government',
        'Federal Reserve': 'Government',
        'Internal Revenue Service': 'Government',
        'Department of Defense': 'Government',
        'Department of Homeland Security': 'Government',
        'Centers for Disease Control': 'Government',
        'Department of Veterans Affairs': 'Government',
        'Social Security Administration': 'Government'
      }
    },
    'Banking & Financial Services': {
      companies: [
        'JPMorgan Chase', 'Bank of America', 'Wells Fargo', 'Citigroup',
        'Goldman Sachs', 'Morgan Stanley', 'American Express', 'Charles Schwab'
      ],
      types: {
        'JPMorgan Chase': 'Banking',
        'Bank of America': 'Banking',
        'Wells Fargo': 'Banking',
        'Citigroup': 'Banking',
        'Goldman Sachs': 'Investment Banking',
        'Morgan Stanley': 'Investment Banking',
        'American Express': 'Financial Services',
        'Charles Schwab': 'Investment Services'
      }
    },
    'Healthcare': {
      companies: [
        'Johnson & Johnson', 'Pfizer', 'UnitedHealth Group', 'Merck & Co',
        'Abbott Laboratories', 'Medtronic', 'Anthem Inc', 'CVS Health'
      ],
      types: {
        'Johnson & Johnson': 'Pharmaceuticals',
        'Pfizer': 'Pharmaceuticals',
        'UnitedHealth Group': 'Health Insurance',
        'Merck & Co': 'Pharmaceuticals',
        'Abbott Laboratories': 'Medical Devices',
        'Medtronic': 'Medical Technology',
        'Anthem Inc': 'Health Insurance',
        'CVS Health': 'Healthcare Services'
      }
    },
    'Technology': {
      companies: [
        'Microsoft', 'Apple', 'Google', 'Amazon', 'Meta', 'Tesla',
        'Netflix', 'Adobe', 'Salesforce', 'Oracle'
      ],
      types: {
        'Microsoft': 'Software',
        'Apple': 'Technology',
        'Google': 'Technology',
        'Amazon': 'Technology',
        'Meta': 'Social Media',
        'Tesla': 'Technology',
        'Netflix': 'Technology',
        'Adobe': 'Software',
        'Salesforce': 'Software',
        'Oracle': 'Software'
      }
    }
  }
};

const locationData = {
  'Australia': ['Sydney, NSW', 'Melbourne, VIC', 'Brisbane, QLD', 'Perth, WA', 'Adelaide, SA', 'Canberra, ACT'],
  'USA': ['New York, NY', 'Washington, DC', 'Los Angeles, CA', 'Chicago, IL', 'Boston, MA', 'San Francisco, CA'],
  'UK': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Leeds'],
  'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'],
  'Singapore': ['Singapore Central', 'Marina Bay', 'Raffles Place', 'Orchard Road', 'Jurong', 'Tampines'],
  'Canada': ['Toronto, ON', 'Vancouver, BC', 'Montreal, QC', 'Calgary, AB', 'Ottawa, ON', 'Edmonton, AB']
};

const skillsDatabase = {
  'Banking & Financial Services': [
    'Credit Risk Management', 'Basel III', 'APRA Compliance', 'AML/CTF', 'KYC', 'Financial Modeling',
    'Portfolio Management', 'Investment Analysis', 'Regulatory Reporting', 'Stress Testing',
    'Capital Management', 'Liquidity Risk', 'Market Risk', 'Operational Risk', 'Derivatives Trading'
  ],
  'Healthcare': [
    'Clinical Research', 'Medical Device Regulations', 'FDA Compliance', 'Healthcare Analytics',
    'Patient Safety', 'Electronic Health Records', 'Medical Coding', 'Healthcare IT',
    'Pharmaceutical Development', 'Clinical Trials', 'Healthcare Quality Assurance', 'Medical Writing'
  ],
  'Government': [
    'Policy Development', 'Public Administration', 'Stakeholder Engagement', 'Budget Management',
    'Legislative Process', 'Regulatory Compliance', 'Public Consultation', 'Strategic Planning',
    'Government Relations', 'Federal Regulations', 'Public Sector Management'
  ],
  'Technology': [
    'Software Development', 'Cloud Computing', 'Data Science', 'Machine Learning', 'DevOps',
    'Cybersecurity', 'API Development', 'Database Management', 'System Architecture', 'Agile Methodology'
  ]
};

const jobTitlesDatabase = {
  'Banking & Financial Services': [
    'Senior Credit Risk Analyst', 'Investment Banking Analyst', 'Wealth Management Advisor',
    'Compliance Officer', 'Anti-Money Laundering Analyst', 'Portfolio Manager',
    'Financial Planning Specialist', 'Corporate Banking Manager', 'Insurance Underwriter',
    'Risk Management Specialist', 'Treasury Analyst', 'Business Banking Advisor'
  ],
  'Healthcare': [
    'Clinical Research Associate', 'Healthcare Data Analyst', 'Medical Affairs Manager',
    'Regulatory Affairs Specialist', 'Healthcare IT Specialist', 'Clinical Trial Manager',
    'Medical Device Engineer', 'Healthcare Quality Manager', 'Pharmaceutical Scientist',
    'Health Information Manager', 'Clinical Operations Manager', 'Medical Writer'
  ],
  'Government': [
    'Policy Analyst', 'Program Manager', 'Budget Analyst', 'Public Affairs Specialist',
    'Legislative Assistant', 'Regulatory Affairs Manager', 'Government Relations Specialist',
    'Public Administration Officer', 'Strategic Planning Analyst', 'Policy Research Officer'
  ],
  'Technology': [
    'Software Engineer', 'Data Scientist', 'DevOps Engineer', 'Product Manager',
    'Cloud Architect', 'Security Engineer', 'Full Stack Developer', 'System Administrator',
    'UX/UI Designer', 'Technical Lead', 'Platform Engineer', 'Machine Learning Engineer'
  ]
};

const softSkillsDatabase = [
  'Leadership', 'Communication', 'Problem Solving', 'Analytical Thinking', 'Team Collaboration',
  'Time Management', 'Adaptability', 'Critical Thinking', 'Attention to Detail', 'Customer Focus'
];

const toolsDatabase = {
  'Banking & Financial Services': [
    'SAS', 'R', 'Python', 'SQL', 'MATLAB', 'Tableau', 'Power BI', 'Excel', 'VBA',
    'Moody\'s Analytics', 'Bloomberg Terminal', 'Reuters Eikon'
  ],
  'Healthcare': [
    'Epic', 'Cerner', 'MATLAB', 'R', 'SAS', 'Python', 'Tableau', 'Power BI',
    'CTMS', 'EDC Systems', 'Statistical Software', 'Medical Imaging Software'
  ],
  'Government': [
    'Microsoft Office', 'SharePoint', 'Salesforce', 'SQL', 'Tableau', 'Power BI',
    'Adobe Acrobat', 'Project Management Tools', 'Budget Software'
  ],
  'Technology': [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
    'Git', 'Jenkins', 'MongoDB', 'PostgreSQL'
  ]
};

const certificationsDatabase = {
  'Banking & Financial Services': [
    'FRM (Financial Risk Manager)', 'CFA (Chartered Financial Analyst)', 'CPA (Certified Public Accountant)',
    'ANZIIF', 'RG146', 'CAMS'
  ],
  'Healthcare': [
    'Clinical Research Certification', 'Healthcare Quality Certification', 'Medical Device Certification',
    'FDA Regulatory Certification', 'Clinical Data Management Certification'
  ],
  'Government': [
    'PMP (Project Management Professional)', 'Certified Government Financial Manager',
    'Public Administration Certification', 'Policy Analysis Certificate'
  ],
  'Technology': [
    'AWS Certified Solutions Architect', 'Google Cloud Professional', 'Microsoft Azure Certification',
    'Certified Kubernetes Administrator', 'CompTIA Security+', 'Scrum Master Certification'
  ]
};

const workingFunctionsDatabase = {
  'Banking & Financial Services': [
    'Risk Management', 'Compliance & Legal', 'Investment Management', 'Corporate Banking',
    'Retail Banking', 'Wealth Management', 'Insurance Operations'
  ],
  'Healthcare': [
    'Clinical Research', 'Regulatory Affairs', 'Medical Affairs', 'Healthcare IT',
    'Quality Assurance', 'Clinical Operations', 'Medical Device Development'
  ],
  'Government': [
    'Policy Development', 'Program Management', 'Budget & Finance', 'Public Relations',
    'Legislative Affairs', 'Regulatory Affairs', 'Strategic Planning'
  ],
  'Technology': [
    'Software Development', 'Data & Analytics', 'Infrastructure & DevOps', 'Product Management',
    'Security & Compliance', 'Cloud & Platform', 'Research & Development'
  ]
};

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomDateWithinDays(days: number): string {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * days);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0];
}

// Enhanced similarity calculation for KNN clustering
function calculateJobSimilarity(job1: JobData, job2: JobData): number {
  // Title similarity (30% weight)
  const titleSimilarity = calculateTextSimilarity(job1.jobTitle, job2.jobTitle) * 0.3;
  
  // Skills similarity (25% weight)
  const skillsSimilarity = calculateArraySimilarity(job1.keySkills, job2.keySkills) * 0.25;
  
  // Tools similarity (20% weight)
  const toolsSimilarity = calculateArraySimilarity(job1.toolsTechnologies, job2.toolsTechnologies) * 0.2;
  
  // Experience level similarity (15% weight)
  const experienceSimilarity = (job1.experienceLevel === job2.experienceLevel ? 1 : 0) * 0.15;
  
  // Job type similarity (10% weight)
  const jobTypeSimilarity = (job1.jobType === job2.jobType ? 1 : 0) * 0.1;
  
  return titleSimilarity + skillsSimilarity + toolsSimilarity + experienceSimilarity + jobTypeSimilarity;
}

function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  const words2 = text2.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  
  if (words1.length === 0 || words2.length === 0) return 0;
  
  const intersection = words1.filter(word => words2.includes(word));
  const union = [...new Set([...words1, ...words2])];
  
  return intersection.length / union.length;
}

function calculateArraySimilarity(arr1: string[], arr2: string[]): number {
  if (arr1.length === 0 || arr2.length === 0) return 0;
  
  const set1 = new Set(arr1.map(s => s.toLowerCase()));
  const set2 = new Set(arr2.map(s => s.toLowerCase()));
  
  const intersection = [...set1].filter(x => set2.has(x));
  const union = [...new Set([...set1, ...set2])];
  
  return intersection.length / union.length;
}

// KNN Clustering implementation
function knnClustering(jobs: JobData[], k: number = 20, threshold: number = 0.2): JobData[] {
  const clusters: JobData[][] = [];
  const processed = new Set<number>();
  
  for (let i = 0; i < jobs.length; i++) {
    if (processed.has(i)) continue;
    
    const currentJob = jobs[i];
    const neighbors: { job: JobData; index: number; similarity: number }[] = [];
    
    // Find k nearest neighbors
    for (let j = 0; j < jobs.length; j++) {
      if (i === j || processed.has(j)) continue;
      
      const similarity = calculateJobSimilarity(currentJob, jobs[j]);
      if (similarity >= threshold) {
        neighbors.push({ job: jobs[j], index: j, similarity });
      }
    }
    
    // Sort by similarity and take top k
    neighbors.sort((a, b) => b.similarity - a.similarity);
    const topNeighbors = neighbors.slice(0, k);
    
    // Create cluster with current job and its neighbors
    const cluster = [currentJob];
    processed.add(i);
    
    for (const neighbor of topNeighbors) {
      if (!processed.has(neighbor.index)) {
        cluster.push(neighbor.job);
        processed.add(neighbor.index);
      }
    }
    
    clusters.push(cluster);
  }
  
  // Generate meaningful group names and assign to jobs
  clusters.forEach(cluster => {
    const groupName = generateGroupName(cluster);
    const standardSkills = calculateStandardSkills(cluster);
    
    cluster.forEach(job => {
      job.jobGroup = groupName;
      job.standardSkills = standardSkills;
    });
  });
  
  return jobs;
}

function generateGroupName(cluster: JobData[]): string {
  const titleWords: { [key: string]: number } = {};
  
  // Extract meaningful words from job titles
  cluster.forEach(job => {
    const words = job.jobTitle
      .toLowerCase()
      .split(/\s+/)
      .filter(word => 
        word.length > 3 && 
        !['senior', 'junior', 'lead', 'principal', 'associate', 'assistant', 'manager', 'specialist', 'analyst', 'officer'].includes(word)
      );
    
    words.forEach(word => {
      titleWords[word] = (titleWords[word] || 0) + 1;
    });
  });
  
  // Find most common meaningful words
  const sortedWords = Object.entries(titleWords)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2);
  
  if (sortedWords.length === 0) {
    // Fallback to working function
    const functions = cluster.map(job => job.workingFunction);
    const mostCommonFunction = functions.reduce((a, b, _, arr) => 
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
    );
    return `${mostCommonFunction} Roles`;
  }
  
  const keywords = sortedWords.map(([word]) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  );
  
  return `${keywords.join(' ')} Roles`;
}

function calculateStandardSkills(cluster: JobData[]): string[] {
  const skillCounts: { [key: string]: number } = {};
  const totalJobs = cluster.length;
  
  // Count all skills across the cluster
  cluster.forEach(job => {
    const allSkills = [...job.keySkills, ...job.softSkills];
    allSkills.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });
  
  // Return skills that appear in more than 50% of jobs
  const threshold = Math.ceil(totalJobs * 0.5);
  return Object.entries(skillCounts)
    .filter(([, count]) => count >= threshold)
    .sort(([, a], [, b]) => b - a)
    .map(([skill]) => skill)
    .slice(0, 8); // Limit to top 8 skills
}

export function clusterJobs(jobs: JobData[]): JobData[] {
  return knnClustering(jobs, 20, 0.2);
}

// ✳️ CHANGED: Optimized mock data generation with limit 5000
export function generateMockJobData(
  country: string,
  domain: string,
  limitlessMode: boolean = false
): JobData[] {
  const maxJobs = 5000; // ✳️ Change 1: hard limit
  const jobs: JobData[] = [];

  const countryData = companyData[country] || companyData['USA'];
  const domainData = countryData[domain] || Object.values(countryData)[0];

  const relevantCompanies = domainData.companies;
  const companyTypes = domainData.types;
  const relevantLocations = locationData[country] || ['Location Not Specified'];
  const relevantSkills = skillsDatabase[domain] || skillsDatabase['Technology'];
  const relevantTools = toolsDatabase[domain] || toolsDatabase['Technology'];
  const relevantCerts = certificationsDatabase[domain] || certificationsDatabase['Technology'];
  const relevantFunctions = workingFunctionsDatabase[domain] || workingFunctionsDatabase['Technology'];
  const relevantTitles = jobTitlesDatabase[domain] || jobTitlesDatabase['Technology'];

  const jobPortals = ['LinkedIn', 'Indeed', 'Glassdoor', 'Company Career Portal', 'Monster'];
  const experienceLevels = ['Junior', 'Mid-Level', 'Senior', 'Principal', 'Director'];
  const experienceYears = ['1-2', '2-3', '3-5', '5-7', '7-10', '10+'];
  const jobTypes = ['Full-time', 'Contract'];

  for (let i = 0; i < maxJobs; i++) {
    const company = relevantCompanies[Math.floor(Math.random() * relevantCompanies.length)];
    const job: JobData = {
      jobTitle: relevantTitles[Math.floor(Math.random() * relevantTitles.length)],
      businessDomain: domain,
      companyName: company,
      companyType: companyTypes[company] || 'Organization',
      jobLocation: relevantLocations[Math.floor(Math.random() * relevantLocations.length)],
      jobType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      datePosted: getRandomDateWithinDays(30),
      responsibilities: [
        'Analyze business needs and propose solutions',
        'Ensure regulatory compliance and quality',
        'Collaborate with cross-functional teams'
      ],
      keySkills: getRandomItems(relevantSkills, 5),
      softSkills: getRandomItems(softSkillsDatabase, 4),
      toolsTechnologies: getRandomItems(relevantTools, 4),
      experienceYears: experienceYears[Math.floor(Math.random() * experienceYears.length)],
      experienceLevel: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
      certifications: getRandomItems(relevantCerts, 2),
      educationRequired: "Bachelor's degree in relevant field, Master's preferred",
      industryKeywords: getRandomItems(relevantSkills, 3),
      workingFunction: relevantFunctions[Math.floor(Math.random() * relevantFunctions.length)],
      jobPortalSource: jobPortals[Math.floor(Math.random() * jobPortals.length)],
      sourceUrl: `https://example.com/job/${i + 1}`
    };

    jobs.push(job);
  }

  return jobs;
}


// ✳️ CHANGED: Optimized fallback version with same constraints
function generateFallbackData(
  country: string,
  domain: string,
  jobCount: number,
  fallbackDomain: any
): JobData[] {
  const jobs: JobData[] = [];

  const relevantCompanies = fallbackDomain.companies;
  const companyTypes = fallbackDomain.types;
  const relevantLocations = locationData[country] || ['Location Not Specified'];
  const relevantSkills = skillsDatabase[domain] || skillsDatabase['Technology'];
  const relevantTools = toolsDatabase[domain] || toolsDatabase['Technology'];
  const relevantCerts = certificationsDatabase[domain] || certificationsDatabase['Technology'];
  const relevantFunctions = workingFunctionsDatabase[domain] || workingFunctionsDatabase['Technology'];
  const relevantTitles = jobTitlesDatabase[domain] || jobTitlesDatabase['Technology'];

  const jobPortals = ['LinkedIn', 'Indeed', 'Glassdoor', 'Monster', 'Company Career Portal'];
  const experienceLevels = ['Junior', 'Mid-Level', 'Senior', 'Principal', 'Director'];
  const experienceYears = ['1-2', '2-3', '3-5', '5-7', '7-10', '10+'];
  const jobTypes = ['Full-time', 'Contract'];

  for (let i = 0; i < Math.min(jobCount, 5000); i++) { // ✳️ Change 2: Fallback capped
    const company = relevantCompanies[Math.floor(Math.random() * relevantCompanies.length)];

    const job: JobData = {
      jobTitle: relevantTitles[Math.floor(Math.random() * relevantTitles.length)],
      businessDomain: domain,
      companyName: company,
      companyType: companyTypes[company] || 'Organization',
      jobLocation: relevantLocations[Math.floor(Math.random() * relevantLocations.length)],
      jobType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      datePosted: getRandomDateWithinDays(30),
      responsibilities: [
        'Design and develop scalable solutions',
        'Ensure compliance and best practices',
        'Collaborate with stakeholders across teams'
      ],
      keySkills: getRandomItems(relevantSkills, 5),
      softSkills: getRandomItems(softSkillsDatabase, 4),
      toolsTechnologies: getRandomItems(relevantTools, 4),
      experienceYears: experienceYears[Math.floor(Math.random() * experienceYears.length)],
      experienceLevel: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
      certifications: getRandomItems(relevantCerts, 2),
      educationRequired: "Bachelor's degree in relevant field, Master's preferred",
      industryKeywords: getRandomItems(relevantSkills, 3),
      workingFunction: relevantFunctions[Math.floor(Math.random() * relevantFunctions.length)],
      jobPortalSource: jobPortals[Math.floor(Math.random() * jobPortals.length)],
      sourceUrl: `https://example.com/job/${i + 1}`
    };

    jobs.push(job);
  }

  return jobs;
}

