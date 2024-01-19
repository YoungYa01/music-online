import request from './index'

/**
 * @description 轮播图
 * @param type {[number]}
 */
export const getBanner = (type = 2) =>
  request({
    url: `/banner?type=${type}`,
    method: 'get',
  })
/**
 * @description 推荐歌单
 * @param limit {number}
 */
export const getPersonalized = (limit = 10) => request({
  url: `/personalized?limit=${limit}`,
  method: 'get'
})
/**
 * @description 获取歌单详情
 * @param id
 */
export const getSongListDetail = (id: number) => request({
  url: `/playlist/detail?id=${id}`,
  method: 'get'
})
/**
 * @description 获取歌单所有歌曲
 * @param id
 * @param limit
 * @param offset
 */
export const getSongList = (id: number, limit = 10, offset = 1) => request({
  url: `/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`,
  method: 'get'
})
/**
 * @description 获取榜单
 */
export const getTopList = () => request({
  url: `/toplist`,
  method: 'get'
})
/**
 * @description 获取歌词
 * @param id
 */
export const getMusicLyric = (id: string) => request({
  url: `/lyric?id=${id}`,
  method: "get"
})

export const getMenuDetails = (id: number) => request({
  url: `/playlist/track/all?id=${id}&limit=10&offset=1`,
  method: 'get'
})


