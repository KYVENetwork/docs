import React, { HtmlHTMLAttributes, useState } from "react";

export interface DropboxProps extends HtmlHTMLAttributes<HTMLDivElement> {
  label: () => React.JSX.Element;
}

const Dropbox = ({ label, children, ...props }: DropboxProps) => {
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
              "fadeIn absolute top-0 z-10 shadow-lg rounded-md border border-solid " +
              (closing ? "fadeOut" : "")
            }
            style={{
              background: "var(--ifm-background-color)",
              borderColor: "var(--ifm-toc-border-color)",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
export default Dropbox;
