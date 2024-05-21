import { mount } from "@vue/test-utils";
import { it, expect, describe } from "vitest";
import Checkbox from "./Checkbox.vue";

describe("Checkbox", () => {
  it("Should render the label correctly", () => {
    const wrapper = mount(Checkbox, {
      props: {
        name: "test-checkbox",
        label: "Test Label",
        value: false,
      },
    });

    expect(wrapper.text()).toContain("Test Label");
  });

  it("Should initializes with the correct value", () => {
    const wrapper = mount(Checkbox, {
      props: {
        name: "test-checkbox",
        label: "Test Label",
        value: true,
      },
    });

    const input = wrapper.find("input");
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it("Should toggles the value when clicked", async () => {
    const wrapper = mount(Checkbox, {
      props: {
        name: "test-checkbox",
        label: "Test Label",
        value: false,
      },
    });

    const input = wrapper.find("input");
    await input.setValue(true);

    expect((input.element as HTMLInputElement).checked).toBe(true);
  });
});
