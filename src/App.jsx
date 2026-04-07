import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from 'react'
import { 
  LayoutDashboard, Users, CalendarPlus, Inbox, Clock, PieChart, BarChart3, 
  LogOut, Search, Bell, ChevronDown, User, Check, X, Upload, FileText,
  Calendar, TrendingUp, AlertCircle, CheckCircle, XCircle, Info, Plus,
  Edit2, Trash2, Eye, Download, Filter, MoreVertical, Mail, Phone,
  Building2, GraduationCap, Briefcase, Award, ArrowRight, ArrowLeft,
  Menu, X as XIcon, Loader2, ChevronRight, Home, BookOpen, FileCheck, Lock
} from 'lucide-react'

// ============================================
// THEME CONSTANTS
// ============================================
const THEME = {
  sidebar: '#0A0918',
  sidebarBorder: 'rgba(255,255,255,0.06)',
  sidebarHover: 'rgba(255,255,255,0.05)',
  sidebarActive: 'rgba(108,99,255,0.2)',
  pageBg: '#F4F3FF',
  cardBg: 'rgba(255,255,255,0.85)',
  cardBorder: 'rgba(255,255,255,0.6)',
  glassBg: 'rgba(255,255,255,0.6)',
  primary: '#6C63FF',
  primaryDark: '#4B44CC',
  primaryLight: '#EEF2FF',
  primaryGlow: 'rgba(108,99,255,0.15)',
  principal: { bg: '#F3F0FF', border: '#C4B5FD', text: '#5B21B6', dot: '#7C3AED' },
  hod:       { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8', dot: '#3B82F6' },
  faculty:   { bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D', dot: '#22C55E' },
  student:   { bg: '#FFF7ED', border: '#FED7AA', text: '#C2410C', dot: '#F97316' },
  success: '#10B981',
  successBg: '#D1FAE5',
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  info: '#6C63FF',
  infoBg: '#EEF2FF',
  textPrimary: '#0F0E1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textWhite: '#FFFFFF',
  textSidebar: 'rgba(255,255,255,0.7)',
  textSidebarActive: '#FFFFFF',
}

// ============================================
// INITIAL DATA
// ============================================
const INITIAL_DATA = {
  users: [
    {
      id: 'u1', name: 'Dr. Ramesh Kumar', email: 'principal@college.edu',
      password: 'Admin@123', role: 'principal', department: 'Administration',
      employeeId: 'EMP001', phone: '9876543210', isActive: true,
      avatar: 'RK', createdBy: null,
      leaveBalance: {
        CL: { total: 10, used: 2, remaining: 8, carriedForward: 0 },
        ML: { total: 12, used: 1, remaining: 11 },
        EL: { total: 15, used: 3, remaining: 12 },
        OD: { used: 0 },
      }
    },
    {
      id: 'u2', name: 'Dr. Priya Sharma', email: 'hod.cs@college.edu',
      password: 'Hod@123', role: 'hod', department: 'Computer Science',
      employeeId: 'EMP002', phone: '9876543211', isActive: true,
      avatar: 'PS', createdBy: 'u1',
      leaveBalance: {
        CL: { total: 10, used: 3, remaining: 7, carriedForward: 0 },
        ML: { total: 12, used: 0, remaining: 12 },
        EL: { total: 15, used: 5, remaining: 10 },
        OD: { used: 2 },
      }
    },
    {
      id: 'u3', name: 'Prof. Arun Mehta', email: 'faculty1@college.edu',
      password: 'Faculty@123', role: 'faculty', department: 'Computer Science',
      facultyRollNo: 'FAC2024001', designation: 'Assistant Professor',
      phone: '9876543212', isActive: true, avatar: 'AM', createdBy: 'u2',
      leaveBalance: {
        CL: { total: 10, used: 4, remaining: 6, carriedForward: 0 },
        ML: { total: 12, used: 2, remaining: 10 },
        EL: { total: 15, used: 0, remaining: 15 },
        OD: { used: 1 },
      }
    },
    {
      id: 'u4', name: 'Kavya Nair', email: 'student1@college.edu',
      password: 'Student@123', role: 'student', department: 'Computer Science',
      rollNumber: 'CS2024001', year: '2nd Year', semester: '3rd',
      phone: '9876543213', isActive: true, avatar: 'KN', createdBy: 'u3',
      attendancePercent: 82,
      leaveBalance: {
        CL: { total: 10, used: 3, remaining: 7 },
        ML: { total: 12, used: 1, remaining: 11 },
        OD: { used: 0 },
      }
    },
    {
      id: 'u5', name: 'Rahul Verma', email: 'student2@college.edu',
      password: 'Student@123', role: 'student', department: 'Computer Science',
      rollNumber: 'CS2024002', year: '2nd Year', semester: '3rd',
      phone: '9876543214', isActive: true, avatar: 'RV', createdBy: 'u3',
      attendancePercent: 78,
      leaveBalance: {
        CL: { total: 10, used: 5, remaining: 5 },
        ML: { total: 12, used: 2, remaining: 10 },
        OD: { used: 1 },
      }
    },
    {
      id: 'u6', name: 'Prof. Sunita Rao', email: 'faculty2@college.edu',
      password: 'Faculty@123', role: 'faculty', department: 'Computer Science',
      facultyRollNo: 'FAC2024002', designation: 'Associate Professor',
      phone: '9876543215', isActive: true, avatar: 'SR', createdBy: 'u2',
      leaveBalance: {
        CL: { total: 10, used: 2, remaining: 8, carriedForward: 0 },
        ML: { total: 12, used: 1, remaining: 11 },
        EL: { total: 15, used: 4, remaining: 11 },
        OD: { used: 0 },
      }
    },
  ],
  leaves: [
    {
      id: 'l1', applicantId: 'u4', leaveType: 'CL',
      fromDate: '2025-02-10', toDate: '2025-02-12', totalDays: 3,
      reason: 'Family function attendance required', hasProof: false,
      status: 'approved', appliedOn: '2025-02-08T10:00:00Z',
      actionBy: 'u3', actionOn: '2025-02-09T09:00:00Z', remarks: 'Approved',
    },
    {
      id: 'l2', applicantId: 'u4', leaveType: 'ML',
      fromDate: '2025-03-05', toDate: '2025-03-05', totalDays: 1,
      reason: 'Fever and cold', hasProof: false,
      status: 'pending', appliedOn: '2025-03-05T08:00:00Z',
      actionBy: null, actionOn: null, remarks: '',
    },
    {
      id: 'l3', applicantId: 'u5', leaveType: 'OD',
      fromDate: '2025-03-10', toDate: '2025-03-10', totalDays: 1,
      reason: 'Technical symposium participation', hasProof: true,
      status: 'pending', appliedOn: '2025-03-08T14:00:00Z',
      actionBy: null, actionOn: null, remarks: '',
    },
    {
      id: 'l4', applicantId: 'u3', leaveType: 'EL',
      fromDate: '2025-02-20', toDate: '2025-02-25', totalDays: 6,
      reason: 'Personal vacation', hasProof: false,
      status: 'approved', appliedOn: '2025-02-15T11:00:00Z',
      actionBy: 'u2', actionOn: '2025-02-16T10:00:00Z', remarks: 'Approved',
    },
  ],
  notifications: [],
  academicYear: '2024-25',
}

const PUBLIC_HOLIDAYS = ['2025-01-14','2025-01-26','2025-04-14','2025-08-15','2025-10-02','2025-12-25']

// ============================================
// UTILITY FUNCTIONS
// ============================================
const generateId = () => Math.random().toString(36).substr(2, 9)
const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

const calcDays = (from, to, type) => {
  if (!from || !to) return 0
  let count = 0
  const cur = new Date(from)
  const end = new Date(to)
  while (cur <= end) {
    if (type === 'ML') {
      count++
    } else {
      const d = cur.getDay()
      const s = cur.toISOString().split('T')[0]
      if (d !== 0 && d !== 6 && !PUBLIC_HOLIDAYS.includes(s)) count++
    }
    cur.setDate(cur.getDate() + 1)
  }
  return count
}

const getApprover = (applicantRole, allUsers, applicantDept) => {
  if (applicantRole === 'student') return allUsers.find(u => u.role === 'faculty' && u.department === applicantDept)
  if (applicantRole === 'faculty') return allUsers.find(u => u.role === 'hod' && u.department === applicantDept)
  if (applicantRole === 'hod') return allUsers.find(u => u.role === 'principal')
  return null
}

const getVisibleLeaves = (currentUser, allLeaves, allUsers) => {
  if (currentUser.role === 'principal') return allLeaves
  if (currentUser.role === 'hod') {
    const deptUserIds = allUsers.filter(u => u.department === currentUser.department).map(u => u.id)
    return allLeaves.filter(l => deptUserIds.includes(l.applicantId))
  }
  if (currentUser.role === 'faculty') {
    const myStudentIds = allUsers.filter(u => u.createdBy === currentUser.id).map(u => u.id)
    return allLeaves.filter(l => myStudentIds.includes(l.applicantId) || l.applicantId === currentUser.id)
  }
  return allLeaves.filter(l => l.applicantId === currentUser.id)
}

const getRoleColor = (role) => {
  switch(role) {
    case 'principal': return THEME.principal
    case 'hod': return THEME.hod
    case 'faculty': return THEME.faculty
    case 'student': return THEME.student
    default: return THEME.student
  }
}

// ============================================
// CONTEXTS
// ============================================
const AuthContext = React.createContext(null)
const AppDataContext = React.createContext(null)
const ToastContext = React.createContext(null)

// ============================================
// STYLE INJECTOR
// ============================================
const StyleInjector = () => {
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const style = document.createElement('style')
    style.textContent = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body, #root { height: 100%; }
      body { font-family: 'Sora', sans-serif; background: ${THEME.pageBg}; color: ${THEME.textPrimary}; }
      @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
      @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(20px) rotate(-5deg); } }
      @keyframes pageIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
      @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
      @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
      @keyframes spin { to { transform: rotate(360deg); } }
      .page-enter { animation: pageIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .shake { animation: shake 0.5s ease; }
      .spin { animation: spin 1s linear infinite; }
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(108,99,255,0.3); border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(108,99,255,0.5); }
      input, textarea, select { font-family: 'Sora', sans-serif; }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(style)
    }
  }, [])
  return null
}

// ============================================
// TOAST SYSTEM
// ============================================
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = generateId()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toastStyles = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    toast: (type) => ({
      padding: '14px 20px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '280px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
      animation: 'slideInRight 0.3s ease',
      background: type === 'success' ? THEME.successBg : type === 'error' ? THEME.dangerBg : type === 'warning' ? THEME.warningBg : THEME.infoBg,
      color: type === 'success' ? THEME.success : type === 'error' ? THEME.danger : type === 'warning' ? THEME.warning : THEME.info,
      border: `1px solid ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#6C63FF'}`,
    })
  }

  const getToastIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle size={18} />
      case 'error': return <XCircle size={18} />
      case 'warning': return <AlertCircle size={18} />
      default: return <Info size={18} />
    }
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={toastStyles.container}>
        {toasts.map(toast => (
          <div key={toast.id} style={toastStyles.toast(toast.type)}>
            {getToastIcon(toast.type)}
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}>
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// ============================================
// API HELPER
// ============================================
const API = 'http://localhost:5000/api'
const normalize = (doc) => doc ? { ...doc, id: doc._id || doc.id } : doc
const normalizeLeave = (l) => {
  if (!l) return l
  const applicantId = l.applicantId?._id || l.applicantId
  const actionBy = l.actionBy?._id || l.actionBy || null
  return { ...l, id: l._id || l.id, applicantId, actionBy }
}
const authFetch = async (path, options = {}) => {
  const token = localStorage.getItem('leavesync_token')
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

// ============================================
// AUTH PROVIDER
// ============================================
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('leavesync_token')
    if (!token) { setIsLoading(false); return }
    authFetch('/auth/me')
      .then(u => setUser(normalize(u)))
      .catch(() => localStorage.removeItem('leavesync_token'))
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const { token, user: u } = await authFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      localStorage.setItem('leavesync_token', token)
      setUser(normalize(u))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message || 'Invalid credentials' }
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('leavesync_token')
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const u = await authFetch('/auth/me')
      setUser(normalize(u))
    } catch {}
  }, [])

  return <AuthContext.Provider value={{ user, login, logout, isLoading, refreshUser }}>{children}</AuthContext.Provider>
}

