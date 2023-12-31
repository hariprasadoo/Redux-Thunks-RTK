import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../redux/store";
import PhotoList from "./PhotoList";

function AlbumListItem({album}: any) {
    const [removeAlbum, result] = useRemoveAlbumMutation();
    const handleRemoveAlbum = () =>{
        removeAlbum(album);
    }
    const header = <div className="flex flex-row justify-between items-center">
        <Button className="mr-2" primary loading={Boolean(result.isLoading)} onClick={handleRemoveAlbum}><GoTrashcan/></Button>
        {album.title}
    </div>
    return <ExpandablePanel key={album.id} header={header}>
      <PhotoList album={album}/>
    </ExpandablePanel>
}

export default AlbumListItem