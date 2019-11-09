import ILink from './ILink'

export enum ContentLinkType {
  fractal = 'fractal',
  colorScheme = 'colorScheme',
  hexagon = 'hexagon'
}

interface IContentLink extends ILink<ContentLinkType> { }

export default IContentLink