/**
 * GRIHGO Delivery Partner App - Logger Utility
 * Debug logging with tags and timestamps for development
 */

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const formatTimestamp = (): string => {
    return new Date().toISOString().split('T')[1].slice(0, 12);
};

const formatLog = (level: LogLevel, tag: string, message: string): string => {
    return `[${formatTimestamp()}][${level}][${tag}] ${message}`;
};

export const logger = {
    /**
     * Debug log - only shows in development
     */
    debug: (tag: string, message: string, data?: any): void => {
        if (__DEV__) {
            console.log(formatLog('DEBUG', tag, message), data ?? '');
        }
    },

    /**
     * Info log - general information
     */
    info: (tag: string, message: string, data?: any): void => {
        console.log(formatLog('INFO', tag, message), data ?? '');
    },

    /**
     * Warning log - potential issues
     */
    warn: (tag: string, message: string, data?: any): void => {
        console.warn(formatLog('WARN', tag, message), data ?? '');
    },

    /**
     * Error log - errors and exceptions
     */
    error: (tag: string, message: string, error?: any): void => {
        console.error(formatLog('ERROR', tag, message), error ?? '');
    },

    /**
     * Log user action for analytics/debugging
     */
    action: (screen: string, action: string, data?: any): void => {
        console.log(formatLog('INFO', 'ACTION', `${screen}::${action}`), data ?? '');
    },

    /**
     * Log navigation events
     */
    navigate: (from: string, to: string, params?: any): void => {
        console.log(formatLog('INFO', 'NAV', `${from} → ${to}`), params ?? '');
    },

    /**
     * Log API calls
     */
    api: (method: string, endpoint: string, data?: any): void => {
        console.log(formatLog('DEBUG', 'API', `${method} ${endpoint}`), data ?? '');
    },

    /**
     * Log component lifecycle
     */
    lifecycle: (component: string, event: 'mount' | 'unmount' | 'update', data?: any): void => {
        if (__DEV__) {
            console.log(formatLog('DEBUG', 'LIFECYCLE', `${component}::${event}`), data ?? '');
        }
    },
};
