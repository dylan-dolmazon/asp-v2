import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ContentLoader from "./ContentLoader.vue";

describe("ContentLoader.vue", () => {
  it("Should render correctly", () => {
    const wrapper = mount(ContentLoader);

    expect(wrapper.exists()).toBe(true);

    const div = wrapper.find(".ContentLoader");
    expect(div.exists()).toBe(true);
  });
});
