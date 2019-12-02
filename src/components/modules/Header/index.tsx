import React from 'react'
import { Link as RouteLink } from 'react-router-dom'

import Navigation from '../Navigation'
import path from '../../../routes/paths'
import Image from '../../elements/Image'
import logo from '../../../assets/images/logo.png'

import './style.scss'

interface IProps { }

const Header: React.FC<IProps> = (props: IProps) => (
  <header className="header">
    <div className="logo">
      <RouteLink
        to={path.landing}
      >
        <Image src={logo} className="logo-img" />
      </RouteLink>
    </div>
    <Navigation />
  </header>
)

export default Header