// ============================================
// APP DATA PROVIDER
// ============================================
const AppDataProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    const token = localStorage.getItem('leavesync_token')
    if (!token) { setLoading(false); return }
    try {
      const [u, l] = await Promise.all([authFetch('/users'), authFetch('/leaves')])
      setUsers(u.map(normalize))
      setLeaves(l.map(normalizeLeave))
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const addUser = useCallback(async (userData) => {
    const created = await authFetch('/users', { method: 'POST', body: JSON.stringify(userData) })
    setUsers(prev => [...prev, normalize(created)])
    return normalize(created)
  }, [])

  const updateUser = useCallback(async (userId, updates) => {
    const updated = await authFetch(`/users/${userId}`, { method: 'PATCH', body: JSON.stringify(updates) })
    setUsers(prev => prev.map(u => u.id === userId ? normalize(updated) : u))
  }, [])

  const deactivateUser = useCallback(async (userId) => {
    await authFetch(`/users/${userId}`, { method: 'DELETE' })
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: false } : u))
  }, [])

  const addLeave = useCallback(async (leaveData) => {
    const created = await authFetch('/leaves', { method: 'POST', body: JSON.stringify(leaveData) })
    const normalized = normalizeLeave(created)
    setLeaves(prev => [...prev, normalized])
    return normalized
  }, [])

  const updateLeaveStatus = useCallback(async (leaveId, status, _actionBy, remarks = '') => {
    const updated = await authFetch(`/leaves/${leaveId}/status`, { method: 'PATCH', body: JSON.stringify({ status, remarks }) })
    const normalized = normalizeLeave(updated)
    setLeaves(prev => prev.map(l => l.id === leaveId ? normalized : l))
    // refresh users so leave balance updates are reflected
    const freshUsers = await authFetch('/users')
    setUsers(freshUsers.map(normalize))
  }, [])

  const value = {
    users,
    leaves,
    loading,
    academicYear: '2024-25',
    fetchAll,
    addUser,
    updateUser,
    deactivateUser,
    addLeave,
    updateLeaveStatus,
    getUserById: (id) => users.find(u => u.id === id),
    getUsersByRole: (role) => users.filter(u => u.role === role && u.isActive),
    getUsersByDepartment: (dept) => users.filter(u => u.department === dept && u.isActive),
    getLeavesByApplicant: (id) => leaves.filter(l => l.applicantId === id),
    getPendingLeaves: () => leaves.filter(l => l.status === 'pending'),
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

// ============================================
// LOGIN PAGE
// ============================================
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('student')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDemo, setShowDemo] = useState(false)
  const { showToast } = useContext(ToastContext)
  const cardRef = useRef(null)

  const roles = [
    { key: 'principal', label: 'Principal', color: THEME.principal },
    { key: 'hod', label: 'HOD', color: THEME.hod },
    { key: 'faculty', label: 'Faculty', color: THEME.faculty },
    { key: 'student', label: 'Student', color: THEME.student },
  ]

  const demoCredentials = [
    { role: 'Principal', email: 'principal@college.edu', password: 'Admin@123' },
    { role: 'HOD', email: 'hod.cs@college.edu', password: 'Hod@123' },
    { role: 'Faculty', email: 'faculty1@college.edu', password: 'Faculty@123' },
    { role: 'Student', email: 'student1@college.edu', password: 'Student@123' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    const result = await onLogin(email, password)
    if (!result.success) {
      setError(result.error)
      if (cardRef.current) {
        cardRef.current.classList.add('shake')
        setTimeout(() => cardRef.current.classList.remove('shake'), 500)
      }
    } else {
      showToast('Login successful!', 'success')
    }
    setIsLoading(false)
  }

  const fillDemo = (cred) => {
    setEmail(cred.email)
    setPassword(cred.password)
    const roleKey = cred.role.toLowerCase()
    setSelectedRole(roleKey === 'hod' ? 'hod' : roleKey)
  }

  const pageStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at top, #1a1040 0%, #0A0918 50%, #050510 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px',
    },
    floatingShape: (index) => ({
      position: 'absolute',
      width: `${100 + index * 40}px`,
      height: `${100 + index * 40}px`,
      borderRadius: index % 2 === 0 ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '50%',
      background: `linear-gradient(135deg, rgba(108,99,255,${0.1 + index * 0.03}) 0%, rgba(75,68,204,${0.05 + index * 0.02}) 100%)`,
      animation: `float${index % 2 === 0 ? '' : '2'} ${6 + index}s ease-in-out infinite`,
      animationDelay: `${index * 0.5}s`,
      top: `${10 + (index * 15) % 70}%`,
      left: `${5 + (index * 20) % 80}%`,
      filter: 'blur(1px)',
    }),
    card: {
      width: '100%',
      maxWidth: '480px',
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.1)',
      padding: '40px',
      boxShadow: '0 25px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      zIndex: 10,
    },
    logo: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' },
    logoIcon: {
      width: '44px', height: '44px', borderRadius: '12px',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 24px rgba(108,99,255,0.4)',
    },
    logoText: { fontSize: '28px', fontWeight: '700', color: '#fff', letterSpacing: '-0.5px' },
    subtitle: { textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '32px' },
    roleTabs: {
      display: 'flex', gap: '8px', marginBottom: '28px', padding: '4px',
      background: 'rgba(255,255,255,0.05)', borderRadius: '12px',
    },
    roleTab: (isActive, color) => ({
      flex: 1, padding: '10px 8px', borderRadius: '10px', border: 'none',
      background: isActive ? color.bg : 'transparent',
      color: isActive ? color.text : 'rgba(255,255,255,0.6)',
      fontSize: '12px', fontWeight: '600', cursor: 'pointer',
      transition: 'all 0.2s ease', textTransform: 'uppercase', letterSpacing: '0.5px',
    }),
    inputGroup: { marginBottom: '20px', position: 'relative' },
    input: {
      width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px',
      border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
      color: '#fff', fontSize: '15px', outline: 'none', transition: 'all 0.2s ease',
    },
    inputIcon: { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' },
    submitBtn: {
      width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      boxShadow: '0 8px 24px rgba(108,99,255,0.3)', transition: 'all 0.2s ease',
    },
    error: {
      background: 'rgba(239,68,68,0.1)', color: '#EF4444', padding: '12px 16px',
      borderRadius: '10px', fontSize: '13px', marginBottom: '16px',
      display: 'flex', alignItems: 'center', gap: '8px',
    },
    demoSection: { marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' },
    demoToggle: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      color: 'rgba(255,255,255,0.5)', fontSize: '13px', cursor: 'pointer',
      background: 'none', border: 'none', width: '100%',
    },
    demoTable: { marginTop: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden' },
    demoRow: {
      display: 'flex', alignItems: 'center', padding: '12px 16px',
      borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.2s ease',
    },
    demoRole: { width: '80px', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.7)' },
    demoEmail: { flex: 1, fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono, monospace' },
    demoPassword: { width: '90px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono, monospace' },
    featureCards: { display: 'flex', gap: '16px', marginTop: '32px', zIndex: 10 },
    featureCard: {
      flex: 1, padding: '20px', background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)', borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center',
    },
    featureIcon: {
      width: '40px', height: '40px', borderRadius: '10px',
      background: 'rgba(108,99,255,0.2)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#6C63FF',
    },
    featureTitle: { color: '#fff', fontSize: '13px', fontWeight: '600', marginBottom: '4px' },
    featureDesc: { color: 'rgba(255,255,255,0.4)', fontSize: '11px' },
  }

  return (
    <div style={pageStyles.container}>
      {[...Array(6)].map((_, i) => <div key={i} style={pageStyles.floatingShape(i)} />)}
      <div ref={cardRef} style={pageStyles.card}>
        <div style={pageStyles.logo}>
          <div style={pageStyles.logoIcon}><Calendar size={24} color="#fff" /></div>
          <span style={pageStyles.logoText}>LeaveSync</span>
        </div>
        <p style={pageStyles.subtitle}>Institution Portal</p>
        <div style={pageStyles.roleTabs}>
          {roles.map(role => (
            <button key={role.key} style={pageStyles.roleTab(selectedRole === role.key, role.color)} onClick={() => setSelectedRole(role.key)}>
              {role.label}
            </button>
          ))}
        </div>
        {error && <div style={pageStyles.error}><AlertCircle size={16} />{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={pageStyles.inputGroup}>
            <Mail style={pageStyles.inputIcon} size={18} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={pageStyles.input} placeholder="Email address" required />
          </div>
          <div style={pageStyles.inputGroup}>
            <Lock style={pageStyles.inputIcon} size={18} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={pageStyles.input} placeholder="Password" required />
          </div>
          <button type="submit" style={pageStyles.submitBtn} disabled={isLoading}>
            {isLoading ? <Loader2 size={20} className="spin" /> : <>{'Sign In'} <ArrowRight size={18} /></>}
          </button>
        </form>
        <div style={pageStyles.demoSection}>
          <button style={pageStyles.demoToggle} onClick={() => setShowDemo(!showDemo)}>
            <Info size={14} /> Demo Credentials
            <ChevronDown size={14} style={{ transform: showDemo ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {showDemo && (
            <div style={pageStyles.demoTable}>
              {demoCredentials.map((cred, i) => (
                <div key={i} style={pageStyles.demoRow} onClick={() => fillDemo(cred)}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(108,99,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <span style={pageStyles.demoRole}>{cred.role}</span>
                  <span style={pageStyles.demoEmail}>{cred.email}</span>
                  <span style={pageStyles.demoPassword}>{cred.password}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={pageStyles.featureCards}>
        <div style={pageStyles.featureCard}>
          <div style={pageStyles.featureIcon}><CheckCircle size={20} /></div>
          <div style={pageStyles.featureTitle}>Easy Apply</div>
          <div style={pageStyles.featureDesc}>Apply for leave in seconds</div>
        </div>
        <div style={pageStyles.featureCard}>
          <div style={pageStyles.featureIcon}><TrendingUp size={20} /></div>
          <div style={pageStyles.featureTitle}>Track Status</div>
          <div style={pageStyles.featureDesc}>Real-time updates</div>
        </div>
        <div style={pageStyles.featureCard}>
          <div style={pageStyles.featureIcon}><BarChart3 size={20} /></div>
          <div style={pageStyles.featureTitle}>Analytics</div>
          <div style={pageStyles.featureDesc}>Detailed reports</div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// SIDEBAR COMPONENT
// ============================================
const Sidebar = ({ currentPage, onNavigate, onLogout }) => {
  const { user } = useContext(AuthContext)
  const data = useContext(AppDataContext)
  const roleColor = getRoleColor(user?.role)

  const navItems = useMemo(() => {
    const items = [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['principal', 'hod', 'faculty', 'student'] },
      { key: 'members', label: 'Manage Members', icon: Users, roles: ['principal', 'hod', 'faculty'] },
      { key: 'apply', label: 'Apply Leave', icon: CalendarPlus, roles: ['principal', 'hod', 'faculty', 'student'] },
      { key: 'requests', label: 'Leave Requests', icon: Inbox, roles: ['principal', 'hod', 'faculty'] },
      { key: 'history', label: 'Leave History', icon: Clock, roles: ['principal', 'hod', 'faculty', 'student'] },
      { key: 'balance', label: 'Leave Balance', icon: PieChart, roles: ['principal', 'hod', 'faculty', 'student'] },
      { key: 'reports', label: 'Reports', icon: BarChart3, roles: ['principal', 'hod'] },
    ]
    return items.filter(item => item.roles.includes(user?.role))
  }, [user?.role])

  const pendingCount = useMemo(() => {
    if (!user) return 0
    const visibleLeaves = getVisibleLeaves(user, data.leaves, data.users)
    return visibleLeaves.filter(l => l.status === 'pending').length
  }, [user, data.leaves, data.users])

  const getLeaveBalanceSummary = () => {
    if (!user?.leaveBalance) return { total: 0, used: 0 }
    let total = 0, used = 0
    Object.values(user.leaveBalance).forEach(bal => {
      if (bal.total) total += bal.total
      if (bal.used) used += bal.used
    })
    return { total, used, remaining: total - used }
  }
  const balance = getLeaveBalanceSummary()

  const styles = {
    sidebar: {
      width: '260px', height: '100vh', background: THEME.sidebar,
      display: 'flex', flexDirection: 'column', position: 'fixed',
      left: 0, top: 0, zIndex: 100, overflow: 'hidden',
    },
    orb1: {
      position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
      top: '-50px', right: '-50px', filter: 'blur(40px)', pointerEvents: 'none',
    },
    orb2: {
      position: 'absolute', width: '150px', height: '150px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
      bottom: '100px', left: '-30px', filter: 'blur(30px)', pointerEvents: 'none',
    },
    brand: { padding: '24px 20px', borderBottom: `1px solid ${THEME.sidebarBorder}`, position: 'relative' },
    brandContent: { display: 'flex', alignItems: 'center', gap: '12px' },
    brandIcon: {
      width: '36px', height: '36px', borderRadius: '10px',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    brandText: { color: '#fff', fontSize: '18px', fontWeight: '700' },
    brandSub: { color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '2px' },
    yearBadge: {
      position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
      padding: '4px 10px', background: 'rgba(108,99,255,0.2)', borderRadius: '20px',
      color: '#6C63FF', fontSize: '10px', fontWeight: '600',
    },
    userCard: { padding: '20px', borderBottom: `1px solid ${THEME.sidebarBorder}` },
    userContent: { display: 'flex', alignItems: 'center', gap: '12px' },
    userAvatar: {
      width: '44px', height: '44px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: '14px', fontWeight: '600',
    },
    userInfo: { flex: 1, minWidth: 0 },
    userName: { color: '#fff', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    userRole: {
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', background: roleColor.bg.replace('#', 'rgba(').replace(')', ',0.2)'),
      borderRadius: '20px', fontSize: '10px', fontWeight: '600', color: roleColor.text,
      textTransform: 'uppercase', marginTop: '4px',
    },
    nav: { flex: 1, padding: '16px 12px', overflowY: 'auto' },
    navItem: (isActive) => ({
      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
      borderRadius: '12px', cursor: 'pointer', marginBottom: '4px', position: 'relative',
      transition: 'all 0.2s ease',
      background: isActive ? THEME.sidebarActive : 'transparent',
      color: isActive ? THEME.textSidebarActive : THEME.textSidebar,
    }),
    navIcon: { width: '20px', height: '20px' },
    navLabel: { fontSize: '14px', fontWeight: '500' },
    activeIndicator: {
      position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
      width: '3px', height: '20px', background: THEME.primary, borderRadius: '0 3px 3px 0',
    },
    badge: {
      marginLeft: 'auto', padding: '2px 8px', background: THEME.warning,
      borderRadius: '10px', fontSize: '11px', fontWeight: '600', color: '#fff',
    },
    balanceCard: {
      margin: '16px 12px', padding: '16px', background: 'rgba(255,255,255,0.03)',
      borderRadius: '14px', border: `1px solid ${THEME.sidebarBorder}`,
    },
    balanceTitle: { color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' },
    balanceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
    balanceLabel: { color: 'rgba(255,255,255,0.6)', fontSize: '12px' },
    balanceValue: { color: '#fff', fontSize: '14px', fontWeight: '600' },
    progressBar: { height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '8px' },
    progressFill: { height: '100%', width: `${(balance.remaining / balance.total) * 100}%`, background: 'linear-gradient(90deg, #6C63FF 0%, #4B44CC 100%)', borderRadius: '2px', transition: 'width 0.3s ease' },
    logoutBtn: {
      padding: '16px 20px', borderTop: `1px solid ${THEME.sidebarBorder}`,
      display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)',
      cursor: 'pointer', fontSize: '14px', fontWeight: '500', transition: 'all 0.2s ease',
      background: 'transparent', border: 'none', width: '100%',
    },
  }

  return (
    <aside style={styles.sidebar}>
      <div style={styles.orb1} /><div style={styles.orb2} />
      <div style={styles.brand}>
        <div style={styles.brandContent}>
          <div style={styles.brandIcon}><Calendar size={18} color="#fff" /></div>
          <div><div style={styles.brandText}>LeaveSync</div><div style={styles.brandSub}>Institution Portal</div></div>
        </div>
        <span style={styles.yearBadge}>{data.academicYear}</span>
      </div>
      <div style={styles.userCard}>
        <div style={styles.userContent}>
          <div style={styles.userAvatar}>{user?.avatar}</div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{user?.name}</div>
            <span style={styles.userRole}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: roleColor.dot }} />
              {user?.role}
            </span>
          </div>
        </div>
      </div>
      <nav style={styles.nav}>
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = currentPage === item.key
          return (
            <div key={item.key} style={styles.navItem(isActive)} onClick={() => onNavigate(item.key)}
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = THEME.sidebarHover; e.currentTarget.style.color = THEME.textSidebarActive }}}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = THEME.textSidebar }}}>
              {isActive && <div style={styles.activeIndicator} />}
              <Icon style={styles.navIcon} />
              <span style={styles.navLabel}>{item.label}</span>
              {item.key === 'requests' && pendingCount > 0 && <span style={styles.badge}>{pendingCount}</span>}
            </div>
          )
        })}
      </nav>
      <div style={styles.balanceCard}>
        <div style={styles.balanceTitle}>Leave Balance</div>
        <div style={styles.balanceRow}>
          <span style={styles.balanceLabel}>Remaining</span>
          <span style={styles.balanceValue}>{balance.remaining} days</span>
        </div>
        <div style={styles.progressBar}><div style={styles.progressFill} /></div>
      </div>
      <button style={styles.logoutBtn} onClick={onLogout}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent' }}>
        <LogOut size={18} /><span>Logout</span>
      </button>
    </aside>
  )
}

// ============================================
// TOPBAR COMPONENT
// ============================================
const TopBar = ({ pageTitle }) => {
  const { user } = useContext(AuthContext)
  const [showProfile, setShowProfile] = useState(false)

  const styles = {
    topbar: {
      height: '70px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(108,99,255,0.1)', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', padding: '0 28px',
      position: 'sticky', top: 0, zIndex: 50,
    },
    breadcrumb: { display: 'flex', alignItems: 'center', gap: '8px' },
    breadcrumbItem: { fontSize: '14px', color: THEME.textSecondary },
    breadcrumbActive: { fontSize: '14px', color: THEME.textPrimary, fontWeight: '600' },
    actions: { display: 'flex', alignItems: 'center', gap: '16px' },
    searchBox: {
      display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px',
      background: 'rgba(255,255,255,0.9)', borderRadius: '12px',
      border: '1px solid rgba(108,99,255,0.1)', width: '280px',
    },
    searchInput: { border: 'none', background: 'none', outline: 'none', fontSize: '14px', color: THEME.textPrimary, width: '100%' },
    iconBtn: {
      width: '42px', height: '42px', borderRadius: '12px',
      border: '1px solid rgba(108,99,255,0.1)', background: 'rgba(255,255,255,0.9)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: THEME.textSecondary, transition: 'all 0.2s ease',
    },
    avatarBtn: {
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '6px 12px 6px 6px', background: 'rgba(255,255,255,0.9)',
      borderRadius: '30px', border: '1px solid rgba(108,99,255,0.1)', cursor: 'pointer',
    },
    avatar: {
      width: '32px', height: '32px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: '12px', fontWeight: '600',
    },
    dropdown: {
      position: 'absolute', top: '60px', right: '20px', width: '200px',
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
      borderRadius: '16px', border: '1px solid rgba(108,99,255,0.1)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)', zIndex: 100, overflow: 'hidden',
    },
    dropdownItem: { padding: '14px 20px', borderBottom: '1px solid rgba(108,99,255,0.05)' },
  }

  return (
    <header style={styles.topbar}>
      <div style={styles.breadcrumb}>
        <Home size={16} color={THEME.textMuted} />
        <ChevronRight size={14} color={THEME.textMuted} />
        <span style={styles.breadcrumbItem}>Dashboard</span>
        <ChevronRight size={14} color={THEME.textMuted} />
        <span style={styles.breadcrumbActive}>{pageTitle}</span>
      </div>
      <div style={styles.actions}>
        <div style={styles.searchBox}>
          <Search size={18} color={THEME.textMuted} />
          <input type="text" placeholder="Search..." style={styles.searchInput} />
        </div>
        <button style={styles.iconBtn}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.3)'; e.currentTarget.style.color = THEME.primary }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.1)'; e.currentTarget.style.color = THEME.textSecondary }}>
          <Bell size={18} />
        </button>
        <div style={{ position: 'relative' }}>
          <button style={styles.avatarBtn} onClick={() => setShowProfile(!showProfile)}>
            <div style={styles.avatar}>{user?.avatar}</div>
            <ChevronDown size={16} color={THEME.textSecondary} />
          </button>
          {showProfile && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownItem}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: THEME.textPrimary }}>{user?.name}</div>
                <div style={{ fontSize: '12px', color: THEME.textMuted, marginTop: '2px' }}>{user?.email}</div>
              </div>
              <div style={styles.dropdownItem}>
                <div style={{ fontSize: '12px', color: THEME.textSecondary }}>Department</div>
                <div style={{ fontSize: '13px', color: THEME.textPrimary, marginTop: '2px' }}>{user?.department}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// ============================================
