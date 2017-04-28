export interface ITaskResults {
    value: ITaskResult[]
}

export interface ITaskResult {
    ID: number,
    AssignedTo: IAssignedUser[],
    AssignedUsersDisplay: string;
    Priority: string;
    Title: string;
    Status: string;
    StartDate: Date;    
    DueDate: Date;
}

export interface IAssignedUser {
    FirstName: string;
    LastName: string;
    Name: string;
    Id: number;
}