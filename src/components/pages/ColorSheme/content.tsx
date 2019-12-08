import React from 'react'
import ImageType from '../../../interfaces/Image'
import { getValueFromInput } from '../../../services/data'
import Image from '../../elements/Image'
import Color from '../../../services/color/Color'
import Header from '../../modules/Header'
import ColorInput from '../../elements/ColorInput'
import ColorHSL from '../../../services/color/ColorHSL'

import './style.scss';
import { FormControl, RadioGroup, FormControlLabel, Radio, Slider } from '@material-ui/core';

const img = require('../../../assets/images/cat.png');

interface IProps {
  image: ImageType
  lightDiff: number
  onLightChange: (light: number) => void
  onImageLoad: (image: ImageType) => void
  getPixelColor: (
    x: number,
    y: number,
    width?: number,
    height?: number
  ) => Color | null
  selectedColor: ColorHSL
  onColorChange: (color: string) => void
}

const Content: React.FC<IProps> = (props: IProps) => {
  const onMouseMove = (e: React.MouseEvent) => {
    const { image } = props
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    console.log('color', props.getPixelColor(x, y, rect.width, rect.height))
  }

  const onColorChange = (color: string) => {
    props.onColorChange(color)
  }

  const ref = React.createRef<any>();

  const handleClick = () => {
    ref.current && ref.current.click();
  }

  return (
    <div className="page-color-scheme">
      <Header />
      <div className="content">
        <div
          className="color-scheme-block"
        >
          <input
            type="file"
            onChange={async (e) => {
              const data = await getValueFromInput(e)
              props.onImageLoad(data)
            }}
            ref={ref}
            className="input-file"
          />
          <Image src={props.image !== null ? (props.image.length > 10 ? props.image : img) : ''}
            onMouseMove={onMouseMove}
            className="color-scheme-img" />
          <input
            className="zoom"
            type="number"
            value={0}
            onChange={() => { }}>
          </input>
          <div className="btn-upload-download">
            <button className="btn-hover btn-download" onClick={() => { }}>
              Download
              </button>
            <button className="btn-hover btn-upload" onClick={handleClick}>
              Upload
              </button>
          </div>
        </div>
        <div
          className="info"
        >
          <div className="in-info">
            <FormControl component="fieldset" className="form-control">
              <RadioGroup aria-label="gender" name="gender1" className="radio-group">
                <FormControlLabel className="form-control-label" value="female" control={<Radio />} label="RGB" />
                <FormControlLabel className="form-control-label" value="male" control={<Radio />} label="HSL" />
              </RadioGroup>
            </FormControl>
            <ColorInput
              color={props.selectedColor.toRGB().getColor()}
              onChange={onColorChange}
              className="color-input"
            />
            <p className="light">Light</p>
            <Slider
              value={props.lightDiff}
              min={-1}
              max={1}
              step={0.05}
              className="slider-light"
              onChange={async (e, value) => {
                props.onLightChange(Number(value))
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Content
