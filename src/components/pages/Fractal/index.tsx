import React from 'react'

import Content from './content'
import getInfo from '../../../services/fractal'
import Complex from '../../../services/Complex'
import { IPoint2d } from '../../../interfaces/IPoint'

interface IProps { }
interface IState { }

class Fractal extends React.Component<IProps, IState> {

  func = (z: Complex) => Complex.sub([z.cub(), new Complex(1, 0)])
  df = (z: Complex) => Complex.mul([new Complex(3, 0), z.sqr()])

  roots: IPoint2d[] = [
    { x: 1, y: 0 },
    { x: -0.5, y: Math.sin(2 * Math.PI / 3) },
    { x: -0.5, y: -Math.sin(2 * Math.PI / 3) }
  ]

  getImage = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.height = 400
    canvas.width = 800
    const values = getInfo(
      this.func,
      this.df,
      0,
      { min: { x: 0, y: 0 }, max: { x: canvas.width, y: canvas.height } },
      this.roots,
      20
    )
    if (ctx) {
      values.forEach((arr, y) => arr.forEach((v, x) => {
        ctx.fillStyle = `hsl(${v.ang() * 180 / Math.PI}, 100%, 50%)`
        ctx.fillRect(x, y, 1, 1)
      }))
    }

    return canvas.toDataURL()
  }

  render() {
    return (
      <Content
        image={this.getImage()}
      />
    )
  }
}

export default Fractal