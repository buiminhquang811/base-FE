import axios from 'axios'
import { API_SUCCESS_STATUS, LOCAL_STORAGE, UNKNOWN_ERROR_MESSAGE } from '../utils/Constants'
import CoreService from './CoreService'
import { processParams } from '../utils/Helper'

function getAccessToken() {
	try {
		const accessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN))
		return accessToken
	} catch (error) {
		return null
	}
}

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
	headers: {
		common: {
			'Content-Type': 'application/json',
		},
	},
})

const instanceFormData = axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
	headers: {
		common: {
			'Content-Type': 'multipart/form-data',
		},
	},
	responseType: 'blob',
})

const handleError = (error = {}) => {
	if (error.response.status === 404) {
		CoreService.showAlertError(UNKNOWN_ERROR_MESSAGE)
		return
	}

	if (error.response) {
		CoreService.showAlertError(error.response.data.message)
		return
	}

	CoreService.showAlertError(UNKNOWN_ERROR_MESSAGE)
}

const initial = () => {
	const accessToken = getAccessToken()

	if (accessToken) {
		instance.defaults.headers.common.Authorization = 'Bearer ' + accessToken
		instanceFormData.defaults.headers.common.Authorization = 'Bearer ' + accessToken
	}
}

const BaseService = {
	get: (url = '', params) => {
		if (params) {
			url = processParams(url, params)
		}
		initial()

		return new Promise(async (resolve, reject) => {
			await instance.get(url)
				.then((response) => {
					const totalRow = response.headers['x-total-count'] || 0
					const {
						status,
						message,
					} = response.data
					const data = {
						...response.data,
						totalRow,
					}
					if (!status || parseFloat(status) !== API_SUCCESS_STATUS) {
						CoreService.showAlertError(message)
						CoreService.hideLoading()
						reject(message)
					}
					resolve(data)
				})
				.catch((error) => {
					CoreService.hideLoading()
					reject(handleError(error))
				})
		})
	},

	post: (url = '', body = {}, params, config = {}) => new Promise(async (resolve, reject) => {
		if (params) {
			url = processParams(url, params)
		}
		initial()

		await instance.post(url, body, config)
			.then((response) => {
				const totalRow = response.headers['x-total-count'] || 0
				const {
					status,
					message,
				} = response.data
				if (!status || parseFloat(status) !== API_SUCCESS_STATUS) {
					CoreService.showAlertError(message)
					CoreService.hideLoading()
					reject(message)
				}

				resolve({ ...response.data, totalRow })
			})
			.catch((error) => {
				CoreService.hideLoading()
				reject(handleError(error))
			})
	}),

	postFormData: (url = '', body = {}, params, config = {}, fileName = '') => new Promise(async (resolve, reject) => {
		if (params) {
			url = processParams(url, params)
		}
		initial()
		await instanceFormData.post(url, body, config)
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', fileName + '.xlsx')
				document.body.appendChild(link)
				link.click()

				CoreService.hideLoading()
				resolve(response.data)
			})
			.catch(async (error) => {
				const responseObj = await error.response.data.text()
				CoreService.showAlertError(JSON.parse(responseObj).message)
				CoreService.hideLoading()
			})
	}),

	postImportExcl: (url = '', body = {}, params, config = {}, fileName = '') => new Promise(async (resolve, reject) => {
		if (params) {
			url = processParams(url, params)
		}
		initial()
		await instanceFormData.post(url, body, config)
			.then((response) => {
				const file = new Blob([response.data])
				if (Object.keys(response.headers).length) {
					const str = `Import thành công ${(+response.headers.total - response.headers.totalerror)} trên tổng số ${response.headers.total} bản ghi`
					CoreService.showAlertSuccess(str)
				}
				if (file) {
					resolve({ file })
				}
				CoreService.hideLoading()
				resolve(response.data)
			})
			.catch(async (error) => {
				const responseObj = await error.response.data.text()
				CoreService.showAlertError(JSON.parse(responseObj).message)
				CoreService.hideLoading()
			})
	}),

	put: (url = '', body = {}, params, config = {}) => new Promise(async (resolve, reject) => {
		if (params) {
			url = processParams(url, params)
		}
		initial()

		await instance.put(url, body, config)
			.then((response) => {
				const {
					status,
					message,
				} = response.data
				if (!status || parseFloat(status) !== API_SUCCESS_STATUS) {
					CoreService.showAlertError(message)
					CoreService.hideLoading()
					reject(message)
				}

				resolve(response.data)
			})
			.catch((error) => {
				CoreService.hideLoading()
				reject(handleError(error))
			})
	}),

	delete: (url = '', params, config = {}) => new Promise(async (resolve, reject) => {
		if (params) {
			url = processParams(url, params)
		}
		initial()

		await instance.delete(url, config)
			.then((response) => {
				const {
					status,
					message,
				} = response.data
				if (!status || parseFloat(status) !== API_SUCCESS_STATUS) {
					CoreService.showAlertError(message)
					CoreService.hideLoading()
					reject(message)
				}

				resolve(response.data)
			})
			.catch((error) => {
				CoreService.hideLoading()
				reject(handleError(error))
			})
	}),
}

export default BaseService
