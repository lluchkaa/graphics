import { IPoint2d } from '../../interfaces/IPoint'
import Vector2d from '../Vector'

export const movePoint = (p: IPoint2d, x: number, y: number): IPoint2d => ({
  x: p.x + x,
  y: p.y + y
})

export const movePointV = (p: IPoint2d, v: Vector2d): IPoint2d =>
  movePoint(p, v.x, v.y)

export default {
  movePoint,
  movePointV
}
