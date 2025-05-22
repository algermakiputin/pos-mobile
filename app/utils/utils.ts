export const formatAmount = (amount: number) => {
    if (isNaN(amount)) return '';
    return new Intl.NumberFormat("en-US", {style: "currency", currency: "PHP", minimumFractionDigits:2, maximumFractionDigits: 2}).format(amount);
}

export const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}