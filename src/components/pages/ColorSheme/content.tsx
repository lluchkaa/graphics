import React from 'react'
import ImageType from '../../../interfaces/Image'
import { getValueFromInput } from '../../../services/data'
import Image from '../../elements/Image'
import Color from '../../../services/color/Color'
import Header from '../../modules/Header'

interface IProps {
  image: ImageType
  lightDiff: number
  onLightChange: (light: number) => void
  onImageLoad: (image: ImageType) => void
  getPixelColor: (x: number, y: number) => Color | null
}

const Content: React.FC<IProps> = (props: IProps) => {
  const onMouseOver = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    console.log('color', props.getPixelColor(x, y))
  }
  
  return (
    <div className="page color-scheme">
      <Header/>
      <input
        type="file"
        onChange={async (e) => {
          const data = await getValueFromInput(e)
          props.onImageLoad(data)
        }}
      />
      <Image src={props.image || ''} onMouseOver={onMouseOver} />
      <input
        type="range"
        min={-1}
        max={1}
        value={props.lightDiff}
        step={0.05}
        onChange={async (e) => {
          const value = await getValueFromInput(e)
          props.onLightChange(Number(value))
        }}
      />
    </div>
  )
}
export default Content
