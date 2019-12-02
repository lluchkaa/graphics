class Matrix {
  private _matrix: number[][]
  private _rows: number
  private _cols: number

  constructor(matrix: number[][], rows?: number, cols?: number) {
    this._matrix = [...matrix]
    this._rows = rows || (matrix && matrix.length) || 0
    this._cols = cols || (matrix && matrix[0] && matrix[0].length) || 0
  }

  public get matrix(): number[][] {
    return this._matrix
  }

  public get rows(): number {
    return this._rows
  }

  public get cols(): number {
    return this._cols
  }

  public neg = () =>
    new Matrix(
      this._matrix.map((r) => r.map((v) => -v)),
      this._rows,
      this._cols
    )

  public add = (m: Matrix) => {
    if (this._rows === m._rows && this._cols === m._cols) {
      return new Matrix(
        this._matrix.map((r, i) => r.map((v, j) => v + m._matrix[i][j])),
        this._rows,
        this._cols
      )
    }
    throw `Can't add Matrix[${this._rows} x ${this._cols}] to Matrix[${m._rows} x ${m._cols}]`
  }

  public sub = (m: Matrix) => {
    try {
      this.add(m.neg())
    } catch {
      throw `Can't subtract Matrix[${m._rows} x ${m._cols}] from Matrix[${this._rows} x ${this._cols}]`
    }
  }

  public mul = (m: Matrix) => {
    if (this._cols === m._rows) {
      return new Matrix(
        this._matrix.map((r, i) =>
          r.map((v, j) => r.reduce((acc, x, k) => acc + x * m._matrix[j][k], 0))
        ),
        this._rows,
        m._cols
      )
    }
    throw `Can't multiply Matrix[${this._rows} x ${this._cols}] on Matrix[${m._rows} x ${m._cols}]`
  }

  public transposed = () => {
    const transposed: number[][] = []
    for (let j = 0; j < this._cols; ++j) {
      transposed.push([])
      for (let i = 0; i < this._rows; ++i) {
        transposed[j].push(this._matrix[i][j])
      }
    }
    new Matrix(transposed, this._rows, this._cols)
  }

  public minor = (r: number, c: number) => {
    const minor: number[][] = []
    for (let i = 0; i < r; ++i) {
      minor.push([])
      for (let j = 0; j < c; ++j) {
        minor[i].push(this._matrix[i][j])
      }
      for (let j = c + 1; j < this._cols; ++j) {
        minor[i].push(this._matrix[i][j])
      }
    }
    for (let i = r + 1; i < this._rows; ++i) {
      minor.push([])
      for (let j = 0; j < c; ++j) {
        minor[i].push(this._matrix[i][j])
      }
      for (let j = c + 1; j < this._cols; ++j) {
        minor[i].push(this._matrix[i][j])
      }
    }
    return new Matrix(minor, this._rows - 1, this._cols - 1)
  }
}

export default Matrix
