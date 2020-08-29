const currencyFormatter = (number, currencyFormat = 'ARS') =>
	new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: currencyFormat,
	}).format(number);

export { currencyFormatter };
