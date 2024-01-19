import css from './index.module.css'
import Banner from "../../components/Banner";
import FeaturedList from "../../components/FeaturedList";
import {useEffect, useState} from "react";
import {getMenuDetails, getTopList} from "../../api/home";
import {FeaturedListType, MusicDataType, TopListType} from "../../types";
import {Avatar, List} from "antd";
import {useLocalStore} from "mobx-react";
import store from "../../store";

const TopList: React.FC = () => {

  const localStore = useLocalStore(() => store);

  const [topListData, setTopListData] = useState<{ artistToplist: FeaturedListType, list: Array<TopListType>, code: number }>();

  const [menuDetails, setMenuDetails] = useState<[]>([]);

  const handleMusicPlay = (item: string, record: any, index: number) => {
    sessionStorage.setItem('musicId', JSON.stringify({id: item.id as string, index: index}))
    sessionStorage.setItem('musicData', JSON.stringify(item));
    localStore.setMusicData(item);
    localStore.setMusicId({id: item.id as string, index: index})
    localStore.setMusicList(menuDetails.songs)
    localStore.setIsPlayed(true);
  }



  useEffect(() => {
    getTopList()
      .then(response => {
        setTopListData(response);
        getMenuDetails(response.list[0].id as number)
          .then(response => {
            console.log(response);
            sessionStorage.setItem('menuData', response);
            setMenuDetails(response || sessionStorage.getItem('menuData'));
          })
      })

  }, [])
  return (
    <>
      <div className={css.topList}>
        <div className={css.sider}>
          <p>云音乐特色榜</p>
          {topListData && <FeaturedList data={topListData.list.slice(0, 4)} className={css.content}/>}
          <p>全球媒体榜</p>
          {topListData && <FeaturedList data={topListData.list.slice(4)} className={css.content}/>}
        </div>
        <div className={css.main}>
          <div className={css.head}>
            <div className={css.left}>
              <img src="" alt=""/>
            </div>
            <div className={css.right}>

            </div>
          </div>
          <div className={css.body}>
            <List
              itemLayout="horizontal"
              dataSource={menuDetails.songs}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  extra={
                    <img
                      width={100}
                      alt="logo"
                      className={css.img}
                      src={item.al.picUrl}
                      onClick={() => handleMusicPlay(item, menuDetails.songs, index)}
                    />
                  }
                >
                  < List.Item.Meta
                    avatar={<Avatar src={item.al.picUrl}/>}
                    title={<a href="https://ant.design">{item.al.name}</a>}
                    description={item.ar.map((it, ind) => (ind === item.ar.length - 1 ?
                      <span key={it.id}>{it.name}</span> : <span key={it.id}>{it.name}/</span>))}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TopList;
