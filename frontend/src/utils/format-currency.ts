import numeral from 'numeral';

numeral.register('locale', 'id', {
    delimiters: {
        thousands: ".",
        decimal: ","
    },
    abbreviations: {
        thousand: "k",
        million: "juta",
        billion: "milyar",
        trillion: "triliun"
    },
     ordinal: (number: number) => {
        return number === 1 ? 'st' : 'nd'; // This is a placeholder and can be adjusted as needed
    },
    currency: {
        symbol: "Rp",
    }
});

numeral.locale('id');

export const formatRupiah = (value: number): string => {
    return numeral(value).format('$0,0[.]00 ');
};