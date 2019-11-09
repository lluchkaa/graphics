import React from 'react'

import Navigation from '../Navigation'
import Image from '../../elements/Image'

import logo from '../../../assets/images/logo.png'

import './style.scss'

interface IProps { }

const Header: React.FC<IProps> = (props: IProps) => (
  <header className="header">
    <div className="logo">
      <Image
        src={logo}
        className="logo-img" 
      />
    </div>

    <Navigation />
  </header>
)

export default Header