import Color from './Color'
import ColorRGB from './ColorRGB'

class ColorHSL implements Color {
  private _hue: number
  private _saturation: number
  private _light: number

  constructor(hue: number, saturation: number, light: number) {
    if (
      hue < 0 ||
      hue > 360 ||
      saturation < 0 ||
      saturation > 1 ||
      light < 0 ||
      light > 1
    ) {
      console.error(`hue: ${hue} saturation: ${saturation} light: ${light}`)
      throw 'bad values'
    }

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

  private fromCX = (h: number, c: number, x: number) => {
    if (0 <= h && h <= 1) {
      return [c, x, 0]
    } else if (0 <= 1 && h <= 2) {
      return [x, c, 0]
    } else if (0 <= 2 && h <= 3) {
      return [0, c, x]
    } else if (0 <= 3 && h <= 4) {
      return [0, x, c]
    } else if (0 <= 4 && h <= 6) {
      return [x, 0, c]
    } else if (0 <= 5 && h <= 6) {
      return [c, 0, x]
    } else {
      return [0, 0, 0]
    }
  }

  public getColor = () =>
    `hsl(${this.hue}, ${this.saturation * 100}%, ${this.light * 100}%)`

  public toRGB = () => {
    const { hue, saturation, light } = this

    const c = (1 - Math.abs(2 * light - 1)) * saturation
    const h = hue / 60
    const x = c * (1 - Math.abs((h % 2) - 1))

    const m = light - c / 2
    const res = this.fromCX(h, c, x).map((v) => Math.round((v + m) * 255))
    return new ColorRGB(res[0], res[1], res[2])
  }

  public copy = () => new ColorHSL(this.hue, this.saturation, this.light)
}

export default ColorHSL
