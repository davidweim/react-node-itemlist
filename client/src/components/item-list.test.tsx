
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ItemList from './item-list'
// Import interfaces
import { ItemListInterface } from './../interfaces'

let container: any = null;
const itemlist: ItemListInterface = {

    handleItemUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => { },
    handleItemRemove: (id: string) => { },
    handleItemBlur: (event: React.ChangeEvent<HTMLInputElement>) => { },
    handleItemReOrder: (result: any) => { },
    handleResetList: () => { },
    items: [{ "id": "1", "text": "abc", creationDate: 10000, lastUpdated: 10000 },
    { "id": "2", "text": "def", creationDate: 10000, lastUpdated: 10000 }]
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
        render(<ItemList {...itemlist} />, container);
    });
    expect(container.textContent).toBe("abcXdefXReset");
});