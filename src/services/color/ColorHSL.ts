import Color from './Color'
import ColorRGB from './ColorRGB'

class ColorHSL implements Color {
  private _hue: number
  private _saturation: number
  private _light: number

  constructor(hue: number, saturation: number, light: number) {
    this._hue = hue
    this._saturation = saturation
    this._light = light
  }

  public get hue() {
    return this._hue
  }
  public set hue(v: number) {
    this._hue = v
  }

  public get saturation() {
    return this._saturation
  }
  public set saturation(v: number) {
    this._saturation = v
  }

  public get light() {
    return this._light
  }
  public set light(v: number) {
    this._light = v
  }

  public getColor = () => `hsl(${this.hue}, ${this.saturation}, ${this.light})`

  public toRGB = () => new ColorRGB(0, 0, 0)
}

export default ColorHSL
