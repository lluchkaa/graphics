import React from 'react'

import './style.scss'
import Image from '../Image'

interface IProps {
  title: string
  imgSrc: string
  imgAlt?: string
  className?: string
  onClick?: () => void
}

const CardLink: React.FC<IProps> = (props: IProps) => {
  const {
    title,
    imgSrc,
    imgAlt,
    className: propsClassName,
    onClick
  } = props
  const className = 'card-link' + (propsClassName ? ` ${propsClassName}` : '')
  return (
    <div
      className={className}
      onClick={props.onClick}
    >
      <Image
        src={imgSrc}
        alt={imgAlt}
        className="card-image"
      />
      <div className="card-title">
        {title}
      </div>
    </div>
  )
}

export default CardLink