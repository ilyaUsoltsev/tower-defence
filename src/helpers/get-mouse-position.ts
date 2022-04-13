export function getMousePos(evt) {
  var rect = evt.target.getBoundingClientRect();
  return {
    x:
      ((evt.clientX - rect.left) / (rect.right - rect.left)) * evt.target.width,
    y:
      ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * evt.target.height,
  };
}
