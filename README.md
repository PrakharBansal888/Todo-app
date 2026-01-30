# To-Do List Application

An industry-ready, feature-rich to-do list application built with modern web technologies.

## 🚀 Features

- ✅ **Create, Edit, Delete Tasks** - Full CRUD operations
- 📊 **Task Prioritization** - High, Medium, Low priority levels
- 🔍 **Advanced Filtering** - Filter by status, priority, and search
- 💾 **Local Storage** - Automatic data persistence
- 📈 **Statistics Dashboard** - Track completion rates and productivity
- 🎨 **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Built with Vite for optimal speed

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Local Storage API** - Client-side data persistence

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🎯 Usage

1. **Add a Task**: Fill in the form with title, description (optional), and priority
2. **Edit a Task**: Click the "Edit" button on any task
3. **Complete a Task**: Check the checkbox to mark as complete
4. **Delete a Task**: Click the "Delete" button
5. **Filter Tasks**: Use the filter dropdowns to view specific tasks
6. **Search**: Type in the search box to find tasks by title or description

## 📊 Project Structure

```
src/
├── components/
│   ├── TaskForm.tsx      # Form for adding/editing tasks
│   ├── TaskItem.tsx      # Individual task display
│   ├── TaskFilters.tsx   # Filter and search controls
│   └── TaskStats.tsx     # Statistics dashboard
├── types.ts              # TypeScript type definitions
├── storage.ts            # Local storage utilities
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features in Detail

### Task Management
- Create tasks with titles and descriptions
- Set priority levels (High, Medium, Low)
- Edit existing tasks
- Delete tasks with confirmation
- Toggle completion status

### Filtering & Search
- Filter by completion status (All, Active, Completed)
- Filter by priority level
- Real-time search across titles and descriptions

### Statistics
- Total task count
- Completed vs. active tasks
- Completion percentage
- High-priority active tasks counter

### Data Persistence
- Automatic saving to browser local storage
- Data persists across sessions
- No backend required

## 🚀 Future Enhancements

Potential features for future versions:
- Due dates and reminders
- Task categories/tags
- Drag-and-drop reordering
- Dark mode toggle
- Export/import functionality
- Cloud sync with backend
- Multiple task lists
- Collaboration features

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

Built with best practices including:
- TypeScript for type safety
- React hooks for state management
- Component-based architecture
- Responsive design principles
- Clean code and separation of concerns

---

**Enjoy staying organized with your To-Do List! 📝✨**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
