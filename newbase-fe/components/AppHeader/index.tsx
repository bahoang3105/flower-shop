import { Col, Row } from "antd";
import Image from "next/image";
import { APP_URL } from "constants/common";
import { useWindowSize } from "hooks/useWindowSize";
import { useRouter } from "next/router";
import ImageSvg from "public/svg";
import { useEffect, useState } from "react";
import TextInput from "../AppInput/TextInput";
import SmallHeader from "./SmallHeader";
import { scrollToElement } from "utils/helper";

type HeaderProps = Record<string, never>;

export const CONTACT_SECTION_ANCHOR = "#contact-section";
export const COLLECTION_SECTION_ANCHOR = "#collection-section";

const MINI_SCREEN = 1000;
export const NAVBAR_LIST = [
  { key: 2, value: "Trang chủ", url: APP_URL.HOME },
  {
    key: 3,
    value: "Bộ sưu tập",
    url: APP_URL.HOME,
    anchor: COLLECTION_SECTION_ANCHOR,
  },
  { key: 4, value: "Phân loại", url: APP_URL.PRODUCT_LIST },
  {
    key: 5,
    value: "Liên hệ",
    url: APP_URL.HOME,
    anchor: CONTACT_SECTION_ANCHOR,
  },
];

const Header: React.FC<HeaderProps> = () => {
  const { width } = useWindowSize();
  const router = useRouter();
  const [smallScreen, setSmallScreen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const isHiddenSearchInput = router?.route === APP_URL.PRODUCT_LIST;

  useEffect(() => {
    setSmallScreen(width <= MINI_SCREEN);
  }, [width]);

  useEffect(() => {
    window.scrollTo({ top: 1503, behavior: "smooth" });
    if (router?.asPath?.includes(CONTACT_SECTION_ANCHOR)) {
      setTimeout(() => {
        scrollToElement({ id: CONTACT_SECTION_ANCHOR, yOffset: -80 });
      }, 100);
    }
    if (router?.asPath?.includes(COLLECTION_SECTION_ANCHOR)) {
      setTimeout(() => {
        scrollToElement({ id: COLLECTION_SECTION_ANCHOR, yOffset: -80 });
      }, 100);
    }
  }, [router]);

  const handleChangeSearchText = (value: string) => {
    setSearchText(value);
  };

  const handleSearch = () => {
    const endpoint = {
      pathname: APP_URL.PRODUCT_LIST,
      query: { keyword: searchText },
    };
    router.push(endpoint);
    setSearchText("");
  };

  const renderNavBar = () =>
    NAVBAR_LIST.map(({ key, value, url, anchor }) => {
      if (key === 5 || key === 3) {
        return (
          <div
            key={key}
            onClick={() => {
              router.push(`${url}${anchor}`);
            }}
            className="header__navbar__item app_link"
          >
            {value}
          </div>
        );
      }
      return (
        <a key={key} href={url} className="header__navbar__item app_link">
          {value}
        </a>
      );
    });

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
            {!isHiddenSearchInput && (
              <Col flex="0 0 267px" className="header__search center-flex-item">
                <TextInput
                  className="app-search"
                  value={searchText}
                  onChange={handleChangeSearchText}
                  placeholder="Tìm kiếm hoa"
                  onPressEnter={handleSearch}
                  prefix={
                    <div>
                      <Image src={ImageSvg.search} alt="" />
                    </div>
                  }
                />
              </Col>
            )}
          </Row>
        )}
      </div>
    </header>
  );
};

export default Header;
