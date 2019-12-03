import { IPoint2d } from '../../interfaces/IPoint'

export const scalePoint = (p: IPoint2d, x: number, y: number): IPoint2d => ({
  x: p.x * x,
  y: p.y * y
})

export default {
  scalePoint
}
