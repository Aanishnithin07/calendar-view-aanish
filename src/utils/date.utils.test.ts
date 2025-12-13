/**
 * Date Utilities Test/Demo
 * Quick verification that getCalendarGrid works correctly
 */

import { getCalendarGrid, formatDate, isSameDay } from './date.utils';

// Test getCalendarGrid function
console.log('=== Testing getCalendarGrid ===\n');

// Test with December 2025 (starts on Monday)
const testDate = new Date(2025, 11, 1); // December 1, 2025
console.log('Test Date:', formatDate(testDate, 'long'));

// Get calendar grid starting with Sunday (firstDayOfWeek = 0)
const gridSunday = getCalendarGrid(testDate, 0);
console.log('\nCalendar Grid (Sunday start):');
console.log('Total dates:', gridSunday.length);
console.log('First date:', formatDate(gridSunday[0], 'YYYY-MM-DD'));
console.log('Last date:', formatDate(gridSunday[41], 'YYYY-MM-DD'));

// Get calendar grid starting with Monday (firstDayOfWeek = 1)
const gridMonday = getCalendarGrid(testDate, 1);
console.log('\nCalendar Grid (Monday start):');
console.log('Total dates:', gridMonday.length);
console.log('First date:', formatDate(gridMonday[0], 'YYYY-MM-DD'));
console.log('Last date:', formatDate(gridMonday[41], 'YYYY-MM-DD'));

// Verify the grid has exactly 42 dates
console.log('\n✅ Grid length validation:');
console.log('Sunday start:', gridSunday.length === 42 ? 'PASS' : 'FAIL');
console.log('Monday start:', gridMonday.length === 42 ? 'PASS' : 'FAIL');

// Test isSameDay function
console.log('\n=== Testing isSameDay ===');
const date1 = new Date(2025, 11, 15);
const date2 = new Date(2025, 11, 15);
const date3 = new Date(2025, 11, 16);
console.log('Same day:', isSameDay(date1, date2) ? 'PASS' : 'FAIL');
console.log('Different day:', !isSameDay(date1, date3) ? 'PASS' : 'FAIL');

// Test formatDate function
console.log('\n=== Testing formatDate ===');
const testFormatDate = new Date(2025, 11, 15);
console.log('Short:', formatDate(testFormatDate, 'short'));
console.log('Long:', formatDate(testFormatDate, 'long'));
console.log('Numeric:', formatDate(testFormatDate, 'numeric'));
console.log('Custom (YYYY-MM-DD):', formatDate(testFormatDate, 'YYYY-MM-DD'));
console.log('Custom (MMM DD, YYYY):', formatDate(testFormatDate, 'MMM DD, YYYY'));
console.log('Custom (dddd, MMMM DD, YYYY):', formatDate(testFormatDate, 'dddd, MMMM DD, YYYY'));

console.log('\n✅ All tests complete!');
