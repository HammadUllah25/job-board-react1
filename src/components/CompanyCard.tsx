import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

interface CompanyCardProps {
  id: string;
  name: string;
  logo: string;
  description: string;
  officeImages: string[];
}

const CompanyCard = ({
  id,
  name,
  logo,
  description,
  officeImages,
}: CompanyCardProps) => {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-4">
          <LazyLoadImage
            src={logo}
            alt={`${name} logo`}
            effect="blur"
            className="w-16 h-16 rounded-lg object-cover"
            wrapperClassName="flex-shrink-0"
          />
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {officeImages.map((image, index) => (
            <LazyLoadImage
              key={index}
              src={image}
              alt={`${name} office ${index + 1}`}
              effect="blur"
              className="w-full h-24 object-cover rounded-md"
              wrapperClassName="w-full"
            />
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/jobs?company=${id}`} className="w-full">
          <Button className="w-full">View Jobs</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
