// Import dependencies
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import axios from 'axios';

import { Spinner } from 'react-awesome-spinners'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components
import ItemForm from './components/item-form'
import ItemList from './components/item-list'

// Import interfaces
import { ItemInterface } from './interfaces'

// Import styles
import './styles/styles.css'

// Call it once in your app. At the root of your app is the best place
toast.configure()

// this is for dev only, should be changed for prod
const host = 'http://localhost:5000'

// ItemListApp component
const ItemListApp = () => {
    const [items, setItems] = useState<ItemInterface[]>([])

    const params = new URLSearchParams(window.location.search);
    const listId = params.get('listid');
    const url = `${host}/api/list/${listId}/items`;

    const [isLoading, setIsLoading] = useState(false);

    const notify = (message: string) => toast(message, { autoClose: 1000 });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await axios(url);
            setItems(result.data);

            if (!result.data.length) {
                notify("new list created.");
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url]);

    // Creating new item item
    const handleItemCreate = (item: ItemInterface) => {
        // Prepare new items state
        const newItemsState: ItemInterface[] = [...items]
        // Update new items state
        newItemsState.push(item)
        // Update items state
        setItems(newItemsState)

        const crud = async () => {
            setIsLoading(true);
            let result;
            try{
                result = await axios.post(url, item);
            }
            catch(ex){
                alert('failed to create new item.');
                result = await axios.post(url, item);
            }
            newItemsState.find((i: ItemInterface) => i.id === item.id)!.id = result.data.id;
            setItems(newItemsState);
            setIsLoading(false);
        }

        crud();
        notify("new item created.");
    }

    // Update existing item item
    const handleItemUpdate = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        // Prepare new items state
        const newItemsState: ItemInterface[] = [...items]
        // Find correct item item to update
        newItemsState.find((item: ItemInterface) => item.id === id)!.text = event.target.value
        // Update items state
        setItems(newItemsState)

        const crud = async () => {
            setIsLoading(true);
            const url = `${host}/api/list/${listId}/items/${id}`;
            await axios.put(url, newItemsState.find((item: ItemInterface) => item.id === id));
            setIsLoading(false);
        }
        crud();
    }

    // Remove existing item item
    const handleItemRemove = (id: string) => {
        // Prepare new items state
        const newItemsState: ItemInterface[] = items.filter((item: ItemInterface) => item.id !== id)
        // Update items state
        setItems(newItemsState)

        const crud = async () => {
            setIsLoading(true);
            const url = `${host}/api/list/${listId}/items/${id}`;
            await axios.delete(url);
            setIsLoading(false);
        }
        crud();
        notify("item is deleted.");
    }

    // Remove existing item item
    const handleResetList = () => {
        // remove items in state
        setItems([])
        const crud = async () => {
            setIsLoading(true);
            const url = `${host}/api/list/${listId}/items`;
            await axios.delete(url);
            setIsLoading(false);
        }
        crud();
        notify("Items are reset.");
    }

    // Check if item item has title
    const handleItemBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 0) {
            event.target.classList.add('item-input-error')
        } else {
            event.target.classList.remove('item-input-error')
        }
    }

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        const itemsNew = reorder(
            items,
            startIndex,
            endIndex
        );
        let newItemsState: ItemInterface[] = [...itemsNew]
        setItems(newItemsState);

        const crud = async () => {
            setIsLoading(true);
            const url = `${host}/api/list/${listId}/items`;
            await axios.patch(url, { startIndex: startIndex, endIndex: endIndex });
            setIsLoading(false);
        }
        crud();
    }

    const reorder = (list: ItemInterface[], startIndex: any, endIndex: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    return (
        <div className="item-list-app">
            <ItemForm
                items={items}
                handleItemCreate={handleItemCreate}
            />
            {isLoading && <Spinner />}
            <ItemList
                items={items}
                handleItemUpdate={handleItemUpdate}
                handleItemRemove={handleItemRemove}
                handleItemBlur={handleItemBlur}
                handleItemReOrder={onDragEnd}
                handleResetList={handleResetList}
            />
        </div>
    )
}

const rootElement = document.getElementById('root')
render(<ItemListApp />, rootElement)
