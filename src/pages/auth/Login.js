import React, { useEffect, useState } from 'react'
import { isUserAuthenticated } from '../../helpers/authUtils';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.scss';
// import 'antd/dist/antd.css';
import CoreService from '../../services/CoreService';
import AuthService from '../../services/AuthService';
import { Navigate, useNavigate } from 'react-router-dom';
import { fakeLogin } from '../../helpers/fake-login';
import { LOCAL_STORAGE } from '../../utils/Constants';

export default function Login() {
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // const data = await AuthService.login(values);
    const data = await fakeLogin(values);
    if (data.ok) {
      await localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, data.data.token)
      await localStorage.setItem(LOCAL_STORAGE.AUTH_INFO, JSON.stringify(data.data))
      navigate('/')
    }
  };

  const renderRedirectToRoot = () => {
    const isAuthTokenValid = isUserAuthenticated();
    if (isAuthTokenValid) {
      return <Navigate to='/' />
    }
  }

  return (
    <React.Fragment>
      {renderRedirectToRoot()}
      <div className='login-bg'>
        <div className="content">
          <div className="text-align-center">
            <h1>Đăng nhập</h1>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{}}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div >
      </div>
    </React.Fragment>

  )
}
