import { Item } from "./item";

export class User {
    username: string;
    password: string;
    basket: Item[];
    constructor(username: string, password: string, basket: Item[]) {
        this.username = username;
        this.password = password;
        this.basket = basket;
    }
}
