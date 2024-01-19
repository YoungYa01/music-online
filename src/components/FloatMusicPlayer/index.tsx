import css from './index.module.css'
import {Observer, useLocalStore} from "mobx-react";
import store from "../../store";
import {useEffect} from "react";

const FloatMusicPlayer: React.FC = () => {
  const localStore = useLocalStore(() => store);


  useEffect(() => {

  }, [])

  return (
    <Observer>
      {
        () => (
          <div className={css.content}>
            <iframe frameBorder="no" marginWidth={0} marginHeight={0}
                    width={330} height={450}
                    src={`//music.163.com/outchain/player?type=0&id=${localStore.menuId || 2091484707}&auto=1&height=430`}
            ></iframe>
          </div>
        )
      }
    </Observer>
  )
}

export default FloatMusicPlayer;
