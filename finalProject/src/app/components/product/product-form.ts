import { FormControl } from "@angular/forms";

export interface ProductForm {
    title:FormControl<string>;
    description:FormControl<string>;
    thumbnail:FormControl<string>;
    category_name:FormControl<string>;
    price:FormControl<number | 0>;
    productType:FormControl<string>;
    author_id:FormControl<string>;
}
