import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import paths from './paths'

import Fractal from '../components/pages/Fractal'
import ColorSheme from '../components/pages/ColorSheme'
import Hexagon from '../components/pages/Hexagon'
import UserGuide from '../components/pages/UserGuide'

interface IProps { }

const Routes: React.FC<IProps> = (props: IProps) => (
    <Router>
        <Route exact path={paths.fractal} component={Fractal} />
        <Route exact path={paths.colorScheme} component={ColorSheme} />
        <Route exact path={paths.hexagon} component={Hexagon} />
        <Route exact path={paths.userGuide} component={UserGuide} />
    </Router>
)

export default Routes