import React from 'react'
import { IPoint2d } from '../../../interfaces/IPoint'
import { Anchor } from '.'
import { getValueFromInput } from '../../../services/data'
import Header from '../../modules/Header'

import './style.scss';
import { Slider, IconButton, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

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

interface IState { }

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
      y: height / 2 - p.y * this.base
    }
  }

  drawLines = () => {
    if (!this.canvas.current) {
      return
    }
    const { height, width } = this.canvas.current
    const ctx = this.canvas.current.getContext('2d')
    if (!ctx) {
      return
    }
    const size = Math.max(width, height) / 2
    const centerX = width / 2
    const centerY = height / 2
    ctx.beginPath()

    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()

    ctx.setLineDash([2])
    for (let i = 0; i < size; ++i) {
      const offset = i * this.base
      ctx.moveTo(0, centerY + offset)
      ctx.lineTo(width, centerY + offset)
      ctx.moveTo(centerX + offset, 0)
      ctx.lineTo(centerX + offset, height)
      ctx.moveTo(0, centerY - offset)
      ctx.lineTo(width, centerY - offset)
      ctx.moveTo(centerX - offset, 0)
      ctx.lineTo(centerX - offset, height)
    }
    ctx.stroke()
    ctx.setLineDash([])
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
    ctx.clearRect(0, 0, width, height)
    this.drawLines()
    ctx.beginPath()
    ctx.lineWidth = 1
    const start = this.pointToCanvas(points[0])
    ctx.moveTo(start.x, start.y)
    points.forEach((p, i) => {
      const point = this.pointToCanvas(p)
      ctx.lineTo(point.x, point.y)
      ctx.stroke()
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
      setSidesCount,
      isPlaying
    } = this.props
    return (
      <div className="page-hexagon">
        <Header />
        <div className="content">
          <div className="hexagon-block">
            <canvas
              ref={this.canvas}
              className="canvas"
              width={600}
              height={400}
            ></canvas>
            <IconButton onClick={() => toggleIsPlaying()} className="play">
              <img src={isPlaying !== true ? require('../../../assets/images/play.png') : require('../../../assets/images/stop.png')} alt="play" />
            </IconButton>
            <Slider
              value={currentValue}
              min={0}
              max={maxValue}
              step={1}
              className="slider-play"
              onChange={async (e, value) =>
                setCurrentValue(Number(value))}
            />
            <input
              className="zoom"
              type="number"
              value={0}
              onChange={() => { }}>
            </input>
            <button className="btn-hover btn-download" onClick={() => { }}>
              Download
              </button>
          </div>
          <div className="info">
            <div className="in-info">
              <div className="group-coef">
                <div
                  className="input-group"
                >
                  <label>x = </label>
                  <input
                    type="number"
                    className="input-coef"
                    value={firstPoint.x}
                    onChange={async (e) =>
                      setFirstPoint({
                        ...firstPoint,
                        x: Number(await getValueFromInput(e))
                      })
                    }
                  />
                </div>
                <div
                  className="input-group"
                >
                  <label>y = </label>
                  <input
                    type="number"
                    className="input-coef"
                    value={firstPoint.y}
                    onChange={async (e) =>
                      setFirstPoint({
                        ...firstPoint,
                        y: Number(await getValueFromInput(e))
                      })
                    }
                  />
                </div>
              </div>
              <div className="group-coef">
                <div
                  className="input-group"
                >
                  <label>s = </label>
                  <input
                    type="number"
                    className="input-coef"
                    value={startSideLen}
                    onChange={async (e) =>
                      setStartSideLen(Number(await getValueFromInput(e)))
                    }
                  />
                </div>
                <div
                  className="input-group"
                >
                  <label>e = </label>
                  <input
                    type="number"
                    className="input-coef"
                    value={endSideLen}
                    onChange={async (e) =>
                      setEndSideLen(Number(await getValueFromInput(e)))
                    }
                  />
                </div>
              </div>
              <div
                className="input-group-single"
              >
                <label>Parties number = </label>
                <input
                  type="number"
                  className="input-coef-single"
                  value={sidesCount}
                  onChange={async (e) =>
                    setSidesCount(Number(await getValueFromInput(e)))
                  }
                />
              </div>
              <FormControl component="fieldset" className="form-control">
                <RadioGroup aria-label="anchor" name="anchor" className="radio-group"
                  onChange={async (e, value) => setAnchor(Number(value))}>
                  <FormControlLabel className="form-control-label" value={Anchor.Center} control={<Radio />} label="Around the center" checked={anchor === Anchor.Center ? true : false} />
                  <FormControlLabel className="form-control-label" value={Anchor.FirstPoint} control={<Radio />} label="Around the vertex" checked={anchor === Anchor.FirstPoint ? true : false} />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Content
