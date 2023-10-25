import { nanoid } from "nanoid";
import { useRef } from "react";
import ProperItem from "./ProperItem";
import { useDraggable } from "@dnd-kit/core";

function DraggableProperItem(props) {
  const { proper } = props;
  const id = useRef(nanoid());
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      proper,
      fromSidebar: true,
    },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <ProperItem proper={proper} />
    </div>
  );
}

export default DraggableProperItem;
