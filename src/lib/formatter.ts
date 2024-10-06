const CURRENCY_FORMATTER = new Intl.NumberFormat("en-us",{
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0
})

export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-us")

export function formatNumber(number:number){
    return NUMBER_FORMATTER.format(number)
}

export function descriptionFormatter(desc : string){
    return desc.substring(0, 50)
}

export function formatPaisatoRupee(number:number){
    return number/100
}