# Features & Visual Guide

## Page Layout Overview

### Home Page (`/`)

The landing page features:
- Hero section with gradient background
- Application title and description
- Three feature cards:
  - **Detailed Reports**: Persona profiles and test analysis
  - **Visual Analytics**: Color-coded insights
  - **Actionable Insights**: Specific recommendations
- Setup instructions panel
- Clean, professional design with icons

### Report Page (`/report/[id]`)

A comprehensive view of test results with the following sections:

## 1. Report Header

**What it shows:**
- Report title: "Onflow UX Report"
- Generation date with calendar icon
- Metadata grid with three cards:
  - Target URL (clickable link)
  - Number of test personas
  - Total tests conducted

**Design:**
- White background with shadow
- Rounded corners
- Blue accent colors
- Icons for visual context

## 2. Test Summary

**What it shows:**
Three large metric cards:

1. **Successful Tests** (Green card)
   - Number of tests that passed
   - Checkmark icon
   - Green gradient background

2. **Failure Rate** (Red/Yellow card)
   - Percentage display
   - Warning/Error icon
   - Color changes based on severity:
     - Red if >50% failure rate
     - Yellow if <50% failure rate

3. **Failed Tests** (Gray card)
   - Count of failed tests
   - Trending down icon
   - Neutral gray gradient

**Design:**
- Large, bold numbers
- Gradient backgrounds
- Border highlights
- Icons matching the sentiment

## 3. Persona Reports

For each test persona, a detailed section displays:

### Persona Header

**Profile Information:**
- Name (large, bold)
- Job title with briefcase icon
- Success/failure badge:
  - Green badge with checkmark if successful
  - Red badge with X if failed

**Details Cards** (Three colored boxes):

1. **Technical Proficiency** (Indigo)
   - Lightning bolt icon
   - Proficiency level (e.g., "Intermediate")

2. **Goal** (Blue)
   - Target icon
   - What the persona was trying to achieve

3. **Motivation** (Purple)
   - Trending up icon
   - Why they're using the product

### Test Results Grid

**Two-column layout:**

#### Left Column: Friction Points (Red section)
- X-circle icon in header
- Count of friction points
- Numbered list with:
  - Circular number badges
  - Detailed description of each issue
- Red gradient background
- Red border

#### Right Column: Positive Aspects (Green section)
- Checkmark icon in header
- Count of positive aspects
- List with checkmark bullets
- Detailed description of each positive
- Green gradient background
- Green border

### Recommended Changes

**What it shows:**
- Warning triangle icon
- Detailed recommendations for improvement
- Multi-paragraph text support
- Amber/orange color scheme
- Gradient background with border

## Color-Coded System

### Success Indicators (Green)
- `from-green-50 to-emerald-50` backgrounds
- `text-green-900` for text
- `border-green-200` for borders
- Used for: Successful tests, positive aspects, checkmarks

### Error/Failure Indicators (Red)
- `from-red-50 to-rose-50` backgrounds
- `text-red-900` for text
- `border-red-200` for borders
- Used for: Failed tests, friction points, errors

### Warning Indicators (Amber/Yellow)
- `from-amber-50 to-orange-50` backgrounds
- `text-amber-900` for text
- `border-amber-200` for borders
- Used for: Recommendations, moderate failure rates

### Info Indicators (Blue/Indigo/Purple)
- Blue: General information, metadata
- Indigo: Technical details
- Purple: Motivation, user insights
- Used for: Persona details, metadata, links

### Neutral (Gray/Slate)
- `from-slate-50 to-gray-50` backgrounds
- `text-slate-900` for text
- Used for: Headers, general content

## Icon System

All icons from **Lucide React**:

- `Calendar`: Dates and timestamps
- `Globe`: URLs and web links
- `Users`: Persona counts
- `Target`: Goals and objectives
- `CheckCircle2`: Success states
- `XCircle`: Failure states
- `AlertTriangle`: Warnings and recommendations
- `Briefcase`: Job titles and roles
- `Zap`: Technical proficiency and speed
- `TrendingUp`: Motivation and growth
- `TrendingDown`: Failures and decline
- `BarChart3`: Analytics and metrics
- `FileText`: Reports and documents

## Responsive Behavior

### Desktop (>1024px)
- Full grid layouts (3 columns for summary, 2 columns for results)
- Side-by-side friction points and positive aspects
- Maximum width of 1280px (max-w-7xl)

### Tablet (768px - 1024px)
- 2-column layouts where applicable
- Stacked persona sections
- Readable font sizes maintained

### Mobile (<768px)
- Single column layout
- Stacked cards
- Touch-friendly tap targets
- Full-width sections

## Typography Scale

- **Hero Title**: `text-6xl` (60px) - Home page
- **Page Title**: `text-4xl` (36px) - Report header
- **Section Titles**: `text-3xl` (30px) - Persona names
- **Subsection Titles**: `text-2xl` (24px) - Summary, subsections
- **Card Titles**: `text-xl` (20px) - Metric cards
- **Body Text**: `text-base` to `text-lg` (16-18px)
- **Labels**: `text-sm` (14px)

## Spacing System

- **Section Gaps**: `mb-8` (32px between major sections)
- **Card Padding**: `p-6` to `p-8` (24-32px)
- **Grid Gaps**: `gap-4` to `gap-6` (16-24px)
- **List Item Spacing**: `space-y-3` (12px)

## Shadow & Borders

- **Cards**: `shadow-xl` for depth
- **Borders**: `border-2` with color-matched borders
- **Rounded Corners**: `rounded-xl` (12px) to `rounded-2xl` (16px)

## Loading States

When a report is loading:
- Centered spinner animation
- Blue accent color
- "Loading report..." text
- Gradient background maintained

## Error States (404)

When a report is not found:
- Large alert icon
- Clear error message
- "Go Home" button
- Centered layout
- Same gradient background for consistency

## Accessibility Features

- Semantic HTML structure
- High contrast text
- Clickable links with hover states
- Keyboard navigation support
- Screen reader friendly icons
- Clear visual hierarchy
- Readable font sizes

## Interactive Elements

- **Links**: Hover effect with color change
- **Buttons**: Hover effect with background color change
- **Cards**: Subtle shadow increase on hover
- All interactive elements have visible focus states

## Footer

Simple, centered footer showing:
- Report UUID
- "Generated by Onflow AI Testing Platform" text
- Gray, understated design
- Small text size

## Best Practices Implemented

1. **Consistent spacing**: 8px grid system
2. **Color psychology**: Green=good, Red=bad, Yellow=warning
3. **Visual hierarchy**: Size and weight indicate importance
4. **Scannable content**: Icons, colors, and spacing help quick scanning
5. **Progressive disclosure**: Information organized by importance
6. **Mobile-first**: Responsive from smallest screens up
7. **Performance**: Optimized images, minimal JavaScript
8. **SEO-ready**: Semantic HTML, proper headings
