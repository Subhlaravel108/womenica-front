import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
  <section className="relative min-h-[70vh] sm:min-h-[60vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-6 sm:pt-10 lg:pt-20">
  
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url('/hero-bg.jpg')` }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/80 to-transparent" />
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="max-w-xl lg:max-w-2xl">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-rose-light text-primary mb-4 sm:mb-6 animate-fade-up ">
        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="text-xs sm:text-sm font-medium">
          Curated Collections for You
        </span>
      </div>

      {/* Heading */}
      <h1
        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-4 sm:mb-6 animate-fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        Discover Your
        <span className="text-gradient block">Perfect Style</span>
      </h1>

      {/* Description */}
      <p
        className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-md animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        Explore our handpicked collection of beautiful sarees, stunning fashion,
        premium beauty products, and elegant home decor from Amazon India.
      </p>

      {/* Buttons */}
      <div
  className="flex flex-row gap-3 sm:gap-4 animate-fade-up"
  style={{ animationDelay: "0.3s" }}
>
  <Button
    variant="hero"
    size="lg"
    className="w-1/2 sm:w-auto"
    asChild
  >
    <a href="#categories" className="flex items-center justify-center text-xs sm:text-lg">
      Explore Collections
      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
    </a>
  </Button>

  <Button
    variant="outline"
    size="lg"
    className="w-1/2 sm:w-auto  border-black"
    asChild
  >
    <a href="#products" className="flex items-center justify-center">
      View Trending
    </a>
  </Button>
</div>


      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 animate-fade-up"
        style={{ animationDelay: "0.4s" }}
      >
        <div>
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">
            1000+
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Products
          </p>
        </div>

        <div>
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">
            50+
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Categories
          </p>
        </div>

        <div>
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">
            Best
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Deals Daily
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Fade */}
  <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent" />
</section>

  );
};

export default Hero;
