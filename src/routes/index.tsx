import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import paths from './paths'

import Fractal from '../components/pages/Fractal'
import ColorSheme from '../components/pages/ColorSheme'
import Hexagon from '../components/pages/Hexagon'

interface IProps { }

const Routes: React.FC<IProps> = (props: IProps) => (
    <Router>
        <Route exact path={paths.fractal} component={Fractal} />
        <Route exact path={paths.colorScheme} component={ColorSheme} />
        <Route exact path={paths.hexagon} component={Hexagon} />
    </Router>
)

export default Routes