// APP LAYOUT
// ============================================
const AppLayout = ({ children, currentPage, onNavigate, onLogout, pageTitle }) => {
  const styles = {
    layout: { display: 'flex', minHeight: '100vh' },
    main: { flex: 1, marginLeft: '260px', background: THEME.pageBg, minHeight: '100vh' },
    content: { padding: '28px', minHeight: 'calc(100vh - 70px)' },
  }

  return (
    <div style={styles.layout}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
      <main style={styles.main}>
        <TopBar pageTitle={pageTitle} />
        <div style={styles.content} className="page-enter">{children}</div>
      </main>
    </div>
  )
}

// ============================================
// STAT CARD COMPONENT
// ============================================
const StatCard = ({ title, value, icon: Icon, color }) => {
  const styles = {
    card: {
      background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px',
      padding: '24px', border: `1px solid ${THEME.cardBorder}`,
      boxShadow: '0 8px 32px rgba(108,99,255,0.08), 0 1px 0 rgba(255,255,255,0.8) inset',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer',
    },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
    iconBox: {
      width: '48px', height: '48px', borderRadius: '14px', background: color.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: color.dot,
    },
    value: { fontSize: '32px', fontWeight: '700', color: THEME.textPrimary, marginBottom: '4px' },
    title: { fontSize: '14px', color: THEME.textSecondary },
  }

  return (
    <div style={styles.card}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(108,99,255,0.15), 0 1px 0 rgba(255,255,255,0.8) inset' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(108,99,255,0.08), 0 1px 0 rgba(255,255,255,0.8) inset' }}>
      <div style={styles.header}>
        <div style={styles.iconBox}><Icon size={24} /></div>
      </div>
      <div style={styles.value}>{value}</div>
      <div style={styles.title}>{title}</div>
    </div>
  )
}

// ============================================
// PROGRESS RING COMPONENT
// ============================================
const ProgressRing = ({ radius, progress, color, value, label, size = 120 }) => {
  const circumference = 2 * Math.PI * radius
  const strokeDash = (progress / 100) * circumference

  const styles = {
    container: { position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    svg: { position: 'absolute', transform: 'rotate(-90deg)' },
    circle: { fill: 'none', strokeWidth: '8' },
    track: { stroke: 'rgba(0,0,0,0.05)' },
    progress: { stroke: color, strokeLinecap: 'round', strokeDasharray: `${strokeDash} ${circumference}`, transition: 'stroke-dasharray 1s ease' },
    content: { textAlign: 'center' },
    value: { fontSize: '24px', fontWeight: '700', color: THEME.textPrimary },
    label: { fontSize: '11px', color: THEME.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' },
  }

  return (
    <div style={styles.container}>
      <svg width={size} height={size} style={styles.svg}>
        <circle cx={size/2} cy={size/2} r={radius} style={{...styles.circle, ...styles.track}} />
        <circle cx={size/2} cy={size/2} r={radius} style={{...styles.circle, ...styles.progress}} />
      </svg>
      <div style={styles.content}>
        <div style={styles.value}>{value}</div>
        <div style={styles.label}>{label}</div>
      </div>
    </div>
  )
}

// ============================================
// BADGE COMPONENT
// ============================================
const Badge = ({ text, type }) => {
  const getBadgeStyle = () => {
    switch(type) {
      case 'CL': return { bg: '#EEF2FF', text: '#6C63FF', border: '#C4B5FD' }
      case 'ML': return { bg: '#F0FDF4', text: '#22C55E', border: '#BBF7D0' }
      case 'EL': return { bg: '#EFF6FF', text: '#3B82F6', border: '#BFDBFE' }
      case 'OD': return { bg: '#FFF7ED', text: '#F97316', border: '#FED7AA' }
      case 'approved': return { bg: THEME.successBg, text: THEME.success, border: '#10B981' }
      case 'rejected': return { bg: THEME.dangerBg, text: THEME.danger, border: '#EF4444' }
      case 'pending': return { bg: THEME.warningBg, text: THEME.warning, border: '#F59E0B' }
      default: return { bg: THEME.infoBg, text: THEME.info, border: '#6C63FF' }
    }
  }
  const style = getBadgeStyle()
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '4px 12px',
      background: style.bg, color: style.text, borderRadius: '20px',
      fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px',
      border: `1px solid ${style.border}`,
    }}>{text}</span>
  )
}

