import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const CompanyCard = lazy(() => import("@/components/CompanyCard"));

const companies = [
  {
    id: "technova",
    name: "TechNova",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop",
    description:
      "Leading innovation in cloud computing and AI solutions. We're building the future of enterprise technology.",
    officeImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "codecraft",
    name: "CodeCraft",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=200&fit=crop",
    description:
      "Crafting exceptional software experiences for startups and enterprises. Join our team of passionate developers.",
    officeImages: [
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "nexthire",
    name: "NextHire",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    description:
      "Revolutionizing recruitment with AI-powered talent matching. Help us connect the right people to the right opportunities.",
    officeImages: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "datastream",
    name: "DataStream",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
    description:
      "Transform your data into actionable insights with our cutting-edge analytics platform. We're seeking data scientists and engineers.",
    officeImages: [
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "cloudpeak",
    name: "CloudPeak",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop",
    description:
      "Scaling businesses with reliable cloud infrastructure. Join our mission to make cloud computing accessible to everyone.",
    officeImages: [
      "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "pixelforge",
    name: "PixelForge",
    logo: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=200&h=200&fit=crop",
    description:
      "Creating stunning digital experiences through innovative design and development. We're looking for creative minds to join our team.",
    officeImages: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1522071901873-411886a10004?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "quantumleap",
    name: "QuantumLeap",
    logo: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=200&h=200&fit=crop",
    description:
      "Pushing the boundaries of quantum computing and advanced algorithms. Join us in solving tomorrow's challenges today.",
    officeImages: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1599658880436-c61792e70672?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "greentech",
    name: "GreenTech Solutions",
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    description:
      "Building sustainable technology solutions for a greener future. Help us make a positive impact on the environment.",
    officeImages: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=200&fit=crop",
    ],
  },
  {
    id: "cybershield",
    name: "CyberShield",
    logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop",
    description:
      "Protecting businesses with next-generation cybersecurity solutions. Join our team of security experts and ethical hackers.",
    officeImages: [
      "https://images.unsplash.com/photo-1558403194-611308249627?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1550439062-609e1531270e?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop",
    ],
  },
];

const CompanyCardSkeleton = () => (
  <Card>
    <CardHeader className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
      <Skeleton className="h-12 w-full" />
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="w-full h-24 rounded-md" />
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);

const Companies = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Companies</h1>
        <p className="text-muted-foreground text-lg">
          Discover amazing companies looking for talented people like you
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Suspense key={company.id} fallback={<CompanyCardSkeleton />}>
            <CompanyCard {...company} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default Companies;
