# Implementation Plan: Kamus Klasifikasi Rincian Output

## 1. Overview
"Kamus Klasifikasi Rincian Output" is a web application designed to load, sort, and search classification data from a local `.xlsx` or `.csv` file bundled within the project. The application will feature a highly responsive and modern UI, styled strictly according to the Meta-inspired `DESIGN.md` guidelines (stark white canvas, high-quality typography, and pill-shaped UI components).

## 2. Tech Stack
- **Framework:** Next.js (App Router) for built-in server-side data loading.
- **Styling:** Tailwind CSS, customized to match the tokens in `DESIGN.md`.
- **Data Parsing:** `xlsx` (SheetJS) or `papaparse` to read and parse the static data file.
- **Icons:** `lucide-react` for modern, clean iconography.
- **State Management:** React Hooks (`useState`, `useMemo`) for client-side search filtering and sorting.

## 3. Data Ingestion Strategy
- **Source Location:** The `.csv` or `.xlsx` file will be stored directly in the project repository (e.g., in a `data/` or `public/` directory).
- **Loading Mechanism:** Since the file is part of the project, Next.js will read and parse the file on the server side at build time or request time (via React Server Components or API routes) to ensure optimal performance. The parsed JSON data will then be passed to the client for interactive searching and sorting.

## 4. UI/UX & Design System Integration
The application will strictly adhere to the `DESIGN.md` constraints:
- **Typography:** Optimistic VF (with fallbacks to Montserrat/Helvetica), utilizing negative letter spacing for body text and specific stylistic sets (`ss01`, `ss02`) for headings.
- **Color Palette:** Stark white canvas (`#ffffff`), deep ink text (`#0a1317`), and cobalt primary (`#0064e0`) reserved exclusively for primary actions. Search inputs will use the soft cloud (`#f1f4f7`) background.
- **Components:**
  - **Header:** Minimalist top navigation bar.
  - **Search Bar:** Implemented as a `search-pill` (`rounded-full`, soft cloud background) for filtering the dictionary.
  - **Sort Controls:** Implemented using `button-pill-tab` (pill-shaped toggles) to switch sorting criteria.
  - **Data Display:** Data will be displayed either in a `tech-specs-table` format (with hairline-soft borders) or as individual `card-product-feature` cards with 32px (`rounded-xxxl`) rounding.

## 5. Step-by-Step Implementation

### Phase 1: Setup & Configuration
1. Initialize the Next.js project.
2. Install dependencies (`lucide-react`, `papaparse` / `xlsx`, `clsx`, `tailwind-merge`).
3. Configure `tailwind.config.ts` to include all color tokens, typography, spacing, and border-radius settings defined in `DESIGN.md`.

### Phase 2: Data Layer
1. Create a `data/` directory and place the target `.xlsx` or `.csv` file inside.
2. Build a server-side utility function `lib/data.ts` to parse the file into a structured TypeScript array of objects.

### Phase 3: Component Construction
1. **SearchInput:** A pill-shaped text input to capture the user's search query.
2. **SortToggle:** Pill-tab buttons to allow users to sort by various columns (e.g., Code, Name, Category) in ascending or descending order.
3. **DataTable / DataGrid:** A responsive layout to display the parsed data. It will gracefully collapse into a card-based layout on mobile screens (`< 768px`).

### Phase 4: Page Integration & Logic
1. Load the parsed data in the main `page.tsx`.
2. Implement client-side logic using `useMemo` to filter the data based on the search query.
3. Implement sorting logic to reorder the filtered data based on the selected sort key and direction.
4. Add empty states (e.g., "No classification found") using the appropriate typography (`body-md`, `colors.steel`).

## 6. Known Constraints & Considerations
- The app does not require a file upload feature; it exclusively uses the pre-loaded data.
- Performance: If the data file is exceptionally large (e.g., 10,000+ rows), virtualization (e.g., `@tanstack/react-virtual`) might be needed for the DataGrid to ensure smooth rendering.
