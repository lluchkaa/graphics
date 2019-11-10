import ISocialLink, { SocialLinkType } from '../interfaces/ISocialLink'

import facebookImage from '../assets/images/social/facebook.svg'
import twitterImage from '../assets/images/social/twitter.svg'
import instagramImage from '../assets/images/social/instagram.svg'

export const facebook: ISocialLink = {
  key: SocialLinkType.facebook,
  href: '#'
}

export const twitter: ISocialLink = {
  key: SocialLinkType.twitter,
  href: '#'
}

export const instagram: ISocialLink = {
  key: SocialLinkType.instagram,
  href: '#'
}

const links: ISocialLink[] = [
  facebook,
  twitter,
  instagram
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