const currencyFormatter = (number, currencyFormat = 'ARS') =>
	new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: currencyFormat,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(number);

export { currencyFormatter };
