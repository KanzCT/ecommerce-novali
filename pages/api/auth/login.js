import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyPassword, generateToken } from '@/lib/auth';

export default async function handler(req, res) {
    await dbConnect();
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Missing email or password' });
            }
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            if (!user.isVerified) {
                return res.status(403).json({ error: 'Please verify your email first' });
            }
            const passwordMatch = await verifyPassword(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = generateToken(user._id);
            res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}