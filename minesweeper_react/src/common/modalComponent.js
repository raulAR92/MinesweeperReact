import React from "react";
import "./modalComponent.css";
import { EntypoCcw } from "react-entypo";

const ModalComponent = ({ show, closeButton, title, bodyData }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-title">{title}</div>
        <div className="modal-body">{bodyData}</div>
        <div className="modal-footer">
          <button onClick={closeButton}>
            <EntypoCcw></EntypoCcw> Restart
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalComponent;
