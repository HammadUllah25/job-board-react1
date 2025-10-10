export interface MockJob {
  id: string;
  title: string;
  company: string;
}

// Generate 100+ mock jobs
export const mockJobs: MockJob[] = Array.from({ length: 120 }, (_, i) => {
  const titles = [
    "Senior Frontend Developer",
    "Backend Engineer",
    "Full Stack Developer",
    "DevOps Engineer",
    "UI/UX Designer",
    "Product Manager",
    "Data Scientist",
    "Machine Learning Engineer",
    "QA Engineer",
    "Solutions Architect",
    "Cloud Engineer",
    "Mobile Developer",
    "Security Engineer",
    "Technical Lead",
    "Engineering Manager",
  ];

  const companies = [
    "TechNova",
    "CodeCraft",
    "NextHire",
    "DataStream",
    "CloudPeak",
    "PixelForge",
    "QuantumLeap",
    "GreenTech Solutions",
    "CyberShield",
    "InnovateLab",
    "ByteWorks",
    "NexusTech",
    "VectorIO",
    "StreamLine",
    "Apex Digital",
  ];

  return {
    id: `job-${i + 1}`,
    title: titles[i % titles.length],
    company: companies[i % companies.length],
  };
});
