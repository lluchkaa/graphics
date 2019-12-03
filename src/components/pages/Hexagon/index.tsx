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
  firstPoint: IPoint2d | null
  startSideLen: number
  endSideLen: number
  anchor: Anchor
  points: IPoint2d[]

  currentValue: number
  isPlaying: boolean
}

class Hexagon extends React.Component<IProps, IState> {
  private interval: number = 0
  private sidesCount = 6
  private maxValue = 100
  private speed = 1

  constructor(props: IProps) {
    super(props)
    this.state = {
      firstPoint: { x: 1, y: 2 },
      startSideLen: 1,
      endSideLen: 5,
      anchor: Anchor.Center,
      points: [],

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
  }

  buildNext = () => {
    this.setState((prevState) => ({
      currentValue: (prevState.currentValue + this.speed) % this.maxValue
    }))
    this.updateByValue()
  }

  getCenterOfFigure = (): IPoint2d => {
    const { startSideLen } = this.state
    const { sidesCount } = this

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
    const { firstPoint, startSideLen } = this.state
    if (!firstPoint) {
      return
    }
    const center = this.getCenterOfFigure()
    const base = Vector2d.fromPoint(center)
    const negBase = Vector2d.fromPoint(scalePoint(base, -1, -1))

    const points: IPoint2d[] = []

    const first = base.sub(Vector2d.fromPoint(firstPoint))

    const diff =
      (sideLen - startSideLen) / 2 / Math.sin(Math.PI / this.sidesCount)
    console.log('diff', diff)

    console.log('first', first)
    first.abs += diff
    console.log('first', first)
    const p1 = movePointV(first.toPoint(), negBase)

    for (let i = 0; i < this.sidesCount; ++i) {
      const p2 = rotatePoint(p1, ang + ((Math.PI * 2) / this.sidesCount) * i)
      const p3 = movePointV(p2, base)
      points.push(p3)
    }
    this.setState({ points })
  }

  updatePointsByFirst = (sideLen: number, ang: number) => {
    const { firstPoint } = this.state
    if (!firstPoint) {
      return
    }
    const points: IPoint2d[] = [firstPoint]
    const baseAng =
      Math.PI - (Math.PI * (this.sidesCount - 2)) / this.sidesCount
    for (let i = 1; i < this.sidesCount; ++i) {
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

  setCurrentValue = (currentValue: number) => {
    this.setState({ currentValue })
  }

  render() {
    const {
      points,
      firstPoint,
      startSideLen,
      endSideLen,
      anchor,
      currentValue,
      isPlaying
    } = this.state
    return (
      <Content
        points={points}
        firstPoint={firstPoint}
        startSideLen={startSideLen}
        sidesCount={this.sidesCount}
        endSideLen={endSideLen}
        anchor={anchor}
        currentValue={currentValue}
        maxValue={this.maxValue}
        isPlaying={isPlaying}
        setCurrentValue={this.setCurrentValue}
        toggleIsPlaying={this.toggleIsPlaying}
      />
    )
  }
}

export default Hexagon
