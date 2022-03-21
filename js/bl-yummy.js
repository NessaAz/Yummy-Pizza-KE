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


