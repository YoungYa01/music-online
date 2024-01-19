import React from "react";

interface MenuT {
  menuList: Array<S>,
}

interface MenuS {
  label: string,
  key: string,
  disabled?: boolean,
  icon?: React.FC,
  children: Array<T>
}

interface BannerType {
  pic: string,
  targetId: number,
  mainTitle: string,
  adid: string,
  targetType: number,
  titleColor: string,
  typeTitle: string,
  url: string,
  adurlV2: string,
  exclusive: false,
  monitorImpress: string,
  monitorClick: string,
  monitorType: string,
  monitorImpressList: [],
  monitorClickList: [],
  monitorBlackList: string,
  extMonitor: string,
  extMonitorInfo: string,
  adSource: string,
  adLocation: string,
  encodeId: string,
  program: string,
  event: string,
  video: string,
  dynamicVideoData: string,
  song: string,
  bannerId: string,
  alg: string,
  scm: string,
  requestId: string,
  showAdTag: true,
  pid: string,
  showContext: string,
  adDispatchJson: string,
  s_ctrp: string,
  logContext: string,
  bannerBizType: string
}

interface BannerAxiosResponse {
  banners: Array<BannerType>,
  code: number
}

interface RecommendType {
  id: number,
  type: number,
  name: string,
  copywriter: string,
  picUrl: string,
  canDislike: boolean,
  trackNumberUpdateTime: number,
  playCount: number,
  trackCount: number,
  highQuality: boolean,
  alg: string
}

interface TopListType {
  subscribers: [],
  subscribed: string,
  creator: string,
  artists: string,
  tracks: [],
  updateFrequency: string,
  backgroundCoverId: number,
  backgroundCoverUrl: string,
  titleImage: number,
  coverText: string,
  titleImageUrl: string,
  coverImageUrl: string,
  iconImageUrl: string,
  englishTitle: string,
  opRecommend: boolean,
  recommendInfo: string,
  socialPlaylistCover: string,
  tsSongCount: number,
  subscribedCount: number,
  adType: number,
  trackNumberUpdateTime: number,
  cloudTrackCount: number,
  coverImgId: number,
  anonimous: boolean,
  trackUpdateTime: number,
  trackCount: number,
  coverImgUrl: string,
  specialType: number,
  newImported: false,
  commentThreadId: string,
  updateTime: number,
  highQuality: boolean,
  totalDuration: number,
  privacy: number,
  playCount: number,
  createTime: number,
  ordered: boolean,
  description: string,
  status: number,
  tags: [],
  userId: number,
  name: string,
  id: number,
  coverImgId_str: string,
  ToplistType: string
}

interface FeaturedListType {
  coverUrl: string
  name: string
  position: number
  upateFrequency: string
  updateFrequency: string
}

interface PlayListType {
  id: number,
  name: string,
  coverImgId: number,
  coverImgUrl: string,
  coverImgId_str: string,
  adType: number,
  userId: number,
  createTime: number,
  status: number,
  opRecommend: false,
  highQuality: false,
  newImported: false,
  updateTime: number,
  trackCount: number,
  specialType: number,
  privacy: number,
  trackUpdateTime: number,
  commentThreadId: string,
  playCount: number,
  trackNumberUpdateTime: number,
  subscribedCount: number,
  cloudTrackCount: number,
  ordered: true,
  description: string,
  tags: string[],
  tracks: Array<{
    a: string
    al: {
      id: number
      name: string
      pic: number
      picUrl: string
      pic_str: string
      tns: []
    }
    alia: []
    ar: [{ id: number, name: string, tns: [], alias: [] }]
    awardTags: string[]
    cd: string
    cf: string
    copyright: number
    cp: number
    crbt: string
    djId: number
    dt: number
    entertainmentTags: string[]
    fee: number
    ftype: number
    h: { br: number, fid: number, size: number, vd: number }
    hr: string
    id: number
    l: { br: number, fid: number, size: number, vd: number }
    m: { br: number, fid: number, size: number, vd: number }
    mark: number
    mst: number
    mv: number
    name: string
    no: number
    noCopyrightRcmd: string
    originCoverType: number
    originSongSimpleData: string
    pop: number
    pst: number
    publishTime: number
    resourceState: boolean
    rt: string
    rtUrl: string
    rtUrls: []
    rtype: number
    rurl: string
    s_id: number
    single: number
    songJumpInfo: string
    sq: string
    st: number
    t: number
    tagPicList: string
    v: number
    version: number
  }>,
  updateFrequency: string,
  backgroundCoverId: number,
  backgroundCoverUrl: string,
  titleImage: number,
  titleImageUrl: string,
  englishTitle: string,
  officialPlaylistType: string,
  copied: boolean,
  relateResType: string,
  subscribers: Array<{
    defaultAvatar: boolean,
    province: number,
    authStatus: number,
    followed: boolean,
    avatarUrl: string,
    accountStatus: number,
    gender: number,
    city: number,
    birthday: number,
    userId: number,
    userType: number,
    nickname: string,
    signature: string,
    description: string,
    detailDescription: string,
    avatarImgId: number,
    backgroundImgId: number,
    backgroundUrl: string,
    authority: number,
    mutual: false,
    expertTags: string,
    experts: string,
    djStatus: number,
    vipType: number,
    remarkName: string,
    authenticationTypes: number,
    avatarDetail: string,
    avatarImgIdStr: string,
    backgroundImgIdStr: string,
    anchor: boolean,
    avatarImgId_str: string
  }>
}

interface PrivilegesType {
  id: number,
  fee: number,
  payed: number,
  realPayed: number,
  st: number,
  pl: number,
  dl: number,
  sp: number,
  cp: number,
  subp: number,
  cs: boolean,
  maxbr: number,
  fl: number,
  pc: boolean,
  toast: boolean,
  flag: number,
  paidBigBang: boolean,
  preSell: boolean,
  playMaxbr: number,
  downloadMaxbr: number,
  maxBrLevel: string,
  playMaxBrLevel: string,
  downloadMaxBrLevel: string,
  plLevel: string,
  dlLevel: string,
  flLevel: string,
  rscl: string,
  freeTrialPrivilege: {
    resConsumable: boolean,
    userConsumable: boolean,
    listenType: string,
    cannotListenReason: string,
    playReason: string
  },
  rightSource: number,
  chargeInfoList: Array<{
    rate: number,
    chargeUrl: string,
    chargeMessage: string,
    chargeType: number
  }>
}

interface MusicDataType {
  code: number,
  playlist: PlayListType,
  privileges: PrivilegesType,
  relatedVideos: string,
  resEntrance: string
  sharedPrivilege: string
  songFromUsers: string
  urls: string
}
