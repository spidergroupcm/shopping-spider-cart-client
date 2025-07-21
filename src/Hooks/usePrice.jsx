import useCart from "./useCart";


const usePrice = () => {
    const [cart] = useCart();

    const shippingFee = 20;

    const subTotal = cart?.reduce((acc,item) => acc + (item.price * (item.orderQuantity)), 0);
    const total = subTotal + shippingFee;
    return [total,shippingFee,subTotal]
};

export default usePrice;