import {action, makeAutoObservable, observable} from "mobx";
import {MusicDataType} from "../types";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  // 音乐数据
  @observable
  musicData: MusicDataType | NonNullable<unknown> = {}

  @action.bound
  setMusicData(musicdata = {}) {
    this.musicData = musicdata;
  }

  // 音乐id
  @observable
  musicId: { id: string, index: number } = {id: '', index: 0}

  @action.bound
  setMusicId(data: { id: string, index: number }) {
    this.musicId = data;
  }

  // 音乐列表
  @observable
  musicList = []

  @action.bound
  setMusicList(list: []) {
    this.musicList = list;
  }

  // 音乐下标
  @observable
  musicIndex = 0

  @action.bound
  setMusicIndex(index: number) {
    this.musicIndex = index;
  }

  // 播放状态
  @observable
  isPlayed: boolean = false;

  @action.bound
  setIsPlayed(isPlayed: boolean) {
    this.isPlayed = isPlayed;
  }

  // 歌单
  @observable
  menuId = 0;

  @action.bound
  setMenuId(id: number) {
    this.menuId = id;
  }

  // 歌词
  @observable
  lyric = [];

  @action
  setLyric(lyric: []) {
    this.lyric = lyric;
  }

  // 播放时间
  @observable
  currentTime = 0;

  @action
  setCurrentTime(currentTime: number) {
    this.currentTime = currentTime;
  }
}

export default new Store();
