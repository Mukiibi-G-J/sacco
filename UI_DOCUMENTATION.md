# User Interface Documentation

## Overview

This document provides a comprehensive, structured description of the application's user interface, focusing on the login page and dashboard layout. The description uses generic, non-branded terminology to facilitate implementation in new applications.

---

## 1. Login Page

### 1.1 Page Structure

**Layout:**
- Full viewport height container with gradient background
- Two-column grid layout on large screens (≥992px), single column on smaller screens
- Centered content with responsive padding
- Maximum width constraint of 6xl (1152px) for the grid container

**Background:**
- Subtle gradient background transitioning from light teal tint to white to light yellow tint
- Applied across the entire viewport

**Grid Configuration:**
- Desktop (≥992px): Two equal columns with gap spacing
- Mobile/Tablet (<992px): Single column stack
- Both columns centered vertically and horizontally

### 1.2 Left Column - Login Form

**Container:**
- Centered card component with maximum width constraint
- White background with rounded corners
- Padding: 2rem (32px) on all sides
- Subtle shadow for elevation

**Header Section:**
- Centered alignment
- Circular icon container (64px × 64px) with dark teal background
- White shield icon (32px × 32px) centered in icon container
- Main heading: "Welcome to [Application Name]"
  - Font size: 1.5rem (24px)
  - Font weight: Bold (700)
  - Color: Dark text color
  - Margin bottom: 0.5rem (8px)
- Subtitle text:
  - Font size: Base (16px)
  - Color: Body text color
  - Descriptive text about signing in

**Error Message Display:**
- Conditional rendering when authentication errors occur
- Container with light red background and red border
- Padding: 1rem (16px)
- Border radius: 0.5rem (8px)
- Error text in red color, small font size

**Form Structure:**
- Vertical spacing between form fields: 1.5rem (24px)
- All form fields are required

**Email Input Field:**
- Label: "Email Address"
  - Font size: Small (14px)
  - Font weight: Medium (500)
  - Color: Dark text color
  - Margin bottom: 0.5rem (8px)
- Input container with relative positioning
- Left icon: User icon (16px × 16px)
  - Positioned absolutely at left edge
  - Color: Body text color
  - Vertical centering
- Text input:
  - Full width
  - Left padding: 2.5rem (40px) to accommodate icon
  - Standard input styling with border
  - Placeholder text: "Enter your email"
  - Type: Email (with browser validation)

**Password Input Field:**
- Label: "Password"
  - Same styling as email label
- Input container with relative positioning
- Left icon: Lock icon (16px × 16px)
  - Same positioning as email icon
- Right icon button: Eye/EyeOff toggle (16px × 16px)
  - Positioned absolutely at right edge
  - Clickable to toggle password visibility
  - Hover state changes color
- Text input:
  - Full width
  - Left padding: 2.5rem (40px)
  - Right padding: 2.5rem (40px) to accommodate toggle
  - Placeholder text: "Enter your password"
  - Type: Password (or text when visible)

**Role Selection Field:**
- Label: "Role (Optional)"
  - Same styling as other labels
- Dropdown select component:
  - Full width
  - Standard select styling
  - Placeholder: "Select your role"
  - Options include: All Roles, HR Manager, Payroll Administrator, Business Owner, Employee

**Submit Button:**
- Full width button
- Primary button styling (dark teal background, white text)
- Right arrow icon (16px × 16px) with left margin
- Loading state: Shows "Signing in..." text when submitting
- Disabled state when submitting or loading
- Hover effect: Slight background opacity change

**Footer Link:**
- Centered text
- Small font size
- Link to contact/registration page
- Hover state: Color change to accent color

### 1.3 Right Column - Role Selection

**Container:**
- Maximum width constraint matching form card
- Centered content

**Header Section:**
- Centered alignment
- Heading: "Demo Roles"
  - Font size: 1.25rem (20px)
  - Font weight: Semibold (600)
  - Color: Dark text color
  - Margin bottom: 0.5rem (8px)
- Subtitle text:
  - Font size: Base (16px)
  - Color: Body text color
  - Instructions for role selection

