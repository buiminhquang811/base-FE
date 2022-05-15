import React, { Suspense, useEffect, useState } from "react";
import { Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import { Link, Navigate, Outlet, useNavigate, withRouter } from "react-router-dom";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	DownOutlined
} from '@ant-design/icons';
import './AuthLayout.scss';
import { getLoggedInUser } from "../../helpers/authUtils";
import Avatar from "antd/lib/avatar/avatar";
import CoreService from "../../services/CoreService";
import CommonLoading from "../CommonLoading";
import { LOCAL_STORAGE } from "../../utils/Constants";

const loading = () => <div className="text-center"></div>;
const menuItems = [
	{ key: '/', icon: null, label: 'Trang chủ' },
	{ key: '/example-component', icon: null, label: 'Example Component' },
]

const menuDropItems = [
	{ key: 'sign-out', label: 'Đăng xuất' }
]

const { Header, Sider, Content } = Layout;

export default function AuthLayout(props) {
	const [isLoading, setIsLoading] = useState(false)
	const [collapsed, setCollapsed] = useState(false)
	const [selectedKeys, setSelectedKeys] = useState([])
	const [listBreadCrumb, setListBreadCrumb] = useState([])
	const navigate = useNavigate();
	// const [menuItems, setMenuItems] = useState([])

	useEffect(() => {
		const breadCrumbs = CoreService.getBreadCrumb()
			.subscribe((value) => {
				console.log(value)
				if (value && value.length) {
					setListBreadCrumb(value)
				} else {
					setListBreadCrumb([])
				}
			})
		const subscription = CoreService.getLoading()
			.subscribe((value) => {
				setIsLoading(value)
			})
		return () => {
			subscription.unsubscribe()
			breadCrumbs.unsubscribe()
		}
	}, [])

	const toggle = () => {
		setCollapsed(!collapsed)
	};

	const onSelect = (data) => {
		navigate(`${data.key}`)
		setSelectedKeys(data.key)
	}

	const onLogout = () => {
		localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
		localStorage.removeItem(LOCAL_STORAGE.AUTH_INFO);
		navigate("/login");
	}

	const onSelectDrop = (data) => {
		if (data.key === 'sign-out') {
			onLogout();
		}
	}

	// get the child view which we would like to render
	const user = getLoggedInUser();
	console.log(listBreadCrumb)
	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed} style={{ height: 'auto', minHeight: '100vh' }}>
				<div className="logo" />
				<Menu
					selectedKeys={selectedKeys}
					mode="inline"
					style={{ borderRight: 0 }}
					items={menuItems}
					theme="dark"
					onClick={onSelect}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header className="site-layout-background-header" style={{ padding: 0 }}>
					<div className="layout-header-admin">
						<span>
							{collapsed ?
								<MenuUnfoldOutlined className="trigger" onClick={toggle} /> :
								<MenuFoldOutlined className="trigger" onClick={toggle} />}
						</span>
						<div className="layout-header-user-info">
							<div>
								<Avatar icon={<UserOutlined />} style={{ marginRight: '10px' }} />
								<Dropdown overlay={
									<Menu items={menuDropItems} onClick={onSelectDrop} />
								} trigger='click'>
									<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
										{user.username} <DownOutlined />
									</a>
								</Dropdown>
							</div>
							<div></div>
						</div>
					</div>
				</Header>
				<Content
					className="site-layout-background"
					style={{
						margin: '24px 16px',
						padding: 0,
						minHeight: 280,
					}}
				>
					<Breadcrumb style={{marginBottom: '10px'}}>
						{listBreadCrumb && listBreadCrumb.length &&
							(listBreadCrumb.map(item =>
								<Breadcrumb.Item key={item.key}>
									<Link to={item.to}>{item.label}</Link>
								</Breadcrumb.Item>
							))
						}
					</Breadcrumb>
					<Outlet />
				</Content>
			</Layout>

			{
				isLoading && <CommonLoading />
			}
		</Layout>
	)
}

