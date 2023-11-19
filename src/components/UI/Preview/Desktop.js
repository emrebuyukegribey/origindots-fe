import { Modal } from "antd";

function Desktop({ open, setOpen }) {
  return (
    <>
      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div>Desktop Preview</div>
      </Modal>
    </>
  );
}

export default Desktop;
