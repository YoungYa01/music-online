import store from '../../store'

const Com = () => {
  // const [name, setName] = useState('');
  // useEffect(() => {
  //   setName(store.name);
  // }, [])
  return (
    <h1>{store.name}</h1>
  )
}

export default Com;
