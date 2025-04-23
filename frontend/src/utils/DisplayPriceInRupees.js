export const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF'
    }).format(price);
}