/**
 * @jest-environment jsdom
 */
import userEvent from "@testing-library/user-event";

import RenderHTML from "../render.js";

describe("renderAllTasksPinTitle", () => {
  let render;
  const user = userEvent.setup();

  beforeAll(() => {
    document.body.innerHTML = '<div class="container"></div>';
    const container = document.querySelector(".container");
    container.innerHTML = `
        <form class="form">
          <label class="line">
            <div class="title">Popover</div>
            <button class="btn" data-popover-title="Popover title"
              data-popover-text="And here's some amazing content. It's very engaging. Rigth?">Click to toggle popover</button>
          </label>
        </form>`;
    render = new RenderHTML(container);
    render.popoverFunc();
  });

  afterAll(() => {
    document.body.innerHTML = "";
  });

  test("of form", () => {
    const form = document.querySelector(".form");
    expect(form).toBeTruthy();

    const title = document.querySelector(".title");
    expect(title).toBeTruthy();

    const label = document.querySelector(".line");
    expect(label).toBeTruthy();

    const btn = document.querySelector(".btn");
    expect(btn).toBeTruthy();

    const popover = document.querySelector(".popover");
    expect(popover).toBeTruthy();

    const labelChildren = label.children;

    expect(labelChildren.length).toBe(2);

    expect(labelChildren[0].classList.contains("title")).toBe(true);
    expect(labelChildren[1].classList.contains("btn")).toBe(true);

    const formChildren = form.children;

    expect(formChildren.length).toBe(2);

    expect(formChildren[0].classList.contains("line")).toBe(true);
    expect(formChildren[1].classList.contains("popover")).toBe(true);
  });

  test("of submit", () => {
    const form = document.querySelector(".form");
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    const prevented = !form.dispatchEvent(submitEvent);
    expect(prevented).toBe(true);
  });

  test("of click", async () => {
    const btn = document.querySelector(".btn");
    const label = document.querySelector(".line");
    const popover = document.querySelector(".popover");
    popover.style.display = "none";
    await user.click(btn);
    expect(popover.style.display).toBe("block");
    expect(label.style.margin).toBe("110px 0px 0px");
    await user.click(btn);
    expect(popover.style.display).toBe("none");
    expect(label.style.margin).toBe("0px");
  });

  /*test('test of blur', async () => {
    const input = document.querySelector('.input');
    const popover = document.querySelector('.popover');
    const label = document.querySelector('.line');

    expect(popover.style.display).toBe("block");

    await user.tab();
    expect(popover.style.display).toBe('none');

  });*/
});
