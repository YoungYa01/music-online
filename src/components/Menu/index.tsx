import React from "react";

interface T {
  menuList: Array<S>,
}

interface S {
  label: string,
  key: string,
  disabled?: boolean,
  icon?: React.FC,
  children: Array<T>
}

const Menu: React.FC<T> = ({menuList}) => {
  return (
    <>
      <Menu mode="horizontal" items={menuList}/>;
    </>
  )
}

export default Menu;
