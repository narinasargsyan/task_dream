import { models } from "../../db";
import db from "../../db/models"
import { Response, Request } from "express";

class OrderController {
    addOrder = async (req: Request, res: Response) => {
        try {
            const { companyName, customerAddress, orderedItem } = req.body;
            await models.Orders.create({
                companyName,
                customerAddress,
                orderedItem,
            });
            res.send("You have successfully added order!");
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };

    getCompanyOrders = async (req, res) => {
        try {
            const { companyName } = req.body;
            const orders = await models.Orders.findAll({ where: { companyName }});
            return res.send(orders);
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error =>", err);
        }
    };

    getAddressOrders = async (req, res) => {
        try {
            const { customerAddress } = req.body;
            const orders = await models.Orders.findAll({ where: { customerAddress }});
            return res.send(orders);
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error =>", err);
        }
    };

    updateOrder = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { customerAddress } = req.body;
            const updateOrder = await models.Orders.update({ customerAddress }, { where: { id } });
            if (!updateOrder) {
                return res.status(404).send("Order not found");
            }
            return res.send("You have successfully updated order!");
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };

    cancelOrder = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const order = await models.Orders.findOne({ where: {id} });
            if (!order) {
                return res.status(404).send("Order not found");
            }
            console.log("Date.now()", Date.now())
            console.log("order.createdAt.getTime()", order.createdAt.getTime())
            let diff =(order.createdAt.getTime() - Date.now()) / 1000;
            diff /= (60 * 60);
            if(!(Math.abs(Math.round(diff)) < 24)) {
                return res.status(400).send("The order cannot be canceled as more than 24 hours have passed.");
            }
            await models.Orders.update({ canceled: true }, { where: { id: id }});
            return res.send("You have successfully canceled the order!");
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error =>", err);
        }
    };

    getPopularItems = async (req, res) => {
        try {
            const popularItems = await models.Orders.findAll({
                attributes: ['orderedItem', [models.sequelize.fn('COUNT', models.sequelize.col('orderedItem')), 'count']],
                group: ['orderedItem'],
                order: [[models.sequelize.literal('count'), 'DESC']],
                limit: 10,
            });
            return res.send(popularItems);
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error =>", err);
        }
    };

    deleteOrder = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const order = await models.Orders.findOne({ where: { id } });
            if (!order) {
                return res.status(404).send("Order not found");
            }
            await db.Orders.destroy({where: {id:id}});
            return res.send("You have successfully deleted order!");
        }  catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };
}

export default OrderController;
