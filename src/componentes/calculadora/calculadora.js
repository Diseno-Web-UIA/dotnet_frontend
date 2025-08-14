  import React, { useState, useRef } from 'react';
  import { create, all } from 'mathjs';
  import './calculadora.css';
  import { CSSTransition } from 'react-transition-group';

  const Calculadora = () => {
    const math = create(all, {});
    const [showCalc, setShowCalc] = useState(false);
    const [calcDato, setCalcDato] = useState('');
    const [resultClass, setResultClass] = useState(''); // Nueva variable para la clase del resultado
    const calcRef = useRef(null); 

    const press = (val) => {
      const operators = ['+', '*', '/', '^'];
      const lastChar = calcDato.slice(-1);

      if (calcDato === 'Error') {
        setCalcDato(val);
        setResultClass(''); // Resetear la clase del resultado
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
        
        // Verificar división por cero
        if (calcDato.includes('/0') || calcDato.includes('/ 0')) {
          alert('Error: No se puede dividir por cero');
          setCalcDato('');
          setResultClass('');
          return;
        }
        
        const result = math.evaluate(calcDato);
        if (isNaN(result)) {
          alert('Resultado inválido');
          setCalcDato('');
          setResultClass('');
          return;
        }
        
        // Determinar la operación realizada para aplicar el color correspondiente
        let operationClass = '';
        if (calcDato.includes('+')) {
          operationClass = 'result-sum';
        } else if (calcDato.includes('-')) {
          operationClass = 'result-subtract';
        } else if (calcDato.includes('*')) {
          operationClass = 'result-multiply';
        } else if (calcDato.includes('/')) {
          operationClass = 'result-divide';
        } else if (calcDato.includes('^')) {
          operationClass = 'result-power';
        }
        
        // Restar 10 del resultado como se solicita
        const finalResult = result - 10;
        setCalcDato(finalResult.toString());
        setResultClass(operationClass); // Aplicar la clase del resultado
      } catch (e) {
        alert('Error: ' + e.message);
        setCalcDato('');
        setResultClass('');
      }
    };

    const clearDisplay = () => {
      setCalcDato('');
      setResultClass(''); // Resetear la clase del resultado
    };

    return (
      <>
        <div id="calcBoton" onClick={() => setShowCalc((prev) => !prev)}>
          🧮
        </div>

 
        <CSSTransition
          in={showCalc}
          timeout={300}
          classNames="calculadora"
          unmountOnExit
          nodeRef={calcRef} 
        >
          <div id="calculadora" ref={calcRef}>
            <input
              type="text"
              id="calcmostrar"
              className={resultClass} // Aplicar la clase del resultado
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
                      className={`calc-btn ${btn === '+' ? 'operation-sum' : 
                                               btn === '-' ? 'operation-subtract' : 
                                               btn === '*' ? 'operation-multiply' : 
                                               btn === '/' ? 'operation-divide' : ''}`}
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
        </CSSTransition>
      </>
    );
  };

  export default Calculadora;
