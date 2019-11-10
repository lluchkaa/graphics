import { IPoint2d } from "../../interfaces/IPoint";
import Complex from "../Complex";
import IBounds, { NumBounds } from "../../interfaces/IBounds";
import { scalePoint2d, pointToComplex } from "../numHelper";

const bounds: IBounds<IPoint2d> = {
  min: {
    x: -2,
    y: -1
  },
  max: {
    x: 2,
    y: 1
  }
}

const getImage = (
  center: IPoint2d,
  width: number,
  height: number,
  roots: IPoint2d[],
  iterations: number = -1
) => {
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      let z = pointToComplex(scalePoint2d(
        { x, y },
        { min: { x: 0, y: 0 }, max: { x: width, y: height } },
        bounds
      ))
      for (let i = 0; i < iterations; ++i) {
        z = Complex.sub([
          z,
          Complex.div([
            Complex.sub([
              z.cub(),
              new Complex(-1, 0)
            ]),
            Complex.mul([
              new Complex(3, 0),
              z.sqr()
            ])
          ])
        ])
      }
    }
  }
}

export default getImage