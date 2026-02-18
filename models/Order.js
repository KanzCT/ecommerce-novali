import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        { productId: mongoose.Schema.Types.ObjectId, name: String, price: Number, quantity: Number, image: String }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'failed'], default: 'unpaid' },
    shippingAddress: { street: String, city: String, state: String, zipCode: String, country: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);