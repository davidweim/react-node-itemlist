// Import dependencies
import * as React from 'react'
import shortid from 'shortid'

// Import interfaces
import { ItemInterface, ItemFormInterface } from './../interfaces'

// Item form component
const ItemForm = (props: ItemFormInterface) => {
    // Create ref for form input
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Create new form state
    const [formState, setFormState] = React.useState('')

    // Handle item input change
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        // Update form state with the text from input
        setFormState(event.target.value)
    }

    // Handle 'Enter' in item input
    function handleInputEnter(event: React.KeyboardEvent) {
        // Check for 'Enter' key
        if (event.key === 'Enter') {
            createItem();
        }
    }

    const createItem = () => {
        if (!inputRef || !inputRef.current || !inputRef.current.value){
            return;
        }

        // Prepare new item object
        const newItem: ItemInterface = {
            id: 'new_' + shortid.generate(),
            text: formState,
            creationDate: Date.now(),
            lastUpdated: Date.now()
        }

        // Create new item item
        props.handleItemCreate(newItem)

        // Reset the input field
        if (inputRef && inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className="item-form">
            <div className="flex-box-2">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Enter item'
                    onChange={event => handleInputChange(event)}
                    onKeyPress={event => handleInputEnter(event)}
                />
                <div className="flex-box-bt">
                    <button className="button" onClick={createItem}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default ItemForm
