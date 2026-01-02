import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

const CategoryCard = ({ title, description, icon: Icon, image }: CategoryCardProps) => {
  return (
    <div className="group block cursor-pointer">
      <Card variant="elevated" className="overflow-hidden h-full">
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/90 text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary-foreground">
                {title}
              </h3>
            </div>
            <p className="text-sm text-primary-foreground/80">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CategoryCard;
