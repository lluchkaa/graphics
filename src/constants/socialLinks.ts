import ISocialLink, { SocialLinkType } from '../interfaces/ISocialLink'

import facebookImage from '../assets/images/social/facebook.svg'
import twitterImage from '../assets/images/social/twitter.svg'
import instagramImage from '../assets/images/social/instagram.svg'

const links: ISocialLink[] = [
  {
    key: SocialLinkType.facebook,
    href: '#'
  },
  {
    key: SocialLinkType.twitter,
    href: '#'
  },
  {
    key: SocialLinkType.instagram,
    href: '#'
  }
]

export const getSocialImage = (key: SocialLinkType) => {
  switch (key) {
    case SocialLinkType.facebook:
      return facebookImage
    case SocialLinkType.twitter:
      return twitterImage
    case SocialLinkType.instagram:
      return instagramImage
    default:
      return ''
  }
}

export default links