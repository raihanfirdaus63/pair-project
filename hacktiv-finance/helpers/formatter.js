module.exports = {
    rupiahformatter: (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    },
    formattedDate: (data) =>{
        return new  data.toISOString().split('T')[0]
    }
}
