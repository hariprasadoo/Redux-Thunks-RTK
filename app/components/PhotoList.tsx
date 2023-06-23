'use client'
import { useFetchPhotosQuery, useAddPhotoMutation } from "../redux/store"
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotoListItem from "./PhotoListItem";

function PhotoList({album}:any) {
    const {data, isFetching, error} = useFetchPhotosQuery(album)
    const [addPhoto, addPhotoResults ] = useAddPhotoMutation();
    
    const handleAddPhoto=()=>{
        addPhoto(album);
    }

    let content;
    if(isFetching){
        content=<Skeleton className="h-8 w-8" times={4}/>
    }else if(error){
        content = <div>Error Fetching Data...</div>
    } else{
        content = data.map((photo:any)=>{
            return <PhotoListItem key={photo.id} photo={photo} />
        });
    }
  return <div>PhotoList
    <div className="m-2 flex flex-row items-center justify-between">
        <p className="text-lg font-bold">Photos In {album.title}</p>
        <Button primary loading={Boolean(addPhotoResults.isLoading)} onClick={handleAddPhoto}>+Add Photo</Button>
    </div>
    <div className="ms-8 flex flex-row flex-wrap justify-center">{content}</div>
  </div>
}

export default PhotoList