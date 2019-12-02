import React from 'react'
import { Link as RouteLink } from 'react-router-dom'

import links from '../../../routes/links'
import contentLinks from '../../../constants/contentLinks'
import { MenuList, MenuItem } from '@material-ui/core'

import './style.scss'

interface IProps { }

const Navigation: React.FC<IProps> = (props: IProps) => (
  <MenuList className="navigation main-navigation">
    {contentLinks.map(link => (
      <MenuItem
        key={link.key}
        className="content-link-item"
      >
        <RouteLink
          to={link.href}
          className={`link ${link.key}`}
        >
          {link.text}
        </RouteLink>
      </MenuItem>
    ))}
    <MenuItem className="link-item">
      <RouteLink
        to={links.userGuide()}
        className="link user-guide"
      >
        ?
        </RouteLink>
    </MenuItem>
  </MenuList>
)

export default Navigation