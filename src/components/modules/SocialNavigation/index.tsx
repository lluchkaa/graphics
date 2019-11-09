import React from 'react'

import links, { getSocialImage } from '../../../constants/socialLinks'
import Image from '../../elements/Image'

interface IProps { }

const SocialNavigation: React.FC<IProps> = (props: IProps) => (
  <nav
    className="navigation social-navigation"
  >
    {links.map(link => (
      <li
        key={link.key} 
        className="social-link-item"
      >
        <a
          href={link.href}
          className="link social-link"
        >
          <Image
            src={getSocialImage(link.key)}
            className="social-link-image"
          />
        </a>
      </li>
    ))}
  </nav>
)

export default SocialNavigation