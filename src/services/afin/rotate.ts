import { IPoint2d } from '../../interfaces/IPoint'

export const rotatePoint = (p: IPoint2d, a: number): IPoint2d => ({
  x: p.x * Math.cos(a) + p.y * Math.sin(a),
  y: -p.x * Math.sin(a) + p.y * Math.cos(a)
})

export default {
  rotatePoint
}
