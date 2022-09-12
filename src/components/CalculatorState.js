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
  const [memory, setMemory] = useState(["0"]);
  const [operation, setOperation] = useState(null);
  const [currentValue, setCurrentValue] = useState([]);
  // const [isReset, setIsReset] = useState(true);
  const [isDecimal, setIsDecimal] = useState(false);
  // const [isNegative, setIsNegative] = useState(false);
  // const [decimalCero, setDecimalCero] = useState("");
  const handleAddNumber = (value) => {
    setCurrentValue([...currentValue, value.toString()]);
  };
  const handleAddOperation = (op) => {
    currentValue.length >0 && setMemory(currentValue);
    handleGetResult();
    setOperation(op);
    setCurrentValue([]);
    // if (operation) {
    //   handleGetResult();
    //   setOperation(op);
    //   setCurrentValue(["0"]);
    // } 
    // else {
    //   setOperation(op);
    //   currentValue !== ["0"] && setMemory(currentValue);
    //   setCurrentValue(["0"]);
    //   // setIsReset(true);
    // }
  };

  const handleGetResult = () => {
    let result = 0;
    console.log(currentValue, "setcuurrent")
    if (currentValue.length>0 && operation && memory) {
      switch (operation) {
        case "+":
          result =
            parseFloat(currentValue.join("")) + parseFloat(memory.join(""));
          break;

        case "-":
          result =
            parseFloat(memory.join("")) - parseFloat(currentValue.join(""));

          break;
        case "*":
          result =
            parseFloat(currentValue.join("")) * parseFloat(memory.join(""));

          break;
        case "/":
          result =
            parseFloat(memory.join("")) / parseFloat(currentValue.join(""));

          break;
        case "%":
          result =
            (parseFloat(memory.join("")) / 100) *
            parseFloat(currentValue.join(""));

          break;

        default:
          break;
      }
      setMemory([result]);
      setCurrentValue([result]);
      setOperation(null);
      
      // setIsReset(true);
      setIsDecimal(false);
    }
  };

  const clean = () => {
    setCurrentValue([]);
    setOperation(null);
    setMemory(["0"]);
    // setIsReset(true);
    setIsDecimal(false);
    // setIsNegative(false);
  };
  const deleteLast = () => {
    if (currentValue.length > 1) {
      setCurrentValue(currentValue.slice(0, -1));
    } else {
      setCurrentValue([]);
    }
  };
  const changeSign = () => {
    setCurrentValue([parseFloat(currentValue.join("")) * -1]);
    console.log("cambiando el sgino", currentValue);
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
      case "Shift":
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
        setMemory: setMemory,
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
