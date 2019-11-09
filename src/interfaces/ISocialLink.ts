export enum SocialLinkType {
  facebook = 'facebook',
  twitter = 'twitter',
  instagram = 'instaram'
}

interface ISocialLink {
  key: SocialLinkType
  href: string
}

export default ISocialLink