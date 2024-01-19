import css from './index.module.css'
import React from "react";

interface T {
  text?: string | null
}


const Loading: React.FC<T> = ({text}) => {
  return (
    <div className={css.loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      {
        text ? <h1 className={css.loadingText}>{text}</h1> : <></>
      }
    </div>
  )
}

export default Loading;
