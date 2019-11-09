import IContentLink, { ContentLinkType } from '../interfaces/IContentLink'
import routeLinks from '../routes/links'

import fractalImage from '../assets/images/contentLogos/fractal.png'
import colorSchemeImage from '../assets/images/contentLogos/colorScheme.png'
import hexagonImage from '../assets/images/contentLogos/hexagon.svg'

const links: IContentLink[] = [
  {
    key: ContentLinkType.fractal,
    href: routeLinks.fractal(),
    text: 'Fractal'
  },
  {
    key: ContentLinkType.colorScheme,
    href: routeLinks.colorScheme(),
    text: 'Color Scheme'
  },
  {
    key: ContentLinkType.hexagon,
    href: routeLinks.hexagon(),
    text: 'Hexagon'
  }
]

export const getContentImage = (key: ContentLinkType) => {
  switch (key) {
    case ContentLinkType.fractal:
      return fractalImage
    case ContentLinkType.colorScheme:
      return colorSchemeImage
    case ContentLinkType.hexagon:
      return hexagonImage
    default:
      return ''
  }
}

export default links