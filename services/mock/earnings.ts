/**
 * GRIHGO Delivery Partner App - Mock Earnings Data
 */

import { EarningsSummary, EarningsBreakdown, Payout, Challenge } from '@/types';

export const mockEarningsToday: EarningsSummary = {
    amount: 4850,
    trips: 12,
    hours: 6.5,
    distance: 45,
};

export const mockEarningsWeek: EarningsSummary = {
    amount: 28500,
    trips: 68,
    hours: 38,
    distance: 285,
};

export const mockEarningsMonth: EarningsSummary = {
    amount: 115000,
    trips: 280,
    hours: 160,
    distance: 1150,
};

export const mockBreakdown: EarningsBreakdown = {
    basePay: 2400,
    tips: 450,
    peakBonus: 850,
    incentives: 1150,
    total: 4850,
};

export const mockPayouts: Payout[] = [
    {
        id: 'p1',
        amount: 28500,
        date: new Date('2026-01-15'),
        status: 'COMPLETED',
        bankName: 'HDFC Bank',
        accountLast4: '1234',
    },
    {
        id: 'p2',
        amount: 32100,
        date: new Date('2026-01-08'),
        status: 'COMPLETED',
        bankName: 'HDFC Bank',
        accountLast4: '1234',
    },
];

export const mockChallenges: Challenge[] = [
    {
        id: 'ch1',
        title: 'Complete 15 orders',
        description: 'Complete 15 orders today to earn bonus',
        reward: 300,
        progress: 12,
        target: 15,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
        status: 'ACTIVE',
    },
    {
        id: 'ch2',
        title: 'Peak hour champion',
        description: 'Complete 5 orders during 12-2 PM',
        reward: 150,
        progress: 3,
        target: 5,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        status: 'ACTIVE',
    },
];
