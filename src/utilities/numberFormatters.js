const currencyFormatter = (number, currencyFormat) =>
	new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: currencyFormat,
	}).format(number);

export { currencyFormatter };
