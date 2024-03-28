if (typeof window !== "undefined") {
  document.addEventListener("copy", () => {
    const selection = document.getSelection();

    if (selection && (window as any).dw) {
      (window as any).dw.track("Content Copied", {
        text: selection.toString(),
      });
    }
  });
  const _refiner = require("refiner-js");

  _refiner("setProject", "01b7c520-e1f0-11ee-b266-35f4ddac70ed");

  const userId = localStorage.getItem("ajs_user_id");
  if (!userId) {
    _refiner("identifyUser", { id: userId });
  }
}

export default module;
