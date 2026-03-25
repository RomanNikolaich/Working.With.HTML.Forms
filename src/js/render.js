export default class RenderHTML {
  constructor(element) {
    this.element = element;
  }

  popoverFunc() {
    const popover = document.createElement("div");
    popover.classList.add("popover");
    const title = document.createElement("div");
    const text = document.createElement("div");
    const btn = document.querySelector(".btn");
    text.textContent = btn.dataset.popoverText;
    title.textContent = btn.dataset.popoverTitle;
    text.classList.add("title");
    title.classList.add("title");
    const label = document.querySelector(".line");
    const form = document.querySelector(".form");
    popover.append(title, text);
    popover.style.display = "none";
    form.append(popover);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (popover.style.display == "none") {
        popover.style.display = "block";
        label.style.margin = "110px 0px 0px";
      } else {
        popover.style.display = "none";
        label.style.margin = "0px";
      }
    });
  }
}
