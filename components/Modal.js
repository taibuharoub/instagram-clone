import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  return <div>{open && <p>The modal is open</p>}</div>;
}

export default Modal;
