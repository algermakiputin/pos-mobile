const formatAmount = (amount: number) => {
    if (isNaN(amount)) return '';
    return Number(amount).toFixed(2);
}

export default {
    formatAmount
}