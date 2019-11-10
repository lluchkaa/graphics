import { IPoint2d } from "../../interfaces/IPoint";
import Complex from "../Complex";
import IBounds from "../../interfaces/IBounds";
import { scalePoint2d, pointToComplex } from "../numHelper";

const baseBounds: IBounds<IPoint2d> = {
  min: {
    x: -1,
    y: -1
  },
  max: {
    x: 1,
    y: 1
  }
}

const getBounds = (zoom: number, center: IPoint2d = { x: 0, y: 0 }, base: IBounds<IPoint2d> = baseBounds): IBounds<IPoint2d> => {
  const curDistX = (base.max.x - base.min.x)
  const curDistY = (base.max.y - base.min.y)

  const newDistX = curDistX / zoom
  const newDistY = curDistY / zoom

  const xDiff = (curDistX - newDistX) / 2
  const yDiff = (newDistY - newDistY) / 2

  return {
    min: {
      x: base.min.x + center.x + xDiff,
      y: base.min.y + center.y + yDiff
    },
    max: {
      x: base.max.x + center.x - xDiff,
      y: base.max.y + center.y - yDiff
    }
  }
}

const getIterations = (zoom: number): number => (zoom / 2) * 10

const eps = 1e-3

const minZoom = 0

const getInfo = (
  func: (z: Complex) => Complex,
  df: (z: Complex) => Complex,
  sizes: IBounds<IPoint2d>,
  zoom: number,
  movedCenter: IPoint2d,
  roots?: IPoint2d[],
  iterations: number = -1,
) => {
  if (zoom <= minZoom) {
    throw 'bad zoom'
  }

  if (iterations < 0) { iterations = getIterations(zoom) }

  const result: Complex[][] = []
  for (let y = sizes.min.y; y < sizes.max.y; ++y) {
    result[y] = []
    for (let x = sizes.min.x; x < sizes.max.x; ++x) {
      let z = pointToComplex(scalePoint2d(
        { x, y },
        sizes,
        getBounds(zoom, movedCenter)
      ))

      let rootIsFound: boolean = false;
      for (let i = 0; i < iterations; ++i) {
        roots && roots.forEach(r => {
          if (Complex.sub([pointToComplex(r), z]).abs() < eps) {
            rootIsFound = true
          }
        })

        if (rootIsFound) { break }

        z = Complex.sub([
          z,
          Complex.div([
            func(z),
            df(z)
          ])
        ])
      }
      result[y][x] = z
    }
  }
  return result
}

export default getInfo