$(document).ready(function () {
	Order.prototype.getCosts = calcCost;
	$(".pizza-form").submit(validateForm);
	$(".back-home, .back-to-cart").click(function () {
		if (this.classList.contains("back-home")) {
			$(".pizza-order").show("slow");
		} else {
			$(".pizza-orderlist").show("slow");
		}
		$(".checkout-modal, .checkout-container, .feedback-container").hide("slow");
	});
	$(".view-cart,.back").click(function () {
		$(".pizza-orderlist, .pizza-order").slideToggle("slow");
	});
	$(".place-order").click(placeOrder);
	$(".checkout").click(function () {
		for (const order of ordersArray) {
			if (order.dispatch === "delivery" && !order.location)
				return ($(
					".checkout-modal, .checkout-container, .pizza-orderlist"
				).slideToggle("slow"))
		}
		$(".checkout-modal, .feedback-container, .pizza-orderlist").slideToggle(
			"slow"
		);
	});
});

let ordersArray = [];


const price = {
	size: { small: 300, medium: 500, large: 800 },
	crust: { stuffed: 100, crispy: 150, gf: 200 },
	delivery: 125,
	pickup: 0,
    toppings: { cheese: 50, onions: 30, tomatoes: 40, chicken: 100 },
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

