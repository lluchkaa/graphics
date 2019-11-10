import { IPoint2d } from "../interfaces/IPoint"
import IBounds from "../interfaces/IBounds"
import Complex from "./Complex"

export const scalePoint2d = (
  point: IPoint2d,
  from: IBounds<IPoint2d>,
  to: IBounds<IPoint2d>
): IPoint2d => (
    {
      x: to.min.x +
        (point.x / (from.max.x - from.min.x)) * (to.max.x - to.min.x),
      y: to.min.y +
        (point.y / (from.max.y - from.min.y)) * (to.max.y - to.min.y),
    }
  )

export const complexToPoint = (c: Complex): IPoint2d => ({
  x: c.real,
  y: c.imag
})

export const pointToComplex = (p: IPoint2d): Complex =>
  new Complex(p.x, p.y)

export default { scalePoint2d, complexToPoint, pointToComplex }