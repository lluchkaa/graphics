import React from 'react'

import Content from './content'
import Image from '../../../interfaces/Image'
import ColorHSL from '../../../services/color/ColorHSL'
import ColorRGB from '../../../services/color/ColorRGB'

interface IProps {}
interface IState {
  image: ColorHSL[][]
  lightDiff: number
  imageSize: { width: number; height: number }
  selectedColor: ColorHSL
}

class ColorScheme extends React.Component<IProps, IState> {
  private static defaultLight = 0.0

  constructor(props: IProps) {
    super(props)
    this.state = {
      image: [],
      lightDiff: ColorScheme.defaultLight,
      imageSize: { width: 0, height: 0 },
      selectedColor: new ColorHSL(0, 0, 0)
    }
  }

  private inRange = (
    value: number,
    center: number,
    diff: number,
    maxValue: number = 0
  ) => {
    return (
      Math.abs(value - center) <= diff ||
      Math.abs(value + maxValue - center) <= diff ||
      Math.abs(value - maxValue - center) <= diff
    )
  }

  onColorChange = (color: string) => {
    const red = parseInt(color.substr(1, 2), 16)
    const green = parseInt(color.substr(3, 2), 16)
    const blue = parseInt(color.substr(5, 2), 16)
    this.setState({ selectedColor: new ColorRGB(red, green, blue).toHSL() })
  }

  onLightChange = (lightDiff: number) =>
    lightDiff >= -1 && lightDiff <= 1 && this.setState({ lightDiff })

  onImageLoad = (image: Image) => {
    if (!image) {
      return
    }
    const img = document.createElement('img')
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const base = 4

      const image: ColorHSL[][] = []

      for (let i = 0; i < canvas.height; ++i) {
        image.push([])
        for (let j = 0; j < canvas.width; ++j) {
          const index = (i * canvas.width + j) * base

          image[i].push(
            new ColorRGB(
              imageData.data[index],
              imageData.data[index + 1],
              imageData.data[index + 2]
            ).toHSL()
          )
        }
      }
      this.setState({
        image,
        lightDiff: ColorScheme.defaultLight,
        imageSize: { width: img.width, height: img.height }
      })
    }
    img.src = image
  }

  getLightedImage = () => {
    const {
      imageSize: { width, height },
      image,
      lightDiff,
      selectedColor
    } = this.state
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.height = height
    canvas.width = width

    image.forEach((row, y) =>
      row.forEach((color, x) => {
        const newColor = color.copy()
        if (
          this.inRange(newColor.hue, selectedColor.hue, 50, 360) &&
          this.inRange(newColor.saturation, selectedColor.saturation, 0.3) &&
          this.inRange(newColor.light, selectedColor.light, 0.3)
        ) {
          newColor.light += lightDiff
        }
        ctx.fillStyle = newColor.getColor()
        ctx.fillRect(x, y, 1, 1)
      })
    )

    return canvas.toDataURL()
  }

  getPixelColor = (x: number, y: number, width?: number, height?: number) => {
    const { image } = this.state
    if (height) {
      y = Math.trunc((y * image.length) / height)
    }
    if (width) {
      x = Math.trunc((x * image[y].length) / width)
    }
    if (
      y >= 0 &&
      y <= image.length &&
      image[y] &&
      x >= 0 &&
      x < image[y].length
    ) {
      return image[y][x]
    }
    return null
  }

  render() {
    const { lightDiff, selectedColor } = this.state
    const image = this.getLightedImage()
    return (
      <Content
        image={image}
        onImageLoad={this.onImageLoad}
        onLightChange={this.onLightChange}
        lightDiff={lightDiff}
        getPixelColor={this.getPixelColor}
        selectedColor={selectedColor}
        onColorChange={this.onColorChange}
      />
    )
  }
}

export default ColorScheme
