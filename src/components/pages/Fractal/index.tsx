import React from 'react'

import Content from './content'
import getInfo from '../../../services/fractal'
import Complex from '../../../services/Complex'
import { IPoint2d } from '../../../interfaces/IPoint'
import IBounds, { NumBounds } from '../../../interfaces/IBounds'
import { baseBounds, zoomBounds } from '../../../services/fractal'

interface IProps { }
interface IState {
  zoom: number
  k: number
  c: number
  center: IPoint2d
}

class Fractal extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      zoom: 1,
      k: 3,
      c: 1,
      center: { x: 0, y: 0 }
    }
  }

  size: number = 500

  zoomBounds: NumBounds = zoomBounds
  centerBounds: IBounds<IPoint2d> = baseBounds

  func = (k: number, c: number) =>
    (z: Complex) => Complex.sub([z.pow(k), new Complex(c, 0)])
  df = (k: number, c: number) =>
    (z: Complex) => Complex.mul([new Complex(k, 0), z.pow(k - 1)])

  roots: IPoint2d[] = []

  getFillStyle = (value: Complex): string => `hsl(${value.ang() * 180 / Math.PI}, 100%, 50%)`

  getImage = () => {
    const { zoom, k, c, center } = this.state

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.height = this.size
    canvas.width = this.size

    const values = getInfo(
      this.func(k, c),
      this.df(k, c),
      { min: { x: 0, y: 0 }, max: { x: canvas.width, y: canvas.height } },
      zoom,
      center,
      this.roots
    )

    values.forEach((arr, y) => arr.forEach((v, x) => {
      ctx.fillStyle = this.getFillStyle(v)
      ctx.fillRect(x, y, 1, 1)
    }))

    return canvas.toDataURL()
  }

  changeZoom = (diff: number) =>
    this.setState(prev => ({
      zoom: Math.max(prev.zoom + diff, this.zoomBounds.min)
    }))

  setK = (k: number) => this.setState({ k })

  setC = (c: number) => this.setState({ c })

  moveCenter = (xDiff: number, yDiff: number) =>
    this.setState(prev => ({
      center: {
        x: Math.min(this.centerBounds.max.x, Math.max(this.centerBounds.min.x, prev.center.x + xDiff)),
        y: Math.min(this.centerBounds.max.y, Math.max(this.centerBounds.min.y, prev.center.y + yDiff))
      }
    }))

  render() {
    const { zoom, k, c, center } = this.state
    return (
      <Content
        image={this.getImage()}
        
        zoom={zoom}
        changeZoom={this.changeZoom}
        
        k={k}
        setK={this.setK}

        c={c}
        setC={this.setC}

        center={center}
        moveCenter={this.moveCenter}
      />
    )
  }
}

export default Fractal