import React from 'react'

import Header from '../../modules/Header'

interface IProps { }

const Content: React.FC<IProps> = (props: IProps) => (
  <div
    className="page hexagon"
  >
    <Header/>

  </div>
)

export default Content