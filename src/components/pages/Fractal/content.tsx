import React from 'react'
import Image from '../../elements/Image'

interface IProps {
  image: string
}

const Content: React.FC<IProps> = (props: IProps) => (
  <div
    className="page fractal"
  >
    <Image
      className="fractal"
      src={props.image} 
    />
  </div>
)

export default Content