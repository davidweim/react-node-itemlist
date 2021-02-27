// Item interface
export interface ItemInterface {
  id: string;
  text: string;
  creationDate: number;
  lastUpdated: number;
}

// Item form interface
export interface ItemFormInterface {
  items: ItemInterface[];
  handleItemCreate: (item: ItemInterface) => void;
}

// Item list interface
export interface ItemListInterface {
  handleItemUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleItemRemove: (id: string) => void;
  handleItemBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleItemReOrder :(result: any) => void;
  handleResetList : () => void;
  items: ItemInterface[];
}

// Item item interface
export interface ItemWrapperInterface {
  handleItemUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleItemRemove: (id: string) => void;
  handleItemBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  item: ItemInterface;
}
