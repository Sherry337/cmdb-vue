import request from '@/utils/request'

export function getAssetsList(params) {
  return request({
    url: '/servers/',
    method: 'get',
    params
  })
}
