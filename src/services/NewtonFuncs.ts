import Complex from './Complex'

export const func = (k: number, c: number) =>
  (z: Complex) => Complex.sub([z.pow(k), new Complex(c, 0)])

export const df = (k: number, c: number) =>
  (z: Complex) => Complex.mul([new Complex(k, 0), z.pow(k - 1)])

export default { func, df }