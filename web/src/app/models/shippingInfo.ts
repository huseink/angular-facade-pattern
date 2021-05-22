export class ShippingInfo {
    fullName: string;
    country: string;
    city: string;
    address: string;
    phoneNumber: string;

    constructor(fullName: string, country: string, city: string, address: string, phoneNumber: string,) {
        this.fullName = fullName;
        this.country = country;
        this.city = city;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
