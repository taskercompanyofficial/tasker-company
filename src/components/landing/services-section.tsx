import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL } from "@/lib/apiEndPoints";
import { CategoriesType } from "@/types";
import { getImageUrl } from "@/lib/utils";

export default async function ServicesSection() {
  const endPoint = API_URL + "/fetch-categories-ids";
  const categoriesData = await fetchData({
    endPoint,
  });
  const categories = categoriesData.data as CategoriesType[];
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={getImageUrl(category.image)}
                  alt={category.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {category.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {category.keywords.split(",").map((keyword, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
