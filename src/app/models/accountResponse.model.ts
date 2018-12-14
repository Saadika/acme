export class AccountResponse {
    accounts: Array<Account>;
}

export class Account {
    accountNumber: string;
    accountType: string;
    balance: string;
}