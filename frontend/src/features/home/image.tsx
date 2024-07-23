import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function Image() {
  const carouselImages = [
    "https://www.matahari.com/media/promo/file/HP_POA2_D2_240716_240724.png",
    "https://www.matahari.com/media/promo/file/LM_A1_PO_D2_240716_240724.png",
    "https://www.matahari.com/media/promo/file/HP_POA4_D2_240720_240724.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mt-10 mx-10 rounded-xl z-[-1]">
      <Slider {...settings}>
        {carouselImages.map((item, index) => (
          <div key={index}>
            <img
              src={item}
              alt={`Slide ${index}`}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
