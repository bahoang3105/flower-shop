import { Col, Row } from "antd";
import Image from "next/image";
import { APP_URL } from "constants/common";
import { useWindowSize } from "hooks/useWindowSize";
import { useRouter } from "next/router";
import ImageSvg from "public/svg";
import { useEffect, useState } from "react";
import TextInput from "../AppInput/TextInput";
import SmallHeader from "./SmallHeader";

type HeaderProps = Record<string, never>;

const MINI_SCREEN = 1199;
export const NAVBAR_LIST = [
  { key: 2, value: "Trang chủ", url: APP_URL.HOME },
  { key: 3, value: "Bộ sưu tập", url: "" },
  { key: 4, value: "Phân loại", url: "" },
  { key: 5, value: "Bán chạy nhất", url: APP_URL.PRODUCT_LIST },
  { key: 6, value: "Liên hệ", url: "" },
];

const Header: React.FC<HeaderProps> = () => {
  const { width } = useWindowSize();
  const [smallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    setSmallScreen(width <= MINI_SCREEN);
  }, []);

  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleChangeSearchText = (value: string) => {
    setSearchText(value);
  };

  const handleSearch = () => {
    const endpoint = {
      pathname: APP_URL.PRODUCT_LIST,
      query: { keyword: searchText },
    };
    router.push(endpoint);
  };

  const renderNavBar = () =>
    NAVBAR_LIST.map(({ key, value, url }) => (
      <a key={key} href={url} className="header__navbar__item app_link">
        {value}
      </a>
    ));

  return (
    <header className="header">
      <div className="header__container">
        {smallScreen ? (
          <SmallHeader
            setSearchText={setSearchText}
            searchText={searchText}
            onSubmitSearch={handleSearch}
          />
        ) : (
          <Row>
            <Col flex="0 0 267px" className="center-flex-item">
              <Image src={ImageSvg.logo} alt="" width={267} height={41} />
            </Col>
            <Col flex="1" className="header__navbar center-flex-item">
              <div className="header__navbar__content">{renderNavBar()}</div>
            </Col>
            <Col flex="0 0 267px" className="header__search center-flex-item">
              <TextInput
                className="app-search"
                value={searchText}
                onChange={handleChangeSearchText}
                placeholder="Tìm kiếm hoa"
                onPressEnter={handleSearch}
                prefix={
                  <div onClick={handleSearch}>
                    <Image src={ImageSvg.search} alt="" />
                  </div>
                }
              />
            </Col>
          </Row>
        )}
      </div>
    </header>
  );
};

export default Header;
