import React, { HtmlHTMLAttributes, useState } from "react";

export interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  label: () => React.JSX.Element;
}

const Modal = ({ label, children, ...props }: ModalProps) => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const toggle = () => {
    if (open) {
      setClosing(true);
      close();
      return;
    }
    setClosing(false);
    setOpen(true);
  };
  const close = () => {
    setClosing(true);
    setTimeout(() => setOpen(false), 300);
  };

  return (
    <div
      autoFocus
      onBlur={(e) => {
        if (e.relatedTarget) return;
        close();
      }}
      tabIndex={0}
    >
      <div onClick={toggle}>{label()}</div>
      <div {...props} className="relative" onClick={() => close()}>
        {open && (
          <div
            className={
              "slideIn absolute top-0 z-40 shadow-lg rounded-md border border-solid border-borderColor " +
              (closing ? "slideOut" : "")
            }
            style={{
              background: "var(--ifm-background-color)",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal;
