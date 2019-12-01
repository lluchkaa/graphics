import React from 'react'

import './style.scss'

interface IProps { }

const logo = require("../../../assets/images/logo.png");
const hexagon = require("../../../assets/images/contentLogos/hexagon.png");
const colorScheme = require("../../../assets/images/contentLogos/colorScheme.png");
const fractal = require("../../../assets/images/contentLogos/fractal.png");

const Content: React.FC<IProps> = (props: IProps) => (
  <div
    className="page landing"
  >
    <img src={logo} alt="logo" />
    <div className="main-navigation">
      <div className="card hexagon-link">
        <img src={hexagon} alt="hexagon" className="img-logo"/>
        <p className="title-link">Hexagon</p>
      </div>
      <div className="card color-scheme-link">
        <img src={colorScheme} alt="color scheme" className="img-logo"/>
        <p className="title-link">Color Scheme</p>
      </div>
      <div className="card fractal-link">
        <img src={fractal} alt="fractal" className="img-logo"/>
        <p className="title-link">Fractal</p>
      </div>
    </div>
  </div>
)

export default Content