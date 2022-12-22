import React, { useState } from 'react';
import TextInput from '@components//AppInput/TextInput';
import ImageSvg from 'public/svg';
import { Drawer, Image } from 'antd';
import MenuIcon from 'public/svg/menu_icon';
import { NAVBAR_LIST } from '..';

const SmallHeader = ({ onSubmitSearch, setSearchText, searchText }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleChangeSearchText = (value: string) => {
    setSearchText(value);
  };

  return (
    <>
      <div className='small-header'>
        <TextInput
          className='app-search'
          value={searchText}
          onChange={handleChangeSearchText}
          placeholder='Tìm kiếm hoa'
          onPressEnter={onSubmitSearch}
          prefix={
            <div onClick={onSubmitSearch}>
              <Image src={ImageSvg.search} preview={false} />
            </div>
          }
        />
        <div onClick={() => setShowMenu(true)} className='small-header__menu-icon'>
          <MenuIcon />
        </div>
      </div>
      <Drawer className='small-header__nav-bar' placement='right' onClose={() => setShowMenu(false)} open={!!showMenu}>
        {NAVBAR_LIST.map(({ key, value, url }) => (
          <h1 className='small-header__nav-bar__item'>
            <a key={key} href={url}>
              {value}
            </a>
          </h1>
        ))}
      </Drawer>
    </>
  );
};

export default SmallHeader;
