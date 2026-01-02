import { Card } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="w-full h-56 md:h-64 bg-muted animate-pulse" />
        <div className="absolute top-3 left-3">
          <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="h-6 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 bg-muted animate-pulse rounded w-3/4 mb-3" />
        <div className="h-5 bg-muted animate-pulse rounded w-1/2 mb-4" />
        <div className="flex gap-2 mt-auto">
          <div className="flex-1 h-10 bg-muted animate-pulse rounded" />
          <div className="flex-1 h-10 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;






