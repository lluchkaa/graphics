import React from 'react'

import Content from './content'
import { IPoint2d } from '../../../interfaces/IPoint'
import Vector2d from '../../../services/Vector'
import { rotatePoint } from '../../../services/afin/rotate'
import { movePoint, movePointV } from '../../../services/afin/move'
import { scalePoint } from '../../../services/afin/scale'

export enum Anchor {
  FirstPoint,
  Center
}

interface IProps {}
interface IState {
  firstPoint: IPoint2d
  startSideLen: number
  endSideLen: number
  anchor: Anchor
  points: IPoint2d[]
  sidesCount: number

  currentValue: number
  isPlaying: boolean
}

class Hexagon extends React.Component<IProps, IState> {
  private interval: number = 0
  private maxValue = 100
  private speed = 1

  constructor(props: IProps) {
    super(props)
    this.state = {
      firstPoint: { x: 0, y: 0 },
      startSideLen: 1,
      endSideLen: 5,
      anchor: Anchor.Center,
      points: [],
      sidesCount: 6,

      currentValue: 0,
      isPlaying: false
    }
  }

  componentDidMount() {
    this.updateByValue()
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (!prevState.isPlaying && this.state.isPlaying && this.state.firstPoint) {
      this.interval = window.setInterval(this.buildNext, 100)
    }
    if (prevState.isPlaying && !this.state.isPlaying) {
      window.clearInterval(this.interval)
    }
    if (prevState.currentValue !== this.state.currentValue) {
      this.updateByValue()
    }
  }

  buildNext = () => {
    this.setState((prevState) => ({
      currentValue: (prevState.currentValue + this.speed) % this.maxValue
    }))
    this.updateByValue()
  }

  getCenterOfFigure = (): IPoint2d => {
    const { startSideLen, sidesCount } = this.state

    const abs = startSideLen / 2 / (Math.PI / sidesCount)
    const ang = (Math.PI * (sidesCount - 2)) / sidesCount
    return Vector2d.fromAbsAng(abs, ang).toPoint()
  }

  updateByValue = () => {
    const { currentValue, startSideLen, endSideLen } = this.state
    const ang = ((2 * Math.PI) / this.maxValue) * currentValue
    const sideLen =
      startSideLen +
      (endSideLen - startSideLen) * (currentValue / this.maxValue)
    this.updatePoints(sideLen, ang)
  }

  updatePoints = (sideLen: number, ang: number) => {
    const { firstPoint, anchor } = this.state
    if (!firstPoint) {
      return
    }
    switch (anchor) {
      case Anchor.Center:
        this.updatePointsByCenter(sideLen, ang)
        break
      case Anchor.FirstPoint:
        this.updatePointsByFirst(sideLen, ang)
      default:
        return
    }
  }

  updatePointsByCenter = (sideLen: number, ang: number) => {
    const { firstPoint, startSideLen, sidesCount } = this.state
    if (!firstPoint) {
      return
    }
    const center = this.getCenterOfFigure()
    const base = Vector2d.fromPoint(center)
    const negBase = Vector2d.fromPoint(scalePoint(base, -1, -1))

    const points: IPoint2d[] = []

    const first = base.sub(Vector2d.fromPoint(firstPoint))

    const diff = (sideLen - startSideLen) / 2 / Math.sin(Math.PI / sidesCount)
    first.abs += diff
    const p1 = movePointV(first.toPoint(), negBase)

    for (let i = 0; i < sidesCount; ++i) {
      const p2 = rotatePoint(p1, ang + ((Math.PI * 2) / sidesCount) * i)
      const p3 = movePointV(p2, base)
      points.push(p3)
    }
    this.setState({ points })
  }

  updatePointsByFirst = (sideLen: number, ang: number) => {
    const { firstPoint, sidesCount } = this.state
    if (!firstPoint) {
      return
    }
    const points: IPoint2d[] = [firstPoint]
    const baseAng = Math.PI - (Math.PI * (sidesCount - 2)) / sidesCount
    for (let i = 1; i < sidesCount; ++i) {
      const point = Vector2d.fromAbsAng(sideLen, baseAng * i + ang).fromPoint(
        points[i - 1]
      )
      points.push(point)
    }
    this.setState({ points })
  }

  toggleIsPlaying = (isPlaying?: boolean) => {
    this.setState((prevState) => ({
      isPlaying: isPlaying || !prevState.isPlaying
    }))
  }

  setCurrentValue = (currentValue: number) => this.setState({ currentValue })
  setSidesCount = (sidesCount: number) => this.setState({ sidesCount })
  setFirstPoint = (firstPoint: IPoint2d) => this.setState({ firstPoint })
  setAnchor = (anchor: Anchor) => this.setState({ anchor })
  setStartSideLen = (startSideLen: number) => this.setState({ startSideLen })
  setEndSideLen = (endSideLen: number) => this.setState({ endSideLen })

  render() {
    const {
      points,
      firstPoint,
      startSideLen,
      endSideLen,
      anchor,
      currentValue,
      isPlaying,
      sidesCount
    } = this.state
    return (
      <Content
        points={points}
        firstPoint={firstPoint}
        startSideLen={startSideLen}
        sidesCount={sidesCount}
        endSideLen={endSideLen}
        anchor={anchor}
        currentValue={currentValue}
        maxValue={this.maxValue}
        isPlaying={isPlaying}
        setCurrentValue={this.setCurrentValue}
        toggleIsPlaying={this.toggleIsPlaying}
        setSidesCount={this.setSidesCount}
        setFirstPoint={this.setFirstPoint}
        setAnchor={this.setAnchor}
        setStartSideLen={this.setStartSideLen}
        setEndSideLen={this.setEndSideLen}
      />
    )
  }
}

export default Hexagon
