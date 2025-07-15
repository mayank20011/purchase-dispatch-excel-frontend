import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        className={`bg-white rounded-xl shadow p-6 transition-all w-[90%] sm:w-[500px] ${
          open ? "scale-100 opacity-100" : "sccale-125 opacity-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <i className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 cursor-pointer text-2xl fa-solid fa-xmark" onClick={onClose}>
        </i>
        {children}
      </div>
    </div>
  );
};

export default Modal;
