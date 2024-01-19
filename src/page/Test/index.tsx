import {observer} from "mobx-react";

import css from './index.module.less'

const Test = observer(() => {
  return (
    <>
      <div className={css.content}>
        <h1>
          Hello World
        </h1>
        <div className={css.son}>

        </div>
      </div>
    </>
  )
})

export default Test;
