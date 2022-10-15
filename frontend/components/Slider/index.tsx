import Image from 'next/image';
import { useRef } from 'react';
import classNames from 'classnames';
import Slick from 'react-slick';
import LeftArrow from 'public/svg/arrow_left_white.svg';
import RightArrow from 'public/svg/arrow_right_white.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Slider({
  curSlide,
  lastSlide,
  setCurSlide,
  children,
  settings,
  curPageThumb,
  setCurPageThumb,
  hasNextPage,
  handleGetMore,
  pageSize,
  slidesPerPage = 8,
}: {
  curSlide: number;
  lastSlide: number;
  setCurSlide: (value: number) => void;
  children: any;
  settings?: any;
  curPageThumb: number;
  setCurPageThumb: any;
  hasNextPage: boolean;
  handleGetMore: any;
  pageSize: number;
  slidesPerPage?: number;
}) {
  const slickRef = useRef<any>();
  const firstSlide = 0;

  const prevSlide = () => {
    if (curSlide > firstSlide) {
      setCurSlide(curSlide - 1);
      slickRef.current.slickGoTo(curSlide - 1);
    } else if (curPageThumb > 0) {
      setCurPageThumb(curPageThumb - 1);
      setCurSlide(slidesPerPage - 1);
      slickRef.current.slickGoTo(slidesPerPage - 1);
    }
  };
  const nextSlide = () => {
    if (curSlide < lastSlide) {
      setCurSlide(curSlide + 1);
      slickRef.current.slickGoTo(curSlide + 1);
    }
    if (curSlide === lastSlide - 1 && curPageThumb === pageSize - 1 && hasNextPage) {
      handleGetMore();
      slickRef.current.slickGoTo(firstSlide);
    }
    if (curSlide === lastSlide && curPageThumb < pageSize - 1) {
      setCurPageThumb(curPageThumb + 1);
      setCurSlide(firstSlide);
      slickRef.current.slickGoTo(firstSlide);
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
    <div style={{ display: 'flex' }}>
      <div
        className={classNames('slick-prev-custom', { 'not-allowed': curPageThumb === 0 && curSlide === firstSlide })}
        onClick={prevSlide}
      >
        <Image src={LeftArrow} height={13.2} width={7.78} />
      </div>
      <Slick {...defaultSettings()} {...settings} ref={slickRef}>
        {children}
      </Slick>
      <div
        className={classNames('slick-next-custom', {
          'not-allowed': curPageThumb === pageSize - 1 && curSlide === lastSlide,
        })}
        onClick={nextSlide}
      >
        <Image src={RightArrow} height={13.2} width={7.78} />
      </div>
    </div>
  );
}
