if (typeof window !== "undefined") {
  document.addEventListener("copy", () => {
    const selection = document.getSelection();

    if (selection && (window as any).dw) {
      (window as any).dw.track("Content Copied", {
        text: selection.toString(),
      });
    }
  });
}

export default module;
