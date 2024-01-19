import React, {useEffect, useRef, useState} from "react";
import {observer, useLocalStore} from "mobx-react";
import store from "../../store";
import css from './index.module.css'
import {Button} from "antd";
import {StepBackwardFilled, CaretRightFilled, PauseOutlined, StepForwardFilled} from "@ant-design/icons";
import {getMusicLyric} from "../../api/home";
import {useNavigate} from "react-router-dom";


const MusicPlayer: React.FC = observer(
  () => {
    const player = useRef<HTMLAudioElement>(null);

    const localStore = useLocalStore(() => store);

    const navicate = useNavigate();

    const [current, setCurrent] = useState<number>(0);

    const [dur, setDur] = useState<number>(0);

    const [loading, setLoading] = useState(true);

    const handlePreMusic = () => {
      const {index} = localStore.musicId;
      localStore.setMusicData(localStore.musicList[index - 1]);
      localStore.setMusicId({id: localStore.musicList[index - 1].id, index: index - 1});
      handleGetLyric();
    }

    const handleNextMusic = () => {
      const {index} = localStore.musicId;
      localStore.setMusicData(localStore.musicList[index + 1]);
      localStore.setMusicId({id: localStore.musicList[index + 1].id, index: index + 1})
      handleGetLyric();
    }

    const handleAudioTimeUpdate = (e) => {
      const currentTime = e.target?.currentTime;
      const lyric = localStore.lyric;
      setCurrent(currentTime);
      setDur(e.target?.duration ? e.target?.duration : 0);
      localStore.setCurrentTime(currentTime);

      localStore.setLyric(lyric.map((item, index) => ({
          ...item, offset: index * 0.4
        })));
    }

    const handleCanPlay = () => {
      setLoading(false);
      localStore.setIsPlayed(true);
      player.current.play();
    }
    // 获取歌词
    const handleGetLyric = () => {
      getMusicLyric(localStore.musicId.id)
        .then((response) => {
          const lyric = response.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
            const min = item.slice(1, 3);
            const sec = item.slice(4, 6);
            const mill = isNaN(Number(item.slice(7, 10))) ? item.slice(7, 9) : item.slice(7, 10);
            const lrc = isNaN(Number(mill)) ? item.slice(11, item.length) : item.slice(10, item.length);
            const times = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
            return {min, sec, mill, lrc, times}
          })
          lyric.forEach((item, index) => {
            if (item === lyric.length - 1) {
              item.pre = 0;
            } else {
              item.pre = lyric[index + 1]?.times;
            }
          })

          sessionStorage.setItem('lyric', JSON.stringify(lyric));
          localStore.setLyric(lyric);
          navicate('/music-detail');
        })
    }


    useEffect(() => {
      localStore.setMusicId(JSON.parse(sessionStorage.getItem('musicId') || '[]'));
      localStore.setMusicList(JSON.parse(sessionStorage.getItem('musicList') || '[]'))
    }, [])


    return (
      <div className={css.musicPlayerContent}>
        {
          <audio src={`https://music.163.com/song/media/outer/url?id=${localStore.musicId.id}`}
                 className={css.musicPlayer}
                 ref={player}
                 onTimeUpdate={handleAudioTimeUpdate}
                 onEnded={handleNextMusic}
                 onCanPlay={handleCanPlay}
          ></audio>
        }
        <h1 className={css.musicName}>{}</h1>
        <div className={css.musicImg}>
          <img src={localStore.musicData.al?.picUrl || 'http://youngya.top/favicon.ico'} alt={localStore.musicData.name} onClick={handleGetLyric}/>
        </div>
        <div className={css.musicProgressBox}>
          <h4 className={css.musicName}>{localStore.musicData.name || 'YoungYa'}</h4>
          <input type="range" className={css.musicProgress} min={0}
                 max={player.current?.duration ? player.current?.duration : 0}
                 value={player.current?.currentTime ? player.current?.currentTime : 0}
                 onInput={(e) => {
                   player.current!.currentTime = e.target.value
                 }}
                 onMouseDown={() => {
                   player.current!.pause();
                   localStore.setIsPlayed(false);
                 }}
                 onMouseUp={() => {
                   player.current!.play();
                   localStore.setIsPlayed(true);
                 }}
          />
        </div>
        <div className={css.time}>
          <span>{`${parseInt(String((current / 60 < 10) ? '0' + current / 60 : current / 60))}:${parseInt(((current % 60 < 10) ? '0' + current % 60 : current % 60 + ''))} / ${parseInt((dur / 60 < 10) ? '0' + dur / 60 : dur / 60 + '')}:${parseInt((dur % 60 < 10) ? '0' + dur % 60 : dur % 60 + '')}`}</span>
        </div>
        <div className={css.controls}>
          <Button type="text" icon={<StepBackwardFilled/>} onClick={handlePreMusic}/>
          {
            localStore.isPlayed ? <Button type="text" loading={loading} icon={<PauseOutlined/>} onClick={() => {
                player.current!.pause();
                localStore.setIsPlayed(false);
              }}/>
              : <Button type="text" icon={<CaretRightFilled/>} onClick={() => {
                player.current!.play();
                localStore.setIsPlayed(true);
              }}/>
          }
          <Button type="text" icon={<StepForwardFilled/>} onClick={handleNextMusic}/>
        </div>
      </div>
    )
  }
)

export default MusicPlayer;
