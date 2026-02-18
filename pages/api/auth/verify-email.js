// pages/api/auth/verify-email.js

import { NextApiRequest, NextApiResponse } from 'next';
import { sendVerificationEmail } from '../../../utils/email';

export default async function verifyEmail(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        await sendVerificationEmail(email);
        return res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending email', error });
    }
}