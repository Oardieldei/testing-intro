function notImplemented() {
	throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(oldCart, newItem, quantity) {
	if (quantity < 1) throw new RangeError('Маловато товара')
	if (newItem.stock < quantity) throw new RangeError('На складе маловато')

	const cart = [...oldCart]
	if (cart.some(item => item.id === newItem.id)) {
		const itemIndex = cart.findIndex(item => item.id === newItem.id)

		if (newItem.stock < quantity + cart[itemIndex].quantity) throw new RangeError('На складе маловато')

		cart[itemIndex] = { ...newItem, quantity: quantity + cart[itemIndex].quantity }
	} else {
		cart.push({ ...newItem, quantity: quantity })
		cart[cart.length - 1].quantity = quantity
	}

	return cart
}
function changeQuantity(oldCart, itemId, quantity) {
	const cart = [...oldCart]
	if (!cart.some(item => item.id === itemId)) return oldCart
	if (quantity < 1) throw new RangeError('Маловато товара')

	const itemIndex = cart.findIndex(item => item.id === itemId)

	if (cart[itemIndex].stock < quantity) throw new RangeError('На складе маловато товара')

	cart[itemIndex] = { ...cart[itemIndex] }
	cart[itemIndex].quantity = quantity

	return cart
}
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
