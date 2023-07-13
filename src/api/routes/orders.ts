import * as express from "express";
const ordersRouter = express.Router();
import OrderController from "../controller/orders.controller";
import validationCheck from '../validation/validationCheck';

const order = new OrderController();

ordersRouter.post("/add", validationCheck('addOrderSchema'), order.addOrder);
ordersRouter.post("/company", validationCheck('getCompanyOrdersSchema'), order.getCompanyOrders);
ordersRouter.post("/address", validationCheck('getAddressOrdersSchema'), order.getAddressOrders);

ordersRouter.put("/update/:id", validationCheck('updateOrderSchema'), order.updateOrder);

ordersRouter.get("/cancel/:id", order.cancelOrder);
ordersRouter.get("/popular/items", order.getPopularItems);

ordersRouter.delete("/:id", validationCheck('deleteOrderSchema'), order.deleteOrder);

export { ordersRouter };
