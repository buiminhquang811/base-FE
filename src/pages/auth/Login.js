import React, { useEffect, useState } from 'react'
import { isUserAuthenticated } from '../../helpers/authUtils';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.scss';
import 'antd/dist/antd.css';

export default function Login() {
  const [isMounted, setIsMounted] = useState(false);

  const isAuthTokenValid = isUserAuthenticated();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  useEffect(() => {
    setIsMounted(true);
    document.body.classList.add('authentication-bg');
    return () => {
      setIsMounted(false);
      document.body.classList.remove('authentication-bg');
    }
  }, [])

  return (
    <div class="content">
      <div class="text-align-center">
        <h1>Đăng nhập</h1>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>

    </div >

  )
}
