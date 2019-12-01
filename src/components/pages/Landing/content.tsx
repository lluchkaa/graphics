import React from 'react'

import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

import path from '../../../routes/paths'

import './style.scss'

interface IProps { }

const logo = require("../../../assets/images/logo.png");
const hexagon = require("../../../assets/images/contentLogos/hexagon.png");
const colorScheme = require("../../../assets/images/contentLogos/colorScheme.png");
const fractal = require("../../../assets/images/contentLogos/fractal.png");
const facebook = require("../../../assets/images/social/facebook.png");
const instagram = require("../../../assets/images/social/instagram.png");
const twitter = require("../../../assets/images/social/twitter.png");

const Content: React.FC<IProps> = (props: IProps) => (
  <div
    className="page landing"
  >
    <RouterLink to={path.userGuide}>
      <p className="user-guide-text">?</p>
    </RouterLink>
    <img src={logo} alt="logo" />
    <div className="main-navigation">
      <RouterLink to={path.hexagon}>
        <div className="card hexagon-link">
          <img src={hexagon} alt="hexagon" className="img-logo" />
          <p className="title-link">Hexagon</p>
        </div>
      </RouterLink>
      <RouterLink to={path.colorScheme}>
        <div className="card color-scheme-link">
          <img src={colorScheme} alt="color scheme" className="img-logo" />
          <p className="title-link">Color Scheme</p>
        </div>
      </RouterLink>
      <RouterLink to={path.fractal}>
        <div className="card fractal-link">
          <img src={fractal} alt="fractal" className="img-logo" />
          <p className="title-link">Fractal</p>
        </div>
      </RouterLink>
    </div>
    <footer className="block-social-links">
      <div className="social-links">
        <Link href="https://www.facebook.com" target="_blank">
          <img src={facebook} alt="facebook" className="img-social" />
        </Link>
        <Link href="https://www.instagram.com" target="_blank">
          <img src={instagram} alt="instagram" className="img-social" />
        </Link>
        <Link href="https://twitter.com" target="_blank">
          <img src={twitter} alt="twitter" className="img-social" />
        </Link>
      </div>
    </footer>
  </div >
)

export default Content