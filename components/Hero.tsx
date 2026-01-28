"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { heroImages } from "@/lib/heroImages";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const Hero = () => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[73vh] flex items-center justify-center overflow-hidden pt-6 sm:pt-10 lg:pt-20 ">

      {/* 🔹 Background Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          speed={1000}
          loop
          className="h-full w-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {heroImages.map((img: any, index: any) => (
            <SwiperSlide key={index}>
             <Link href={`/category/${img.url}`} aria-label="Shop Now"> 
               <div
                className="h-full w-full bg-cover"
                style={{ backgroundImage: `url(${img.src})` }}
              />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-black/0 z-10" /> */}

        {/* 🔹 Control Buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-3 md:gap-4">
          {heroImages.map((_, index) => (
            <Button
              key={index}
              variant={activeIndex === index ? "default" : "outline"}
              size="sm"
              className={`h-2 w-8 sm:w-10 p-0 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? "bg-primary scale-110" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => handleButtonClick(index)}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default Hero;