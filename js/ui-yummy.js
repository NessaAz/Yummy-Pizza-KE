const price = {
	size: { small: 300, medium: 500, large: 800 },
	crust: { stuffed: 100, crispy: 150, gf: 200 },
	delivery: 125,
	pickup: 0,
    toppings: { cheese: 50, onions: 30, kachumbari: 40, chillies: 100 },
	totalCost: 0,
	order: function (order) {
		let toppings = 0;
		let eachToppingCost = [];
		for (const topping of order.toppings) {
			toppings += this.toppings[topping];
			eachToppingCost.push(`${topping}: ksh ${this.toppings[topping]}`);
		}
		const pizza = this.size[order.size] + this.crust[order.crust] + toppings;
		const total = pizza + this[order.dispatch];
		this.totalCost += total;
		return [total, pizza, [toppings, eachToppingCost], this[order.dispatch]];
	},
}

const formError = (error) => {
	$(".error").text(error);
	$(".error-modal").slideDown("slow");
	$(".close-error,.error-overlay").click(function () {
		return $(".error-modal").hide("fast");
	});
};

const validateForm = (submit) => {
	submit.preventDefault();
	let toppingInputs = $("input[type='checkbox']:checked");
	if (toppingInputs.length === 0) return formError("Please select topping(s)");
	const dispatch = $("input[name='dispatch']:checked");
	if (dispatch.length === 0) return formError("Please select dispatch process");
	const pizzaSize = $("#pizza-size").val();
	const pizzaCrust = $("#pizza-crust").val();
	const toppings = toppingInputs.map((i, input) => input.value);
	$(".view-cart").slideDown("slow");
	$(".pizza-form").trigger("reset");
	return orderList(new Order(pizzaSize, pizzaCrust, toppings, dispatch.val()));
    hide.navbar()
};


const orderList = (order) => {
	ordersArray.push(order);
	alertPlacedOrder();
	const orderItem = `
		<tr class="order-item">
		<td class="text-capitalize">${order.orderNumber}</td>
			<td class="text-capitalize">${order.size}: ksh ${price.size[order.size]}</td>
			<td class="text-capitalize">${order.crust}: ksh ${price.crust[order.crust]}</td>
			<td class="text-capitalize">${order.cost.toppings[1]}</td>
			<td class="text-capitalize">Ksh ${order.cost.pizza}</td>
		</tr>`;
	$(".cart-count").text(ordersArray.length);
	$(".dispatch").text(order.dispatch);
	$(".dispatch-cost").text(order.cost.dispatch);
	$(".pizza-cost").text(order.cost.pizza);
	$(".cart-items").append(orderItem);
	$(".total-cost").text(order.cost.total);
	$(".grand-total").text(price.totalCost);
};

const Order = function (size, crust, toppings, dispatch) {
	this.size = size;
	this.crust = crust;
	this.toppings = toppings;
	this.dispatch = dispatch;
	this.orderTime = new Date();
	this.orderNumber = (Math.random() * 1000000).toFixed();
	this.cost = this.getCosts();
};

const calcCost = function () {
	let cost = {};
	[cost.total, cost.pizza, cost.toppings, cost.dispatch] = price.order(this);
	return cost;
};

const placeOrder = () => {
	const location = $("#location").val();
	if (location === "") return formError("Please enter delivery location");
	if (location.length < 8) return formError("Location name is too short");
	Order.prototype.location = location;
	$(".dispatch-location").text(location);
	$(".checkout-container, .feedback-container").slideToggle("slow");
};

const alertPlacedOrder = () => {
	$(".error-overlay").css("z-index", "0");
	formError("Order placed successfully. Proceed to cart to finalize it");
	$(".error-overlay").css("z-index", "3");
	return $(".error-modal").slideUp("slow");
};
