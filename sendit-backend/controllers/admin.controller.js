import User from "../models/User.js";
import File from "../models/File.js";
import Code from "../models/Code.js";

// Admin credentials (using environment variables for production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "senditsystem786@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sendit123";

export const verifyAdmin = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "Admin verified",
      admin: email
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid admin credentials"
  });
};

export const getDashboardStats = async (req, res) => {
  try { 
    const totalUsers = await User.countDocuments();
    const totalFiles = await File.countDocuments();
    const totalCodes = await Code.countDocuments();

    // Files sent and received
    const filesSent = await File.countDocuments({ senderId: { $exists: true, $ne: null } });
    const filesReceived = await File.countDocuments({ receiverId: { $exists: true, $ne: null } });

    // Codes sent and received
    const codesSent = await Code.countDocuments({ senderId: { $exists: true, $ne: null } });
    const codesReceived = await Code.countDocuments({ receiverId: { $exists: true, $ne: null } });

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentFiles = await File.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    const recentCodes = await Code.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    const recentUsers = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    // Auth provider breakdown
    const localAuth = await User.countDocuments({ authProvider: "local" });
    const googleAuth = await User.countDocuments({ authProvider: "google" });

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalFiles,
        totalCodes,
        filesSent,
        filesReceived,
        codesSent,
        codesReceived,
        recentFiles,
        recentCodes,
        recentUsers,
        authBreakdown: {
          local: localAuth,
          google: googleAuth
        }
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching statistics"
    });
  }
};

export const getMonthlyTrend = async (req, res) => {
  try {
    const monthlyData = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const files = await File.countDocuments({
        createdAt: { $gte: startDate, $lt: endDate }
      });

      const codes = await Code.countDocuments({
        createdAt: { $gte: startDate, $lt: endDate }
      });

      monthlyData.push({
        month: startDate.toLocaleString('default', { month: 'short' }),
        files,
        codes,
        total: files + codes
      });
    }

    return res.json({
      success: true,
      data: monthlyData
    });
  } catch (error) {
    console.error("Error fetching monthly trend:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching monthly trend"
    });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;

    // Get recent files
    const recentFiles = await File.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('senderId', 'email name')
      .populate('receiverId', 'email name')
      .lean();

    const filesActivity = recentFiles.map(file => ({
      type: 'file',
      id: file._id,
      code: file.code,
      sender: file.senderId?.email || 'Guest',
      receiver: file.receiverId?.email || 'Not received',
      fileName: file.originalName,
      status: file.isCodeUsed ? 'Received' : 'Pending',
      date: file.createdAt,
      mimeType: file.mimeType
    }));

    // Get recent codes
    const recentCodes = await Code.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('senderId', 'email name')
      .populate('receiverId', 'email name')
      .lean();

    const codesActivity = recentCodes.map(code => ({
      type: 'code',
      id: code._id,
      code: code.code,
      sender: code.senderId?.email || 'Unknown',
      receiver: code.receiverId?.email || 'Not received',
      status: code.receiverId ? 'Received' : 'Pending',
      date: code.createdAt,
      preview: code.content ? code.content.substring(0, 50) : 'No content'
    }));

    // Merge and sort by date
    const allActivity = [...filesActivity, ...codesActivity]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    return res.json({
      success: true,
      activity: allActivity
    });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching recent activity"
    });
  }
};

export const getUsersList = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;

    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('name email authProvider createdAt')
      .lean();

    // Get file counts per user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const filesSent = await File.countDocuments({ senderId: user._id });
        const filesReceived = await File.countDocuments({ receiverId: user._id });
        const codesSent = await Code.countDocuments({ senderId: user._id });
        const codesReceived = await Code.countDocuments({ receiverId: user._id });

        return {
          ...user,
          stats: {
            filesSent,
            filesReceived,
            codesSent,
            codesReceived
          }
        };
      })
    );

    return res.json({
      success: true,
      users: usersWithStats,
      total: await User.countDocuments()
    });
  } catch (error) {
    console.error("Error fetching users list:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users"
    });
  }
};

export const getFileDetails = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;

    const files = await File.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('senderId', 'email name')
      .populate('receiverId', 'email name')
      .lean();

    const filesWithDetails = files.map(file => ({
      _id: file._id,
      code: file.code,
      fileName: file.originalName,
      mimeType: file.mimeType,
      sender: file.senderId?.email || 'Guest',
      senderName: file.senderId?.name || 'Guest',
      receiver: file.receiverId?.email || 'Not received',
      receiverName: file.receiverId?.name || 'Not received',
      status: file.isCodeUsed ? 'Received' : 'Pending',
      expiresAt: file.expiresAt,
      createdAt: file.createdAt,
      age: Math.floor((new Date() - new Date(file.createdAt)) / 60000) // in minutes
    }));

    return res.json({
      success: true,
      files: filesWithDetails,
      total: await File.countDocuments()
    });
  } catch (error) {
    console.error("Error fetching file details:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching file details"
    });
  }
};

export const getCodeDetails = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;

    const codes = await Code.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('senderId', 'email name')
      .populate('receiverId', 'email name')
      .lean();

    const codesWithDetails = codes.map(code => ({
      _id: code._id,
      code: code.code,
      sender: code.senderId?.email || 'Unknown',
      senderName: code.senderId?.name || 'Unknown',
      receiver: code.receiverId?.email || 'Not received',
      receiverName: code.receiverId?.name || 'Not received',
      status: code.receiverId ? 'Received' : 'Pending',
      expiresAt: code.expiresAt,
      createdAt: code.createdAt,
      contentPreview: code.content ? code.content.substring(0, 100) : 'No content'
    }));

    return res.json({
      success: true,
      codes: codesWithDetails,
      total: await Code.countDocuments()
    });
  } catch (error) {
    console.error("Error fetching code details:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching code details"
    });
  }
};
