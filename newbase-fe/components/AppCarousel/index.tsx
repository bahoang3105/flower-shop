import React, { useEffect, useState } from "react";
import cx from "classnames";
import NextBtnSVG from "public/svg/next-btn";
import PrevBtnSVG from "public/svg/prev-btn";
import { Image } from "antd";
import ImageNext from "next/image";
import PublicImage from "public/images";

const NAV_ACTION_KEY = {
  PREV: "PREV",
  NEXT: "NEXT",
};

function AppCarousel(props: any) {
  const slidesPerView = 1;
  const { list = [], numberItemPerView = 5, onChange } = props || {};
  const [currentIndex, setCurrentIndex] = useState<any>(1);
  const [translateIndex, setTranslateIndex] = useState<any>(0);

  const itemWidth = 100 / numberItemPerView;

  useEffect(() => {
    if (onChange) {
      onChange(list[currentIndex + translateIndex - 1]);
    }
  }, [currentIndex, translateIndex, list]);

  const onSlide = (key: any) => {
    if (key === NAV_ACTION_KEY.PREV) {
      setCurrentIndex((prev: any) => {
        if (prev === 1) {
          setTranslateIndex((prev: any) => {
            if (translateIndex === 0) {
              return prev;
            }
            return (prev -= 1);
          });
          return prev;
        }
        return (prev -= 1);
      });
    }
    if (key === NAV_ACTION_KEY.NEXT) {
      setCurrentIndex((prev: any) => {
        const isMax = prev === numberItemPerView || prev === list?.length;
        if (isMax) {
          setTranslateIndex((prev: any) => {
            if (numberItemPerView + prev >= list?.length) {
              return prev;
            }
            return (prev += slidesPerView);
          });
          return prev;
        }
        return (prev += slidesPerView);
      });
    }
  };

  return (
    <div className="app-multi-carousel">
      <div className="app-multi-carousel__navigate-btn nav-next-btn center-flex-item">
        <button
          className="center-flex-item"
          onClick={() => onSlide(NAV_ACTION_KEY.PREV)}
        >
          <PrevBtnSVG />
        </button>
      </div>
      <div className="app-multi-carousel__item-group">
        <div
          style={{ transform: `translateX(-${translateIndex * itemWidth}%)` }}
          className="app-multi-carousel__item-group__item-list"
        >
          {list?.map((url: any, index: number) => {
            return (
              <div
                key={url + index}
                style={{ width: `${itemWidth}%` }}
                className={cx(
                  "app-multi-carousel__item-group__item cursor-pointer",
                  {
                    isSelecting: index + 1 - translateIndex === currentIndex,
                  }
                )}
                onClick={() => {
                  setCurrentIndex(index + 1 - translateIndex);
                }}
              >
                <div className="img-wrap">
                  {url ? (
                    <Image src={url} preview={false} alt="" />
                  ) : (
                    <ImageNext
                      className="app-multi-carousel__item-group__item__blank-img"
                      src={PublicImage?.blankImg}
                      alt=""
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="app-multi-carousel__navigate-btn nav-next-btn center-flex-item">
        <button
          className="center-flex-item"
          onClick={() => onSlide(NAV_ACTION_KEY.NEXT)}
        >
          <NextBtnSVG />
        </button>
      </div>
    </div>
  );
}

export default AppCarousel;
