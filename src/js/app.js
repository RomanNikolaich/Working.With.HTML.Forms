import RenderHTML from "./render.js";

const container = document.querySelector(".container");

if (container) {
  const render = new RenderHTML(container);
  render.popoverFunc();
}
