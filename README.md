# 🚀 AI Portfolio Generator

> **Transform your resume into a stunning portfolio website in seconds using AI**

An intelligent portfolio generator that uses AI to parse your resume and automatically create beautiful, professional portfolio websites. Built for the Appwrite Hackathon with cutting-edge technologies.

## ✨ Features

### 🤖 AI-Powered Resume Parsing
- **Smart Extraction**: Upload your PDF resume and let AI extract all relevant information
- **Intelligent Processing**: Advanced AI parsing using OpenRouter API with Llama models
- **Structured Data**: Automatically organizes your experience, education, skills, and projects

### 🎨 Multiple Portfolio Templates
- **Modern**: Clean multi-page design with smooth navigation
- **Classic**: Professional multi-page website layout
- **Creative**: Vibrant and artistic portfolio design
- **Minimal**: Clean typography-focused single-page layout
- **Tech**: Interactive terminal-based portfolio with CLI commands

### 📱 Responsive & Interactive
- **Mobile-First**: Fully responsive design that works on all devices
- **Interactive Elements**: Engaging animations and hover effects
- **Dark/Light Mode**: Comprehensive theme support
- **Fast Loading**: Optimized performance with Vite

### 🔧 Manual Creation & Editing
- **Form Builder**: Comprehensive form with guided sections
- **Real-time Preview**: See changes as you build your portfolio
- **Easy Editing**: Update your portfolio anytime
- **Custom Templates**: Choose from multiple professional designs

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for blazing-fast development
- **TailwindCSS** for styling
- **Redux Toolkit** for state management
- **React Hook Form** with Zod validation
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Appwrite** for backend services
- **Appwrite Functions** for serverless computing
- **Appwrite Storage** for file management
- **Appwrite Database** for data persistence

### AI & Processing
- **OpenRouter API** for AI processing
- **Llama Models** for intelligent resume parsing
- **PDF-Parse** for PDF text extraction

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Appwrite account and project setup
- OpenRouter API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Aryan9inja/AppwriteHackathonProject.git
cd AppwriteHackathonProject
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
Create `.env` file in the root directory:
```env
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_DATABASE_ID=your_database_id
VITE_PORTFOLIO_TABLE_ID=your_table_id
VITE_RESUME_BUCKET_ID=your_bucket_id
```

4. **Set up Appwrite Functions**
Deploy the serverless functions in the `functions/` directory:
- `parseResume/` - AI-powered resume parsing
- `incrementViews/` - Portfolio view tracking
- `deletePortfolio/` - Portfolio deletion

5. **Start development server**
```bash
pnpm dev
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard interface
│   ├── forms/           # Form components
│   ├── landing/         # Landing page components
│   ├── portfolioTemplates/ # Portfolio templates
│   └── ui/              # Base UI components
├── pages/               # Page components
├── services/            # API services
├── store/               # Redux store and slices
├── schemas/             # Zod validation schemas
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions

functions/               # Appwrite serverless functions
├── parseResume/         # AI resume parsing function
├── incrementViews/      # View tracking function
└── deletePortfolio/     # Portfolio deletion function
```

## 🎯 How It Works

1. **Upload Resume**: Users upload their PDF resume
2. **AI Processing**: Our AI function extracts and structures the data
3. **Template Selection**: Choose from multiple professional templates
4. **Instant Generation**: Portfolio website is created immediately
5. **Customization**: Edit and refine your portfolio as needed
6. **Share**: Get a shareable link to your live portfolio

## 🌟 Key Features in Detail

### AI Resume Parser
- Extracts personal information, skills, experience, education
- Handles various resume formats and structures
- Organizes data into structured JSON format
- Powered by advanced language models

### Portfolio Templates
Each template offers unique styling and layout:
- **Responsive design** for all screen sizes
- **Interactive elements** and animations
- **Professional typography** and color schemes
- **Optimized performance** and loading times

### Dashboard Management
- View all created portfolios
- Track portfolio statistics and views
- Easy editing and template switching
- Portfolio deletion and management

## 🚀 Deployment

### Frontend (Appwrite Sites)
```bash
pnpm build
# Deploy the dist/ folder
```

### Appwrite Functions
Deploy each function using Appwrite CLI:
```bash
appwrite functions create
appwrite functions deploy
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Project

This project was built for the **Appwrite Sites Hackathon**, showcasing the power of:
- Appwrite Sites for deployment
- Appwrite's backend services
- AI-powered content generation
- Modern React development
- Serverless architecture

## 🙏 Acknowledgments

- **Appwrite** for the amazing backend platform
- **OpenRouter** for AI API access
- **Tailwind CSS** for the beautiful styling system
- **React ecosystem** for the development framework

---

**Made with ❤️ for the Appwrite Sites Hackathon**