**Role Cards:**
- Vertical stack with spacing: 1rem (16px) between cards
- Each card is a clickable button
- Card styling:
  - Full width
  - Padding: 1rem (16px)
  - Rounded corners: 0.5rem (8px)
  - Light background color (varies by role)
  - Border: 2px transparent (becomes visible on hover)
  - Hover effect: Border color changes to light teal tint
  - Transition: Smooth color transitions

**Role Card Content:**
- Horizontal flex layout with gap: 1rem (16px)
- Icon container: 48px × 48px square
  - Rounded corners: 0.5rem (8px)
  - Background matches card background
  - Centered icon (24px × 24px) with role-specific color
- Text section (flexible width):
  - Role title: Semibold font, dark text color
  - Role description: Small font size, body text color
- Right arrow icon: 16px × 16px, body text color

**Role Color Scheme:**
- HR Manager: Blue theme (blue-50 background, blue-600 icon)
- Payroll Administrator: Green theme (green-50 background, green-600 icon)
- Business Owner: Purple theme (purple-50 background, purple-600 icon)
- Employee: Orange theme (orange-50 background, orange-600 icon)

**Demo Credentials Section:**
- Information card at bottom
- Light blue background
- Padding: 1rem (16px)
- Rounded corners: 0.5rem (8px)
- Heading: "Demo Credentials"
  - Font weight: Semibold
  - Color: Dark blue
  - Margin bottom: 0.5rem (8px)
- Description text: Small font, blue color
- Code snippet: Inline code with light blue background
- Credential list: Extra small font, blue color, bullet points

### 1.4 Responsive Behavior

**Mobile (<768px):**
- Single column layout
- Reduced padding on cards
- Stacked form fields
- Role selection cards remain full width
- Demo credentials section remains visible

**Tablet (768px - 991px):**
- Single column layout maintained
- Increased spacing between sections
- Form and role selection maintain maximum width constraints

**Desktop (≥992px):**
- Two-column side-by-side layout
- Equal column widths
- Increased spacing between columns

---

## 2. Dashboard Layout

### 2.1 Overall Structure

**Container:**
- Full viewport height (100vh)
- Flex layout with horizontal orientation
- Light gray background color
- No overflow on main container

**Layout Components:**
1. Sidebar (left side, collapsible)
2. Main content area (right side, flexible width)
   - Header (top)
   - Content area (scrollable)

### 2.2 Sidebar Component

**Desktop Sidebar (≥992px):**

**Container:**
- Fixed width: 256px (16rem) when expanded
- Collapsed width: 64px (4rem) when collapsed
- Full height (100vh)
- White background
- Right border: 1px solid light gray
- Smooth transition animation (300ms) for width changes
- Hidden on mobile/tablet

**Header Section:**
- Height: 64px (4rem)
- Horizontal flex layout
- Border bottom: 1px solid light gray
- Padding: 1rem (16px) horizontal
- Space between logo and toggle button

**Logo Section (when expanded):**
- Horizontal flex with gap: 0.5rem (8px)
- Square logo container: 32px × 32px
  - Dark teal background
  - Rounded corners: 0.5rem (8px)
  - White letter "A" centered, bold, small font
- Application name text:
  - Font weight: Semibold (600)
  - Color: Dark text color

**Collapse Toggle Button:**
- Square button: 32px × 32px
- Padding: 0.5rem (8px)
- Rounded corners: 0.5rem (8px)
- Hover: Light gray background
- Icon: Chevron left (expanded) or Chevron right (collapsed)
- Icon size: 16px × 16px
- Smooth transition on hover

**Navigation Section:**
- Flexible height (fills remaining space)
- Padding: 1rem (16px) horizontal, 1.5rem (24px) vertical
- Vertical spacing between items: 0.5rem (8px)

**Navigation Items:**
- Each item is a link component
- Horizontal flex layout with gap: 0.75rem (12px)
- Padding: 0.75rem (12px) horizontal, 0.5rem (8px) vertical
- Rounded corners: 0.5rem (8px)
- Font size: Small (14px)
- Font weight: Medium (500)
- Smooth color transitions

**Navigation Item States:**
- **Default:**
  - Text color: Body text color
  - Background: Transparent
