import React from 'react'

import Nav from './Nav'

interface IProps { }

const Navigation: React.FC<IProps> = (props: IProps) => (
  <div className="navigation">
    <div className="logo"></div>

    <Nav />
  </div>
)

export default Navigation