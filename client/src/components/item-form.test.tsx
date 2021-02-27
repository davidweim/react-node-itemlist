
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ItemForm from './item-form'
// Import interfaces
import { ItemInterface, ItemFormInterface } from './../interfaces'

let container: any = null;
const itemForm: ItemFormInterface = {
    items: [{ "id": "1", "text": "abc", creationDate: 10000, lastUpdated: 10000 }],
    handleItemCreate: (item: ItemInterface) => { }
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

it("renders with or without a name", () => {
    act(() => {
        render(<ItemForm {...itemForm} />, container);
    });
    expect(container.textContent).toBe("Add");
});