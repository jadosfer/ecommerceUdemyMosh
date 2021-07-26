import { NumberSymbol } from "@angular/common";

export interface Product {
  $key: string,
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}
