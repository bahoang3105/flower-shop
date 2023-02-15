import React, { useState } from "react";
import TextInput from "components//AppInput/TextInput";
import ImageSvg from "public/svg";
import Image from "next/image";
import { Collapse, Drawer } from "antd";
// import MenuIcon from "public/svg/menu_icon";
import { NAVBAR_LIST } from "..";
import Link from "next/link";
import { useRouter } from "next/router";
import { APP_URL } from "constants/common";

const { Panel } = Collapse;

const SmallHeader = ({ onSubmitSearch, setSearchText, searchText }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const handleChangeSearchText = (value: string) => {
    setSearchText(value);
  };

  return (
    <>
      <div className="small-header">
        {!(router?.route === APP_URL.PRODUCT_LIST) && (
          <TextInput
            className="app-search"
            value={searchText}
            onChange={handleChangeSearchText}
            placeholder="Tìm kiếm hoa"
            onPressEnter={onSubmitSearch}
            prefix={
              <div onClick={onSubmitSearch}>
                <Image src={ImageSvg.search} alt="" />
              </div>
            }
          />
        )}

        <div
          onClick={() => setShowMenu(true)}
          className="small-header__menu-icon"
        >
          <Image src={ImageSvg.expand} alt="" />
        </div>
      </div>
      <Drawer
        className="small-header__nav-bar"
        placement="right"
        onClose={() => setShowMenu(false)}
        open={!!showMenu}
        title={<Image src={ImageSvg.logo} alt="" width={267} height={41} />}
        closeIcon={<Image src={ImageSvg.right} alt="" height={20} />}
      >
        {NAVBAR_LIST.map(({ key, value, url, anchor }) => (
          <h1 key={key} className="small-header__nav-bar__item">
            {/* <a href={url}>{value}</a> */}
            <Link
              key={key}
              href={anchor ? url + anchor : url}
              onClick={() => {
                setShowMenu(false);
              }}
              className="header__navbar__item app_link"
            >
              {value}
            </Link>
          </h1>
        ))}
      </Drawer>
    </>
  );
};

export default SmallHeader;
