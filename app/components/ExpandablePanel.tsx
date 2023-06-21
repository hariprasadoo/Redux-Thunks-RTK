import { useState } from "react";
import { GoTriangleDown, GoTriangleLeft } from "react-icons/go";

function ExpandablePanel({header, children}: IExpPanel) {
    const [expanded, setExpended] = useState(false);
    const handleClick= () =>{
        setExpended(!expanded);
    };
    return (
      <div className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center">
          <div className="flex flex-row items-center justify-between gap-2">
            {header} </div>
          <div onClick={handleClick} className="cursor-pointer">
            {expanded ? <GoTriangleDown/> : <GoTriangleLeft/>} </div>
        </div>
        {expanded && <div className="p-2 border-t">{children}</div>}
      </div>
    )
}
export default ExpandablePanel