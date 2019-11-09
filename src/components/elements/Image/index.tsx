import React from 'react'

import './style.scss'

interface IProps {
  src: string
  alt?: string
  className?: string
}

const Image: React.FC<IProps> = (props: IProps) => {
  const { src, alt, className: propClassName } = props
  const className = 'image-box' + (propClassName ? ` ${propClassName}` : '')
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt || ''}
        className="image" 
      />
    </div>
  )
}