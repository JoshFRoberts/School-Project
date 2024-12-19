export interface SliderProductProps {
    name: string;
    desc: string;
    price: number;
    image: string;
    isSale?: boolean;
    isNew?: boolean;
    salePrice?: number;
}