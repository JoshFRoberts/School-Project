export interface Product {
    id: string | number
    name: string
    desc: string
    price: number
    salePrice?: number
    rating?: number
    image: string
    isSale?: boolean
    isNew?: boolean
  }