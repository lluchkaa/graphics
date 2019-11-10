import Complex from "./Complex";
import { IPoint2d } from "../interfaces/IPoint";

export const complexToPoint = (c: Complex): IPoint2d => ({
  x: c.real,
  y: c.imag
})

export const pointToComplex = (p: IPoint2d): Complex =>
  new Complex(p.x, p.y)

export default { complexToPoint, pointToComplex }