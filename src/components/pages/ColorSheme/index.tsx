import React from 'react'

import Content from './content'
import Image from '../../../interfaces/Image'
import ColorRGB from '../../../services/color/ColorRGB'

interface IProps {}
interface IState {
  image: ColorRGB[][]
  light: number
  imageSize: { width: number; height: number }
}

class ColorScheme extends React.Component<IProps, IState> {
  private static defaultLight = 0.5

  constructor(props: IProps) {
    super(props)
    this.state = {
      image: [],
      light: ColorScheme.defaultLight,
      imageSize: { width: 0, height: 0 }
    }
  }

  onLightChange = (light: number) =>
    light >= 0 && light <= 1 && this.setState({ light })

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

      const image: ColorRGB[][] = []

      for (let i = 0; i < canvas.height; ++i) {
        image.push([])
        for (let j = 0; j < canvas.width; ++j) {
          const index = (i * canvas.width + j) * base

          image[i].push(
            new ColorRGB(
              imageData.data[index],
              imageData.data[index + 1],
              imageData.data[index + 2]
            )
          )
        }
      }
      this.setState({
        image,
        light: ColorScheme.defaultLight,
        imageSize: { width: img.width, height: img.height }
      })
    }
    img.src = image
  }

  getLightedImage = () => {
    const {
      imageSize: { width, height },
      image,
      light
    } = this.state
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.height = height
    canvas.width = width

    image.forEach((row, x) =>
      row.forEach((color, y) => {
        const newColor = color.toHSL()
        newColor.light += light
        ctx.fillStyle = newColor.getColor()
        ctx.fillRect(x, y, 1, 1)
      })
    )

    return canvas.toDataURL()
  }

  render() {
    const { light } = this.state
    const image = this.getLightedImage()
    return (
      <Content
        image={image}
        onImageLoad={this.onImageLoad}
        onLightChange={this.onLightChange}
        light={light}
      />
    )
  }
}

export default ColorScheme
