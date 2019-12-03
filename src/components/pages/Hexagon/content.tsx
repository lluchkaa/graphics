import React from 'react'
import { IPoint2d } from '../../../interfaces/IPoint'
import { Anchor } from '.'
import { getValueFromInput } from '../../../services/data'

interface IProps {
  firstPoint: IPoint2d | null
  startSideLen: number
  endSideLen: number
  anchor: Anchor
  points: IPoint2d[]

  sidesCount: number

  currentValue: number
  maxValue: number
  isPlaying: boolean

  setCurrentValue: (value: number) => void
}

const Content: React.FC<IProps> = (props: IProps) => {
  const { currentValue, setCurrentValue, maxValue } = props
  return (
    <div className="page hexagon">
      <input
        type="range"
        value={currentValue}
        min={0}
        max={maxValue}
        step={1}
        onChange={async (e) =>
          setCurrentValue(Number(await getValueFromInput(e)))
        }
      />
    </div>
  )
}

export default Content
