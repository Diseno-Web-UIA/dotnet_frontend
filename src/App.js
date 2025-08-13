import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Breadcrumb, Layout, theme } from 'antd';
import './App.css';
import Calculadora from './componentes/calculadora/calculadora';
import Navbar from './componentes/Navbar/Navbar';
import RegistroUnificado from './Paginas/RegistroUnificado';

import Home from './Paginas/Home';
import RegistroCliente from './Paginas/RegistroCliente';
import ListaClientes from './Paginas/ListaClientes';
import ExportarDatos from './Paginas/ExportarDatos';
import LeerArchivos from './Paginas/LeerArchivos';

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Router>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: '0 50px' }}>
         {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
            */}

          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
              backgroundImage: 'url(/bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/registro-cliente" element={<RegistroCliente />} />
              <Route path="/lista-clientes" element={<ListaClientes />} />
              <Route path="/exportar" element={<ExportarDatos />} />
              <Route path="/leer-archivos" element={<LeerArchivos />} />
              <Route path="/registro" element={<RegistroUnificado />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </Content>

        <Calculadora />

        <Footer style={{ textAlign: 'center' }}>
          Universidad Internacional de Las Américas, Diseño Web &copy; 2025 Creado con 💗 por el <b>Grupo 1</b>
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;