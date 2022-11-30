export class Transfer {
    id: number;
    fromAcctId: number;
    toAcctId: number;
    amount: number;

    constructor(_id: number, _fromAcctId: number, _toAcctId: number, _amount: number) {
        this.id = _id;
        this.fromAcctId = _fromAcctId;
        this.toAcctId = _toAcctId;
        this.amount = _amount;
    }
}
