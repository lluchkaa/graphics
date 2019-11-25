import React from 'react'

import Content from './content'
import ColorRGB from '../../../services/color/ColorRGB'

interface IProps {}
interface IState {}

class ColorScheme extends React.Component<IProps, IState> {
  render() {
    const color = new ColorRGB(0, 255 , 0)
    console.log('color', color.toHSL().toRGB().getColor())
    return (
      <>
        <div style={{backgroundColor: color.getColor(), width: 40, height: 40}}/>
        <div style={{backgroundColor: color.toHSL().toRGB().getColor(), width: 40, height: 40}}/>
        <Content />
      </>
    )
  }
}

export default ColorScheme