// ============================================
// PRINCIPAL DASHBOARD
// ============================================
const PrincipalDashboard = ({ onNavigate }) => {
  const data = useContext(AppDataContext)
  const { showToast } = useContext(ToastContext)
  const { user } = useContext(AuthContext)

  const stats = useMemo(() => {
    const hods = data.users.filter(u => u.role === 'hod' && u.isActive).length
    const faculty = data.users.filter(u => u.role === 'faculty' && u.isActive).length
    const students = data.users.filter(u => u.role === 'student' && u.isActive).length
    const pending = data.leaves.filter(l => l.status === 'pending').length
    return { hods, faculty, students, pending }
  }, [data])

  const recentLeaves = useMemo(() => {
    return data.leaves.filter(l => l.status === 'pending').slice(0, 5).map(l => ({ ...l, applicant: data.getUserById(l.applicantId) || l.applicantId }))
  }, [data])

  const handleApprove = async (leaveId) => {
    await data.updateLeaveStatus(leaveId, 'approved', user.id, 'Approved by Principal')
    showToast('Leave approved successfully', 'success')
  }

  const handleReject = async (leaveId) => {
    await data.updateLeaveStatus(leaveId, 'rejected', user.id, 'Rejected by Principal')
    showToast('Leave rejected', 'info')
  }

  const deptStats = useMemo(() => {
    const depts = {}
    data.users.forEach(u => { if (!depts[u.department]) depts[u.department] = { total: 0, onLeave: 0 }; depts[u.department].total++ })
    data.leaves.filter(l => l.status === 'approved').forEach(l => {
      const u = data.getUserById(l.applicantId)
      if (u && depts[u.department]) depts[u.department].onLeave++
    })
    return Object.entries(depts).map(([name, stats]) => ({ name, rate: Math.round((stats.onLeave / stats.total) * 100) || 0 }))
  }, [data])

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    greeting: { marginBottom: '28px' },
    greetingTitle: { fontSize: '28px', fontWeight: '700', color: THEME.textPrimary, marginBottom: '4px' },
    greetingDate: { fontSize: '14px', color: THEME.textSecondary },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' },
    section: {
      background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px',
      padding: '24px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)',
    },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    sectionTitle: { fontSize: '16px', fontWeight: '600', color: THEME.textPrimary },
    viewAll: { fontSize: '13px', color: THEME.primary, cursor: 'pointer', fontWeight: '500' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
      textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: '600',
      color: THEME.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px',
      borderBottom: '1px solid rgba(108,99,255,0.1)',
    },
    td: { padding: '14px 16px', fontSize: '14px', color: THEME.textPrimary, borderBottom: '1px solid rgba(108,99,255,0.05)' },
    applicantCell: { display: 'flex', alignItems: 'center', gap: '12px' },
    applicantAvatar: {
      width: '36px', height: '36px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '600',
    },
    actionBtns: { display: 'flex', gap: '8px' },
    actionBtn: (type) => ({
      padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: '4px',
      background: type === 'approve' ? THEME.successBg : THEME.dangerBg,
      color: type === 'approve' ? THEME.success : THEME.danger,
    }),
    deptBar: { marginBottom: '16px' },
    deptHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
    deptName: { fontSize: '13px', color: THEME.textSecondary },
    deptValue: { fontSize: '13px', fontWeight: '600', color: THEME.textPrimary },
    barTrack: { height: '8px', background: 'rgba(108,99,255,0.1)', borderRadius: '4px', overflow: 'hidden' },
    barFill: (width) => ({ height: '100%', width: `${width}%`, background: 'linear-gradient(90deg, #6C63FF 0%, #4B44CC 100%)', borderRadius: '4px', transition: 'width 0.5s ease' }),
    quickActions: { display: 'flex', gap: '12px', marginTop: '20px' },
    quickBtn: {
      padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(108,99,255,0.2)',
      background: 'rgba(108,99,255,0.05)', color: THEME.primary, fontSize: '13px', fontWeight: '600',
      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.greeting}>
        <h1 style={styles.greetingTitle}>Good morning, Dr. {user?.name.split(' ').pop()}</h1>
        <p style={styles.greetingDate}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div style={styles.statsGrid}>
        <StatCard title="Total HODs" value={stats.hods} icon={Users} color={THEME.principal} />
        <StatCard title="Total Faculty" value={stats.faculty} icon={Briefcase} color={THEME.hod} />
        <StatCard title="Total Students" value={stats.students} icon={GraduationCap} color={THEME.faculty} />
        <StatCard title="Pending Approvals" value={stats.pending} icon={Clock} color={{ bg: stats.pending > 0 ? THEME.warningBg : THEME.successBg, dot: stats.pending > 0 ? THEME.warning : THEME.success }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Recent Leave Requests</h3>
            <span style={styles.viewAll} onClick={() => onNavigate('requests')}>View All</span>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Applicant</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Dates</th>
                <th style={styles.th}>Days</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentLeaves.map(leave => (
                <tr key={leave.id}>
                  <td style={styles.td}>
                    <div style={styles.applicantCell}>
                      <div style={styles.applicantAvatar}>{leave.applicant?.avatar}</div>
                      <span>{leave.applicant?.name}</span>
                    </div>
                  </td>
                  <td style={styles.td}><Badge text={leave.leaveType} type={leave.leaveType} /></td>
                  <td style={styles.td}>{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</td>
                  <td style={styles.td}>{leave.totalDays} days</td>
                  <td style={styles.td}>
                    <div style={styles.actionBtns}>
                      <button style={styles.actionBtn('approve')} onClick={() => handleApprove(leave.id)}><Check size={14} /> Approve</button>
                      <button style={styles.actionBtn('reject')} onClick={() => handleReject(leave.id)}><X size={14} /> Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
              {recentLeaves.length === 0 && (
                <tr><td colSpan="5" style={{...styles.td, textAlign: 'center', color: THEME.textMuted, padding: '40px' }}>No pending requests</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={styles.section}>
          <div style={styles.sectionHeader}><h3 style={styles.sectionTitle}>Department Leave Rate</h3></div>
          {deptStats.map(dept => (
            <div key={dept.name} style={styles.deptBar}>
              <div style={styles.deptHeader}>
                <span style={styles.deptName}>{dept.name}</span>
                <span style={styles.deptValue}>{dept.rate}%</span>
              </div>
              <div style={styles.barTrack}><div style={styles.barFill(dept.rate)} /></div>
            </div>
          ))}
          <div style={styles.quickActions}>
            <button style={styles.quickBtn} onClick={() => onNavigate('members')}><Plus size={16} /> Add HOD</button>
            <button style={styles.quickBtn} onClick={() => onNavigate('requests')}><Eye size={16} /> All Leaves</button>
            <button style={styles.quickBtn} onClick={() => onNavigate('reports')}><BarChart3 size={16} /> Report</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// HOD DASHBOARD
// ============================================
const HODDashboard = ({ onNavigate }) => {
  const { user } = useContext(AuthContext)
  const data = useContext(AppDataContext)

  const stats = useMemo(() => {
    const myFaculty = data.users.filter(u => u.role === 'faculty' && u.department === user?.department && u.isActive).length
    const myStudents = data.users.filter(u => u.role === 'student' && u.department === user?.department && u.isActive).length
    const deptLeaves = data.leaves.filter(l => {
      const u = data.getUserById(l.applicantId)
      return u?.department === user?.department && l.status === 'pending'
    }).length
    const deptRate = Math.round((data.leaves.filter(l => {
      const u = data.getUserById(l.applicantId)
      return u?.department === user?.department && l.status === 'approved'
    }).length / (myFaculty + myStudents)) * 100) || 0
    return { myFaculty, myStudents, deptLeaves, deptRate }
  }, [data, user])

  const facultyOnLeave = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return data.leaves.filter(l => {
      const u = data.getUserById(l.applicantId)
      return l.status === 'approved' && u?.role === 'faculty' && u?.department === user?.department && l.fromDate <= today && l.toDate >= today
    }).map(l => data.getUserById(l.applicantId))
  }, [data, user])

  const pendingLeaves = useMemo(() => {
    return data.leaves.filter(l => {
      const u = data.getUserById(l.applicantId)
      return l.status === 'pending' && u?.department === user?.department
    }).slice(0, 5).map(l => ({ ...l, applicant: data.getUserById(l.applicantId) }))
  }, [data, user])

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    greeting: { marginBottom: '28px' },
    greetingTitle: { fontSize: '28px', fontWeight: '700', color: THEME.textPrimary, marginBottom: '4px' },
    greetingSubtitle: { fontSize: '14px', color: THEME.textSecondary },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    section: {
      background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px',
      padding: '24px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)',
    },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    sectionTitle: { fontSize: '16px', fontWeight: '600', color: THEME.textPrimary },
    facultyList: { display: 'flex', flexDirection: 'column', gap: '12px' },
    facultyItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(108,99,255,0.03)', borderRadius: '12px' },
    facultyAvatar: {
      width: '40px', height: '40px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '600',
    },
    facultyInfo: { flex: 1 },
    facultyName: { fontSize: '14px', fontWeight: '600', color: THEME.textPrimary },
    facultyRole: { fontSize: '12px', color: THEME.textMuted },
    emptyState: { textAlign: 'center', padding: '40px', color: THEME.textMuted, fontSize: '14px' },
  }

  return (
    <div style={styles.container}>
      <div style={styles.greeting}>
        <h1 style={styles.greetingTitle}>Welcome, Dr. {user?.name.split(' ').slice(1).join(' ')}</h1>
        <p style={styles.greetingSubtitle}>Head of Department - {user?.department}</p>
      </div>
      <div style={styles.statsGrid}>
        <StatCard title="My Faculty" value={stats.myFaculty} icon={Users} color={THEME.hod} />
        <StatCard title="My Students" value={stats.myStudents} icon={GraduationCap} color={THEME.faculty} />
        <StatCard title="Dept Pending" value={stats.deptLeaves} icon={Clock} color={THEME.warning} />
        <StatCard title="Dept Leave Rate" value={`${stats.deptRate}%`} icon={TrendingUp} color={THEME.principal} />
      </div>
      <div style={styles.twoCol}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}><h3 style={styles.sectionTitle}>Faculty on Leave Today</h3></div>
          <div style={styles.facultyList}>
            {facultyOnLeave.length > 0 ? facultyOnLeave.map((f, i) => (
              <div key={i} style={styles.facultyItem}>
                <div style={styles.facultyAvatar}>{f?.avatar}</div>
                <div style={styles.facultyInfo}>
                  <div style={styles.facultyName}>{f?.name}</div>
                  <div style={styles.facultyRole}>{f?.designation}</div>
                </div>
                <Badge text="On Leave" type="ML" />
              </div>
            )) : <div style={styles.emptyState}>No faculty on leave today</div>}
          </div>
        </div>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Pending Approvals</h3>
            <span style={{ fontSize: '13px', color: THEME.primary, cursor: 'pointer' }} onClick={() => onNavigate('requests')}>View All</span>
          </div>
          <div style={styles.facultyList}>
            {pendingLeaves.length > 0 ? pendingLeaves.map((leave, i) => (
              <div key={i} style={styles.facultyItem}>
                <div style={styles.facultyAvatar}>{leave.applicant?.avatar}</div>
                <div style={styles.facultyInfo}>
                  <div style={styles.facultyName}>{leave.applicant?.name}</div>
                  <div style={styles.facultyRole}>{leave.leaveType} • {leave.totalDays} days</div>
                </div>
                <Badge text="Pending" type="pending" />
              </div>
            )) : <div style={styles.emptyState}>No pending approvals</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// FACULTY DASHBOARD
// ============================================
const FacultyDashboard = ({ onNavigate }) => {
  const { user } = useContext(AuthContext)
  const data = useContext(AppDataContext)

  const stats = useMemo(() => {
    const myStudents = data.users.filter(u => u.createdBy === user?.id && u.isActive).length
    const pendingStudentLeaves = data.leaves.filter(l => {
      const u = data.getUserById(l.applicantId)
      return u?.createdBy === user?.id && l.status === 'pending'
    }).length
    const myBalance = user?.leaveBalance ? Object.values(user.leaveBalance).reduce((acc, b) => acc + (b.remaining || 0), 0) : 0
    const attendanceAvg = Math.round(data.users.filter(u => u.createdBy === user?.id).reduce((acc, u) => acc + (u.attendancePercent || 0), 0) / (data.users.filter(u => u.createdBy === user?.id).length || 1))
    return { myStudents, pendingStudentLeaves, myBalance, attendanceAvg }
  }, [data, user])

  const studentsOnLeave = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return data.leaves.filter(l => {
      const u = data.getUserById(l.applicantId)
      return l.status === 'approved' && u?.createdBy === user?.id && l.fromDate <= today && l.toDate >= today
    }).map(l => ({ ...data.getUserById(l.applicantId), leave: l }))
  }, [data, user])

  const myUpcomingLeaves = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return data.leaves.filter(l => l.applicantId === user?.id && l.fromDate > today && l.status === 'approved').slice(0, 3)
  }, [data, user])

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    greeting: { marginBottom: '28px' },
    greetingTitle: { fontSize: '28px', fontWeight: '700', color: THEME.textPrimary, marginBottom: '4px' },
    greetingSubtitle: { fontSize: '14px', color: THEME.textSecondary },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' },
    twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    section: {
      background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px',
      padding: '24px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)',
    },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    sectionTitle: { fontSize: '16px', fontWeight: '600', color: THEME.textPrimary },
    studentList: { display: 'flex', flexDirection: 'column', gap: '12px' },
    studentItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(108,99,255,0.03)', borderRadius: '12px' },
    studentAvatar: {
      width: '40px', height: '40px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '600',
    },
    studentInfo: { flex: 1 },
    studentName: { fontSize: '14px', fontWeight: '600', color: THEME.textPrimary },
    studentDetail: { fontSize: '12px', color: THEME.textMuted },
    emptyState: { textAlign: 'center', padding: '40px', color: THEME.textMuted, fontSize: '14px' },
    leaveItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(108,99,255,0.03)', borderRadius: '12px' },
    leaveDates: { fontSize: '13px', color: THEME.textPrimary, fontWeight: '500' },
    leaveType: { fontSize: '12px', color: THEME.textMuted },
  }

  return (
    <div style={styles.container}>
      <div style={styles.greeting}>
        <h1 style={styles.greetingTitle}>Hello, Prof. {user?.name.split(' ').pop()}</h1>
        <p style={styles.greetingSubtitle}>{user?.designation} - {user?.department}</p>
      </div>
      <div style={styles.statsGrid}>
        <StatCard title="My Students" value={stats.myStudents} icon={GraduationCap} color={THEME.faculty} />
        <StatCard title="Pending Leaves" value={stats.pendingStudentLeaves} icon={Clock} color={THEME.warning} />
        <StatCard title="My Balance" value={stats.myBalance} icon={PieChart} color={THEME.principal} />
        <StatCard title="Avg Attendance" value={`${stats.attendanceAvg}%`} icon={TrendingUp} color={THEME.hod} />
      </div>
      <div style={styles.twoCol}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}><h3 style={styles.sectionTitle}>Students on Leave Today</h3></div>
          <div style={styles.studentList}>
            {studentsOnLeave.length > 0 ? studentsOnLeave.map((s, i) => (
              <div key={i} style={styles.studentItem}>
                <div style={styles.studentAvatar}>{s?.avatar}</div>
                <div style={styles.studentInfo}>
                  <div style={styles.studentName}>{s?.name}</div>
                  <div style={styles.studentDetail}>{s?.rollNumber}</div>
                </div>
                <Badge text={s?.leave?.leaveType} type={s?.leave?.leaveType} />
              </div>
            )) : <div style={styles.emptyState}>No students on leave today</div>}
          </div>
        </div>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>My Upcoming Leaves</h3>
            <span style={{ fontSize: '13px', color: THEME.primary, cursor: 'pointer' }} onClick={() => onNavigate('history')}>View All</span>
          </div>
          <div style={styles.studentList}>
            {myUpcomingLeaves.length > 0 ? myUpcomingLeaves.map((leave, i) => (
              <div key={i} style={styles.leaveItem}>
                <div>
                  <div style={styles.leaveDates}>{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</div>
                  <div style={styles.leaveType}>{leave.totalDays} days • {leave.reason.slice(0, 30)}...</div>
                </div>
                <Badge text={leave.leaveType} type={leave.leaveType} />
              </div>
            )) : <div style={styles.emptyState}>No upcoming leaves</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// STUDENT DASHBOARD
// ============================================
const StudentDashboard = ({ onNavigate }) => {
  const { user } = useContext(AuthContext)
  const data = useContext(AppDataContext)

  const balanceData = useMemo(() => {
    if (!user?.leaveBalance) return []
    return Object.entries(user.leaveBalance).map(([type, bal]) => ({
      type, ...bal,
      progress: bal.total ? ((bal.total - (bal.used || 0)) / bal.total) * 100 : 0
    }))
  }, [user])

  const recentApplications = useMemo(() => {
    return data.leaves.filter(l => l.applicantId === user?.id).sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn)).slice(0, 5)
  }, [data, user])

  const attendanceColor = user?.attendancePercent >= 75 ? THEME.success : user?.attendancePercent >= 60 ? THEME.warning : THEME.danger

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    greeting: { marginBottom: '28px' },
    greetingTitle: { fontSize: '28px', fontWeight: '700', color: THEME.textPrimary, marginBottom: '4px' },
    greetingSubtitle: { fontSize: '14px', color: THEME.textSecondary },
    balanceSection: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' },
    balanceCard: {
      background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px',
      padding: '24px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
    },
    attendanceValue: { fontSize: '48px', fontWeight: '700', color: attendanceColor, marginBottom: '8px' },
    attendanceLabel: { fontSize: '14px', color: THEME.textSecondary },
    balanceType: { fontSize: '13px', fontWeight: '600', color: THEME.textSecondary, marginTop: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' },
    balanceNumbers: { fontSize: '12px', color: THEME.textMuted, marginTop: '4px' },
    twoCol: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' },
    section: {
      background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px',
      padding: '24px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)',
    },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    sectionTitle: { fontSize: '16px', fontWeight: '600', color: THEME.textPrimary },
    ctaBtn: {
      padding: '14px 28px', borderRadius: '14px', border: 'none',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(108,99,255,0.3)',
    },
    applicationList: { display: 'flex', flexDirection: 'column', gap: '12px' },
    applicationItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'rgba(108,99,255,0.03)', borderRadius: '12px' },
    appInfo: { flex: 1 },
    appDates: { fontSize: '14px', fontWeight: '500', color: THEME.textPrimary },
    appMeta: { fontSize: '12px', color: THEME.textMuted, marginTop: '2px' },
    emptyState: { textAlign: 'center', padding: '40px', color: THEME.textMuted, fontSize: '14px' },
  }

  const getTypeColor = (type) => {
    switch(type) { case 'CL': return '#6C63FF'; case 'ML': return '#22C55E'; case 'EL': return '#3B82F6'; case 'OD': return '#F97316'; default: return '#6C63FF' }
  }

  return (
    <div style={styles.container}>
      <div style={styles.greeting}>
        <h1 style={styles.greetingTitle}>Hi, {user?.name.split(' ')[0]}</h1>
        <p style={styles.greetingSubtitle}>{user?.rollNumber} • {user?.department} • {user?.year}</p>
      </div>
      <div style={styles.balanceSection}>
        {balanceData.map((bal, i) => (
          <div key={i} style={styles.balanceCard}>
            <ProgressRing radius={35} progress={bal.progress} color={getTypeColor(bal.type)} value={bal.remaining} label="days" size={90} />
            <div style={styles.balanceType}>{bal.type}</div>
            <div style={styles.balanceNumbers}>{bal.used}/{bal.total} used</div>
          </div>
        ))}
      </div>
      <div style={styles.twoCol}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>My Recent Applications</h3>
            <span style={{ fontSize: '13px', color: THEME.primary, cursor: 'pointer' }} onClick={() => onNavigate('history')}>View All</span>
          </div>
          <div style={styles.applicationList}>
            {recentApplications.length > 0 ? recentApplications.map((app, i) => (
              <div key={i} style={styles.applicationItem}>
                <div style={styles.appInfo}>
                  <div style={styles.appDates}>{formatDate(app.fromDate)} - {formatDate(app.toDate)}</div>
                  <div style={styles.appMeta}>{app.totalDays} days • {app.reason.slice(0, 40)}...</div>
                </div>
                <Badge text={app.status} type={app.status} />
              </div>
            )) : <div style={styles.emptyState}>No applications yet</div>}
          </div>
        </div>
        <div style={styles.section}>
          <div style={styles.sectionHeader}><h3 style={styles.sectionTitle}>Quick Actions</h3></div>
          <button style={styles.ctaBtn} onClick={() => onNavigate('apply')}>
            <CalendarPlus size={18} /> Apply for Leave
          </button>
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <div style={styles.attendanceValue}>{user?.attendancePercent}%</div>
            <div style={styles.attendanceLabel}>Current Attendance</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MANAGE MEMBERS PAGE
// ============================================
const ManageMembersPage = () => {
  const { user } = useContext(AuthContext)
  const data = useContext(AppDataContext)
  const { showToast } = useContext(ToastContext)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('all')

  const canAddRoles = useMemo(() => {
    if (user?.role === 'principal') return ['hod', 'faculty', 'student']
    if (user?.role === 'hod') return ['faculty', 'student']
    if (user?.role === 'faculty') return ['student']
    return []
  }, [user])

  const members = useMemo(() => {
    let filtered = data.users.filter(u => u.isActive && u.id !== user?.id)
    if (user?.role === 'hod') filtered = filtered.filter(u => u.department === user.department)
    else if (user?.role === 'faculty') filtered = filtered.filter(u => u.createdBy === user.id)
    if (searchTerm) filtered = filtered.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || (u.employeeId || u.rollNumber || '').toLowerCase().includes(searchTerm.toLowerCase()))
    if (filterDept !== 'all') filtered = filtered.filter(u => u.department === filterDept)
    return filtered
  }, [data, user, searchTerm, filterDept])

  const departments = useMemo(() => Array.from(new Set(data.users.map(u => u.department))), [data])

  const handleDeactivate = async (userId) => {
    if (confirm('Are you sure you want to deactivate this member?')) {
      try {
        await data.deactivateUser(userId)
        showToast('Member deactivated successfully', 'success')
      } catch (err) {
        showToast(err.message || 'Failed to deactivate', 'error')
      }
    }
  }

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    title: { fontSize: '24px', fontWeight: '700', color: THEME.textPrimary },
    addBtn: {
      padding: '12px 20px', borderRadius: '12px', border: 'none',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(108,99,255,0.3)',
    },
    filters: { display: 'flex', gap: '16px', marginBottom: '24px' },
    searchBox: {
      flex: 1, display: 'flex', alignItems: 'center', gap: '12px',
      padding: '12px 16px', background: THEME.cardBg, borderRadius: '12px', border: `1px solid ${THEME.cardBorder}`,
    },
    searchInput: { flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: '14px', color: THEME.textPrimary },
    filterSelect: { padding: '12px 16px', background: THEME.cardBg, borderRadius: '12px', border: `1px solid ${THEME.cardBorder}`, fontSize: '14px', color: THEME.textPrimary, outline: 'none', cursor: 'pointer' },
    tableContainer: {
      background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px',
      border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)', overflow: 'hidden',
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
      textAlign: 'left', padding: '16px 20px', fontSize: '12px', fontWeight: '600',
      color: THEME.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px',
      borderBottom: '1px solid rgba(108,99,255,0.1)', background: 'rgba(108,99,255,0.03)',
    },
    td: { padding: '16px 20px', fontSize: '14px', color: THEME.textPrimary, borderBottom: '1px solid rgba(108,99,255,0.05)' },
    userCell: { display: 'flex', alignItems: 'center', gap: '12px' },
    userAvatar: {
      width: '40px', height: '40px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '600',
    },
    userName: { fontWeight: '600', color: THEME.textPrimary },
    userEmail: { fontSize: '12px', color: THEME.textMuted },
    idCell: { fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: THEME.textSecondary },
    actionBtns: { display: 'flex', gap: '8px' },
    actionBtn: {
      width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(108,99,255,0.2)',
      background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: THEME.textSecondary, transition: 'all 0.2s ease',
    },
    emptyState: { textAlign: 'center', padding: '60px', color: THEME.textMuted },
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Members</h1>
        {canAddRoles.length > 0 && <button style={styles.addBtn} onClick={() => setShowAddModal(true)}><Plus size={18} /> Add Member</button>}
      </div>
      <div style={styles.filters}>
        <div style={styles.searchBox}>
          <Search size={18} color={THEME.textMuted} />
          <input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.searchInput} />
        </div>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} style={styles.filterSelect}>
          <option value="all">All Departments</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Member</th>
              <th style={styles.th}>ID/Roll No.</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td style={styles.td}>
                  <div style={styles.userCell}>
                    <div style={styles.userAvatar}>{member.avatar}</div>
                    <div><div style={styles.userName}>{member.name}</div><div style={styles.userEmail}>{member.email}</div></div>
                  </div>
                </td>
                <td style={styles.td}><span style={styles.idCell}>{member.employeeId || member.facultyRollNo || member.rollNumber || '-'}</span></td>
                <td style={styles.td}>{member.department}</td>
                <td style={styles.td}><Badge text={member.role} type={member.role} /></td>
                <td style={styles.td}><Badge text={member.isActive ? 'Active' : 'Inactive'} type={member.isActive ? 'approved' : 'rejected'} /></td>
                <td style={styles.td}>
                  <div style={styles.actionBtns}>
                    <button style={styles.actionBtn} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(108,99,255,0.1)'; e.currentTarget.style.color = THEME.primary }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = THEME.textSecondary }}><Eye size={16} /></button>
                    <button style={styles.actionBtn} onClick={() => handleDeactivate(member.id)} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = THEME.danger }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = THEME.textSecondary }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {members.length === 0 && <tr><td colSpan="6" style={styles.emptyState}>No members found</td></tr>}
          </tbody>
        </table>
      </div>
      {showAddModal && <AddMemberModal onClose={() => setShowAddModal(false)} allowedRoles={canAddRoles} departments={departments} />}
    </div>
  )
}

