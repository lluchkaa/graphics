interface IBounds<T> {
  min: T,
  max: T
}

export type NumBounds = IBounds<number>

export default IBounds