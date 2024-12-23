export const formatAmount = (amount: number) => {
    if (isNaN(amount)) return '';
    return new Intl.NumberFormat("en-US", {style: "currency", currency: "PHP"}).format(amount);
}


