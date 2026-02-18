// pages/api/orders/index.js

// This API route handles fetching and creating orders.

import { NextApiRequest, NextApiResponse } from 'next';

// In-memory orders storage for demonstration purposes.
let orders = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle fetching the list of orders
        res.status(200).json(orders);
    } else if (req.method === 'POST') {
        // Handle creating a new order
        const newOrder = req.body;
        orders.push(newOrder);
        res.status(201).json(newOrder);
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}