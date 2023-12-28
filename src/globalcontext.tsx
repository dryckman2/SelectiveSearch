import Account from "./model/account";

export let globalContext = {
    "currentAccount": new Account("not_signed_in", ""),
};

export function setContext(property: keyof typeof globalContext, value: any): void {
    globalContext[property] = value;
}