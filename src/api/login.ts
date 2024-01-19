import request from './index'


export const phoneLogin = () => request({
  url: `/login/cellphone`,
  method: 'get'
})

export const qrLogin = () => request({
  url: `/login/qr/key`,
  method: 'get'
})

export const qrCreate = (key: string) => request({
  url: `/login/qr/create?key=${key}`,
  method: 'get'
})

export const qrCheck = (key: string) => request({
  url: `/login/qr/check?key=${key}`,
  method: 'get'
})



export const login = () => request({
  url: '/register/anonimous',
  method: 'get'
})

export const search = (keywords: string) => request({
  url: `/search?keywords=${keywords}`,
  method: 'get'
})

