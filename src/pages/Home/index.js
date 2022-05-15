import React, { useEffect } from 'react'
import CoreService from '../../services/CoreService'
import './Home.scss'

export default function Home() {
  useEffect(() => {
    const breadCrumbs = [
      {key: 'home', to: '/', label: 'Trang chủ'},
    ]
    CoreService.transferBreadCrumb(breadCrumbs)
  }, [])
  return (
    <div>Home</div>
  )
}
