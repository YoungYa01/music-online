import React, {lazy} from 'react';
import {RouteObject, useRoutes} from "react-router-dom";

// 自定义懒加载函数
const lazyLoad = (factory: () => Promise<unknown>) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const Module = lazy(factory);
  return (
    <Module/>
  )
}
// 引入必有的Home组件
const Home = lazy(() => import("../page/Home"));
// 获取page组件以及路径
const pageModule = import.meta.glob('../page/**/*.tsx', {eager: true, import: 'default'});
// 获取组件引入函数
const comModule = import.meta.glob('../page/**/*.tsx');
// 创建路由
const routes: RouteObject[] = Object.entries(pageModule).map(([pagePath]) => {
  // 分隔路由路径
  let path = pagePath.replace('../page', '').replace('/index.tsx', '') || '/';
  // 规定格式 例：/HomePage → /home-page
  path = path.split('').map((s, index) => {
    // 分隔处理
    if (s >= 'A' && s <= 'Z') {
      if (index !== 1) {
        return `-${s.toLowerCase()}`;
      }
      return s.toLowerCase();
    } else {
      return s;
    }
  }).join('');
  // 组件名字获取
  const name = path.split('/').filter(Boolean).join('-') || 'index';
  // 返回路由对象
  return {
    path: path,
    name: name,
    element: lazyLoad(comModule[pagePath]),
  }
})
// 增加默认路由：/ 对应的 <Home/> 组件
export default (): React.ReactElement | null => useRoutes([
  ...routes,
  {
    path: '/',
    element: <Home/>,
  }
]);

// export default (): React.ReactElement | null => {
//   return useRoutes([
//     {
//       path: '/',
//       element: <Home/>,
//     }, {
//       path: '/song-list-details',
//       element: <SongListDetails/>,
//     }, {
//       path: '/top-list',
//       element: <TopList/>,
//     }, {
//       path: '/music-detail',
//       element: <MusicDetail/>
//     }, {
//       path: '/test',
//       element: <Test/>
//     },
//   ])
// }
// const Home3 = lazy(() => import('../page/Home'))
//
// const r = [
//   {
//     path: '/',
//     element: <Home/>
//   },
//   {
//     path: '/home',
//     element: () => import('../page/Home')
//   },
//   {
//     path: '/home2',
//     element: lazy(() => import('../page/Home')),
//   },
//   {
//     path: '/home3',
//     element: <Home3/>
//   }
// ]

