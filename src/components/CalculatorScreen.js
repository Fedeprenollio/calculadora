import React from 'react'
import { useAppContext } from './CalculatorState'

export const CalculatorScreen = () => {
    const {memory, operation, currentValue, isDecimal} = useAppContext()
  return (
    <div className='calculatorScreen'>
        <div className='memory'>
            Memoria: {memory} 
            <hr />
            Operación:{operation}
        </div>
        <div className='calculatorCurrentValue'>
                {currentValue}{isDecimal ? "." : ""}
        </div>
    </div>
  )
}
