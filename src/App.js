import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Breadcrumb, Layout, theme } from 'antd';
import './App.css';
import Calculadora from './componentes/calculadora/calculadora';
import Navbar from './componentes/Navbar/Navbar';
import Registro from './Paginas/Registro';
import Share from './Paginas/Share';

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
              }}
          >
            <Routes>
              <Route path="/registro" element={<Registro />} />
              <Route path="/share" element={<Share />} />
              <Route path="*" element={<Registro />} />
            </Routes>
          </div>
        </Content>

        <Calculadora />

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