- **Hover:**
  - Background: Light gray
  - Text color: Dark text color
- **Active:**
  - Background: Dark teal
  - Text color: White
- **Collapsed:**
  - Icons centered
  - Text hidden (screen reader only)

**Navigation Icons:**
- Size: 20px × 20px
- Fixed width to prevent layout shift
- Color inherits from parent state

**Footer Section:**
- Fixed at bottom
- Padding: 1rem (16px)
- Border top: 1px solid light gray
- User information display

**User Info (when expanded):**
- Horizontal flex with gap: 0.75rem (12px)
- Avatar circle: 32px × 32px
  - Light gray background
  - User initials centered, extra small font, medium weight
- Text section (flexible, truncated):
  - Name: Small font, medium weight, dark text color
  - Role/Position: Extra small font, body text color

**Mobile Sidebar (<992px):**

**Overlay:**
- Fixed position covering entire viewport
- Dark background with 50% opacity
- Z-index: 40
- Click to close functionality

**Sidebar Container:**
- Fixed position, left side
- Full height
- Width: 256px (16rem)
- White background
- Z-index: 50
- Transform animation: Slides in from left (-100% to 0%)
- Transition duration: 300ms
- Ease-in-out timing

**Mobile Menu Toggle:**
- Hamburger icon button in header
- Visible only on mobile/tablet
- Same styling as other header buttons

### 2.3 Dashboard Header

**Container:**
- Height: 64px (4rem)
- Horizontal flex layout
- White background
- Border bottom: 1px solid light gray
- Padding: 1.5rem (24px) horizontal
- Space between left, center, and right sections

**Left Section:**
- Horizontal flex with gap: 1rem (16px)
- Mobile menu button (mobile only):
  - Square button: 40px × 40px
  - Padding: 0.5rem (8px)
  - Rounded corners: 0.5rem (8px)
  - Hover: Light gray background
  - Hamburger icon: 20px × 20px
- Page title:
  - Font size: 1.25rem (20px)
  - Font weight: Semibold (600)
  - Color: Dark text color
- Subtitle (optional):
  - Font size: Small (14px)
  - Color: Body text color
  - Displayed below title

**Center Section - Search (Desktop only, ≥768px):**
- Flexible width with maximum constraint
- Centered with horizontal margins
- Search input container with relative positioning
- Search icon: 16px × 16px
  - Positioned absolutely at left edge
  - Color: Body text color
  - Vertical centering
- Text input:
  - Full width
  - Left padding: 2.5rem (40px)
  - Standard input styling
  - Placeholder: "Search employees, payroll, reports..."
  - Focus state: Border color changes to accent color
  - Border radius: 0.5rem (8px)

**Right Section:**
- Horizontal flex with gap: 0.75rem (12px)
- Aligned to right edge

**Search Button (Mobile only, <768px):**
- Square button: 40px × 40px
- Same styling as other icon buttons
- Search icon: 20px × 20px

**Notifications Button:**
- Square button: 40px × 40px
- Same styling as other icon buttons
- Bell icon: 20px × 20px
- Notification indicator:
  - Small red dot (8px × 8px)
  - Positioned absolutely at top-right
  - Border radius: 50% (circle)

**User Menu:**
- Relative positioned container
- Button: Horizontal flex with gap: 0.75rem (12px)
  - Padding: 0.5rem (8px)
  - Rounded corners: 0.5rem (8px)
  - Hover: Light gray background
- User info (hidden on small screens):
  - Text aligned right
  - Name: Small font, medium weight, dark text color
  - Role: Extra small font, body text color
- Avatar circle: 32px × 32px
  - Light gray background
  - User icon: 16px × 16px, dark text color

**User Dropdown Menu:**
- Absolute positioning, right aligned
- Top margin: 0.5rem (8px)
- Width: 192px (12rem)
- White background
- Border: 1px solid light gray
- Border radius: 0.5rem (8px)
- Shadow: Large shadow for elevation
- Z-index: 50
- Menu items:
  - Vertical list
  - Padding: 0.25rem (4px) vertical
