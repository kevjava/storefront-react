import {User} from "../user/user";

export class Storefront {
    id?: number;
    guid?: string;
    name: string;
    owner?: User;

    constructor(name: string, id?: number , guid?: string) {
        this.id = id;
        this.guid = guid;
        this.name = name;
    }

}