// ============================================
// ADD MEMBER MODAL
// ============================================
const AddMemberModal = ({ onClose, allowedRoles, departments }) => {
  const { user } = useContext(AuthContext)
  const data = useContext(AppDataContext)
  const { showToast } = useContext(ToastContext)
  const [role, setRole] = useState(allowedRoles[0] || 'student')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', department: departments[0] || '',
    employeeId: '', facultyRollNo: '', designation: '', rollNumber: '', year: '', semester: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const newUser = {
        name: formData.name, email: formData.email, role,
        department: formData.department, phone: formData.phone,
        ...(role === 'hod' && { employeeId: formData.employeeId }),
        ...(role === 'faculty' && { facultyRollNo: formData.facultyRollNo, designation: formData.designation }),
        ...(role === 'student' && { rollNumber: formData.rollNumber, year: formData.year, semester: formData.semester, attendancePercent: 85 }),
        leaveBalance: role === 'student' ? {
          CL: { total: 10, used: 0, remaining: 10 },
          ML: { total: 12, used: 0, remaining: 12 },
          OD: { used: 0 },
        } : {
          CL: { total: 10, used: 0, remaining: 10, carriedForward: 0 },
          ML: { total: 12, used: 0, remaining: 12 },
          EL: { total: 15, used: 0, remaining: 15 },
          OD: { used: 0 },
        }
      }
      await data.addUser(newUser)
      showToast(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`, 'success')
      onClose()
    } catch (err) {
      showToast(err.message || 'Failed to add member', 'error')
    }
    setIsLoading(false)
  }

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

  const styles = {
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
    },
    modal: {
      width: '100%', maxWidth: '520px', maxHeight: '90vh', background: '#fff',
      borderRadius: '24px', boxShadow: '0 25px 80px rgba(0,0,0,0.3)', overflow: 'hidden', animation: 'pageIn 0.3s ease',
    },
    header: { padding: '24px 28px', borderBottom: '1px solid rgba(108,99,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: '20px', fontWeight: '700', color: THEME.textPrimary },
    closeBtn: { width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: 'rgba(108,99,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: THEME.textSecondary },
    body: { padding: '24px 28px', overflowY: 'auto', maxHeight: 'calc(90vh - 160px)' },
    roleTabs: { display: 'flex', gap: '8px', marginBottom: '24px' },
    roleTab: (isActive) => ({
      flex: 1, padding: '12px', borderRadius: '12px',
      border: isActive ? `2px solid ${THEME.primary}` : '2px solid transparent',
      background: isActive ? THEME.primaryLight : 'rgba(108,99,255,0.05)',
      color: isActive ? THEME.primary : THEME.textSecondary, fontSize: '13px', fontWeight: '600',
      cursor: 'pointer', textTransform: 'uppercase', textAlign: 'center',
    }),
    formGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '13px', fontWeight: '600', color: THEME.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' },
    input: {
      width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(108,99,255,0.2)',
      background: '#fff', fontSize: '14px', color: THEME.textPrimary, outline: 'none',
    },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    footer: { padding: '20px 28px', borderTop: '1px solid rgba(108,99,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '12px' },
    cancelBtn: { padding: '12px 24px', borderRadius: '12px', border: '1px solid rgba(108,99,255,0.2)', background: '#fff', color: THEME.textSecondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
    submitBtn: { padding: '12px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Member</h2>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.body}>
            <div style={styles.roleTabs}>
              {allowedRoles.map(r => <button key={r} type="button" style={styles.roleTab(role === r)} onClick={() => setRole(r)}>{r.charAt(0).toUpperCase() + r.slice(1)}</button>)}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input type="text" required placeholder="Enter full name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} style={styles.input} onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.2)'} onBlur={(e) => e.target.style.boxShadow = 'none'} />
            </div>
            <div style={styles.row}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input type="email" required placeholder="email@college.edu" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} style={styles.input} onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.2)'} onBlur={(e) => e.target.style.boxShadow = 'none'} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                <input type="tel" required placeholder="9876543210" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} style={styles.input} onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.2)'} onBlur={(e) => e.target.style.boxShadow = 'none'} />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              <select required value={formData.department} onChange={(e) => handleChange('department', e.target.value)} style={styles.input}>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            {role === 'hod' && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Employee ID</label>
                <input type="text" required placeholder="EMP001" value={formData.employeeId} onChange={(e) => handleChange('employeeId', e.target.value)} style={styles.input} onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.2)'} onBlur={(e) => e.target.style.boxShadow = 'none'} />
              </div>
            )}
            {role === 'faculty' && (
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Faculty Roll No.</label>
                  <input type="text" required placeholder="FAC2024001" value={formData.facultyRollNo} onChange={(e) => handleChange('facultyRollNo', e.target.value)} style={styles.input} onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.2)'} onBlur={(e) => e.target.style.boxShadow = 'none'} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Designation</label>
                  <input type="text" required placeholder="Assistant Professor" value={formData.designation} onChange={(e) => handleChange('designation', e.target.value)} style={styles.input} onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.2)'} onBlur={(e) => e.target.style.boxShadow = 'none'} />
                </div>
              </div>
            )}
            {role === 'student' && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Roll Number</label>
                  <input type="text" required placeholder="CS2024001" value={formData.rollNumber} onChange={(e) => handleChange('rollNumber', e.target.value)} style={styles.input} onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.2)'} onBlur={(e) => e.target.style.boxShadow = 'none'} />
                </div>
                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Year</label>
                    <select required value={formData.year} onChange={(e) => handleChange('year', e.target.value)} style={styles.input}>
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Semester</label>
                    <select required value={formData.semester} onChange={(e) => handleChange('semester', e.target.value)} style={styles.input}>
                      <option value="">Select Semester</option>
                      <option value="1st">1st Semester</option>
                      <option value="2nd">2nd Semester</option>
                      <option value="3rd">3rd Semester</option>
                      <option value="4th">4th Semester</option>
                      <option value="5th">5th Semester</option>
                      <option value="6th">6th Semester</option>
                      <option value="7th">7th Semester</option>
                      <option value="8th">8th Semester</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>
          <div style={styles.footer}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.submitBtn} disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className="spin" /> : <Plus size={18} />}
              {isLoading ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ============================================
// APPLY LEAVE PAGE
// ============================================
const ApplyLeavePage = () => {
  const { user } = useContext(AuthContext)
  const data = useContext(AppDataContext)
  const { showToast } = useContext(ToastContext)
  const [leaveType, setLeaveType] = useState('CL')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [reason, setReason] = useState('')
  const [hasProof, setHasProof] = useState(false)
  const [isHalfDay, setIsHalfDay] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const leaveTypes = useMemo(() => {
    if (!user?.leaveBalance) return []
    return Object.entries(user.leaveBalance).map(([type, bal]) => ({ type, ...bal, icon: type === 'CL' ? Calendar : type === 'ML' ? AlertCircle : type === 'EL' ? Award : FileText }))
  }, [user])

  const totalDays = useMemo(() => (!fromDate || !toDate) ? 0 : calcDays(fromDate, toDate, leaveType), [fromDate, toDate, leaveType])
  const selectedBalance = useMemo(() => user?.leaveBalance?.[leaveType]?.remaining || 0, [user, leaveType])
  const exceedsBalance = totalDays > selectedBalance

  const recentHistory = useMemo(() => data.leaves.filter(l => l.applicantId === user?.id).sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn)).slice(0, 3), [data, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (exceedsBalance) { showToast('Leave days exceed available balance', 'error'); return }
    if (reason.length < 10) { showToast('Please provide a detailed reason (min 10 characters)', 'error'); return }
    setIsSubmitting(true)
    try {
      await data.addLeave({ leaveType, fromDate, toDate, totalDays: isHalfDay ? 0.5 : totalDays, reason, hasProof })
      showToast('Leave application submitted successfully!', 'success')
      setFromDate(''); setToDate(''); setReason(''); setHasProof(false); setIsHalfDay(false)
    } catch (err) {
      showToast(err.message || 'Submission failed', 'error')
    }
    setIsSubmitting(false)
  }

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    title: { fontSize: '24px', fontWeight: '700', color: THEME.textPrimary, marginBottom: '24px' },
    grid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' },
    formCard: { background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '28px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)' },
    sideCard: { background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '24px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)', marginBottom: '20px' },
    sectionTitle: { fontSize: '16px', fontWeight: '600', color: THEME.textPrimary, marginBottom: '16px' },
    leaveTypeGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' },
    leaveTypeCard: (isSelected) => ({ padding: '16px', borderRadius: '14px', border: isSelected ? `2px solid ${THEME.primary}` : '2px solid transparent', background: isSelected ? THEME.primaryLight : 'rgba(108,99,255,0.05)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease' }),
    leaveTypeIcon: (isSelected) => ({ width: '40px', height: '40px', borderRadius: '10px', background: isSelected ? THEME.primary : 'rgba(108,99,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', color: isSelected ? '#fff' : THEME.primary }),
    leaveTypeLabel: { fontSize: '12px', fontWeight: '600', color: THEME.textPrimary, textTransform: 'uppercase' },
    leaveTypeBalance: { fontSize: '11px', color: THEME.textMuted, marginTop: '2px' },
    formGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '13px', fontWeight: '600', color: THEME.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' },
    input: { width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(108,99,255,0.2)', background: '#fff', fontSize: '14px', color: THEME.textPrimary, outline: 'none' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
    textarea: { width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(108,99,255,0.2)', background: '#fff', fontSize: '14px', color: THEME.textPrimary, outline: 'none', minHeight: '100px', resize: 'vertical', fontFamily: 'Sora, sans-serif' },
    charCount: { textAlign: 'right', fontSize: '12px', color: THEME.textMuted, marginTop: '4px' },
    uploadZone: { padding: '24px', borderRadius: '12px', border: '2px dashed rgba(108,99,255,0.3)', background: 'rgba(108,99,255,0.03)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s ease' },
    checkboxRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
    checkbox: { width: '20px', height: '20px', borderRadius: '6px', border: '2px solid rgba(108,99,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    dayCounter: { padding: '16px', background: THEME.primaryLight, borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    dayCounterLabel: { fontSize: '14px', color: THEME.textSecondary },
    dayCounterValue: { fontSize: '24px', fontWeight: '700', color: THEME.primary },
    warningBox: { padding: '14px 16px', background: THEME.warningBg, borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
    warningText: { fontSize: '13px', color: THEME.warning },
    submitBtn: {
      width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
      background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)',
      color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(108,99,255,0.3)',
    },
    balanceRing: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' },
    historyItem: { padding: '12px', background: 'rgba(108,99,255,0.03)', borderRadius: '10px', marginBottom: '10px' },
    historyDates: { fontSize: '13px', fontWeight: '500', color: THEME.textPrimary },
    historyMeta: { fontSize: '11px', color: THEME.textMuted, marginTop: '2px' },
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Apply for Leave</h1>
      <div style={styles.grid}>
        <div style={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div style={styles.sectionTitle}>Select Leave Type</div>
            <div style={styles.leaveTypeGrid}>
              {leaveTypes.map((lt) => {
                const Icon = lt.icon
                return (
                  <div key={lt.type} style={styles.leaveTypeCard(leaveType === lt.type)} onClick={() => setLeaveType(lt.type)}>
                    <div style={styles.leaveTypeIcon(leaveType === lt.type)}><Icon size={20} /></div>
                    <div style={styles.leaveTypeLabel}>{lt.type}</div>
                    <div style={styles.leaveTypeBalance}>{lt.remaining} days left</div>
                  </div>
                )
              })}
            </div>
            <div style={styles.row}>
              <div style={styles.formGroup}>
                <label style={styles.label}>From Date</label>
                <input type="date" required value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={styles.input} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>To Date</label>
                <input type="date" required value={toDate} onChange={(e) => setToDate(e.target.value)} style={styles.input} min={fromDate || new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            {fromDate && toDate && (
              <div style={styles.dayCounter}>
                <span style={styles.dayCounterLabel}>Total Working Days</span>
                <span style={styles.dayCounterValue}>{isHalfDay ? 0.5 : totalDays}</span>
              </div>
            )}
            {exceedsBalance && (
              <div style={styles.warningBox}>
                <AlertCircle size={18} color={THEME.warning} />
                <span style={styles.warningText}>Requested days exceed your available balance of {selectedBalance} days</span>
              </div>
            )}
            <div style={styles.formGroup}>
              <label style={styles.label}>Reason for Leave</label>
              <textarea required placeholder="Please provide a detailed reason for your leave..." value={reason} onChange={(e) => setReason(e.target.value)} style={styles.textarea} />
              <div style={styles.charCount}>{reason.length} characters</div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Upload Proof (if required)</label>
              <div style={styles.uploadZone} onClick={() => setHasProof(!hasProof)} onMouseEnter={(e) => { e.currentTarget.style.borderColor = THEME.primary; e.currentTarget.style.background = 'rgba(108,99,255,0.08)' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.3)'; e.currentTarget.style.background = 'rgba(108,99,255,0.03)' }}>
                {hasProof ? <><CheckCircle size={32} color={THEME.success} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '14px', color: THEME.success, fontWeight: '500' }}>Proof marked as uploaded</div></> : <><Upload size={32} color={THEME.primary} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '14px', color: THEME.textSecondary }}>Click to mark proof as uploaded</div></>}
              </div>
            </div>
            {(leaveType === 'CL' || leaveType === 'ML') && (
              <div style={styles.checkboxRow}>
                <div style={{ ...styles.checkbox, background: isHalfDay ? THEME.primary : 'transparent', borderColor: isHalfDay ? THEME.primary : 'rgba(108,99,255,0.3)' }} onClick={() => setIsHalfDay(!isHalfDay)}>{isHalfDay && <Check size={14} color="#fff" />}</div>
                <span style={{ fontSize: '14px', color: THEME.textSecondary }}>Apply for Half Day</span>
              </div>
            )}
            <button type="submit" style={styles.submitBtn} disabled={isSubmitting || exceedsBalance}>
              {isSubmitting ? <Loader2 size={20} className="spin" /> : <CalendarPlus size={20} />}
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
        <div>
          <div style={styles.sideCard}>
            <div style={styles.sectionTitle}>Balance Overview</div>
            <div style={styles.balanceRing}>
              <ProgressRing radius={45} progress={(selectedBalance / (user?.leaveBalance?.[leaveType]?.total || 1)) * 100} color={THEME.primary} value={selectedBalance} label="days left" size={140} />
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: THEME.textSecondary }}>{leaveType} Balance</div>
                <div style={{ fontSize: '13px', color: THEME.textMuted, marginTop: '4px' }}>of {user?.leaveBalance?.[leaveType]?.total || 0} days</div>
              </div>
            </div>
          </div>
          <div style={styles.sideCard}>
            <div style={styles.sectionTitle}>Recent History</div>
            {recentHistory.length > 0 ? recentHistory.map((h, i) => (
              <div key={i} style={styles.historyItem}>
                <div style={styles.historyDates}>{formatDate(h.fromDate)} - {formatDate(h.toDate)}</div>
                <div style={styles.historyMeta}>{h.leaveType} • {h.totalDays} days • <Badge text={h.status} type={h.status} /></div>
              </div>
            )) : <div style={{ textAlign: 'center', padding: '20px', color: THEME.textMuted, fontSize: '13px' }}>No recent applications</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// LEAVE REQUESTS PAGE
// ============================================
const LeaveRequestsPage = () => {
  const { user } = useContext(AuthContext)
  const data = useContext(AppDataContext)
  const { showToast } = useContext(ToastContext)
  const [activeTab, setActiveTab] = useState('pending')
  const [filterDept, setFilterDept] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [selectedLeave, setSelectedLeave] = useState(null)
  const [remarks, setRemarks] = useState('')
  const [actionType, setActionType] = useState(null)

  const visibleLeaves = useMemo(() => {
    let leaves = getVisibleLeaves(user, data.leaves, data.users)
    if (activeTab !== 'all') leaves = leaves.filter(l => l.status === activeTab)
    if (filterDept !== 'all') leaves = leaves.filter(l => { const u = data.getUserById(l.applicantId); return u?.department === filterDept })
    if (filterType !== 'all') leaves = leaves.filter(l => l.leaveType === filterType)
    return leaves.map(l => ({ ...l, applicant: data.getUserById(l.applicantId) }))
  }, [data, user, activeTab, filterDept, filterType])

  const departments = useMemo(() => Array.from(new Set(data.users.map(u => u.department))), [data])

  const handleAction = (leave, action) => { setSelectedLeave(leave); setActionType(action); setRemarks('') }

  const confirmAction = async () => {
    if (actionType === 'reject' && !remarks.trim()) { showToast('Please provide a reason for rejection', 'error'); return }
    try {
      await data.updateLeaveStatus(selectedLeave.id, actionType, user.id, remarks)
      showToast(`Leave ${actionType}d successfully`, actionType === 'approve' ? 'success' : 'info')
    } catch (err) {
      showToast(err.message || 'Action failed', 'error')
    }
    setSelectedLeave(null); setActionType(null); setRemarks('')
  }

  const tabs = [
    { key: 'pending', label: 'Pending', count: data.leaves.filter(l => l.status === 'pending').length },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
    { key: 'all', label: 'All' },
  ]

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    title: { fontSize: '24px', fontWeight: '700', color: THEME.textPrimary },
    tabs: { display: 'flex', gap: '8px', marginBottom: '20px', padding: '4px', background: THEME.cardBg, borderRadius: '12px', width: 'fit-content', border: `1px solid ${THEME.cardBorder}` },
    tab: (isActive) => ({ padding: '10px 20px', borderRadius: '10px', border: 'none', background: isActive ? THEME.primary : 'transparent', color: isActive ? '#fff' : THEME.textSecondary, fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }),
    filters: { display: 'flex', gap: '12px', marginBottom: '20px' },
    filterSelect: { padding: '10px 16px', background: THEME.cardBg, borderRadius: '10px', border: `1px solid ${THEME.cardBorder}`, fontSize: '13px', color: THEME.textPrimary, outline: 'none', cursor: 'pointer' },
    requestsGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
    requestCard: {
      background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '20px',
      border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 4px 20px rgba(108,99,255,0.06)',
      display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.2s ease',
    },
    applicantSection: { display: 'flex', alignItems: 'center', gap: '14px', minWidth: '220px' },
    avatar: { width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '15px', fontWeight: '600' },
    applicantInfo: {},
    applicantName: { fontSize: '15px', fontWeight: '600', color: THEME.textPrimary },
    applicantRole: { fontSize: '12px', color: THEME.textMuted, marginTop: '2px' },
    leaveDetails: { flex: 1, display: 'flex', gap: '24px' },
    detailItem: {},
    detailLabel: { fontSize: '11px', color: THEME.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' },
    detailValue: { fontSize: '14px', color: THEME.textPrimary, fontWeight: '500' },
    reasonText: { fontSize: '13px', color: THEME.textSecondary, maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    actions: { display: 'flex', gap: '10px' },
    actionBtn: (type) => ({ padding: '10px 18px', borderRadius: '10px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', background: type === 'approve' ? THEME.successBg : THEME.dangerBg, color: type === 'approve' ? THEME.success : THEME.danger }),
    statusBadge: (status) => ({ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', background: status === 'approved' ? THEME.successBg : status === 'rejected' ? THEME.dangerBg : THEME.warningBg, color: status === 'approved' ? THEME.success : status === 'rejected' ? THEME.danger : THEME.warning }),
    emptyState: { textAlign: 'center', padding: '60px', color: THEME.textMuted },
    modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 },
    modal: { width: '100%', maxWidth: '480px', background: '#fff', borderRadius: '20px', boxShadow: '0 25px 80px rgba(0,0,0,0.3)', overflow: 'hidden', animation: 'pageIn 0.3s ease' },
    modalHeader: { padding: '24px', borderBottom: '1px solid rgba(108,99,255,0.1)' },
    modalTitle: { fontSize: '18px', fontWeight: '700', color: THEME.textPrimary },
    modalBody: { padding: '24px' },
    modalFooter: { padding: '20px 24px', borderTop: '1px solid rgba(108,99,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '12px' },
    textarea: { width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(108,99,255,0.2)', fontSize: '14px', color: THEME.textPrimary, outline: 'none', minHeight: '100px', fontFamily: 'Sora, sans-serif' },
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}><h1 style={styles.title}>Leave Requests</h1></div>
      <div style={styles.tabs}>
        {tabs.map(tab => <button key={tab.key} style={styles.tab(activeTab === tab.key)} onClick={() => setActiveTab(tab.key)}>{tab.label}{tab.count > 0 && <span style={{ padding: '2px 8px', background: activeTab === tab.key ? 'rgba(255,255,255,0.3)' : THEME.warning, borderRadius: '10px', fontSize: '11px' }}>{tab.count}</span>}</button>)}
      </div>
      <div style={styles.filters}>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} style={styles.filterSelect}><option value="all">All Departments</option>{departments.map(d => <option key={d} value={d}>{d}</option>)}</select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={styles.filterSelect}><option value="all">All Types</option><option value="CL">Casual Leave (CL)</option><option value="ML">Medical Leave (ML)</option><option value="EL">Earned Leave (EL)</option><option value="OD">On Duty (OD)</option></select>
      </div>
      <div style={styles.requestsGrid}>
        {visibleLeaves.map(leave => (
          <div key={leave.id} style={styles.requestCard} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(108,99,255,0.12)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(108,99,255,0.06)' }}>
            <div style={styles.applicantSection}>
              <div style={styles.avatar}>{leave.applicant?.avatar}</div>
              <div style={styles.applicantInfo}>
                <div style={styles.applicantName}>{leave.applicant?.name}</div>
                <div style={styles.applicantRole}>{leave.applicant?.role} • {leave.applicant?.department}</div>
              </div>
            </div>
            <div style={styles.leaveDetails}>
              <div style={styles.detailItem}><div style={styles.detailLabel}>Leave Type</div><Badge text={leave.leaveType} type={leave.leaveType} /></div>
              <div style={styles.detailItem}><div style={styles.detailLabel}>Dates</div><div style={styles.detailValue}>{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</div></div>
              <div style={styles.detailItem}><div style={styles.detailLabel}>Days</div><div style={styles.detailValue}>{leave.totalDays} days</div></div>
              <div style={styles.detailItem}><div style={styles.detailLabel}>Reason</div><div style={styles.reasonText} title={leave.reason}>{leave.reason}</div></div>
            </div>
            {leave.status === 'pending' ? (
              <div style={styles.actions}>
                <button style={styles.actionBtn('approve')} onClick={() => handleAction(leave, 'approve')} onMouseEnter={(e) => { e.currentTarget.style.background = THEME.success; e.currentTarget.style.color = '#fff' }} onMouseLeave={(e) => { e.currentTarget.style.background = THEME.successBg; e.currentTarget.style.color = THEME.success }}><Check size={16} /> Approve</button>
                <button style={styles.actionBtn('reject')} onClick={() => handleAction(leave, 'reject')} onMouseEnter={(e) => { e.currentTarget.style.background = THEME.danger; e.currentTarget.style.color = '#fff' }} onMouseLeave={(e) => { e.currentTarget.style.background = THEME.dangerBg; e.currentTarget.style.color = THEME.danger }}><X size={16} /> Reject</button>
              </div>
            ) : <div style={styles.statusBadge(leave.status)}>{leave.status}</div>}
          </div>
        ))}
        {visibleLeaves.length === 0 && <div style={styles.emptyState}><Inbox size={48} style={{ marginBottom: '16px', opacity: 0.5 }} /><div>No {activeTab !== 'all' ? activeTab : ''} leave requests found</div></div>}
      </div>
      {selectedLeave && (
        <div style={styles.modalOverlay} onClick={() => setSelectedLeave(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}><h3 style={styles.modalTitle}>{actionType === 'approve' ? 'Approve Leave Request' : 'Reject Leave Request'}</h3></div>
            <div style={styles.modalBody}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: THEME.textSecondary, marginBottom: '8px' }}>Applicant: <strong style={{ color: THEME.textPrimary }}>{selectedLeave.applicant?.name}</strong></div>
                <div style={{ fontSize: '14px', color: THEME.textSecondary }}>Leave: <strong style={{ color: THEME.textPrimary }}>{selectedLeave.leaveType} • {selectedLeave.totalDays} days</strong></div>
              </div>
              {actionType === 'reject' && (<div><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: THEME.textSecondary, marginBottom: '8px' }}>Reason for Rejection *</label><textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Please provide a reason for rejection..." style={styles.textarea} /></div>)}
              {actionType === 'approve' && (<div style={{ padding: '14px', background: THEME.successBg, borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={20} color={THEME.success} /><span style={{ fontSize: '14px', color: THEME.success }}>Are you sure you want to approve this leave request?</span></div>)}
            </div>
            <div style={styles.modalFooter}>
              <button style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid rgba(108,99,255,0.2)', background: '#fff', color: THEME.textSecondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer' }} onClick={() => setSelectedLeave(null)}>Cancel</button>
              <button style={{ padding: '12px 28px', borderRadius: '10px', border: 'none', background: actionType === 'approve' ? THEME.success : THEME.danger, color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }} onClick={confirmAction}>{actionType === 'approve' ? 'Approve' : 'Reject'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================
// LEAVE HISTORY PAGE
// ============================================
const LeaveHistoryPage = () => {
  const { user } = useContext(AuthContext)
  const data = useContext(AppDataContext)
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const myLeaves = useMemo(() => {
    let leaves = data.leaves.filter(l => l.applicantId === user?.id)
    if (filterType !== 'all') leaves = leaves.filter(l => l.leaveType === filterType)
    if (filterStatus !== 'all') leaves = leaves.filter(l => l.status === filterStatus)
    return leaves.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn))
  }, [data, user, filterType, filterStatus])

  const summary = useMemo(() => {
    const s = {}
    myLeaves.filter(l => l.status === 'approved').forEach(l => { if (!s[l.leaveType]) s[l.leaveType] = 0; s[l.leaveType] += l.totalDays })
    return s
  }, [myLeaves])

  const exportCSV = () => {
    const csv = [['Date', 'Type', 'From', 'To', 'Days', 'Status', 'Reason'].join(','), ...myLeaves.map(l => [formatDate(l.appliedOn), l.leaveType, formatDate(l.fromDate), formatDate(l.toDate), l.totalDays, l.status, `"${l.reason}"`].join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leave-history-${user?.name.replace(/\s+/g, '-').toLowerCase()}.csv`
    a.click()
  }

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    title: { fontSize: '24px', fontWeight: '700', color: THEME.textPrimary },
    exportBtn: { padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(108,99,255,0.2)', background: THEME.cardBg, color: THEME.primary, fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
    summaryCard: { background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '20px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 4px 20px rgba(108,99,255,0.06)', marginBottom: '24px' },
    summaryTitle: { fontSize: '14px', fontWeight: '600', color: THEME.textSecondary, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' },
    summaryGrid: { display: 'flex', gap: '24px' },
    summaryItem: { textAlign: 'center' },
    summaryValue: { fontSize: '24px', fontWeight: '700', color: THEME.primary },
    summaryLabel: { fontSize: '12px', color: THEME.textMuted, marginTop: '2px' },
    filters: { display: 'flex', gap: '12px', marginBottom: '20px' },
    filterSelect: { padding: '10px 16px', background: THEME.cardBg, borderRadius: '10px', border: `1px solid ${THEME.cardBorder}`, fontSize: '13px', color: THEME.textPrimary, outline: 'none', cursor: 'pointer' },
    timeline: { position: 'relative', paddingLeft: '24px' },
    timelineLine: { position: 'absolute', left: '8px', top: 0, bottom: 0, width: '2px', background: 'rgba(108,99,255,0.2)' },
    timelineItem: { position: 'relative', marginBottom: '20px', paddingLeft: '24px' },
    timelineDot: (status) => ({ position: 'absolute', left: '-20px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: status === 'approved' ? THEME.success : status === 'rejected' ? THEME.danger : THEME.warning, border: '2px solid #fff', boxShadow: '0 0 0 2px ' + (status === 'approved' ? THEME.success : status === 'rejected' ? THEME.danger : THEME.warning) }),
    timelineCard: { background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '20px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 4px 20px rgba(108,99,255,0.06)' },
    timelineHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
    timelineDate: { fontSize: '13px', color: THEME.textMuted },
    timelineContent: { display: 'flex', gap: '20px', alignItems: 'center' },
    timelineDates: { fontSize: '15px', fontWeight: '600', color: THEME.textPrimary },
    timelineMeta: { fontSize: '13px', color: THEME.textSecondary, marginTop: '4px' },
    timelineReason: { fontSize: '13px', color: THEME.textSecondary, marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(108,99,255,0.1)' },
    emptyState: { textAlign: 'center', padding: '60px', color: THEME.textMuted },
  }

  const groupByMonth = (leaves) => {
    const groups = {}
    leaves.forEach(l => { const date = new Date(l.appliedOn); const key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); if (!groups[key]) groups[key] = []; groups[key].push(l) })
    return groups
  }
  const groupedLeaves = groupByMonth(myLeaves)

  return (
    <div style={styles.container}>
      <div style={styles.header}><h1 style={styles.title}>Leave History</h1><button style={styles.exportBtn} onClick={exportCSV}><Download size={16} /> Export CSV</button></div>
      <div style={styles.summaryCard}>
        <div style={styles.summaryTitle}>This Year Summary</div>
        <div style={styles.summaryGrid}>
          {Object.entries(summary).map(([type, days]) => <div key={type} style={styles.summaryItem}><div style={styles.summaryValue}>{days}</div><div style={styles.summaryLabel}>{type} Days</div></div>)}
          {Object.keys(summary).length === 0 && <div style={{ color: THEME.textMuted, fontSize: '14px' }}>No leaves taken this year</div>}
        </div>
      </div>
      <div style={styles.filters}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={styles.filterSelect}><option value="all">All Types</option><option value="CL">Casual Leave</option><option value="ML">Medical Leave</option><option value="EL">Earned Leave</option><option value="OD">On Duty</option></select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={styles.filterSelect}><option value="all">All Status</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="pending">Pending</option></select>
      </div>
      <div style={styles.timeline}>
        <div style={styles.timelineLine} />
        {Object.entries(groupedLeaves).map(([month, leaves]) => (
          <div key={month}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: THEME.textSecondary, marginBottom: '16px', marginLeft: '24px' }}>{month}</div>
            {leaves.map(leave => (
              <div key={leave.id} style={styles.timelineItem}>
                <div style={styles.timelineDot(leave.status)} />
                <div style={styles.timelineCard}>
                  <div style={styles.timelineHeader}><div><Badge text={leave.leaveType} type={leave.leaveType} /></div><div style={styles.timelineDate}>{formatDate(leave.appliedOn)}</div></div>
                  <div style={styles.timelineContent}>
                    <div>
                      <div style={styles.timelineDates}>{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</div>
                      <div style={styles.timelineMeta}>{leave.totalDays} days • Status: <Badge text={leave.status} type={leave.status} /></div>
                    </div>
                  </div>
                  <div style={styles.timelineReason}><strong>Reason:</strong> {leave.reason}</div>
                  {leave.remarks && <div style={{...styles.timelineReason, marginTop: '8px'}}><strong>Remarks:</strong> {leave.remarks}</div>}
                </div>
              </div>
            ))}
          </div>
        ))}
        {myLeaves.length === 0 && <div style={styles.emptyState}><Clock size={48} style={{ marginBottom: '16px', opacity: 0.5 }} /><div>No leave history found</div></div>}
      </div>
    </div>
  )
}

// ============================================
// LEAVE BALANCE PAGE
// ============================================
const LeaveBalancePage = () => {
  const { user } = useContext(AuthContext)
  const balanceData = useMemo(() => {
    if (!user?.leaveBalance) return []
    return Object.entries(user.leaveBalance).map(([type, bal]) => ({ type, ...bal, progress: bal.total ? ((bal.total - (bal.used || 0)) / bal.total) * 100 : 0, color: type === 'CL' ? '#6C63FF' : type === 'ML' ? '#22C55E' : type === 'EL' ? '#3B82F6' : '#F97316' }))
  }, [user])

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    title: { fontSize: '24px', fontWeight: '700', color: THEME.textPrimary, marginBottom: '24px' },
    hero: { background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)', borderRadius: '20px', padding: '28px', color: '#fff', marginBottom: '24px' },
    heroTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '8px' },
    heroSubtitle: { fontSize: '14px', opacity: 0.8 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
    balanceCard: { background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '24px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)', display: 'flex', gap: '20px' },
    ringSection: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    infoSection: { flex: 1 },
    typeTitle: { fontSize: '18px', fontWeight: '700', color: THEME.textPrimary, marginBottom: '4px' },
    typeSubtitle: { fontSize: '13px', color: THEME.textMuted, marginBottom: '16px' },
    statsRow: { display: 'flex', gap: '24px', marginBottom: '16px' },
    statValue: { fontSize: '20px', fontWeight: '700', color: THEME.textPrimary },
    statLabel: { fontSize: '12px', color: THEME.textMuted },
    miniChart: { display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' },
    miniBar: (height, color) => ({ width: '8px', height: `${height}%`, background: color, borderRadius: '2px', opacity: 0.6 }),
    warningCard: { background: THEME.warningBg, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', marginTop: '20px' },
    warningText: { fontSize: '14px', color: THEME.warning },
    lopWarning: { background: THEME.dangerBg, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', marginTop: '20px' },
    lopText: { fontSize: '14px', color: THEME.danger },
  }

  const hasLowBalance = balanceData.some(b => b.remaining <= 2 && b.remaining > 0)
  const hasZeroBalance = balanceData.some(b => b.remaining === 0)

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Leave Balance</h1>
      <div style={styles.hero}>
        <div style={styles.heroTitle}>Academic Year 2024-25</div>
        <div style={styles.heroSubtitle}>Leave year: January 1, 2025 - December 31, 2025</div>
      </div>
      <div style={styles.grid}>
        {balanceData.map((bal, i) => (
          <div key={i} style={styles.balanceCard}>
            <div style={styles.ringSection}>
              <ProgressRing radius={40} progress={bal.progress} color={bal.color} value={bal.remaining} label="left" size={110} />
            </div>
            <div style={styles.infoSection}>
              <div style={styles.typeTitle}>{bal.type}</div>
              <div style={styles.typeSubtitle}>{bal.type === 'CL' ? 'Casual Leave' : bal.type === 'ML' ? 'Medical Leave' : bal.type === 'EL' ? 'Earned Leave' : 'On Duty'}</div>
              <div style={styles.statsRow}>
                <div><div style={styles.statValue}>{bal.used || 0}</div><div style={styles.statLabel}>Used</div></div>
                <div><div style={styles.statValue}>{bal.total || 'N/A'}</div><div style={styles.statLabel}>Total</div></div>
                <div><div style={{...styles.statValue, color: bal.color}}>{bal.remaining}</div><div style={styles.statLabel}>Remaining</div></div>
              </div>
              <div style={styles.miniChart}>
                {[30, 50, 40, 70, 45, 60, 35, 55, 42, 68, 38, 52].map((h, j) => <div key={j} style={styles.miniBar(h, bal.color)} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasLowBalance && <div style={styles.warningCard}><AlertCircle size={24} color={THEME.warning} /><span style={styles.warningText}>You have low leave balance in some categories. Please plan your leaves accordingly.</span></div>}
      {hasZeroBalance && <div style={styles.lopWarning}><XCircle size={24} color={THEME.danger} /><span style={styles.lopText}>You have exhausted your leave balance in some categories. Further leaves may result in LOP (Loss of Pay).</span></div>}
    </div>
  )
}

// ============================================
// REPORTS PAGE
// ============================================
const ReportsPage = () => {
  const data = useContext(AppDataContext)
  const [dateRange, setDateRange] = useState('6months')
  const [filterDept, setFilterDept] = useState('all')

  const departments = useMemo(() => Array.from(new Set(data.users.map(u => u.department))), [data])
  const monthlyData = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => ({ month: m, value: Math.floor(Math.random() * 30) + 10 })), [dateRange])
  const typeDistribution = useMemo(() => Object.entries({ CL: 35, ML: 25, EL: 25, OD: 15 }).map(([type, value]) => ({ type, value })), [])
  const deptComparison = useMemo(() => departments.slice(0, 4).map(d => ({ name: d.split(' ')[0], value: Math.floor(Math.random() * 40) + 20 })), [departments])
  const heatmapData = useMemo(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => ({ day: d, value: Math.floor(Math.random() * 100) })), [])

  const styles = {
    container: { animation: 'pageIn 0.3s ease' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    title: { fontSize: '24px', fontWeight: '700', color: THEME.textPrimary },
    exportBtn: { padding: '10px 18px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6C63FF 0%, #4B44CC 100%)', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
    filters: { display: 'flex', gap: '12px', marginBottom: '24px' },
    filterSelect: { padding: '10px 16px', background: THEME.cardBg, borderRadius: '10px', border: `1px solid ${THEME.cardBorder}`, fontSize: '13px', color: THEME.textPrimary, outline: 'none', cursor: 'pointer' },
    chartsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
    chartCard: { background: THEME.cardBg, backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '24px', border: `1px solid ${THEME.cardBorder}`, boxShadow: '0 8px 32px rgba(108,99,255,0.08)' },
    chartTitle: { fontSize: '16px', fontWeight: '600', color: THEME.textPrimary, marginBottom: '20px' },
    lineChart: { height: '200px', position: 'relative' },
    lineSvg: { width: '100%', height: '100%' },
    donutChart: { height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
    donutCenter: { position: 'absolute', textAlign: 'center' },
    donutValue: { fontSize: '28px', fontWeight: '700', color: THEME.textPrimary },
    donutLabel: { fontSize: '12px', color: THEME.textMuted },
    legend: { display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: THEME.textSecondary },
    legendDot: (color) => ({ width: '10px', height: '10px', borderRadius: '50%', background: color }),
    barChart: { height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '0 10px' },
    barItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
    bar: (height) => ({ width: '40px', height: `${height}%`, background: 'linear-gradient(180deg, #6C63FF 0%, #4B44CC 100%)', borderRadius: '6px 6px 0 0' }),
    barLabel: { fontSize: '12px', color: THEME.textSecondary },
    heatmap: { display: 'flex', gap: '8px', justifyContent: 'center' },
    heatmapCell: (intensity) => ({ width: '50px', height: '50px', borderRadius: '10px', background: `rgba(108,99,255,${intensity})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', color: intensity > 0.5 ? '#fff' : THEME.textPrimary }),
  }

  const maxMonthly = Math.max(...monthlyData.map(d => d.value))
  const maxDept = Math.max(...deptComparison.map(d => d.value))

  return (
    <div style={styles.container}>
      <div style={styles.header}><h1 style={styles.title}>Reports & Analytics</h1><button style={styles.exportBtn} onClick={() => alert('Report exported!')}><Download size={16} /> Export Report</button></div>
      <div style={styles.filters}>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={styles.filterSelect}><option value="6months">Last 6 Months</option><option value="3months">Last 3 Months</option><option value="1year">Last 1 Year</option></select>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} style={styles.filterSelect}><option value="all">All Departments</option>{departments.map(d => <option key={d} value={d}>{d}</option>)}</select>
      </div>
      <div style={styles.chartsGrid}>
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>Monthly Leave Trend</div>
          <div style={styles.lineChart}>
            <svg style={styles.lineSvg} viewBox="0 0 300 150" preserveAspectRatio="none">
              {[0, 1, 2, 3, 4].map(i => <line key={i} x1="0" y1={i * 37.5} x2="300" y2={i * 37.5} stroke="rgba(108,99,255,0.1)" strokeWidth="1" />)}
              <path d={`M0,150 ${monthlyData.map((d, i) => { const x = (i / (monthlyData.length - 1)) * 300; const y = 150 - (d.value / maxMonthly) * 120; return `L${x},${y}` }).join(' ')} L300,150 Z`} fill="rgba(108,99,255,0.1)" />
              <path d={`M0,150 ${monthlyData.map((d, i) => { const x = (i / (monthlyData.length - 1)) * 300; const y = 150 - (d.value / maxMonthly) * 120; return `L${x},${y}` }).join(' ')}`} fill="none" stroke="#6C63FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {monthlyData.map((d, i) => { const x = (i / (monthlyData.length - 1)) * 300; const y = 150 - (d.value / maxMonthly) * 120; return <circle key={i} cx={x} cy={y} r="5" fill="#6C63FF" stroke="#fff" strokeWidth="2" /> })}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>{monthlyData.map((d, i) => <span key={i} style={{ fontSize: '11px', color: THEME.textMuted }}>{d.month}</span>)}</div>
          </div>
        </div>
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>Leave Type Distribution</div>
          <div style={styles.donutChart}>
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#EEF2FF" strokeWidth="20" />
              {typeDistribution.reduce((acc, type, i) => {
                const startAngle = acc.angle; const angle = (type.value / 100) * 360; const endAngle = startAngle + angle
                const startRad = (startAngle - 90) * Math.PI / 180; const endRad = (endAngle - 90) * Math.PI / 180
                const x1 = 80 + 60 * Math.cos(startRad); const y1 = 80 + 60 * Math.sin(startRad)
                const x2 = 80 + 60 * Math.cos(endRad); const y2 = 80 + 60 * Math.sin(endRad)
                const largeArc = angle > 180 ? 1 : 0
                acc.paths.push(<path key={i} d={`M80,80 L${x1},${y1} A60,60 0 ${largeArc},1 ${x2},${y2} Z`} fill="none" stroke={type.type === 'CL' ? '#6C63FF' : type.type === 'ML' ? '#22C55E' : type.type === 'EL' ? '#3B82F6' : '#F97316'} strokeWidth="20" />)
                acc.angle = endAngle; return acc
              }, { paths: [], angle: 0 }).paths}
              <circle cx="80" cy="80" r="40" fill="#fff" />
            </svg>
            <div style={styles.donutCenter}><div style={styles.donutValue}>248</div><div style={styles.donutLabel}>Total Leaves</div></div>
          </div>
          <div style={styles.legend}>
            {typeDistribution.map((t, i) => <div key={i} style={styles.legendItem}><div style={styles.legendDot(t.type === 'CL' ? '#6C63FF' : t.type === 'ML' ? '#22C55E' : t.type === 'EL' ? '#3B82F6' : '#F97316')} />{t.type} ({t.value}%)</div>)}
          </div>
        </div>
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>Department-wise Comparison</div>
          <div style={styles.barChart}>
            {deptComparison.map((d, i) => <div key={i} style={styles.barItem}><div style={{ height: '150px', display: 'flex', alignItems: 'flex-end' }}><div style={styles.bar((d.value / maxDept) * 100)} /></div><span style={styles.barLabel}>{d.name}</span><span style={{ fontSize: '12px', fontWeight: '600', color: THEME.primary }}>{d.value}</span></div>)}
          </div>
        </div>
        <div style={styles.chartCard}>
          <div style={styles.chartTitle}>Leave Frequency by Day</div>
          <div style={styles.heatmap}>
            {heatmapData.map((d, i) => <div key={i} style={styles.heatmapCell(d.value / 100)}>{d.day}</div>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px', fontSize: '12px', color: THEME.textMuted }}><span>Low</span><div style={{ width: '100px', height: '8px', background: 'linear-gradient(90deg, rgba(108,99,255,0.1) 0%, rgba(108,99,255,1) 100%)', borderRadius: '4px' }} /><span>High</span></div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN APP COMPONENT
// ============================================
const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isReady, setIsReady] = useState(false)
  useEffect(() => { setIsReady(true) }, [])

  const getPageTitle = () => ({ dashboard: 'Dashboard', members: 'Manage Members', apply: 'Apply Leave', requests: 'Leave Requests', history: 'Leave History', balance: 'Leave Balance', reports: 'Reports' }[currentPage] || 'Dashboard')

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <DashboardRouter onNavigate={setCurrentPage} />
      case 'members': return <ManageMembersPage />
      case 'apply': return <ApplyLeavePage />
      case 'requests': return <LeaveRequestsPage />
      case 'history': return <LeaveHistoryPage />
      case 'balance': return <LeaveBalancePage />
      case 'reports': return <ReportsPage />
      default: return <DashboardRouter onNavigate={setCurrentPage} />
    }
  }

  if (!isReady) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}><Loader2 size={40} className="spin" color={THEME.primary} /></div>

  return (
    <ToastProvider>
      <AppDataProvider>
        <AuthProvider>
          <AppContent currentPage={currentPage} setCurrentPage={setCurrentPage} getPageTitle={getPageTitle} renderPage={renderPage} />
        </AuthProvider>
      </AppDataProvider>
    </ToastProvider>
  )
}

const DashboardRouter = ({ onNavigate }) => {
  const { user } = useContext(AuthContext)
  if (!user) return null
  switch(user.role) {
    case 'principal': return <PrincipalDashboard onNavigate={onNavigate} />
    case 'hod': return <HODDashboard onNavigate={onNavigate} />
    case 'faculty': return <FacultyDashboard onNavigate={onNavigate} />
    case 'student': return <StudentDashboard onNavigate={onNavigate} />
    default: return <StudentDashboard onNavigate={onNavigate} />
  }
}

const AppContent = ({ currentPage, setCurrentPage, getPageTitle, renderPage }) => {
  const { user, login, logout, isLoading, refreshUser } = useContext(AuthContext)
  const data = useContext(AppDataContext)

  // When user logs in, fetch all data
  useEffect(() => {
    if (user) data.fetchAll()
  }, [user])

  if (isLoading || (user && data.loading)) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: THEME.pageBg }}><Loader2 size={40} className="spin" color={THEME.primary} /></div>

  return (
    <>
      <StyleInjector />
      {!user ? <LoginPage onLogin={login} /> : <AppLayout currentPage={currentPage} onNavigate={setCurrentPage} onLogout={logout} pageTitle={getPageTitle()}>{renderPage()}</AppLayout>}
    </>
  )
}

export default App
