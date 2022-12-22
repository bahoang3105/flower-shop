import Image from "next/image";
import { useRef } from "react";
import classNames from "classnames";
import Slick from "react-slick";
import LeftArrow from "public/svg/arrow_left_white.svg";
import RightArrow from "public/svg/arrow_right_white.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Slider({
  curSlide,
  setCurSlide,
  children,
  settings,
  lastSlide,
}: {
  curSlide: number;
  lastSlide: number;
  setCurSlide: (value: number) => void;
  children: any;
  settings?: any;
}) {
  const slickRef = useRef<any>();

  const prevSlide = () => {
    if (curSlide > 0) {
      setCurSlide(curSlide - 1);
      slickRef.current.slickGoTo(curSlide - 1);
    }
  };
  const nextSlide = () => {
    if (curSlide < lastSlide) {
      setCurSlide(curSlide + 1);
      slickRef.current.slickGoTo(curSlide + 1);
    }
  };
  const defaultSettings = () => {
    return {
      dots: false,
      infinite: false,
      speed: 100,
      slidesToShow: 8,
      slidesToScroll: 1,
      initialSlide: 0,
      focusOnSelect: true,
      prevArrow: null,
      nextArrow: null,
      centerMode: true,
    };
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        className={classNames("slick-prev-custom", {
          "not-allowed": curSlide === 0,
        })}
        onClick={prevSlide}
      >
        <Image src={LeftArrow} height={13.2} width={7.78} alt="" />
      </div>
      <Slick {...defaultSettings()} {...settings} ref={slickRef}>
        {children}
      </Slick>
      <div
        className={classNames("slick-next-custom", {
          "not-allowed": curSlide === lastSlide,
        })}
        onClick={nextSlide}
      >
        <Image src={RightArrow} height={13.2} width={7.78} alt="" />
      </div>
    </div>
  );
}
