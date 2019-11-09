import ILink from './ILink'

export enum IContentLinkType {
  fractal = 'fractal',
  colorScheme = 'colorScheme',
  hexagon = 'hexagon'
}

interface IContentLink extends ILink<IContentLinkType> { }

export default IContentLink