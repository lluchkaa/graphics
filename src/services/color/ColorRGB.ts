import Color from './Color'
import ColorHSL from './ColorHSL'
import { bigIntLiteral } from '@babel/types'

class ColorRGB implements Color {
  private _red: number
  private _green: number
  private _blue: number

  constructor(red: number, green: number, blue: number) {
    if (
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255
    ) {
      throw 'bad colors'
    }
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

  private normalized = () => {
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

    if (delta === 0) {
      return 0
    }

    const start = 60
    let hue = 0

    switch (max) {
      case red:
        hue = start * ((green - blue) / delta)
        break
      case green:
        hue = start * ((blue - red) / delta) + 120
        break
      case blue:
        hue = start * ((red - green) / delta) + 240
        break
    }

    const base = 360

    hue = (hue + base) % base
    return hue
  }

  public toHSL = () => {
    const { red, green, blue } = this.normalized()

    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)
    const delta = max - min

    const hue = this.getHue()

    const light = (max + min) / 2

    const saturation = light
      ? light == 1
        ? 1
        : delta / (2 * (light > 0.5 ? 1 - light : light))
      : 0

    return new ColorHSL(Math.round(hue * 100) / 100, Math.round(saturation * 100) / 100, Math.round(light * 100) / 100)
  }
  public copy = () => new ColorRGB(this.red, this.green, this.blue)
}

export default ColorRGB
