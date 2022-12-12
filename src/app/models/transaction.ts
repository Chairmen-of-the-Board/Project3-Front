export class Transaction {
    id: number;
    amount: number;
    description: string;
    type: string;
    timestamp: any;

    constructor(_id: number, _amount: number, _description: string, _type: string, _timestamp:any) {
        this.id = _id;
        this.amount = _amount;
        this.description = _description;
        this.type = _type;
        this.timestamp = _timestamp;
    }
}