- Menu item button:
  - Full width
  - Horizontal flex with gap: 0.75rem (12px)
  - Padding: 1rem (16px) horizontal, 0.5rem (8px) vertical
  - Small font size
  - Dark text color
  - Hover: Light gray background
  - Icon: 16px × 16px
- Divider: 1px solid light gray, vertical margins
- Sign out item: Red text color, red background on hover

### 2.4 Main Content Area

**Container:**
- Flexible width (fills remaining space)
- Vertical flex layout
- Overflow hidden on container

**Content Wrapper:**
- Flexible height (fills remaining space)
- Scrollable (overflow auto)
- Padding: 1.5rem (24px) on all sides

**Breadcrumb Navigation:**
- Horizontal flex layout
- Small font size
- Spacing: 0.25rem (4px) between items
- Chevron separators: 16px × 16px, body text color
- Links: Body text color, hover changes to dark text color
- Current page: Dark text color, medium font weight
- Home icon: 16px × 16px

**Page Content:**
- Vertical spacing: 1.5rem (24px) between sections
- Responsive grid layouts for content sections

### 2.5 Dashboard Home Page

**Page Header:**
- Main heading:
  - Font size: 1.5rem (24px)
  - Font weight: Bold (700)
  - Color: Dark text color
  - Margin bottom: 0.5rem (8px)
- Subtitle:
  - Font size: Base (16px)
  - Color: Body text color
  - Descriptive welcome text

**Statistics Grid:**
- Responsive grid layout
- Mobile: 1 column
- Tablet (≥768px): 2 columns
- Desktop (≥992px): 4 columns
- Gap between cards: 1.5rem (24px)

**Stat Card:**
- White background
- Padding: 1.5rem (24px)
- Rounded corners: 0.5rem (8px)
- Border: 1px solid light gray
- Subtle shadow
- Horizontal flex layout (space between)
- Left section:
  - Stat title: Small font, medium weight, body text color
  - Stat value: 1.5rem (24px) font size, bold, dark text color
- Right section:
  - Icon container: 48px × 48px square
  - Light teal background (10% opacity)
  - Rounded corners: 0.5rem (8px)
  - Centered icon: 24px × 24px, dark teal color
- Bottom section:
  - Change indicator: Small font, medium weight
  - Positive: Green color
  - Negative: Red color
  - Comparison text: Small font, body text color

**Main Content Grid:**
- Responsive grid layout
- Mobile: 1 column
- Desktop (≥992px): 3 columns
- Gap between sections: 1.5rem (24px)

**Recent Activity Card:**
- Spans 2 columns on desktop
- White background card
- Padding: 1.5rem (24px)
- Header: Horizontal flex (space between)
  - Heading: Large font (18px), semibold, dark text color
  - Action button: Outline variant, small size
- Activity list: Vertical spacing: 1rem (16px)
- Activity item:
  - Horizontal flex with gap: 1rem (16px)
  - Padding: 0.75rem (12px)
  - Rounded corners: 0.5rem (8px)
  - Hover: Light gray background
  - Icon container: 40px × 40px square
    - Light teal background (10% opacity)
    - Rounded corners: 0.5rem (8px)
    - Centered icon: 20px × 20px, dark teal color
  - Text section (flexible):
    - Activity message: Small font, medium weight, dark text color
    - Timestamp: Extra small font, body text color

**Quick Actions Card:**
- Spans 1 column on desktop
- White background card
- Padding: 1.5rem (24px)
- Heading: Large font (18px), semibold, dark text color
- Action buttons: Vertical stack with spacing: 0.75rem (12px)
- Action button:
  - Full width
  - Left-aligned content
  - Outline variant
  - Icon: 16px × 16px, left margin
  - Text: Base font size

---

## 3. UI Components

### 3.1 Button Component

**Base Styling:**
- Inline flex layout
- Items centered horizontally and vertically
- Rounded corners: 0.5rem (8px)
- Small font size (14px)
- Medium font weight (500)
- Smooth color transitions
- Focus state: 2px ring with offset
- Disabled state: 50% opacity, no pointer events

**Variants:**

**Default:**
- Background: Accent yellow
- Text: Dark text color
- Hover: 90% opacity background

