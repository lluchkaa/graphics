import IContentLink, { ContentLinkType } from '../interfaces/IContentLink'

import routeLinks from '../routes/links'

const links: IContentLink[] = [
  {
    key: ContentLinkType.fractal,
    href: routeLinks.fractal()
  },
  {
    key: ContentLinkType.colorScheme,
    href: routeLinks.colorScheme()
  },
  {
    key: ContentLinkType.hexagon,
    href: routeLinks.hexagon()
  }
]

export default links