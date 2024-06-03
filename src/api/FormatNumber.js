const formatNumber = (number, decimals = 2, decPoint = '.', thousandsSep = ',') => {
    if (isNaN(number) || number == null) {
      return '';
    }
  
    const fixedNumber = Number(number).toFixed(decimals);
  
    const [integerPart, decimalPart] = fixedNumber.split('.');
  
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
  
    return decimals ? formattedIntegerPart + decPoint + decimalPart : formattedIntegerPart;
  };

  export default formatNumber;