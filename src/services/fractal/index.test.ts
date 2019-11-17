import getInfo from './index'
import NewtonFuncs from '../NewtonFuncs'

const timeTest = (k: number, z: number, size: number) => 
  test(`k = ${k}, z = ${z}, size = ${size}`, () => {
    const func = NewtonFuncs.func(k, z)
    const df = NewtonFuncs.df(k, z)
    const start = new Date().getTime()

    getInfo(
      func,
      df,
      {
        min: {
          x: 0,
          y: 0
        },
        max: {
          x: size,
          y: size
        }
      }
    )

    const executingTime = new Date().getTime() - start

    console.log(`executing time: ${executingTime}`)
  })

describe('fractal time', () => {
  timeTest(3, 1, 100)
  timeTest(3, 1, 400)
  timeTest(3, 1, 800)
})