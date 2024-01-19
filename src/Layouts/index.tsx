import React, {Suspense, useEffect, useState} from "react";
import {Layout, Menu} from "antd";
import {ItemType, MenuItemType} from "antd/es/menu/hooks/useItems";
import {useNavigate} from "react-router-dom";
import {CloudMusicIcon, FindMusicIcon, FollowIcon, MallIcon, MusicIcon, MusicPeopleIcon} from "../components/Icon";
import Routers from "../routers";
import {ErrorBoundary} from "react-error-boundary";
import Loading from "../components/Loading";
import css from "../page/Home/index.module.css";
import MusicPlayer from "../components/MusicPlayer";

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: `6.4rem`,
  paddingInline: `4.8rem`,
  lineHeight: '64px',
  backgroundColor: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 100,
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: `6.4rem`,
  paddingInline: `4.8rem`,
  lineHeight: '24px',
};

const BaseLayout: React.FC = () => {

  const {Header, Content, Footer} = Layout;

  const [menuList, setMenuList] = useState<ItemType<MenuItemType>[]>();

  const navigate = useNavigate();

  const Element = Routers();

  useEffect(() => {
    return () => {
      setMenuList([
        {
          label: '发现音乐',
          key: 'find',
          icon: <FindMusicIcon/>,
          onClick: () => {
            navigate('/');
            window.location.reload();
          }
        },
        {
          label: '我的音乐',
          key: 'mine',
          icon: <MusicIcon/>,
        },
        {
          label: '关注',
          key: 'follow',
          icon: <FollowIcon/>,
        },
        {
          label: '商城',
          key: 'mall',
          icon: <MallIcon/>,
        },
        {
          label: '音乐人',
          key: 'music_people',
          icon: <MusicPeopleIcon/>,
        },
        {
          label: '云推歌',
          key: 'cloud_music',
          icon: <CloudMusicIcon/>,
        },
      ])
    }

  }, [])

  return (
    <Layout>
      <Header style={headerStyle}>
        <Menu items={menuList} mode="horizontal" className={css.headMenu}/>
      </Header>
      <Content className={css.content}>
        <ErrorBoundary fallback={
          <div className={css.loading}>
            <Loading text={'🤯🤯好像出问题了🤯🤯'}/>
          </div>
        }>
          <Suspense fallback={
            <div className={css.loading}>
              <Loading text={'loading'}/>
            </div>
          }>
            {Element}
          </Suspense>
          <MusicPlayer/>
        </ErrorBoundary>
      </Content>
      <Footer style={footerStyle}>
        @copy-right <span style={{color: 'deepskyblue'}}>YoungYa</span>
      </Footer>
    </Layout>
  )
}

export default BaseLayout;
