const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const router = express.Router();

// إعداد اتصال قاعدة البيانات
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shababna_db',
    charset: 'utf8mb4'
};

// دالة للاتصال بقاعدة البيانات
async function getConnection() {
    try {
        return await mysql.createConnection(dbConfig);
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

// =====================================================
// API تسجيل الدخول
// =====================================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const connection = await getConnection();

        // البحث عن المستخدم
        const [users] = await connection.execute(
            'SELECT id, username, email, password_hash, first_name, last_name, role, status FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            await connection.end();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // التحقق من كلمة المرور
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            await connection.end();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (user.status !== 'active') {
            await connection.end();
            return res.status(401).json({ error: 'Account is not active' });
        }

        // إنشاء JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'shababna_secret_key_2024',
            { expiresIn: '24h' }
        );

        // تحديث آخر دخول
        await connection.execute(
            'UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = ?',
            [user.id]
        );

        await connection.end();

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API الحصول على إحصائيات لوحة التحكم
// =====================================================
router.get('/dashboard/stats', async (req, res) => {
    try {
        const connection = await getConnection();

        // إحصائيات عامة
        const [stats] = await connection.execute(`
      SELECT
        (SELECT COUNT(*) FROM users WHERE status = 'active') as total_users,
        (SELECT COUNT(*) FROM projects WHERE status = 'active') as active_projects,
        (SELECT COUNT(*) FROM projects) as total_projects,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'page_views' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_views,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'unique_visitors' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_visitors,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'user_signups' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_signups
    `);

        // بيانات الرسم البياني للأسبوع الماضي
        const [chartData] = await connection.execute(`
      SELECT
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        DATE_FORMAT(date, '%a') as day_name,
        COALESCE(SUM(CASE WHEN metric_type = 'page_views' THEN metric_value END), 0) as page_views,
        COALESCE(SUM(CASE WHEN metric_type = 'unique_visitors' THEN metric_value END), 0) as unique_visitors,
        COALESCE(SUM(CASE WHEN metric_type = 'user_signups' THEN metric_value END), 0) as user_signups
      FROM analytics
      WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY date
      ORDER BY date ASC
    `);

        // إحصائيات المشاريع حسب الحالة
        const [projectStats] = await connection.execute(`
      SELECT
        status,
        COUNT(*) as count,
        COALESCE(SUM(current_participants), 0) as total_participants
      FROM projects
      GROUP BY status
    `);

        // أحدث المستخدمين
        const [recentUsers] = await connection.execute(`
      SELECT id, first_name, last_name, email, created_at
      FROM users
      WHERE status = 'active'
      ORDER BY created_at DESC
      LIMIT 5
    `);

        await connection.end();

        res.json({
            success: true,
            stats: stats[0],
            chartData,
            projectStats,
            recentUsers
        });

    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API الحصول على إحصائيات المشاريع
// =====================================================
router.get('/projects/stats', async (req, res) => {
    try {
        const connection = await getConnection();

        const [projects] = await connection.execute(`
      SELECT
        id,
        title_ar,
        title_en,
        status,
        target_participants,
        current_participants,
        ROUND((current_participants / target_participants) * 100, 1) as completion_percentage,
        created_at
      FROM projects
      ORDER BY created_at DESC
    `);

        await connection.end();

        res.json({
            success: true,
            projects
        });

    } catch (error) {
        console.error('Projects stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API إضافة بيانات إحصائية
// =====================================================
router.post('/analytics', async (req, res) => {
    try {
        const { metric_type, metric_value, country = 'SA', date = new Date().toISOString().split('T')[0] } = req.body;

        const connection = await getConnection();

        // إدراج أو تحديث البيانات الإحصائية
        await connection.execute(`
      INSERT INTO analytics (date, metric_type, metric_value, country)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE metric_value = metric_value + VALUES(metric_value)
    `, [date, metric_type, metric_value, country]);

        await connection.end();

        res.json({ success: true, message: 'Analytics data recorded' });

    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API الحصول على المستخدمين
// =====================================================
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', role = '' } = req.query;
        const offset = (page - 1) * limit;

        const connection = await getConnection();

        let whereClause = 'WHERE 1=1';
        const params = [];

        if (search) {
            whereClause += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (role) {
            whereClause += ' AND role = ?';
            params.push(role);
        }

        const [users] = await connection.execute(`
      SELECT id, username, email, first_name, last_name, role, status, created_at, last_login
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), parseInt(offset)]);

        const [countResult] = await connection.execute(`
      SELECT COUNT(*) as total FROM users ${whereClause}
    `, params);

        await connection.end();

        res.json({
            success: true,
            users,
            total: countResult[0].total,
            page: parseInt(page),
            limit: parseInt(limit)
        });

    } catch (error) {
        console.error('Users fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// Middleware للتحقق من التوثيق
// =====================================================
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'shababna_secret_key_2024', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// تطبيق middleware على المسارات المحمية
router.use('/dashboard/*', authenticateToken);
router.use('/users', authenticateToken);

module.exports = router;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const router = express.Router();

// إعداد اتصال قاعدة البيانات
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shababna_db',
    charset: 'utf8mb4'
};

// دالة للاتصال بقاعدة البيانات
async function getConnection() {
    try {
        return await mysql.createConnection(dbConfig);
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

// =====================================================
// API تسجيل الدخول
// =====================================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const connection = await getConnection();

        // البحث عن المستخدم
        const [users] = await connection.execute(
            'SELECT id, username, email, password_hash, first_name, last_name, role, status FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            await connection.end();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // التحقق من كلمة المرور
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            await connection.end();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (user.status !== 'active') {
            await connection.end();
            return res.status(401).json({ error: 'Account is not active' });
        }

        // إنشاء JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'shababna_secret_key_2024',
            { expiresIn: '24h' }
        );

        // تحديث آخر دخول
        await connection.execute(
            'UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = ?',
            [user.id]
        );

        await connection.end();

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API الحصول على إحصائيات لوحة التحكم
// =====================================================
router.get('/dashboard/stats', async (req, res) => {
    try {
        const connection = await getConnection();

        // إحصائيات عامة
        const [stats] = await connection.execute(`
      SELECT
        (SELECT COUNT(*) FROM users WHERE status = 'active') as total_users,
        (SELECT COUNT(*) FROM projects WHERE status = 'active') as active_projects,
        (SELECT COUNT(*) FROM projects) as total_projects,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'page_views' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_views,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'unique_visitors' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_visitors,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'user_signups' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_signups
    `);

        // بيانات الرسم البياني للأسبوع الماضي
        const [chartData] = await connection.execute(`
      SELECT
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        DATE_FORMAT(date, '%a') as day_name,
        COALESCE(SUM(CASE WHEN metric_type = 'page_views' THEN metric_value END), 0) as page_views,
        COALESCE(SUM(CASE WHEN metric_type = 'unique_visitors' THEN metric_value END), 0) as unique_visitors,
        COALESCE(SUM(CASE WHEN metric_type = 'user_signups' THEN metric_value END), 0) as user_signups
      FROM analytics
      WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY date
      ORDER BY date ASC
    `);

        // إحصائيات المشاريع حسب الحالة
        const [projectStats] = await connection.execute(`
      SELECT
        status,
        COUNT(*) as count,
        COALESCE(SUM(current_participants), 0) as total_participants
      FROM projects
      GROUP BY status
    `);

        // أحدث المستخدمين
        const [recentUsers] = await connection.execute(`
      SELECT id, first_name, last_name, email, created_at
      FROM users
      WHERE status = 'active'
      ORDER BY created_at DESC
      LIMIT 5
    `);

        await connection.end();

        res.json({
            success: true,
            stats: stats[0],
            chartData,
            projectStats,
            recentUsers
        });

    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API الحصول على إحصائيات المشاريع
// =====================================================
router.get('/projects/stats', async (req, res) => {
    try {
        const connection = await getConnection();

        const [projects] = await connection.execute(`
      SELECT
        id,
        title_ar,
        title_en,
        status,
        target_participants,
        current_participants,
        ROUND((current_participants / target_participants) * 100, 1) as completion_percentage,
        created_at
      FROM projects
      ORDER BY created_at DESC
    `);

        await connection.end();

        res.json({
            success: true,
            projects
        });

    } catch (error) {
        console.error('Projects stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API إضافة بيانات إحصائية
// =====================================================
router.post('/analytics', async (req, res) => {
    try {
        const { metric_type, metric_value, country = 'SA', date = new Date().toISOString().split('T')[0] } = req.body;

        const connection = await getConnection();

        // إدراج أو تحديث البيانات الإحصائية
        await connection.execute(`
      INSERT INTO analytics (date, metric_type, metric_value, country)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE metric_value = metric_value + VALUES(metric_value)
    `, [date, metric_type, metric_value, country]);

        await connection.end();

        res.json({ success: true, message: 'Analytics data recorded' });

    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API الحصول على المستخدمين
// =====================================================
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', role = '' } = req.query;
        const offset = (page - 1) * limit;

        const connection = await getConnection();

        let whereClause = 'WHERE 1=1';
        const params = [];

        if (search) {
            whereClause += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (role) {
            whereClause += ' AND role = ?';
            params.push(role);
        }

        const [users] = await connection.execute(`
      SELECT id, username, email, first_name, last_name, role, status, created_at, last_login
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), parseInt(offset)]);

        const [countResult] = await connection.execute(`
      SELECT COUNT(*) as total FROM users ${whereClause}
    `, params);

        await connection.end();

        res.json({
            success: true,
            users,
            total: countResult[0].total,
            page: parseInt(page),
            limit: parseInt(limit)
        });

    } catch (error) {
        console.error('Users fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// Middleware للتحقق من التوثيق
// =====================================================
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'shababna_secret_key_2024', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// تطبيق middleware على المسارات المحمية
router.use('/dashboard/*', authenticateToken);
router.use('/users', authenticateToken);

module.exports = router;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const router = express.Router();

// إعداد اتصال قاعدة البيانات
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shababna_db',
    charset: 'utf8mb4'
};

// دالة للاتصال بقاعدة البيانات
async function getConnection() {
    try {
        return await mysql.createConnection(dbConfig);
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

// =====================================================
// API تسجيل الدخول
// =====================================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const connection = await getConnection();

        // البحث عن المستخدم
        const [users] = await connection.execute(
            'SELECT id, username, email, password_hash, first_name, last_name, role, status FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            await connection.end();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // التحقق من كلمة المرور
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            await connection.end();
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (user.status !== 'active') {
            await connection.end();
            return res.status(401).json({ error: 'Account is not active' });
        }

        // إنشاء JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'shababna_secret_key_2024',
            { expiresIn: '24h' }
        );

        // تحديث آخر دخول
        await connection.execute(
            'UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = ?',
            [user.id]
        );

        await connection.end();

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API الحصول على إحصائيات لوحة التحكم
// =====================================================
router.get('/dashboard/stats', async (req, res) => {
    try {
        const connection = await getConnection();

        // إحصائيات عامة
        const [stats] = await connection.execute(`
      SELECT
        (SELECT COUNT(*) FROM users WHERE status = 'active') as total_users,
        (SELECT COUNT(*) FROM projects WHERE status = 'active') as active_projects,
        (SELECT COUNT(*) FROM projects) as total_projects,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'page_views' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_views,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'unique_visitors' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_visitors,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'user_signups' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_signups
    `);

        // بيانات الرسم البياني للأسبوع الماضي
        const [chartData] = await connection.execute(`
      SELECT
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        DATE_FORMAT(date, '%a') as day_name,
        COALESCE(SUM(CASE WHEN metric_type = 'page_views' THEN metric_value END), 0) as page_views,
        COALESCE(SUM(CASE WHEN metric_type = 'unique_visitors' THEN metric_value END), 0) as unique_visitors,
        COALESCE(SUM(CASE WHEN metric_type = 'user_signups' THEN metric_value END), 0) as user_signups
      FROM analytics
      WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY date
      ORDER BY date ASC
    `);

        // إحصائيات المشاريع حسب الحالة
        const [projectStats] = await connection.execute(`
      SELECT
        status,
        COUNT(*) as count,
        COALESCE(SUM(current_participants), 0) as total_participants
      FROM projects
      GROUP BY status
    `);

        // أحدث المستخدمين
        const [recentUsers] = await connection.execute(`
      SELECT id, first_name, last_name, email, created_at
      FROM users
      WHERE status = 'active'
      ORDER BY created_at DESC
      LIMIT 5
    `);

        await connection.end();

        res.json({
            success: true,
            stats: stats[0],
            chartData,
            projectStats,
            recentUsers
        });

    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API الحصول على إحصائيات المشاريع
// =====================================================
router.get('/projects/stats', async (req, res) => {
    try {
        const connection = await getConnection();

        const [projects] = await connection.execute(`
      SELECT
        id,
        title_ar,
        title_en,
        status,
        target_participants,
        current_participants,
        ROUND((current_participants / target_participants) * 100, 1) as completion_percentage,
        created_at
      FROM projects
      ORDER BY created_at DESC
    `);

        await connection.end();

        res.json({
            success: true,
            projects
        });

    } catch (error) {
        console.error('Projects stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API إضافة بيانات إحصائية
// =====================================================
router.post('/analytics', async (req, res) => {
    try {
        const { metric_type, metric_value, country = 'SA', date = new Date().toISOString().split('T')[0] } = req.body;

        const connection = await getConnection();

        // إدراج أو تحديث البيانات الإحصائية
        await connection.execute(`
      INSERT INTO analytics (date, metric_type, metric_value, country)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE metric_value = metric_value + VALUES(metric_value)
    `, [date, metric_type, metric_value, country]);

        await connection.end();

        res.json({ success: true, message: 'Analytics data recorded' });

    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// API الحصول على المستخدمين
// =====================================================
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', role = '' } = req.query;
        const offset = (page - 1) * limit;

        const connection = await getConnection();

        let whereClause = 'WHERE 1=1';
        const params = [];

        if (search) {
            whereClause += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (role) {
            whereClause += ' AND role = ?';
            params.push(role);
        }

        const [users] = await connection.execute(`
      SELECT id, username, email, first_name, last_name, role, status, created_at, last_login
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), parseInt(offset)]);

        const [countResult] = await connection.execute(`
      SELECT COUNT(*) as total FROM users ${whereClause}
    `, params);

        await connection.end();

        res.json({
            success: true,
            users,
            total: countResult[0].total,
            page: parseInt(page),
            limit: parseInt(limit)
        });

    } catch (error) {
        console.error('Users fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =====================================================
// Middleware للتحقق من التوثيق
// =====================================================
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'shababna_secret_key_2024', (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// تطبيق middleware على المسارات المحمية
router.use('/dashboard/*', authenticateToken);
router.use('/users', authenticateToken);

module.exports = router;
