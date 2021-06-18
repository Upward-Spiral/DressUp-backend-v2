// src/items/items.service.ts

/**
 * Data Model Interfaces
 */

import { BaseItem, BrandTypes, Item, MaterialTypes } from './item.interface'
import { Items } from './items.interface'
/**
 * In-Memory Store - THE DATA SET
 */

const items: Items = {

  1: {
    id: 1,
    title: 'White Shirt',
    image: 'https://static.zara.net/photos///2020/I/0/1/p/2173/262/250/15/w/750/2173262250_6_1_1.jpg?ts=1605093546399',
    material: MaterialTypes.Cotton,
    brand: BrandTypes.Zara
  },
  2: {
    id: 2,
    title: 'Lilac Palazzo Trousers',
    image: 'https://static.zara.net/photos///2021/V/0/1/p/9929/039/602/2/w/750/9929039602_6_1_1.jpg?ts=1619170836287',
    material: MaterialTypes.Silk,
    brand: BrandTypes.Zara
  },
  3: {
    id: 3,
    title: 'Black Sandals',
    image: 'https://static.zara.net/photos///2021/V/1/1/p/2314/710/040/2/w/750/2314710040_6_1_1.jpg?ts=1610104734738',
    material: MaterialTypes.Leather,
    brand: BrandTypes.Zara
  }
}

/**
 * Service Methods   -  CRUD FUNCTIONS
 */

// GET REQUEST
export const findAll = async (): Promise<Item[]> => Object.values(items)

// GET REQUEST BY ID
export const find = async (id: number): Promise<Item> => items[id]

// POST REQUEST
export const create = async (newItem: BaseItem): Promise<Item> => {
  const id = new Date().valueOf()

  items[id] = {
    id,
    ...newItem
  }

  return items[id]
}

// PUT REQUEST
export const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id)

  if (!item) {
    return null
  }

  items[id] = { id, ...itemUpdate }

  return items[id]
}