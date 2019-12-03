import React from 'react'

import Content from './content'
import { IPoint2d } from '../../../interfaces/IPoint'
import Vector2d from '../../../services/Vector'

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
      firstPoint: null,
      startSideLen: 0,
      endSideLen: 0,
      anchor: Anchor.Center,
      points: [],

      currentValue: 0,
      isPlaying: false
    }
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

  getCenterOfFigure = (sideLen: number): IPoint2d => {
    const { sidesCount } = this

    const abs = sideLen / 2 / (Math.PI / sidesCount)
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
    const points: IPoint2d[] = []
    switch (anchor) {
      case Anchor.Center:
        this.updatePointsByCenter(sideLen, ang)
        break
      case Anchor.FirstPoint:

      default:
        break
    }
  }

  updatePointsByCenter = (sideLen: number, ang: number) => {
    const center = this.getCenterOfFigure(sideLen)
  }

  updatePointsByFirst = (sideLen: number, ang: number) => {}

  toggleIsPlaying = (isPlaying?: boolean) => {
    this.setState((prevState) => ({
      isPlaying: isPlaying || !prevState.isPlaying
    }))
  }

  render() {
    return <Content />
  }
}

export default Hexagon
