import React from 'react'
import { getValueFromInput } from '../../../services/data'

import './style.scss'

interface IProps {
  color: string
  onChange?: (color: string) => void
  onNativeChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const ColorInput: React.FC<IProps> = (props) => {
  const { color, onChange, onNativeChange, className } = props

  const ref = React.useRef<HTMLInputElement>(null)

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onNativeChange && onNativeChange(e)
    const color = await getValueFromInput(e)
    onChange && onChange(color)
  }

  const onDivClick = () => {
    ref && ref.current && ref.current.click()
  }

  return (
    <div
      className={'color-input' + (className ? ` ${className}` : '')}
      onClick={onDivClick}
      style={{backgroundColor: color}}
    >
      <input
        type="color"
        onChange={onInputChange}
        value={color}
        className="hidden"
        ref={ref}
      />
      Aa
    </div>
  )
}

export default ColorInput
