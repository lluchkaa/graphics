import React from 'react'

import Nav from './Nav'
import Image from '../../elements/Image'

import logo from '../../../assets/images/logo.png'

import './style.scss'

interface IProps { }

const Navigation: React.FC<IProps> = (props: IProps) => (
  <div className="navigation">
    <div className="logo">
      <Image
        src={logo}
        className="logo" 
      />
    </div>

    <Nav />
  </div>
)

export default Navigation