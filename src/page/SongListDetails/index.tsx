import {useEffect, useState} from "react";
import {observer, useLocalStore} from "mobx-react";
import store from "../../store";
import {MusicDataType, PlayListType} from "../../types";
import css from './index.module.css'
import {Avatar, Button, Card, Table, Tag, Badge} from "antd";
import {randomColor} from "../../utils/songList";
import {ColumnsType} from "antd/es/table";
import {PlayCircleTwoTone} from '@ant-design/icons';
import FloatMusicPlayer from "../../components/FloatMusicPlayer";

const SongListDetails: React.FC = observer(
  () => {

    const [playlist, setPlaylist] = useState<PlayListType>(JSON.parse(sessionStorage.getItem('musicDetails') || '[]'))
    const localStore = useLocalStore(() => store);

    useEffect(() => {
      return () => {
        setPlaylist("playlist" in localStore.musicData ? localStore.musicData.playlist : JSON.parse(sessionStorage.getItem('musicDetails') || '[]').playlist as PlayListType)
      }
    }, [])

    const columns: ColumnsType = [
      {
        title: '',
        dataIndex: 'id',
        render: (text, record, index) => (
          <div className={css.order} key={index}>
            <span>{index + 1}</span>
            <Button type="text"
                    disabled={record.fee !== 0 && record.fee !== 8}
                    icon={<PlayCircleTwoTone/>}
                    onClick={() => {
                      sessionStorage.setItem('musicId', JSON.stringify({id: record.id as string, index: index}))
                      sessionStorage.setItem('musicData', JSON.stringify(record));
                      localStore.setMusicId({id: record.id as string, index: index})
                      localStore.setMusicData(record as MusicDataType)
                      localStore.setIsPlayed(true);
                    }}
            />
          </div>
        ),
      },
      {
        title: '歌曲标题',
        dataIndex: 'name',
        align: 'left',
        render: (text, record, index) => <Badge
          count={(record.fee !== 0 && record.fee !== 8) ? "VIP歌曲" : "免费歌曲"}
          style={{backgroundColor: (record.fee !== 0 && record.fee !== 8) ? '' : '#52c41a'}}
        >
          <div key={index} style={{paddingRight: '3.5rem'}}>{text}</div>
        </Badge>
      },
      {
        title: '歌手',
        dataIndex: 'ar',
        render: (text) => (typeof text === 'object') && text?.map((item: { name: string }, index: number) =>
          <span key={index}> {item.name + (index === text.length - 1 ? '' : '/')} </span>)
      },
      {
        title: '专辑',
        dataIndex: 'al',
        render: (text, _, index) => <span key={index}><Avatar src={text.picUrl}/>{text.name}</span>
      },
      {
        title: '来自',
        dataIndex: 'alia',
        render: (text) => (typeof text === 'object') && text?.map((item: string, index: number) =>
          <span key={index}> {item + '  '} </span>)
      },
      {
        title: '发布时间',
        dataIndex: 'publishTime',
        render: (text, _, index) => <span key={index}>{new Date(text).toLocaleDateString()}</span>
      },
    ];

    return (
      <div className={css.content}>
        <Card className={css.contentCard}>
          <div className={css.contentHead}>
            <div className={css.imgBox}>
              <img src={playlist.coverImgUrl} alt={playlist.name} className={css.coverImg}/>
            </div>
            <div className={css.headText}>
              <h1>
                {playlist.name}
              </h1>
              <div>
                {playlist.tags?.map((tag, index) => <Tag key={index} color={randomColor()}>{tag}</Tag>)}
              </div>
              <p>
                {playlist.description}
              </p>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={playlist?.tracks}
            bordered
          />
          {/*<FloatMusicPlayer/>*/}
          {/*<List*/}
          {/*  itemLayout="horizontal"*/}
          {/*  dataSource={playlist?.tracks}*/}
          {/*  renderItem={(item) => (*/}
          {/*    <List.Item key={item.id}>*/}
          {/*      <List.Item.Meta*/}
          {/*        avatar={<Avatar src={item.al.picUrl}/>}*/}
          {/*        title={<a href="https://ant.design">{item.name}</a>}*/}
          {/*        description={item.name}*/}
          {/*      />*/}
          {/*    </List.Item>*/}
          {/*  )}*/}
          {/*/>*/}
        </Card>
      </div>
    )
  }
)

export default SongListDetails;
