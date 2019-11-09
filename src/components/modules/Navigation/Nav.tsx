import React from 'react'
import { Link as RouteLink } from 'react-router-dom'

import links from '../../../routes/links'

interface IProps { }

const Nav: React.FC<IProps> = (props: IProps) => (
  <nav className="nav">
    <li className="link-item">
      <RouteLink
        to={links.fractal()}
        className="link"
      >
        Fractal
        </RouteLink>
    </li>
    <li className="link-item">
      <RouteLink
        to={links.colorScheme()}
        className="link"
      >
        Color Scheme
        </RouteLink>
    </li>
    <li className="link-item">
      <RouteLink
        to={links.hexagon()}
        className="link"
      >
        Hexagon
        </RouteLink>
    </li>
    <li className="link-item">
      <RouteLink
        to={links.userGuide()}
        className="link"
      >
        ?
        </RouteLink>
    </li>
  </nav>
)

export default Nav