import React, { createContext, useContext, useState } from "react";
const AppContext = createContext({
  memory: null,
  operation: null,
  currentValue: 0,
  isDecimal: null,
  // method
  addNumber: (value) => {},
  addOperation: (operation) => {},
  getResult: () => {},
  executeAction: (action) => {},
});

export const CalculatorState = ({ children }) => {
  const [memory, setMemory] = useState(null);
  const [operation, setOperation] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [isReset, setIsReset] = useState(true);
  const [isDecimal, setIsDecimal] = useState(false);

  const handleAddNumber = (value) => {
    if (isReset) {
      if (value === ".") {
        setIsDecimal(true);
      } else {
        const point = isDecimal ? "." : "";
        const newValue = currentValue.toString() + point + value.toString();
        setCurrentValue(parseFloat(newValue));
        setIsReset(false);
        setIsDecimal(false);
      }
    } else {
      if (value === ".") {
        setIsDecimal(true);
      } else {
        const point = isDecimal ? "." : "";
        const newValue = currentValue.toString() + point + value.toString();
        setCurrentValue(parseFloat(newValue));
        setIsDecimal(false);
      }
    }
  };
  const handleAddOperation = (op) => {
    if (currentValue) {
      if (operation) {
        handleGetResult();
        setOperation(op);
      } else {
        setOperation(op);
        setMemory(currentValue);
        setCurrentValue(0);
        setIsReset(true);
      }
    }
  };
  const handleGetResult = () => {
    let result = 0;
    if (currentValue && operation && memory) {
      switch (operation) {
        case "+":
          result = parseFloat(currentValue) + parseFloat(memory);

          break;
      
        case "-":
          result = parseFloat(memory) - parseFloat(currentValue);

          break;
        case "*":
          result = parseFloat(currentValue) * parseFloat(memory);

          break;
        case "/":
          result = parseFloat(memory) / parseFloat(currentValue);

          break;
        case "%":
          result = (parseFloat(memory) / 100) * parseFloat(currentValue);

          break;

        default:
          break;
      }
      setCurrentValue(result);
      setOperation(null);
      setMemory(result);
      setIsReset(true);
      setIsDecimal(false);
    }
  };

  const clean = () => {
    setCurrentValue(0);
    setOperation(null);
    setMemory(0);
    setIsReset(true);
    setIsDecimal(false);
  };
  const deleteLast = () => {
    
    setCurrentValue(currentValue.toString().slice(0, -1));
    console.log("me quieren borrar",currentValue.toString().slice(-1))
    

  };
  const changeSign = () => {
    setCurrentValue(currentValue * -1);
  };
  const convertToFloat = () => {
    if (currentValue.toString().indexOf(".") > 0) {
      //el numero ya es flotante
    } else {
      handleAddNumber(".");
    }
  };

  const handleExecuteAction = (action) => {

    switch (action) {
      case "Enter":
        handleGetResult();
        break;
      case "=":
        handleGetResult();
        break;
      case "AC":
        clean();
        break;
      case "Escape":
        clean();
        break;
      case "<==":
        deleteLast();
        break;
      case "Backspace":
        deleteLast();
        break;
      case "+/-":
        changeSign();
        break;
      case ".":
        convertToFloat();
        break;

      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        memory,
        operation,
        currentValue,
        isDecimal,
        addNumber: handleAddNumber,
        addOperation: handleAddOperation,
        getResult: handleGetResult,
        executeAction: handleExecuteAction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