**Primary:**
- Background: Dark teal
- Text: White
- Hover: 90% opacity background

**Secondary:**
- Background: Light gray
- Text: Dark text color
- Hover: 80% opacity background

**Outline:**
- Border: 1px solid light gray
- Background: White
- Text: Dark text color
- Hover: Light gray background

**Ghost:**
- Background: Transparent
- Text: Dark text color
- Hover: Light gray background

**Link:**
- Background: Transparent
- Text: Dark teal
- Underline on hover

**Destructive:**
- Background: Red
- Text: White
- Hover: 90% opacity background

**Sizes:**

**Small:**
- Height: 36px (2.25rem)
- Padding: 0.75rem (12px) horizontal
- Rounded corners: 0.375rem (6px)

**Default:**
- Height: 40px (2.5rem)
- Padding: 1rem (16px) horizontal, 0.5rem (8px) vertical

**Large:**
- Height: 44px (2.75rem)
- Padding: 2rem (32px) horizontal
- Rounded corners: 0.5rem (8px)

**Extra Large:**
- Height: 48px (3rem)
- Padding: 2.5rem (40px) horizontal
- Base font size (16px)

**Icon:**
- Height: 40px (2.5rem)
- Width: 40px (2.5rem)
- Square button

**Loading State:**
- Spinner icon (16px × 16px)
- Right margin: 0.5rem (8px)
- Rotating animation
- Disabled state applied

### 3.2 Card Component

**Base Card:**
- Rounded corners: 0.5rem (8px)
- Border: 1px solid light gray
- White background
- Text: Dark text color
- Subtle shadow

**Card Header:**
- Padding: 1.5rem (24px)
- Vertical spacing: 0.375rem (6px)
- Flex column layout

**Card Title:**
- Font size: 1.5rem (24px)
- Font weight: Semibold (600)
- No line height tracking
- Tight letter spacing

**Card Description:**
- Small font size (14px)
- Body text color

**Card Content:**
- Padding: 1.5rem (24px)
- Top padding: 0 (overridden)

**Card Footer:**
- Padding: 1.5rem (24px)
- Top padding: 0 (overridden)
- Horizontal flex layout
- Items centered

### 3.3 Input Component

**Container:**
- Vertical spacing: 0.5rem (8px) between label and input

**Label:**
- Block display
- Small font size (14px)
- Medium font weight (500)
- Color: Dark teal
- Required indicator: Red asterisk with left margin

**Input Wrapper:**
- Relative positioning
- Supports left and right icons

**Input Field:**
- Height: 40px (2.5rem)
- Full width
- Rounded corners: 0.5rem (8px)
- Border: 1px solid light gray
- White background
- Padding: 0.75rem (12px) horizontal, 0.5rem (8px) vertical
- Small font size (14px)
- Placeholder: Body text color
- Focus state:
  - No default outline
  - 2px ring with accent color
  - Ring offset: 2px
- Disabled state:
  - No cursor
  - 50% opacity
- Icon padding:
  - Left icon: 2.5rem (40px) left padding
  - Right icon: 2.5rem (40px) right padding

**Left Icon:**
- Absolute positioning
- Left: 0.75rem (12px)
- Vertical centering
- Color: Body text color

**Right Icon:**
- Absolute positioning
- Right: 0.75rem (12px)
- Vertical centering
- Color: Body text color

**Error State:**
- Border color: Red
- Focus ring: Red

**Error Message:**
- Small font size (14px)
- Red text color
- Horizontal flex with gap
- Error icon: 16px × 16px

**Helper Text:**
- Small font size (14px)
- Body text color
- Only shown when no error

### 3.4 Select Component

**Container:**
- Same structure as Input component

**Select Field:**
- Height: 40px (2.5rem)
- Full width
- Rounded corners: 0.5rem (8px)
- Border: 1px solid light gray
- White background
- Padding: 0.75rem (12px) horizontal, 0.5rem (8px) vertical
- Small font size (14px)
- Focus state: Same as Input
- Disabled state: Same as Input

**Options:**
- Standard select dropdown styling
- Placeholder option supported

