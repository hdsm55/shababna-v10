const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// تسجيل الدخول
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // التحقق من البيانات المطلوبة
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        // البحث عن المستخدم
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // التحقق من حالة المستخدم
        if (!user.isActive) {
            return res.status(401).json({
                message: 'Account is deactivated. Please contact admin.'
            });
        }

        // التحقق من كلمة المرور
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // إنشاء JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // تحديث آخر تسجيل دخول
        await User.findByIdAndUpdate(user._id, {
            lastLogin: new Date()
        });

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                permissions: user.permissions,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// التحقق من صحة Token
router.get('/verify', authenticate, (req, res) => {
    res.json({
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            role: req.user.role,
            permissions: req.user.permissions,
            avatar: req.user.avatar,
            lastLogin: req.user.lastLogin
        }
    });
});

// تحديث الملف الشخصي
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { firstName, lastName, avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                firstName,
                lastName,
                avatar,
                updatedAt: new Date()
            },
            { new: true, select: '-password' }
        );

        res.json({ user });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
});

// تغيير كلمة المرور
router.put('/change-password', authenticate, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: 'Current password and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: 'New password must be at least 6 characters long'
            });
        }

        const user = await User.findById(req.user._id);

        // التحقق من كلمة المرور الحالية
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Current password is incorrect'
            });
        }

        // تحديث كلمة المرور
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });

    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ message: 'Error changing password' });
    }
});

module.exports = router;