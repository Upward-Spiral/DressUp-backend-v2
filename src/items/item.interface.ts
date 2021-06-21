
export enum MaterialTypes {
  Cotton = 'Cotton',
  Leather = 'Leather',
  Suede = 'Suede',
  Linen = 'Linen', 
  Silk = 'Silk',
  Cashmere = 'Cashmere', 
  Nylon = 'Nylon', 
  Polyester = 'Polyester'
}

export enum BrandTypes {
  Zara = 'Zara',
  YSL = 'YSL', 
  Gucci = 'Gucci', 
  LouisVuitton = 'Louis Vuitton',
  Chloe = 'Chloe', 
  Prada = 'Prada', 
  Valentino = 'Valentino',
  HM = 'H&M', 
  ASOS = 'ASOS', 
  Mango = 'Mango', 
  Topshop = 'Topshop', 
  Balenciaga = 'Balenciaga',
  Givenchy = 'Givenchy'
}

export interface BaseItem {
  title: string,
  image: string,
  material: MaterialTypes,
  brand: BrandTypes
}

export interface Item extends BaseItem {
  id: number;
}