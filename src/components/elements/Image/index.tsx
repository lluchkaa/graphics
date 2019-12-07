import React from 'react'

import './style.scss'

interface IProps {
  src: string
  alt?: string
  className?: string
  onClick?: (event: React.MouseEvent) => void
  onMouseMove?: (event: React.MouseEvent) => void
}

const Image: React.FC<IProps> = (props: IProps) => {
  const { src, alt, className: propClassName, onClick, onMouseMove } = props
  const className ='image-box'  + (propClassName ? ` ${propClassName}` : '')

  return (
    <div className={className} onClick={onClick} onMouseMove={onMouseMove}>
      <img
        src={src}
        alt={alt || ''}
        className="image" 
      />
    </div>
  )
}

export default Image