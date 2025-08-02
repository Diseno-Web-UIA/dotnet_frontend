import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const items = [
  { key: 'registro', label: 'Registro' },
  { key: 'share', label: 'Share' },
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/${e.key}`);
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['registro']}
      items={items}
      onClick={handleClick}
    />
  );
};

export default Navbar;
