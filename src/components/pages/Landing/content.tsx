import React from 'react'

import { Link } from 'react-router-dom'

import path from '../../../routes/paths'

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
    <Link to={path.userGuide}>
      <p className="user-guide-text">?</p>
    </Link>
    <img src={logo} alt="logo" />
    <div className="main-navigation">
      <Link to={path.hexagon}>
        <div className="card hexagon-link">
          <img src={hexagon} alt="hexagon" className="img-logo" />
          <p className="title-link">Hexagon</p>
        </div>
      </Link>
      <Link to={path.colorScheme}>
      <div className="card color-scheme-link">
        <img src={colorScheme} alt="color scheme" className="img-logo" />
        <p className="title-link">Color Scheme</p>
      </div>
      </Link>
      <Link to={path.fractal}>
      <div className="card fractal-link">
        <img src={fractal} alt="fractal" className="img-logo" />
        <p className="title-link">Fractal</p>
      </div>
      </Link>
    </div>
  </div >
)

export default Content