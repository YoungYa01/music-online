import {useEffect, useState} from "react";
import {getTopList} from "../../api/home";
import type {FeaturedListType, TopListType} from "../../types";
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import css from './index.module.css'
import {ArrowRightOutlined} from '@ant-design/icons';
import {FindMusicIcon} from "../Icon";
import {useNavigate} from "react-router-dom";

const TopListCom = () => {

  const [topList, setTopList] = useState([]);

  const navigate = useNavigate();

  const [singleTop, setSingleTop] = useState<FeaturedListType>();

  useEffect(() => {
    getTopList()
      .then(response => {
        setSingleTop(response.artistToplist)
        setTopList(response.list);
      })
  }, [])
  return (
    <div className={css.topList}>
      <h1>
        <span><FindMusicIcon/>榜单<FindMusicIcon/></span>
        <span className={css.more} onClick={() => navigate('/top-list')}>更多<ArrowRightOutlined/></span>
      </h1>
      <div className={css.topListContent}>
        {
          singleTop && <Card hoverable className={css.singleTopListItem}
                             cover={<img alt={singleTop.name} src={singleTop.coverUrl}/>}
          >
            <Meta title={singleTop.name}
                  description={singleTop.upateFrequency}/>
          </Card>
        }

        {
          topList.slice(0, 3).map((item: TopListType) => {
            return (
              <Card key={item.id}
                    hoverable className={css.topListItem}
                    cover={<img alt={item.name} src={item.coverImgUrl}/>}
              >
                <Meta title={item.name}
                      description={item.description?.length > 50 ? item.description.slice(0, 50) + '... ...' : item.description}/>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

export default TopListCom;