**Error and Helper Text:**
- Same as Input component

### 3.5 Breadcrumb Component

**Container:**
- Horizontal flex layout
- Items centered
- Small font size (14px)
- Spacing: 0.25rem (4px) between items

**Breadcrumb List:**
- Ordered list (semantic HTML)
- Horizontal flex layout
- Items centered
- Spacing: 0.25rem (4px) between items

**Breadcrumb Item:**
- Flex layout
- Items centered

**Separator:**
- Chevron right icon: 16px × 16px
- Body text color
- Horizontal margins: 0.25rem (4px)

**Link:**
- Body text color
- Hover: Dark text color
- Smooth color transition
- Home icon: 16px × 16px, inline with text

**Current Page:**
- Dark text color
- Medium font weight (500)
- No link styling
- Home icon: 16px × 16px, inline with text

---

## 4. Design System

### 4.1 Color Palette

**Primary Colors:**
- Dark Teal (s1): #005151 - Primary brand color, buttons, active states
- Accent Yellow (s2): #ffbf3f - CTA buttons, highlights
- Secondary Yellow (s3): #e8a115 - Hover states, secondary actions
- Primary Accent (p1): #1a938a - Links, active navigation

**Text Colors:**
- Main Text: #060b1e - Headings, primary text
- Body Text: #3b4a46 - Secondary text, descriptions

**Background Colors:**
- White: #ffffff - Card backgrounds, main content
- Soft Background: #f7f7f7 - Page backgrounds, hover states
- Soft Teal Background: #eafaf8 - Accent backgrounds

**Border Colors:**
- Stroke Color: #e5e5e5 - Primary borders
- Light Stroke: #e4e4e4 - Secondary borders

