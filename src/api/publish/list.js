import request from '@/utils/request'

// 获取用户列表
export function getPublishList(params) {
  return request({
    url: '/project/',
    method: 'get',
    params
  })
}

// 创建用户
export function createPublish(data) {
  return request({
    url: '/project/',
    method: 'post',
    data
  })
}

// 修改用户
export function updatePublish(id, data) {
  return request({
    url: '/project/' + id + '/',
    method: 'put',
    data
  })
}

// 删除用户
export function deletePublish(id) {
  return request({
    url: '/project/' + id + '/',
    method: 'delete'
  })
}

// 将用户加入组中
// export function updateUserGroup(id, data) {
//   return request({
//     url: '/usergroup/' + id + '/',
//     method: 'put',
//     data
//   })
// }
