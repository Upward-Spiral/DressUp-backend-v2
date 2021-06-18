// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { BaseItem, BrandTypes, Item, MaterialTypes } from './item.interface'
import { Items } from './items.interface'
/**
 * In-Memory Store
 */

const items: Items = {

  1: {
    id: 1,
    title: 'White Shirt',
    image: 'https://static.zara.net/photos///2020/I/0/1/p/2173/262/250/15/w/750/2173262250_6_1_1.jpg?ts=1605093546399',
    material: MaterialTypes.Cotton,
    brand: BrandTypes.Zara
  }
}

/**
 * Service Methods   -  CRUD FUNCTIONS
 */

export const findAll = async (): Promise<Item[]> => Object.values(items)

export const find = async (id: number): Promise<Item> => items[id]

export const create = async (newItem: BaseItem): Promise<Item> => {
  const id = new Date().valueOf()

  items[id] = {
    id,
    ...newItem
  }

  return items[id]
}

export const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id);

  if (!item) {
    return null
  }

  items[id] = { id, ...itemUpdate }

  return items[id]
}