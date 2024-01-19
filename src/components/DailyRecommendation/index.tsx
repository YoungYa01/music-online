import css from './index.module.css'
import {MusicLogoIcon} from "../Icon";
import {useEffect, useState} from "react";
import {getPersonalized, getSongListDetail} from "../../api/home";
import {Card} from "antd";
import {RecommendType} from "../../types";
import Meta from "antd/es/card/Meta";
import {useNavigate} from "react-router-dom";
import store from "../../store";
import {useLocalStore} from "mobx-react";

const DailyRecommendation: React.FC = () => {

  const [recommendationList, setRecommendationList] = useState<Array<RecommendType>>([]);

  const navigate = useNavigate();

  const localStore = useLocalStore(() => store)

  const handleDetails = (id: number) => {
    localStore.setMenuId(id);
    getSongListDetail(id)
      .then((response) => {
        sessionStorage.setItem('musicDetails', JSON.stringify(response));
        sessionStorage.setItem('musicList', JSON.stringify(response.playlist.tracks))
        localStore.setMusicList(response.playlist.tracks);
        navigate('/song-list-details');
      })
  };

  useEffect(() => {
    getPersonalized()
      .then(response => {
        setRecommendationList(response.result);
      })
  }, [])

  return (
    <>
      <div className={css.dailyRecommendationTitle}>
        <h1><MusicLogoIcon/>每日推荐<MusicLogoIcon/></h1>
        <ul className={css.recommendationType}>
          <li>华语</li>
          <li>流行</li>
          <li>摇滚</li>
          <li>民谣</li>
          <li>电子</li>
        </ul>
      </div>
      <div className={css.dailyRecommendationContent}>
        {
          recommendationList.map((item: RecommendType) => {
            return (
              <Card key={item.id}
                    hoverable className={css.songSheet}
                    cover={<img alt={item.name} src={item.picUrl}/>}
                    onClick={() => handleDetails(item.id)}
              >
                <Meta title={null} description={item.name}/>
              </Card>
            )
          })
        }
      </div>

    </>
  )
}

export default DailyRecommendation;
