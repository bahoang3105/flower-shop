import { Col, Image, Row } from 'antd';
import { useWindowSize } from 'hooks/useWindowSize';
import ImageSvg from 'public/svg';
import { useState } from 'react';
import TextInput from '../AppInput/TextInput';

type HeaderProps = Record<string, never>;

const MINI_SCREEN = 1199;
const NAVBAR_LIST = [
  { key: 2, value: 'Trang chủ' },
  { key: 3, value: 'Bộ sưu tập' },
  { key: 4, value: 'Phân loại' },
  { key: 5, value: 'Bán chạy nhất' },
  { key: 6, value: 'Liên hệ' },
];

const Header: React.FC<HeaderProps> = () => {
  const { width } = useWindowSize();
  const smallScreen = width <= MINI_SCREEN;
  const [searchText, setSearchText] = useState('');

  const handleChangeSearchText = (value: string) => {
    setSearchText(value);
  };

  const handleSearch = () => {};

  const renderNavBar = () =>
    NAVBAR_LIST.map((navbar) => (
      <div key={navbar.key} className='header__navbar__item'>
        {navbar.value}
      </div>
    ));

  return (
    <header className='header'>
      {smallScreen ? (
        <></>
      ) : (
        <Row className='header__main' justify='space-between'>
          <Col className='header__logo center-flex-item'>
            <Image src={ImageSvg.logo} preview={false} width={267} height={41} />
          </Col>
          <Col className='header__navbar center-flex-item'>{renderNavBar()}</Col>
          <Col className='header__search center-flex-item'>
            <TextInput
              className='app-search'
              value={searchText}
              onChange={handleChangeSearchText}
              placeholder='Tìm kiếm hoa'
              onPressEnter={handleSearch}
              prefix={<Image src={ImageSvg.search} preview={false} />}
            />
          </Col>
        </Row>
      )}
    </header>
  );
};

export default Header;
