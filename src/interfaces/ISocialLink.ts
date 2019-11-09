import ILink from './ILink'

export enum SocialLinkType {
  facebook = 'facebook',
  twitter = 'twitter',
  instagram = 'instaram'
}

interface ISocialLink extends ILink<SocialLinkType> { }

export default ISocialLink