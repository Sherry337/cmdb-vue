import request from '@/utils/request'

// 获取列表
export function getJumpserverList(params) {
  return request({
    url: '/jumpserver/',
    method: 'get',
    params
  })
}

// 申请
export function createJumpserver(data) {
  return request({
    url: '/jumpserver/',
    method: 'post',
    data
  })
}

// 修改
export function updateJumpserver(id, data) {
  return request({
    url: '/jumpserver/' + id + '/',
    // _timeout: 100,
    // async: false,
    // method: 'put',
    method: 'patch',
    data
  })
}

// 删除
export function deleteJumpserver(id) {
  return request({
    url: '/jumpserver/' + id + '/',
    method: 'delete'
  })
}