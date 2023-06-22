import { useFetchAlbumsQuery, useAddAlbumMutation } from "../redux/store"
import Skeleton from "./Skeleton"
import ExpandablePanel from "./ExpandablePanel"
import Button from "./Button"
import AlbumListItem from "./AlbumListItem"

function AlbumsList({user}:IAlbum) {
  const {data, error, isFetching} = useFetchAlbumsQuery(user)
  const [addAlbum, result] = useAddAlbumMutation();

  const handleAddAlbum = () =>{
    addAlbum(user);
  }

  let content;
  if (isFetching){
    content = <Skeleton className="h-10 w-full" times={3}/>
  } else if(error){
    content = <div>Error loading albums.</div>
  } else{
    content = data.map((album:any)=>{
      return <AlbumListItem key={album.id} album={album}></AlbumListItem>
    })
  }
  return(
  <div>
    <div className="m-2 flex flex-row it justify-between">
      <h3 className="text-lg font-bold">Album for {user.name}</h3>
      <Button primary loading={Boolean(isFetching)} onClick={handleAddAlbum}>+ Add Album</Button>
    </div>
    <div>{content}</div>    
  </div>
  )
}
export default AlbumsList