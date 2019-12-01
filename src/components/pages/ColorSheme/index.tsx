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
}

class ColorScheme extends React.Component<IProps, IState> {
  private static defaultLight = 0.0

  constructor(props: IProps) {
    super(props)
    this.state = {
      image: [],
      lightDiff: ColorScheme.defaultLight,
      imageSize: { width: 0, height: 0 }
    }
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

      for (let j = 0; j < canvas.width; ++j) {
        image.push([])
        for (let i = 0; i < canvas.height; ++i) {
          const index = (i * canvas.width + j) * base

          image[j].push(
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
      lightDiff
    } = this.state
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.height = height
    canvas.width = width

    image.forEach((row, x) =>
      row.forEach((color, y) => {
        const newColor = color.copy()
        newColor.light += lightDiff
        ctx.fillStyle = newColor.getColor()
        ctx.fillRect(x, y, 1, 1)
      })
    )

    return canvas.toDataURL()
  }

  getPixelColor = (x: number, y: number) => {
    const { image } = this.state
    if (x >= 0 && x < image[y].length && y >= 0 && y <= image.length) {
      return image[y][x]
    }
    return null
  }

  render() {
    const { lightDiff } = this.state
    const image = this.getLightedImage()
    return (
      <Content
        image={image}
        onImageLoad={this.onImageLoad}
        onLightChange={this.onLightChange}
        lightDiff={lightDiff}
        getPixelColor={this.getPixelColor}
      />
    )
  }
}

export default ColorScheme
