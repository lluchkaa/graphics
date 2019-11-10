import React from 'react'
import Image from '../../elements/Image'
import { IPoint2d } from '../../../interfaces/IPoint'

interface IProps {
  image: string

  zoom: number
  changeZoom: (diff: number) => void

  k: number
  setK: (k: number) => void

  c: number
  setC: (c: number) => void

  center: IPoint2d
  moveCenter: (xDiff: number, yDiff: number) => void
}

enum Key {
  UpArrow = 119,
  DownArrow = 115,
  LeftArrow = 97,
  RightArrow = 100,
  ZoomIn = 43,
  ZoomOut = 45
}

class Content extends React.Component<IProps> {

  componentDidMount() {
    window.addEventListener('keypress', (e) => this.keyPressed(e.keyCode))
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', (e) => this.keyPressed(e.keyCode))
  }
  
  keyPressed = (keyCode: Key) => {
    const { zoom, moveCenter, changeZoom } = this.props
    const move = 0.1 / zoom

    switch (keyCode) {
      case Key.UpArrow:
        moveCenter(0, -move)
        break;
      case Key.DownArrow:
        moveCenter(0, move)
        break;
      case Key.LeftArrow:
        moveCenter(-move, 0)
        break;
      case Key.RightArrow:
        moveCenter(move, 0)
        break;
      case Key.ZoomIn:
        changeZoom(0.2)
        break
      case Key.ZoomOut:
        changeZoom(-0.2)
        break
      default:
        break;
    }
  }

  render() {
    const {
      image,
      changeZoom,
      k,
      setK,
      c,
      setC
    } = this.props
    return (
      <div
        className="page fractal"
      >
        <Image
          className="fractal"
          src={image}
        />
      </div>
    )
  }
}


export default Content