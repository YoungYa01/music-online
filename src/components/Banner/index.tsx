import {useEffect, useRef, useState} from "react";
import {getBanner} from "../../api/home";
import {Button, Carousel, message} from "antd";
import type {BannerType} from "../../types";
import css from './index.module.css'
import {CarouselRef} from "antd/es/carousel";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

const Banner = () => {
  const banner = useRef<CarouselRef>(null);
  const [bannerList, setBannerList] = useState<Array<BannerType>>([]);
  useEffect(() => {
    getBanner()
      .then((response) => {
        if (response.code === 200) {
          return setBannerList(response.banners);
        }
        return message.error("请求失败，请刷新重试");
      })
  }, [])
  return (
    <Carousel autoplay fade draggable ref={banner}>
      {
        bannerList.map(item => {
          return (
            <div key={item.bannerId} className={css.bannerItem}>
              <img src={item.pic} alt={item.typeTitle} className={css.bannerImg}/>
              <Button type="text" shape="round" size={"large"} className={css.preIcon} icon={<LeftOutlined/>}
                      onClick={() => banner.current?.prev()}/>
              <Button type="text" shape="round" size={"large"} className={css.nextIcon} icon={<RightOutlined/>}
                      onClick={() => banner.current?.next()}/>
            </div>
          )
        })
      }
    </Carousel>
  )
}

export default Banner;
