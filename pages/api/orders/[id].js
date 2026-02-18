'use strict';

import { getOrderById, createOrder, updateOrder, deleteOrder } from '../../services/orderService';

export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            const order = await getOrderById(id);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
            break;
        case 'POST':
            const newOrder = await createOrder(req.body);
            res.status(201).json(newOrder);
            break;
        case 'PUT':
            const updatedOrder = await updateOrder(id, req.body);
            res.status(200).json(updatedOrder);
            break;
        case 'DELETE':
            await deleteOrder(id);
            res.status(204).end();
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}