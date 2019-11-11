import React from 'react'

import Content from './content'
import getInfo from '../../../services/fractal'
import Complex from '../../../services/Complex'
import { IPoint2d } from '../../../interfaces/IPoint'
import IBounds, { NumBounds } from '../../../interfaces/IBounds'
import { baseBounds, zoomBounds } from '../../../services/fractal'
import { complexToPoint } from '../../../services/numHelper'

interface IProps { }
interface IState {
  zoom: number
  k: number
  c: number
  center: IPoint2d
  iterations: number
}

class Fractal extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      zoom: 1,
      k: 3,
      c: 1,
      center: { x: 0, y: 0 },
      iterations: -1
    }
  }

  size: number = 500

  zoomBounds: NumBounds = zoomBounds
  centerBounds: IBounds<IPoint2d> = baseBounds

  func = (k: number, c: number) =>
    (z: Complex) => Complex.sub([z.pow(k), new Complex(c, 0)])
  df = (k: number, c: number) =>
    (z: Complex) => Complex.mul([new Complex(k, 0), z.pow(k - 1)])

  getFillStyle = (value: Complex): string => `hsl(${value.ang() * 180 / Math.PI}, 100%, 50%)`

  getImage = () => {
    const { zoom, k, c, center, iterations } = this.state

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
      (iterations > 0 ? iterations : undefined)
    )

    values.forEach((arr, y) => arr.forEach((v, x) => {
      ctx.fillStyle = this.getFillStyle(v)
      ctx.fillRect(x, y, 1, 1)
    }))

    return canvas.toDataURL()
  }

  setZoom = (zoom: number) =>
    this.setState({ zoom: Math.max(zoom, this.zoomBounds.min) })

  changeZoom = (diff: number) =>
    this.setState(prev => ({
      zoom: Math.max(prev.zoom + diff, this.zoomBounds.min)
    }))

  setK = (k: number) => this.setState({ k })

  setC = (c: number) => this.setState({ c })

  setCenter = (center: IPoint2d) => this.setState({ center })

  moveCenter = (xDiff: number, yDiff: number) =>
    this.setState(prev => ({
      center: {
        x: Math.min(this.centerBounds.max.x, Math.max(this.centerBounds.min.x, prev.center.x + xDiff)),
        y: Math.min(this.centerBounds.max.y, Math.max(this.centerBounds.min.y, prev.center.y + yDiff))
      }
    }))

  setIterations = (iterations: number) => this.setState({ iterations })

  render() {
    const { zoom, k, c, center, iterations } = this.state
    return (
      <Content
        image={this.getImage()}

        zoom={zoom}
        setZoom={this.setZoom}
        changeZoom={this.changeZoom}

        k={k}
        setK={this.setK}

        c={c}
        setC={this.setC}

        center={center}
        setCenter={this.setCenter}
        moveCenter={this.moveCenter}

        iterations={iterations}
        setIterations={this.setIterations}
      />
    )
  }
}

export default Fractal