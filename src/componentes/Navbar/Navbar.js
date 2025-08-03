import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { BiData } from 'react-icons/bi';



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
    <div className="navbar-container">
      {/* Logo a la izquierda */}
      <div className="logo-container">
        <BiData size={28} color="#787FF6" />
      </div>

      {/* Menú de navegación a la derecha */}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['registro']}
        items={items}
        onClick={handleClick}
      />
    </div>
  );
};
export default Navbar;
