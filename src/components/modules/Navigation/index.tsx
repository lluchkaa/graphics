import React from 'react'
import { Link as RouteLink } from 'react-router-dom'

import links from '../../../routes/links'
import contentLinks from '../../../constants/contentLinks'
import { longStackSupport } from 'q'

interface IProps { }

const Navigation: React.FC<IProps> = (props: IProps) => (
  <nav className="navigation main-navigation">
    {contentLinks.map(link => (
      <li
        key={link.key}
        className="content-link-item"
      >
        <RouteLink
          to={link.href}
          className="link"
        >
          {link.text}
        </RouteLink>
      </li>
    ))}
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

export default Navigation