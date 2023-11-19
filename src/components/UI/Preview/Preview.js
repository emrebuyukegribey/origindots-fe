import { useEffect, useState } from "react";
import Desktop from "./Desktop";

function Preview({ type }) {
  console.log("PREVIEW");
  const [desktopOpen, setDesktopOpen] = useState(false);
  console.log("previewww type : ", type);

  useEffect(() => {
    if (type === "desktop") {
      setDesktopOpen(true);
    } else {
      setDesktopOpen(false);
    }
  }, []);

  return (
    <>
      <Desktop open={desktopOpen} setOpen={setDesktopOpen} />
    </>
  );
}

export default Preview;
