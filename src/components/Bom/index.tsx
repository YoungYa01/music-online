import store from '../../store'
import {Button} from "antd";
import React from "react";

const Bom: React.FC = () => {
  // const [age, setAge] = useState(0);
  // useEffect(() => {
  //   setAge(store.age);
  // }, [])

  return (
    <>
      <h1>{store.age}</h1>
      <Button onClick={() => {
        store.setAge(store.age + 1);
      }}>add age</Button>
    </>
  )
}

export default Bom;
