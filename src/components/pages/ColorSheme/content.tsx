import React from 'react'
import ImageType from '../../../interfaces/Image'
import { getValueFromInput } from '../../../services/data'
import Image from '../../elements/Image'
import Color from '../../../services/color/Color'
import Header from '../../modules/Header'
import ColorInput from '../../elements/ColorInput'
import ColorHSL from '../../../services/color/ColorHSL'

interface IProps {
  image: ImageType
  lightDiff: number
  onLightChange: (light: number) => void
  onImageLoad: (image: ImageType) => void
  getPixelColor: (
    x: number,
    y: number,
    width?: number,
    height?: number
  ) => Color | null
  selectedColor: ColorHSL
  onColorChange: (color: string) => void
}

const Content: React.FC<IProps> = (props: IProps) => {
  const onMouseMove = (e: React.MouseEvent) => {
    const { image } = props
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    console.log('color', props.getPixelColor(x, y, rect.width, rect.height))
  }

  const onColorChange = (color: string) => {
    props.onColorChange(color)
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
      <ColorInput
        color={props.selectedColor.toRGB().getColor()}
        onChange={onColorChange}
      />
      <Image src={props.image || ''} onMouseMove={onMouseMove} />
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
