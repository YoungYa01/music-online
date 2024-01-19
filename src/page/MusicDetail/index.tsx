import css from './index.module.css'
import {Observer, useLocalStore} from "mobx-react";
import store from "../../store";
import {useEffect, useRef} from "react";
import {autorun, reaction} from "mobx";
import {Button} from "antd";
import {BackIcon} from "../../components/Icon";
import {useNavigate} from "react-router-dom";

const MusicDetail = () => {
  const localStore = useLocalStore(() => store);

  const navicate = useNavigate();


  useEffect(() => {
    const lyric = sessionStorage.getItem('lyric');
    localStore.setLyric(JSON.parse(lyric || '[]'));
    const musicData = sessionStorage.getItem('musicData');
    localStore.setMusicData(JSON.parse(musicData || '[]'));
  }, [])

  const activeP = useRef<HTMLParagraphElement>(null)

  autorun(() => {
    if (activeP.current) {
      const ps = activeP.current.querySelectorAll('p');
      let actP = null;
      ps.forEach(item => {
        if (item.className.indexOf("active") !== -1) {
          actP = item;
        }
      })
      actP.scrollIntoView({
        block: 'center'
      });
      localStore.currentTime;
    }
  })


  useEffect(() => {
    return () => {
      console.log(activeP);
    }

  }, [])

  return (
    <Observer>
      {
        () => {
          return (
            <div className={css.content}>
              <Button icon={<BackIcon/>} onClick={() => window.history.back()} className={css.backBtn} type={"text"}/>
              <img src={localStore.musicData.al?.picUrl} alt={localStore.musicData.al?.name} className={css.bgImg}/>
              <div className={css.main} ref={activeP}>
                {
                  localStore.lyric.map(item => (
                      <>
                        <p
                          className={
                            localStore.currentTime * 1000 >= item.times &&
                            localStore.currentTime * 1000 < item.pre ? css.active : ''
                          }>{item.lrc}
                        </p>
                      </>
                    )
                  )
                }
              </div>
            </div>
          )
        }
      }
    </Observer>
  )
}

export default MusicDetail;
