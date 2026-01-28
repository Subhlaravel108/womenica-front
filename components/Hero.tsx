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
                className="h-full w-full bg-cover bg-center "
                style={{ backgroundImage: `url(${img.src})` }}
              />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        

      
      </div>
    </section>
  );
};

export default Hero;