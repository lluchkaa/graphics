import React from 'react'

import Image from '../../elements/Image'
import { IPoint2d } from '../../../interfaces/IPoint'
import Header from '../../modules/Header'

import './style.scss'

interface IProps {
  image: string

  zoom: number
  setZoom: (zoom: number) => void
  changeZoom: (diff: number) => void

  k: number
  setK: (k: number) => void

  c: number
  setC: (c: number) => void

  center: IPoint2d
  setCenter: (center: IPoint2d) => void
  moveCenter: (xDiff: number, yDiff: number) => void

  iterations: number
  setIterations: (iter: number) => void
}

interface IState {
  k: number
  c: number
  zoom: number
  center: IPoint2d
  iterations: number
}

enum Key {
  UpArrow = 119,
  DownArrow = 115,
  LeftArrow = 97,
  RightArrow = 100,
  ZoomIn = 43,
  ZoomOut = 45
}

class Content extends React.Component<IProps, IState> {

  scale: number = 100

  constructor(props: IProps) {
    super(props)
    this.state = {
      k: props.k,
      c: props.c,
      zoom: props.zoom,
      center: props.center,
      iterations: props.iterations
    }
  }

  // static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
  //   return {
  //     k: nextProps.k,
  //     c: nextProps.c,
  //     zoom: nextProps.zoom,
  //     center: nextProps.center
  //   }
  // }

  componentDidMount() {
    window.addEventListener('keypress', (e) => this.keyPressed(e.keyCode))
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', (e) => this.keyPressed(e.keyCode))
  }

  keyPressed = (keyCode: Key) => {
    const { center, zoom, setCenter, setZoom } = this.props
    const toMove = 0.1 / zoom
    const toZoom = 0.2

    let newZoom = zoom
    const newCenter = { ...center }

    switch (keyCode) {
      case Key.UpArrow:
        newCenter.y -= toMove
        break;
      case Key.DownArrow:
        newCenter.y += toMove
        break;
      case Key.LeftArrow:
        newCenter.x -= toMove
        break;
      case Key.RightArrow:
        newCenter.x += toMove
        break;
      case Key.ZoomIn:
        newZoom += toZoom
        break
      case Key.ZoomOut:
        newZoom -= toZoom
        break
      default:
        return;
    }
    if (newCenter.x !== center.x || newCenter.y !== center.y) {
      this.setState({ center: newCenter })
      setCenter(newCenter)
    }
    if (newZoom !== zoom) {
      this.setState({ zoom: newZoom })
      setZoom(newZoom)
    }
  }

  render() {
    const {
      image,
      setZoom,
      k,
      setK,
      c,
      setC,
      center,
      setCenter,
      iterations,
      setIterations
    } = this.props
    const {
      k: curK,
      c: curC,
      zoom: curZoom,
      center: curCenter,
      iterations: curIterations
    } = this.state
    return (
      <div
        className="page fractal"
      >
        <Header />
        <div className="content">
          <div
            className="fractal-wrapper"
          >
            <Image
              className="fractal"
              src={image}
            />
            <input
              className="zoom"
              type="number"
              value={Math.round(curZoom * this.scale)}
              onChange={(e) => this.setState({ zoom: +e.target.value / this.scale })}
              onBlur={() => setZoom(this.state.zoom)}
            />
          </div>
          <div
            className="info"
          >
            <div
              className="function"
            >
              f(z) = z ^ k + c
          </div>
            <div className="inputs coefs">
              <div
                className="input-group"
              >
                <label>k = </label>
                <input
                  type="number"
                  value={curK}
                  onChange={(e) => this.setState({ k: +e.target.value })}
                  onBlur={() => curK !== k && setK(curK)}
                />
              </div>
              <div
                className="input-group"
              >
                <label>c = </label>
                <input
                  type="number"
                  value={curC}
                  onChange={(e) => this.setState({ c: +e.target.value })}
                  onBlur={() => curC !== c && setC(curC)}
                />
              </div>
              <div
                className="input-group"
              >
                <label>iterations = </label>
                <input
                  type="number"
                  value={curIterations}
                  onChange={(e) => this.setState({ iterations: +e.target.value })}
                  onBlur={() => curIterations !== iterations && setIterations(curIterations)}
                />
              </div>
            </div>
            <div className="inputs center">
              <div
                className="input-group"
              >
                <label>x = </label>
                <input
                  type="number"
                  value={Math.round(curCenter.x * this.scale)}
                  onChange={(e) => {
                    const { value } = e.target
                    this.setState(prev => ({
                      center: {
                        x: +value / this.scale,
                        y: prev.center.y
                      }
                    }))
                  }}
                  onBlur={() => curCenter !== center && setCenter(curCenter)}
                />
              </div>
              <div
                className="input-group"
              >
                <label>y = </label>
                <input
                  type="number"
                  value={Math.round(curCenter.y * this.scale)}
                  onChange={(e) => {
                    const { value } = e.target
                    this.setState(prev => ({
                      center: {
                        x: prev.center.x,
                        y: +value / this.scale
                      }
                    }))
                  }}
                  onBlur={() => curCenter !== center && setCenter(curCenter)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Content