export class UserRequest{
    id: number;
    requestAccId: number;
    targetId: any;
    targetEmail: string;
    amount: number;
    description: string;
    status: string;
    creationDate: any;

    constructor(_id: number, _requestAccId: number, _targetId: any, _targetEmail: string, _amount: number, _description: string, _status: string, _creationDate: any) {
        this.id = _id;
        this.requestAccId = _requestAccId;
        this.targetId = _targetId;
        this.targetEmail = _targetEmail;
        this.amount = _amount;
        this.description = _description;
        this.status = _status;
        this.creationDate = _creationDate;
    }
}