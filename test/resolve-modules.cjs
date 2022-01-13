module.exports = (request, options) => {
	console.log(`request: ${request}`);
	return require.resolve(request);
};