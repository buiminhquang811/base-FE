import { Card } from 'antd'
import React, { useEffect } from 'react'
import CoreService from '../../services/CoreService'

export default function ExampleComponent() {

  useEffect(() => {
    const breadCrumbs = [
      {key: 'home', to: '/', label: 'Trang chủ'},
      {key: 'example', to: '/example-component', label: 'Example Component'}
    ]
    CoreService.transferBreadCrumb(breadCrumbs)
  }, [])

  return (
    <React.Fragment>
      <Card>
        card
      </Card>
      <br />
      <Card>
        card
      </Card>
    </React.Fragment>
  )
}
