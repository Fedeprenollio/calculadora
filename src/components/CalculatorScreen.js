import React from 'react'
import { useAppContext } from './CalculatorState'

export const CalculatorScreen = () => {
    const {memory, operation, currentValue, isDecimal} = useAppContext()
  return (
    <div className='calculatorScreen'>
      
        <div className='calculatorCurrentValue'>
         <span style={{fontSize: "1rem"}}>Memoria</span>    {memory} 

          </div>
            <hr />
            <div>
            Operación:{operation}
        </div>
        <div className='calculatorCurrentValue'>
                {currentValue}{isDecimal ? "." : ""}
        </div>
    </div>
  )
}
