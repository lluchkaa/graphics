import { IPoint2d } from "../../interfaces/IPoint";
import Complex from "../Complex";
import IBounds, { NumBounds } from "../../interfaces/IBounds";
import { scalePoint2d, pointToComplex } from "../numHelper";

export const baseBounds: IBounds<IPoint2d> = {
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
  const yDiff = (curDistY - newDistY) / 2
  
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

const getIterations = (zoom: number): number => Math.sqrt(zoom * 50)

const eps = 1e-3

export const zoomBounds: NumBounds = {
  max: 999,
  min: 0.1
}

const getInfo = (
  func: (z: Complex) => Complex,
  df: (z: Complex) => Complex,
  sizes: IBounds<IPoint2d>,
  zoom: number,
  movedCenter: IPoint2d,
  roots?: IPoint2d[],
  iterations: number = -1,
) => {
  // if (zoom < zoomBounds.min || zoom > zoomBounds.max) {
  //   throw 'bad zoom'
  // }

  // if (movedCenter.x < baseBounds.min.x ||
  //   movedCenter.x > baseBounds.max.x ||
  //   movedCenter.y < baseBounds.min.y || 
  //   movedCenter.y > baseBounds.max.y
  // ) {
  //   throw 'bad center'
  // }

  if (iterations < 0) { iterations = getIterations(zoom) }

  const result: Complex[][] = []
  const bounds = getBounds(zoom, movedCenter)
  for (let y = sizes.min.y; y < sizes.max.y; ++y) {
    result[y] = []
    for (let x = sizes.min.x; x < sizes.max.x; ++x) {
      let z = pointToComplex(scalePoint2d(
        { x, y },
        sizes,
        bounds
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