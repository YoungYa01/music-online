import {Avatar, List} from "antd";
import React from "react";
import {TopListType} from "../../types";
import css from './index.module.css'

const FeaturedList: React.FC<{ data: Array<TopListType>, className?: string }> = ({data, className}) => {

  const handleClick = (id: number) => {

    console.log(id);
  }


  return (
    <div className={className}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id} onClick={() => handleClick(item.id)} className={css.item}>
            <List.Item.Meta
              avatar={<Avatar src={item.coverImgUrl}/>}
              title={item.name}
              description={item.updateFrequency}
            />
          </List.Item>
        )}
      />
    </div>
  )

}

export default FeaturedList;
