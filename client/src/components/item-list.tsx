// Import dependencies
import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// Import ItemItem
import Item from './item'

// Import interfaces
import { ItemListInterface } from './../interfaces'

// ItemList component
const ItemList = (props: ItemListInterface) => {
    return (

        <div className="item-list-view">
            <div className="item-list">
                <ul>
                    <DragDropContext onDragEnd={props.handleItemReOrder}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div ref={provided.innerRef}>
                                    {
                                        props.items.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Item
                                                            item={item}
                                                            handleItemUpdate={props.handleItemUpdate}
                                                            handleItemRemove={props.handleItemRemove}
                                                            handleItemBlur={props.handleItemBlur}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>

                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </ul>
            </div>
            {props.items.length > 0 &&
                <div className="flex-box-bt">
                    <button className="button" onClick={props.handleResetList}>Reset</button>
                </div>
            }
        </div>

    )
}

export default ItemList
