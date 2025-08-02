import React, { useState } from 'react';
import { create, all } from 'mathjs';
import './calculadora.css';

const Calculadora = () => {
  const math = create(all, {});
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
      setCalcDato((prev) => prev + val);
      return;
    }

    if (operators.includes(val)) {
      if (calcDato === '' || operators.includes(lastChar)) return;
      setCalcDato((prev) => prev + val);
      return;
    }

    setCalcDato((prev) => prev + val);
  };


const calculate = () => {
  try {
    if (!calcDato.trim()) return;
    const result = math.evaluate(calcDato);
    if (isNaN(result)) {
      alert('Resultado inválido');
      setCalcDato('');
      return;
    }

    setCalcDato(result.toString());
  } catch (e) {
    alert('Error: ' + e.message);
    setCalcDato('');
  }
};


  const clearDisplay = () => {
    setCalcDato('');
  };

  return (
    <>
      {/* Botón flotante 🧮 */}
      <div
        id="calcBoton"
        onClick={() => setShowCalc((prev) => !prev)}
      >
        🧮
      </div>

      {/* Calculadora visible si showCalc === true */}
      {showCalc && (
        <div id="calculadora">
          <input
            type="text"
            id="calcmostrar"
            value={calcDato}
            readOnly
          />
          <div className="calc-grid">
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
    </>
  );
};

export default Calculadora;
