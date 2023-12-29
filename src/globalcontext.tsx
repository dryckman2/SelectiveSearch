import Account from "./model/account";

export const notSignedInPlaceHolder = new Account("not_signed_in", "");

export let globalContext = {
    "currentAccount": notSignedInPlaceHolder,
};

export function setContext(property: keyof typeof globalContext, value: any): void {
    globalContext[property] = value;
}