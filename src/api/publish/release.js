import request from '@/utils/request'

// 获取列表
export function getReleaseList(params) {
  return request({
    url: '/deploy/',
    method: 'get',
    params
  })
}

// 申请发布
export function createRelease(data) {
  return request({
    url: '/deploy/',
    method: 'post',
    data
  })
}

// 修改
export function updateRelease(id, data) {
  return request({
    url: '/deploy/' + id + '/',
    // _timeout: 100,
    // async: false,
    // method: 'put',
    method: 'patch',
    data
  })
}

// 删除
export function deleteRelease(id) {
  return request({
    url: '/deploy/' + id + '/',
    method: 'delete'
  })
}
