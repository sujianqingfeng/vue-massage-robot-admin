import {
  requestGet,
  requestPost,
  requestDelete,
  requestPut
} from '~/utils/request'

const JSON_CONTENT_TYPE_HEADER_OPTIONS = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// === 登录模块 ===

// 获取验证码
export const fetchCaptchaApi = () => requestGet('/captcha')

//登录
export const fetchLoginApi = (data) => requestPost('/login', data)

// 当前登录用户信息
export const fetchCurrentUserApi = () => requestGet('/currentUser')

// 注销复制接口
export const fetchLogoutApi = () => requestDelete('/logout')

// === 系统用户模块 ===

// 新增用户
export const fetchAddOrModifyUserApi = (data) =>
  requestPost('/auth/admin', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

// 编辑用户
export const fetchModifyUserApi = (data) => requestPut('/auth/admin', data)

// 用户分页列表
export const fetchUserListApi = (params) => requestGet('/auth/admin', params)

// 删除用户 批量同
export const fetchDeleteUserApi = (data) =>
  requestDelete('/auth/admin', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

// 查询用户表单数据
export const fetchUserDetailApi = (id) => requestGet(`/auth/admin/${id}`)

// === 系统角色模块 ===

// 分配权限给角色
export const fetchAssignMenusApi = (data) =>
  requestPut('/auth/role/assignMenus', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

// 角色分页列表
export const fetchRoleListApi = (params) => requestGet('/auth/role', params)

// 新增角色
export const fetchAddRoleApi = (data) =>
  requestPost('/auth/role', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

// 批量删除角色
export const fetchDeleteRoleApi = (data) =>
  requestDelete('/auth/role', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

// 角色表单数据
export const fetchRoleDetailApi = (id) => requestGet(`/auth/role/${id}`)

// 角色下拉列表
export const fetchRoleOptionsApi = () => requestGet('/auth/role/options')

// 获取角色的菜单ID集合
export const fetchRoleAssignMenuIdsApi = (params) =>
  requestGet(`/auth/role/assignMenuIds`, params)

// === 系统菜单模块 ===

// 菜单列表
export const fetchMenuListApi = () => requestGet('/auth/menu')

// === 运营商模块 ===

// 运营商分页列表
export const fetchOperatorListApi = (params) => requestGet('/operator', params)

// 运营商新增、编辑
export const fetchAddOrModifyOperatorApi = (data) =>
  requestPost('/operator', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

// 查看运营商信息表单数据
export const fetchOperatorDetailApi = (id) => requestGet(`/operator/${id}`)

// 删除
export const fetchDeleteOperatorDApi = (id) => requestDelete(`/operator/${id}`)

// （单位下拉）运营商及门店列表
export const fetchOperatorWithStoreTreeApi = () =>
  requestGet('/operator/withStoreTree')

// 运营商列表
export const fetchOperatorAllApi = () => requestGet('/operator/list')

// === 门店模块 ===

// 门店分页列表
export const fetchShopListApi = (params) => requestGet('/store', params)

// 门店新增、编辑
export const fetchAddOrModifyShopApi = (data) =>
  requestPost('/store', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

// 查看门店信息表单数据
export const fetchShopDetailApi = (id) => requestGet(`/store/${id}`)

// 删除
export const fetchDeleteShopApi = (id) => requestDelete(`/store/${id}`)

// 门店列表
export const fetchShopAllApi = () => requestGet('/store/list')

// === 字典模块 ===

// 获取字典数据列表
export const fetchDictionaryListApi = (params) =>
  requestGet('/dictionary/list', params)

// === 设备管理模块 ===

// 设备分页列表
export const fetchDeviceListApi = (params) => requestGet('/equipment', params)

// 设备新增、编辑
export const fetchAddOrModifyDeviceApi = (data) =>
  requestPost('/equipment', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

//设备表单数据
export const fetchDeviceDetailApi = (id) => requestGet(`/equipment/${id}`)

// 删除
export const fetchDeleteDeviceApi = (id) => requestDelete(`/equipment/${id}`)

// 更新软件（批量同）
export const fetchUpgradeSoftwareApi = (data) =>
  requestPost('/equipment/upgrade', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

//设备使能（批量同）
export const fetchEnableDeviceApi = (data) =>
  requestPost('/equipment/enable', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

// 设备错误码记录
export const fetchDeviceFaultListApi = (params) =>
  requestGet('/equipment/fault', params)

// === 订单管理模块 ===

// 订单分页列表
export const fetchOrderListApi = (params) => requestGet('/order', params)

// 订单详情
export const fetchOrderDetailApi = (id) => requestGet(`/order/${id}`)
