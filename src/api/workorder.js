import request from '@/utils/request'

// 获取故障列表
export function getWorkorderList(params) {
  return request({
    url: '/workorder/',
    method: 'get',
    params
  })
}

// 提交
export function createWorkorder(data) {
  return request({
    url: '/workorder/',
    method: 'post',
    data
  })
}

// 不分修改
// export function updatePublish(id, data) {
//   return request({
//     url: '/workorder/' + id + '/',
//     method: 'put',
//     data
//   })
// }

export function updateWorkorder(id, data) {
  return request({
    url: '/workorder/' + id + '/',
    method: 'patch',
    data
  })
}

// 删除
export function deleteWorkorder(id) {
  return request({
    url: '/workorder/' + id + '/',
    method: 'delete'
  })
}
