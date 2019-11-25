import React from 'react'
import ImageType from '../../../interfaces/Image'
import { getValueFromInput } from '../../../services/data'
import Image from '../../elements/Image'

interface IProps {
  image: ImageType
  light: number
  onLightChange: (light: number) => void
  onImageLoad: (image: ImageType) => void
}

const Content: React.FC<IProps> = (props: IProps) => (
  <div className="page color-scheme">
    <input
      type="file"
      onChange={async (e) => {
        const data = await getValueFromInput(e)
        props.onImageLoad(data)
      }}
    />
    <Image src={props.image || ''} />
    <input
      type="range"
      min={-50}
      max={50}
      value={props.light * 100}
      step={10}
      onChange={async (e) => {
        const value = await getValueFromInput(e)
        props.onLightChange(+value / 100)
      }}
    />
  </div>
)

export default Content
