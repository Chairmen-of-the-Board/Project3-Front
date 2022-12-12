export class UserRequest{
    id: number;
    requestAccId: number;
    targetId: number;
    amount: number;
    description: string;
    status: string;
    creationDate: any;

    constructor(_id: number, _requestAccId: number, _targetId: number, _amount: number, _description: string, _status: string, _creationDate: any) {
        this.id = _id;
        this.requestAccId = _requestAccId;
        this.targetId = _targetId;
        this.amount = _amount;
        this.description = _description;
        this.status = _status;
        this.creationDate = _creationDate;
    }
}