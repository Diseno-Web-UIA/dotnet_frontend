import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './App.css';
import { create, all } from 'mathjs';

const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 3 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const math = create(all, {});

  // Calculator state
  const [showCalc, setShowCalc] = useState(false);
  const [calcDato, setCalcDato] = useState('');

  const press = (val) => {
    const operators = ['+', '*', '/', '^'];
    const lastChar = calcDato.slice(-1);

    if (calcDato === 'Error') {
      setCalcDato(val);
      return;
    }

    if (val === '-') {
      // Siempre permitimos '-' para negativos y dobles signos menos
      setCalcDato((prev) => prev + val);
      return;
    }

    if (operators.includes(val)) {
      // Otros operadores solo si el último no es operador ni vacío
      if (calcDato === '' || ['+', '-', '*', '/', '^'].includes(lastChar)) {
        return; // ignorar operador inválido
      }
      setCalcDato((prev) => prev + val);
      return;
    }

    // Para números y otros caracteres válidos
    setCalcDato((prev) => prev + val);
  };

  const calculate = () => {
    try {
      if (!calcDato.trim()) return;

      const result = math.evaluate(calcDato);
      setCalcDato(result !== undefined ? result.toString() : '');
    } catch (e) {
      setCalcDato('Error');
    }
  };

  const clearDisplay = () => {
    setCalcDato('');
  };
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            position: 'relative',
          }}
        >
          {/* Botón flotante 🧮 */}
          <div
            id="calcBoton"
            onClick={() => setShowCalc((prev) => !prev)}
            style={{
              position: 'fixed',
              bottom: '25px',
              right: '25px',
              width: '60px',
              height: '60px',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '50%',
              fontSize: '30px',
              textAlign: 'center',
              lineHeight: '60px',
              cursor: 'pointer',
              boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
              zIndex: 1000,
            }}
          >
            🧮
          </div>

          {/* Calculadora visible si showCalc === true */}
          {showCalc && (
            <div
              id="calculadora"
              style={{
                position: 'fixed',
                bottom: '100px',
                right: '25px',
                width: '260px',
                padding: '15px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                zIndex: 1000,
              }}
            >
              <input
                type="text"
                id="calcmostrar"
                value={calcDato}
                readOnly
                style={{
                  width: '100%',
                  marginBottom: '8px',
                  fontSize: '1.2rem',
                  textAlign: 'right',
                  padding: '5px',
                }}
              />
              <div
                className="calc-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px',
                }}
              >
                {['7', '8', '9', '/',
                  '4', '5', '6', '*',
                  '1', '2', '3', '-',
                  '0', '.', '=', '+'].map((btn, idx) =>
                    btn === '=' ? (
                      <button
                        key={idx}
                        className="calc-btn"
                        onClick={calculate}
                        style={{ fontWeight: 'bold' }}
                      >
                        {btn}
                      </button>
                    ) : (
                      <button
                        key={idx}
                        className="calc-btn"
                        onClick={() => press(btn)}
                      >
                        {btn}
                      </button>
                    )
                  )}
                <button
                  className="calc-btn clear"
                  onClick={clearDisplay}
                  style={{
                    gridColumn: 'span 4',
                    background: '#787FF6',
                    color: '#fff',
                  }}
                >
                  C
                </button>
              </div>
            </div>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default App;
