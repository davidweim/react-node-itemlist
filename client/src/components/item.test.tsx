
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Item from './item'
// Import interfaces
import { ItemWrapperInterface } from './../interfaces'

let container: any = null;
const itemwraper: ItemWrapperInterface = {
    handleItemUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => { },
    handleItemRemove: (id: string) => { },
    handleItemBlur: (event: React.ChangeEvent<HTMLInputElement>) => { },
    item: { "id": "1", "text": "abc", creationDate: 10000, lastUpdated: 10000 },
};

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with data", () => {
    act(() => {
        render(<Item {...itemwraper} />, container);
    });
    expect(container.textContent).toBe("abcX");
});