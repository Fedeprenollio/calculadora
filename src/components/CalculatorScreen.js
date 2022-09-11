import React from "react";
import { useAppContext } from "./CalculatorState";

export const CalculatorScreen = () => {
  const { memory, operation, currentValue } = useAppContext();
 console.log(memory)
  return (
    <div className="calculatorScreen">
      <h2 style={{textAlign: "center"}}>Calculadora Javascript </h2>
      <div className="calculatorCurrentValue">
        <span style={{ fontSize: "1rem" }}>Resultado</span> {parseFloat(memory.join(""))}
      </div>
      <hr />
      <div>Operación: <b style={{ fontSize: "3rem" }}>{operation}</b>  </div>

        <div className="calculatorCurrentValue">{(currentValue)}</div>
        {/* <div className="calculatorCurrentValue">{parseFloat(currentValue.join(""))}</div> */}
    
     
    </div>
  );
};
