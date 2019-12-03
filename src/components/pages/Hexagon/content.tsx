import React from 'react'
import { IPoint2d } from '../../../interfaces/IPoint'
import { Anchor } from '.'
import { getValueFromInput } from '../../../services/data'

interface IProps {
  firstPoint: IPoint2d
  startSideLen: number
  endSideLen: number
  anchor: Anchor
  points: IPoint2d[]

  sidesCount: number

  currentValue: number
  maxValue: number
  isPlaying: boolean

  setCurrentValue: (value: number) => void
  toggleIsPlaying: (isPlaying?: boolean) => void
  setSidesCount: (sidesCount: number) => void
  setFirstPoint: (firstPoint: IPoint2d) => void
  setAnchor: (anchor: Anchor) => void
  setStartSideLen: (startSideLen: number) => void
  setEndSideLen: (endSideLen: number) => void
}

interface IState {}

class Content extends React.Component<IProps, IState> {
  private canvas = React.createRef<HTMLCanvasElement>()
  private base = 50

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    this.drawOnCanvas()
  }

  pointToCanvas = (p: IPoint2d): IPoint2d => {
    const { height, width } = this.canvas.current!
    return {
      x: width / 2 + p.x * this.base,
      y: height / 2 + p.y * this.base
    }
  }

  drawOnCanvas = () => {
    const { points } = this.props
    if (!this.canvas.current) {
      return
    }
    const { height, width } = this.canvas.current
    const ctx = this.canvas.current.getContext('2d')
    if (!ctx) {
      return
    }
    ctx.beginPath()
    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 1
    ctx.fillStyle = '#000000'
    const start = this.pointToCanvas(points[0])
    ctx.moveTo(start.x, start.y)
    points.forEach((p) => {
      const point = this.pointToCanvas(p)
      ctx.lineTo(point.x, point.y)
      ctx.stroke()
      ctx.moveTo(point.x, point.y)
    })
    ctx.lineTo(start.x, start.y)
    ctx.stroke()
  }

  render() {
    const {
      currentValue,
      setCurrentValue,
      maxValue,
      toggleIsPlaying,
      firstPoint,
      setFirstPoint,
      startSideLen,
      endSideLen,
      setStartSideLen,
      setEndSideLen,
      anchor,
      setAnchor,
      sidesCount,
      setSidesCount
    } = this.props
    return (
      <div className="page hexagon">
        <input
          type="range"
          value={currentValue}
          min={0}
          max={maxValue}
          step={1}
          onChange={async (e) =>
            setCurrentValue(Number(await getValueFromInput(e)))
          }
        />
        <button onClick={() => toggleIsPlaying()}>Play/Pause</button>
        <canvas
          ref={this.canvas}
          className="canvas"
          width={600}
          height={400}
        ></canvas>
        <input
          type="number"
          value={firstPoint.x}
          onChange={async (e) =>
            setFirstPoint({
              ...firstPoint,
              x: Number(await getValueFromInput(e))
            })
          }
        />
        <input
          type="number"
          value={firstPoint.y}
          onChange={async (e) =>
            setFirstPoint({
              ...firstPoint,
              y: Number(await getValueFromInput(e))
            })
          }
        />
        <input
          type="number"
          value={startSideLen}
          onChange={async (e) =>
            setStartSideLen(Number(await getValueFromInput(e)))
          }
        />
        <input
          type="number"
          value={endSideLen}
          onChange={async (e) =>
            setEndSideLen(Number(await getValueFromInput(e)))
          }
        />
        <select
          value={anchor}
          onChange={async (e) => setAnchor(Number(await getValueFromInput(e)))}
        >
          <option value={Anchor.Center}>Центр</option>
          <option value={Anchor.FirstPoint}>Перша Точка</option>
        </select>
        <input
          type="number"
          value={sidesCount}
          onChange={async (e) =>
            setSidesCount(Number(await getValueFromInput(e)))
          }
        />
      </div>
    )
  }
}

export default Content
