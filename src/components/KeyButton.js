import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "./CalculatorState";

export const KeyButton = () => {
  const { addNumber, addOperation, executeAction } = useAppContext();

  
  let newValue;
  document.body.addEventListener("keydown", (e) => {
   
    ref.current.focus();
    
  });
  const mierda = (e) => {
    newValue = e.key;
    if (!isNaN(Number(e.key))) {
      addNumber(e.key);
    } else if (
      e.key === "+" ||
      e.key === "-" ||
      e.key === "/" ||
      e.key === "*" ||
      e.key === "%"
    ) {
      addOperation(e.key);
    } else if (
      e.key === "AC" ||
      e.key === "+/-" ||
      e.key === "<==" ||
      e.key === "." ||
      e.key === "=" ||
      e.key === "Enter"
    ) {
      executeAction(e.key);
    }
  };
  useEffect(() => {
    ref.current.focus();
  }, [newValue]);

  const ref = useRef(null);

  return (
    <div
      className="calculatorContainer"
      ref={ref}
      tabIndex="-1"
      onKeyDown={mierda}
    >
      Usar teclado{" "}
    </div>
  );
};
