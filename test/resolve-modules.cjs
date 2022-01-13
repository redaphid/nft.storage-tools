const {memoizeWith, identity} = require("ramda")
module.exports = (request, options) => {
	const memoized = memoizeWith(identity, require.resolve)
	console.log({request, options});
	return memoized(request, options)
};