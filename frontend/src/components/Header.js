import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../utils/auth';
import { useState, useRef, useEffect } from 'react';

const navStyle = ({ isActive }) =>
    isActive
        ? "text-white bg-white/20 font-semibold px-4 py-2 rounded-lg backdrop-blur-sm"
        : "text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200";

function Header() {
    const auth = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Debug logging
    console.log('Header - auth.user:', auth.user);
    console.log('Header - auth.isLoading:', auth.isLoading);

    return (
        <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-xl sticky top-0 z-40">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-200">
                                <span className="text-white text-xl font-bold">A</span>
                            </div>
                            <span className="text-white text-2xl sm:text-3xl font-bold tracking-wide group-hover:scale-105 transition-transform duration-200">
                        Alumnet
                    </span>
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {!auth.user && <UnAuthenticated />}
                        {auth.user && (auth.user?.user?.role === 'alumni' || auth.user?.role === 'alumni') && <AlumniHeader />}
                        {auth.user && (auth.user?.user?.role === 'student' || auth.user?.role === 'student') && <StudentHeader />}
                        {auth.user && auth.user?.user?.role !== 'alumni' && auth.user?.user?.role !== 'student' && auth.user?.role !== 'alumni' && auth.user?.role !== 'student' && <UnAuthenticated />}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-white/20 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800">
                        <div className="px-4 py-4 space-y-2">
                            {!auth.user && <MobileUnAuthenticated onClose={() => setIsMobileMenuOpen(false)} />}
                            {auth.user && (auth.user?.user?.role === 'alumni' || auth.user?.role === 'alumni') && <MobileAlumniHeader onClose={() => setIsMobileMenuOpen(false)} />}
                            {auth.user && (auth.user?.user?.role === 'student' || auth.user?.role === 'student') && <MobileStudentHeader onClose={() => setIsMobileMenuOpen(false)} />}
                            {auth.user && auth.user?.user?.role !== 'alumni' && auth.user?.user?.role !== 'student' && auth.user?.role !== 'alumni' && auth.user?.role !== 'student' && <MobileUnAuthenticated onClose={() => setIsMobileMenuOpen(false)} />}
                        </div>
                    </div>
                )}
                </div>
            </header>
    )
}

function AlumniHeader() {
    return (
        <nav className="flex items-center space-x-1">
            <NavLink to="/feed" className={navStyle}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span>Feed</span>
                </div>
            </NavLink>
            <NavLink to="/post/create" className={navStyle}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create</span>
                </div>
            </NavLink>
            <NavLink to="/alumni" className={navStyle}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Alumni</span>
                </div>
            </NavLink>
            <NavLink to="/events" className={navStyle}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Events</span>
                </div>
            </NavLink>
            <UserDropdown />
            </nav>
    );
}

function StudentHeader() {
    return (
        <nav className="flex items-center space-x-1">
            <NavLink to="/feed" className={navStyle}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <span>Feed</span>
                </div>
            </NavLink>
            <NavLink to="/events" className={navStyle}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Events</span>
                </div>
            </NavLink>
            <UserDropdown />
            </nav>
    );
}



function UnAuthenticated() {
    return (
        <nav className="flex items-center space-x-1">
            <NavLink to="/" className={navStyle}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Home</span>
                </div>
                </NavLink>
            <NavLink to="/register" className={navStyle}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Sign Up</span>
                </div>
                </NavLink>
            <NavLink to="/login" className={navStyle}>
                <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign In</span>
                </div>
                </NavLink>
            <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-white/20">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full font-medium backdrop-blur-sm">
                    Connecting Alumni
                </span>
            </div>
        </nav>
    )
}

// Mobile Navigation Components
const mobileNavStyle = "block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center space-x-3";

function MobileUnAuthenticated({ onClose }) {
    return (
        <>
            <NavLink to="/" className={mobileNavStyle} onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
            </NavLink>
            <NavLink to="/register" className={mobileNavStyle} onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Sign Up</span>
            </NavLink>
            <NavLink to="/login" className={mobileNavStyle} onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
            </NavLink>
        </>
    );
}

function MobileAlumniHeader({ onClose }) {
    return (
        <>
            <NavLink to="/feed" className={mobileNavStyle} onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>Feed</span>
            </NavLink>
            <NavLink to="/post/create" className={mobileNavStyle} onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Post</span>
            </NavLink>
            <NavLink to="/alumni" className={mobileNavStyle} onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Alumni</span>
            </NavLink>
            <NavLink to="/events" className={mobileNavStyle} onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Events</span>
            </NavLink>
            <MobileUserDropdown onClose={onClose} />
        </>
    );
}

function MobileStudentHeader({ onClose }) {
    return (
        <>
            <NavLink to="/feed" className={mobileNavStyle} onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>Feed</span>
            </NavLink>
            <NavLink to="/events" className={mobileNavStyle} onClick={onClose}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Events</span>
            </NavLink>
            <MobileUserDropdown onClose={onClose} />
        </>
    );
}

// Mobile User Dropdown
function MobileUserDropdown({ onClose }) {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogout = () => {
        auth.logout();
        navigate('/login', { replace: true });
        onClose();
    };

    const handleProfileClick = () => {
        navigate('/profile');
        onClose();
    };

    return (
        <>
            <button onClick={handleProfileClick} className={mobileNavStyle}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
            </button>
            <button onClick={handleLogout} className={mobileNavStyle}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
            </button>
        </>
    );
}

// User Dropdown Component
function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const auth = useAuth();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        auth.logout();
        navigate('/login', { replace: true });
        setIsOpen(false);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
            >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold text-sm backdrop-blur-sm">
                    {auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="font-medium">Me</span>
                <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 backdrop-blur-sm">
                    {/* Profile Option */}
                    <button
                        onClick={handleProfileClick}
                        className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div>
                            <div className="font-medium">Profile</div>
                            <div className="text-sm text-gray-500">View your profile</div>
                        </div>
                    </button>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Logout Option */}
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                    >
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <div>
                            <div className="font-medium">Logout</div>
                            <div className="text-sm text-red-500">Sign out of your account</div>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;
