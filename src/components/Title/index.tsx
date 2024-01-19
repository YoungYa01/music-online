import React, {useEffect, useState} from "react";

const Title: React.FC = () => {
  const [title, setTitle] = useState<string>('Home Page');

  return (
    <h1>{title}</h1>
  )
}

export default Title;
