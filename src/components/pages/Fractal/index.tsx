import React from 'react'

import Content from './content'
import getInfo from '../../../services/fractal'
import Complex from '../../../services/Complex'
import { IPoint2d } from '../../../interfaces/IPoint'

interface IProps { }
interface IState {
  zoom: number
  k: number
  c: number
}

class Fractal extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      zoom: 1,
      k: 3,
      c: 1
    }
  }

  size: number = 500

  minZoom: number = 0.1
  maxZoom: number = 2

  func = (k: number, c: number) =>
    (z: Complex) => Complex.sub([z.pow(k), new Complex(c, 0)])
  df = (k: number, c: number) =>
    (z: Complex) => Complex.mul([new Complex(k, 0), z.pow(k - 1)])

  roots: IPoint2d[] = []

  getFillStyle = (value: Complex): string => `hsl(${value.ang() * 180 / Math.PI}, 100%, 50%)`

  getImage = () => {
    const { zoom, k, c } = this.state

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.height = this.size
    canvas.width = this.size

    const values = getInfo(
      this.func(k, c),
      this.df(k, c),
      zoom,
      { min: { x: 0, y: 0 }, max: { x: canvas.width, y: canvas.height } },
      this.roots
    )

    values.forEach((arr, y) => arr.forEach((v, x) => {
      ctx.fillStyle = this.getFillStyle(v)
      ctx.fillRect(x, y, 1, 1)
    }))

    return canvas.toDataURL()
  }

  changeZoom = (diff: number) => {
    this.setState(prev => {
      const val = prev.zoom + diff
      const zoom = val < this.minZoom ? this.minZoom : val
      return {
        zoom
      }
    })
  }

  setK = (k: number) => this.setState({ k })

  setC = (c: number) => this.setState({ c })

  render() {
    return (
      <Content
        image={this.getImage()}
      />
    )
  }
}

export default Fractal