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
export const fetchAddUserApi = (data) =>
  requestPost('/auth/admin', data, JSON_CONTENT_TYPE_HEADER_OPTIONS)

// 编辑用户
export const fetchModifyUserApi = (data) => requestPut('/auth/admin', data)

// 用户分页列表
export const fetchUserListApi = (params) => requestGet('/auth/admin', params)

// 删除用户 批量同
export const fetchDeleteUserApi = (data) => requestDelete('/auth/admin', data)

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
