export interface IStudent {
    id: string;
    fName: string;
    lName: string;
    phone: string;
    email: string;
    courses?: Array<any> | undefined;
}
