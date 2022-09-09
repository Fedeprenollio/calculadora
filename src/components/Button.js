import React, { useEffect, useRef } from "react";
import { useAppContext } from "./CalculatorState";

export const Button = ({ type, value }) => {
  const { addNumber, addOperation, executeAction } = useAppContext();
  const handleClickButton = () => {
    switch (type) {
      case "number":
        addNumber(parseInt(value));
        break;
      case "operator":
        addOperation(value);
        break;
      case "action":
        executeAction(value);
        break;

      default:
        break;
    }
  };

  const ref = useRef(null);

  const pressKey = (e) => {
    console.log(e.key)
    if (e.key) {
      ref.current.value = e.key;
      let ID = e.key;
      if (e.key === "Enter") {
        ID = "=";
      }
      if (e.key === "Shift") {
        ID = "+/-";
      }
      if (e.key === "Escape") {
        ID = "AC";
      }
      if (e.key === "Backspace") {
        ID = "<==";
      }
      const btn = document.getElementById(ID);
      btn.classList.add("focus");
      setTimeout(() => {
        btn.classList.remove("focus");
      }, 150);
    }

    if (!isNaN(Number(e.key))) {
      addNumber(parseInt(e.key));
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
      e.key === "Escape" ||
      e.key === "+/-" ||
      e.key === "Shift" ||
      e.key === "<==" ||
      e.key === "Backspace" ||
      e.key === "." ||
      e.key === "=" ||
      e.key === "Enter"
    ) {
      executeAction(e.key);
    }
  };
  useEffect(() => {
    ref.current.focus();
  }, []);
  return (
    <button
      id={value}
      value={value}
      onClick={handleClickButton}
      className={"calculatorButton"}
      ref={ref}
      tabIndex="-1"
      onKeyDown={pressKey}
    >
      {value}
    </button>
  );
};
