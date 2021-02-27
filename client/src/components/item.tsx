// Import dependencies
import * as React from 'react'

// Import interfaces
import { ItemWrapperInterface } from './../interfaces'

// Item component
const Item = (props: ItemWrapperInterface) => {
    return (
        <div className='item'>
            {props.item.id.startsWith('new_') && <div className="dot"/>}
            <div className="item-input-wrapper">
                <textarea className="item-body"
                    name="body"
                    defaultValue={props.item.text}
                    onChange={(event: any) => props.handleItemUpdate(event, props.item.id)}
                />
            </div>
            <button className="item-remove" onClick={() => props.handleItemRemove(props.item.id)} >
                X
            </button>
        </div>
    )
}

export default Item
