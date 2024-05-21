import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header.vue";

describe("Header.vue", () => {
  it("renders logo correctly", () => {
    const wrapper = mount(Header);

    const logo = wrapper.find('img[alt="logo équipe"]');
    expect(logo.exists()).toBe(true);
  });
});
