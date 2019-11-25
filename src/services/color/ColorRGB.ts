import Color from './Color'
import ColorHSL from './ColorHSL'

class ColorRGB implements Color {
  private _red: number
  private _green: number
  private _blue: number

  constructor(red: number, green: number, blue: number) {
    this._red = red
    this._green = green
    this._blue = blue
  }

  public get red() {
    return this._red
  }
  public set red(v: number) {
    this._red = v
  }

  public get green() {
    return this._green
  }
  public set green(v: number) {
    this._green = v
  }

  public get blue() {
    return this._blue
  }
  public set blue(v: number) {
    this._blue = v
  }

  private hex = (v: number) => v.toString(16).padStart(2, '0')

  public getColor = () =>
    `#${this.hex(this.red)}${this.hex(this.green)}${this.hex(this.blue)}`

  public normalized = () => {
    const { red: r, green: g, blue: b } = this

    const base = 255

    return {
      red: r / base,
      green: g / base,
      blue: b / base
    }
  }

  private getHue = () => {
    const { red, green, blue } = this.normalized()

    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)
    const delta = max - min

    const start = Math.PI / 3

    let hue = 0

    switch (max) {
      case red:
        hue = start * ((green - blue) / delta)
      case green:
        hue = start * ((blue - red) / delta) + (2 / 3) * Math.PI
      case blue:
        hue = start * ((red - green) / delta) + (4 / 3) * Math.PI
    }

    const d360 = 2 * Math.PI

    hue = (hue + d360) % d360
    return hue
  }

  public toHSL = () => {
    const { red, green, blue } = this.normalized()

    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)
    const delta = max - min

    const hue = this.getHue()

    const light = (max - min) / 2

    const saturation = delta / (2 * (light > 0.5 ? 1 - light : light))

    return new ColorHSL(hue, saturation, light)
  }
}

export default ColorRGB
