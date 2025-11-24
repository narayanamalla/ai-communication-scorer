import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Applcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Submit', path: '/transcript-submission', icon: 'Upload' },
    { label: 'Results', path: '/analysis-results', icon: 'FileText' },
    { label: 'Progress', path: '/progress-tracking', icon: 'TrendingUp' },
    { label: 'Training', path: '/training-prompts', icon: 'GraduationCap' }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header-nav">
        <div className="header-container">
          <Link to="/dashboard" className="header-logo">
            <div className="header-logo-icon">
              <Icon name="MessageSquare" size={24} color="#FFFFFF" />
            </div>
            <span className="header-logo-text">AI Communication Scorer</span>
          </Link>

          <nav className="header-nav-list">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`header-nav-item ${isActive(item?.path) ? 'active' : ''}`}
              >
                {item?.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <ProgressIndicator status="ready" />
            <UserContextSwitcher role="student" />
          </div>

          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-overlay" 
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <nav className="mobile-menu">
            <div className="mobile-menu-header">
              <div className="header-logo">
                <div className="header-logo-icon">
                  <Icon name="MessageSquare" size={20} color="#FFFFFF" />
                </div>
                <span className="header-logo-text">AI Scorer</span>
              </div>
              <button
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="mobile-menu-nav">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`mobile-menu-item ${isActive(item?.path) ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <Icon name={item?.icon} size={20} className="inline-block mr-3" />
                  {item?.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
};

const ProgressIndicator = ({ status = 'ready' }) => {
  const statusConfig = {
    ready: { label: 'Ready', dotClass: 'success' },
    processing: { label: 'Processing', dotClass: 'processing' },
    attention: { label: 'Needs Attention', dotClass: 'warning' }
  };

  const config = statusConfig?.[status] || statusConfig?.ready;

  return (
    <div className="progress-indicator">
      <span className={`progress-indicator-dot ${config?.dotClass}`} />
      <span>{config?.label}</span>
    </div>
  );
};

const UserContextSwitcher = ({ role = 'student' }) => {
  const roleConfig = {
    student: { label: 'Student', icon: 'User' },
    instructor: { label: 'Instructor', icon: 'Users' }
  };

  const config = roleConfig?.[role] || roleConfig?.student;

  return (
    <div className="user-context-switcher">
      <Icon name={config?.icon} size={18} />
      <span className={`user-role-badge ${role}`}>{config?.label}</span>
    </div>
  );
};

export default Header;