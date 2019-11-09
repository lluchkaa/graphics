import React from 'react'
import { Route } from 'react-router-dom'

import paths from './paths'

import Landing from '../components/pages/Landing'
import Fractal from '../components/pages/Fractal'
import ColorSheme from '../components/pages/ColorSheme'
import Hexagon from '../components/pages/Hexagon'
import UserGuide from '../components/pages/UserGuide'

interface IProps { }

const Routes: React.FC<IProps> = (props: IProps) => (
  <>
    <Route exact path={paths.landing} component={Landing} />
    <Route exact path={paths.fractal} component={Fractal} />
    <Route exact path={paths.colorScheme} component={ColorSheme} />
    <Route exact path={paths.hexagon} component={Hexagon} />
    <Route exact path={paths.userGuide} component={UserGuide} />
  </>
)

export default Routes