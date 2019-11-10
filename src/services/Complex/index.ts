class Complex {
  private _real: number
  private _imag: number

  public constructor(real: number = 0, imag: number = 0) {
    this._real = real
    this._imag = imag
  }

  public set real(v: number) {
    this._real = v;
  }

  public get real(): number {
    return this._real
  }

  public set imag(v: number) {
    this._imag = v;
  }

  public get imag(): number {
    return this._imag
  }

  public static add = (nums: Complex[]): Complex =>
    nums.reduce((acc, v) => new Complex(acc.real + v.real, acc.imag + acc.imag))

  public static sub = (nums: Complex[]): Complex =>
    nums.reduce((acc, v) => new Complex(acc.real - v.real, acc.imag - v.imag))

  public static mul = (nums: Complex[]): Complex =>
    nums.reduce((acc, v) =>
      new Complex(
        acc.real * v.real - acc.imag * v.imag,
        acc.real * v.imag + acc.imag * v.real
      )
    )

  public static div = (nums: Complex[]): Complex =>
    nums.reduce((acc, v) => {
      const denom = (
        v.real * v.real + v.imag * v.imag
      )
      return new Complex(
        (acc.real * v.real + acc.imag * v.imag) / denom,
        (acc.imag * v.real - acc.real * v.imag) / denom
      )
    })

  public sqr = () => {
    const a = this.real
    const b = this.imag
    return new Complex(
      a * a - b * b,
      2 * a * b
    )
  }

  public cub = () => {
    const a = this.real
    const b = this.imag
    return new Complex(
      a * a * a - 3 * a * b * b,
      3 * a * a * b - b * b * b
    )
  }

  public abs = () => Math.sqrt(this.real * this.real + this.imag * this.imag)

  public ang = () =>
    Math.atan(this.imag / this.real) + (this.real < 0 ? Math.PI : 0)
  
  public neg = () => new Complex(-this.real, -this.imag)
}

export default Complex