**State Colors:**
- Success: Green (#10b981) - Positive indicators
- Error: Red (#ef4444) - Error messages, destructive actions
- Warning: Yellow (#f59e0b) - Warning indicators
- Info: Blue (#3b82f6) - Information messages

### 4.2 Typography

**Font Family:**
- Primary: "Outfit", sans-serif
- Weights: 300, 400, 500, 600, 700, 800

**Font Sizes:**
- Display 2: 88px (desktop) / 60px (tablet) / 36px (mobile) - Hero headings
- Display 3: 64px (desktop) / 48px (tablet) / 24px (mobile) - Section headings
- Display 4: 56px (desktop) / 48px (tablet) / 24px (mobile) - Subsection headings
- Extra Large: 20px - Large text
- Large: 18px - Medium-large text
- Base: 16px - Body text
- Small: 14px - Secondary text, labels
- Extra Small: 12px - Timestamps, metadata

**Line Heights:**
- Display: 1 (tight)
- Headings: 1.2 - 1.5
- Body: 1.5 - 1.75

**Font Weights:**
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extra Bold: 800

### 4.3 Spacing System

**Base Unit:**
- 4px (0.25rem) - Base spacing unit

**Common Spacings:**
- 4px (0.25rem) - Tight spacing
- 8px (0.5rem) - Small spacing
- 12px (0.75rem) - Medium spacing
- 16px (1rem) - Standard spacing
- 24px (1.5rem) - Large spacing
- 32px (2rem) - Extra large spacing
- 48px (3rem) - Section spacing
- 60px (3.75rem) - Section padding

**Component Spacing:**
- Form fields: 24px (1.5rem) vertical
- Card padding: 24px (1.5rem)
- Section spacing: 24px (1.5rem)
- Grid gaps: 24px (1.5rem)

### 4.4 Border Radius

- Small: 0.25rem (4px) - Small elements
- Medium: 0.375rem (6px) - Buttons, small cards
- Large: 0.5rem (8px) - Cards, inputs, buttons (default)
- Extra Large: 0.75rem (12px) - Large cards
- Full: 50% - Circles, pills

### 4.5 Shadows

- None: No shadow
- Small: Subtle elevation for cards
- Medium: Moderate elevation
- Large: High elevation for dropdowns, modals

### 4.6 Transitions

**Duration:**
- Fast: 150ms - Quick interactions
- Default: 300ms - Standard transitions
- Slow: 500ms - Complex animations
- Very Slow: 700ms - Menu animations

**Timing Functions:**
- Ease-in-out: Smooth acceleration/deceleration
- Ease-out: Fast start, slow end
- Ease-in: Slow start, fast end

**Properties:**
- Color: All color changes
- Background: Background color changes
- Transform: Position, scale, rotation changes
- Opacity: Fade in/out effects

---

## 5. Responsive Layout Rules

### 5.1 Breakpoints

- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: ≥ 992px
- Large Desktop: ≥ 1200px

### 5.2 Mobile Layout (< 768px)

**Login Page:**
- Single column layout
- Full width cards
- Reduced padding (1rem)
- Stacked form fields
- Role selection below form

**Dashboard:**
- Sidebar: Hidden by default, slide-out menu
- Header: Full width, hamburger menu button
- Search: Hidden, icon button in header
- Content: Full width, reduced padding (1rem)
- Stats grid: 1 column
- Content grid: 1 column
- User menu: Avatar only, name hidden

### 5.3 Tablet Layout (768px - 991px)

**Login Page:**
- Single column layout maintained
- Increased spacing
- Cards maintain maximum width

**Dashboard:**
- Sidebar: Hidden by default, slide-out menu
- Header: Full width
- Search: Hidden, icon button in header
- Content: Full width, standard padding
- Stats grid: 2 columns
- Content grid: 1 column
- User menu: Avatar and name visible

### 5.4 Desktop Layout (≥ 992px)

**Login Page:**
- Two-column side-by-side layout
- Equal column widths
- Maximum container width: 1152px

**Dashboard:**
- Sidebar: Always visible, collapsible
- Header: Full width
- Search: Visible in header center
- Content: Flexible width
- Stats grid: 4 columns
- Content grid: 3 columns
- User menu: Full information visible

### 5.5 Large Desktop Layout (≥ 1200px)

**All Pages:**
- Increased maximum container widths
- Larger font sizes for display text
- Increased spacing where appropriate
- Maintained proportions

---

## 6. User Interactions and Behavior

### 6.1 Form Interactions

**Input Focus:**
- Border color changes to accent color
- Ring appears around input (2px, with offset)
- Smooth transition

**Input Validation:**
- Real-time validation on blur
- Error message appears below input
- Red border and focus ring
- Error icon displayed

**Password Toggle:**
- Eye icon changes to EyeOff when visible
- Smooth icon transition
- Password type toggles between "password" and "text"

**Button States:**
- Hover: Background opacity change (90%)
- Active: Slight scale down (optional)
- Disabled: 50% opacity, no pointer events
- Loading: Spinner icon, disabled state

**Form Submission:**
- Button shows loading state
- Form disabled during submission
- Error messages displayed if submission fails
- Success redirect on completion

### 6.2 Navigation Interactions

**Sidebar Navigation:**
- Active item highlighted with dark teal background
- Hover state: Light gray background
- Smooth color transitions
- Keyboard navigation supported

**Breadcrumb Navigation:**
- Links change color on hover
- Current page non-clickable
- Smooth color transitions

**Header Navigation:**
- Search: Focus ring on focus
- Notifications: Click opens dropdown (future)
- User menu: Click toggles dropdown
- Dropdown closes on outside click
- Keyboard navigation supported

### 6.3 Card Interactions

**Clickable Cards:**
- Cursor changes to pointer
- Hover: Background color change
- Smooth transitions
- Focus state for keyboard navigation

**Stat Cards:**
- Non-interactive (display only)
- Hover: Subtle shadow increase (optional)

**Activity Items:**
- Hover: Background color change
- Smooth transitions
- Clickable (future: navigate to detail)

### 6.4 Responsive Interactions

**Mobile Menu:**
- Hamburger button toggles sidebar
- Overlay appears behind sidebar
- Click overlay to close
- Smooth slide animation (300ms)
- Sidebar slides in from left

**Desktop Sidebar:**
- Toggle button collapses/expands
- Width animates smoothly (300ms)
- Icons remain visible when collapsed
- Text hidden when collapsed (screen reader accessible)

**Search:**
- Mobile: Icon button opens search modal (future)
- Desktop: Inline search in header
- Focus ring on focus
- Clear button on input (future)

---

## 7. Reusable Components

### 7.1 Layout Components

**DashboardLayout:**
- Main dashboard container
- Manages sidebar state
- Handles responsive behavior
- Accepts children for page content

**Sidebar:**
- Navigation menu
- Role-based filtering
- Collapsible functionality
- User information display

**DashboardHeader:**
- Top navigation bar
- Search functionality
- Notifications
- User menu
- Configurable visibility options

**Breadcrumb:**
- Navigation breadcrumbs
- Auto-generated from route
- Home link support
- Current page indication

### 7.2 Form Components

**Input:**
- Text input with icons
- Label support
- Error handling
- Helper text
- Validation states

**Select:**
- Dropdown selection
- Label support
- Error handling
- Helper text
- Placeholder support

**Button:**
- Multiple variants
- Multiple sizes
- Loading state
- Icon support
- Disabled state

### 7.3 Display Components

**Card:**
- Container component
- Header, content, footer sections
- Consistent styling
- Shadow and border

**Badge:**
- Status indicators
- Color variants
- Small text display

**Table:**
- Data display
- Sortable columns (future)
- Responsive design
- Row actions (future)

### 7.4 Feedback Components

**Error Message:**
- Red text
- Error icon
- Below form fields

**Success Message:**
- Green text
- Success icon
- Toast notification (future)

**Loading Spinner:**
- Rotating animation
- Centered display
- Button integration

---

## 8. Accessibility Features

### 8.1 Keyboard Navigation

- All interactive elements keyboard accessible
- Tab order follows visual flow
- Enter/Space activate buttons
- Escape closes modals/dropdowns
- Arrow keys for navigation (where applicable)

### 8.2 Focus Management

- Visible focus indicators (2px ring)
- Focus ring offset for visibility
- Focus trap in modals
- Focus restoration on close

### 8.3 Screen Reader Support

- Semantic HTML elements
- ARIA labels where needed
- ARIA roles and properties
- Hidden text for screen readers
- Live regions for dynamic content

### 8.4 Color Contrast

- WCAG AA compliant contrast ratios
- Text on backgrounds meets standards
- Interactive elements clearly distinguishable
- Error states use color and text

### 8.5 Form Accessibility

- Labels associated with inputs
- Required fields indicated
- Error messages associated with fields
- Helper text provides context
- Form validation announced

---

## 9. Animation and Transitions

### 9.1 Page Transitions

- Smooth route transitions (framework dependent)
- Loading states during navigation
- Content fade-in on load

### 9.2 Component Animations

**Sidebar:**
- Width transition: 300ms ease-in-out
- Slide animation: 300ms ease-in-out (mobile)

**Dropdowns:**
- Fade in: 200ms ease-out
- Slide down: 200ms ease-out

**Buttons:**
- Color transitions: 150ms ease-in-out
- Scale on active (optional): 100ms

**Cards:**
- Hover transitions: 200ms ease-in-out
- Shadow transitions: 200ms ease-in-out

### 9.3 Loading States

- Spinner rotation: Continuous
- Skeleton loaders (future)
- Progress indicators (future)

---

## 10. Implementation Notes

### 10.1 Component Structure

- Components use React functional components
- TypeScript for type safety
- Forward refs for DOM access
- Compound components where applicable

### 10.2 Styling Approach

- Tailwind CSS for utility classes
- Custom color tokens in theme
- CSS variables for dynamic values
- Class variance authority for variants

### 10.3 State Management

- React Context for global state
- Local state for component-specific data
- Custom hooks for reusable logic
- Form state management with React Hook Form

### 10.4 Performance Considerations

- Lazy loading for routes
- Code splitting for large components
- Image optimization
- Memoization for expensive computations

---

## Conclusion

This documentation provides a comprehensive overview of the application's user interface, focusing on the login page and dashboard layout. The descriptions use generic terminology to facilitate implementation in new applications while maintaining the structural and visual characteristics of the original design.

All measurements, colors, and behaviors are documented to enable accurate recreation of the user experience across different platforms and frameworks.

