import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../redux/store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UserListItem({user}: any) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);
    const handleClick = () =>{
        doRemoveUser(user)
    }

    const header = <>
    <Button primary loading={Boolean(isLoading)} onClick={handleClick}>
      <GoTrashcan/>
      </Button>
      {error && <div>Error deleting user...</div>}
      {user.name}
    </>
  return (<ExpandablePanel header={header}>
    <AlbumsList user={user}/>
  </ExpandablePanel>);
}
export default UserListItem