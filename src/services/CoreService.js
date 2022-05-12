import { Subject } from 'rxjs'
import { NOTIFICATION_TYPE, NOTIFICATION_MESSAGE } from '../utils/Constants'
import { notification } from 'antd'

const commonLoading = new Subject()

// export const showAlertSuccess = (message = '') => toast.success(message, DEFAULT_TOAST_OPTIONS)
// export const showAlertError = (message = '') => toast.error(message, DEFAULT_TOAST_OPTIONS)
// export const showAlertWarning = (message = '') => toast.warning(message, DEFAULT_TOAST_OPTIONS)
// export const showAlertInfo = (message = '') => toast.info(message, DEFAULT_TOAST_OPTIONS)

const openNotification = (type, message) => {
	notification[type]({
    message: message,
		duration: 4.5,
		className: `notification-ant`,
  });
}

const CoreService = {
	showAlertSuccess: (message = '') => openNotification(NOTIFICATION_TYPE.SUCCESS, message),
	showAlertError: (message = '') => openNotification(NOTIFICATION_TYPE.ERROR, message),
	showAlertWarning: (message = '') => openNotification(NOTIFICATION_TYPE.WARNING, message),
	showAlertInfo: (message = '') => openNotification(NOTIFICATION_TYPE.INFO, message),
	showLoading: () => {
		commonLoading.next(true)
	},
	hideLoading: () => {
		commonLoading.next(false)
	},
	getLoading: () => {
		return commonLoading.asObservable()
	},
}

export default CoreService
