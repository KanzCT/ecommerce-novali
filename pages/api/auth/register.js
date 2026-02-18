import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateVerificationToken } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            const hashedPassword = await hashPassword(password);
            const verificationToken = generateVerificationToken();

            const user = new User({
                name,
                email,
                password: hashedPassword,
                verificationToken
            });

            await user.save();
            await sendVerificationEmail(email, verificationToken);

            res.status(201).json({ message: 'User registered successfully. Check your email to verify.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}