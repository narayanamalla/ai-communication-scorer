# AI Communication Scorer

An intelligent web application designed to analyze and score communication skills through transcript analysis. The platform uses AI-powered evaluation combined with rule-based scoring to provide comprehensive feedback on self-introductions and communication samples.

## 🚀 Features

- **Transcript Analysis**: Submit text transcripts for comprehensive communication evaluation
- **AI-Powered Recommendations**: Leveraging Hugging Face models for intelligent feedback
- **Multi-Criteria Scoring**: Evaluation across 5 key communication dimensions
- **Progress Tracking**: Monitor improvement over multiple submissions
- **Training Prompts**: Practice exercises categorized by skill level and focus area
- **Version Comparison**: Compare multiple transcript versions to track progress
- **Export Reports**: Download analysis results in PDF or Excel format

## 📊 Scoring Formula

The application evaluates transcripts using a **100-point scoring system** divided into 5 criteria (20 points each):

### 1. **Keyword Matching (20 points)**
- Checks for presence of essential professional keywords
- Evaluates industry-specific terminology
- Scores based on exact phrase matches
- **Formula**: `(matched_keywords / total_keywords) * 20`

### 2. **Semantic Analysis (20 points)**
- Uses NLP sentence embeddings to measure contextual similarity
- Analyzes meaning beyond exact word matches
- Evaluates coherence and relevance
- **Formula**: `sentence_embedding_score * 20`

### 3. **Length Requirements (20 points)**
- Optimal word count: 200-300 words
- Penalties for too short or too long submissions
- **Formula**:
  - If word_count < 200: `(word_count / 200) * 20`
  - If 200 ≤ word_count ≤ 300: `20 points`
  - If word_count > 300: `20 - ((word_count - 300) / 10)`

### 4. **Tone Assessment (20 points)**
- Evaluates professional tone and language
- Checks sentiment appropriateness
- Analyzes formality level
- **Formula**: `contextual_similarity_score * 20`

### 5. **Coherence Evaluation (20 points)**
- Measures logical flow and structure
- Evaluates transitional phrases
- Assesses semantic alignment
- **Formula**: `semantic_alignment_score * 20`

### Overall Score Calculation
```
Overall Score = Keyword Score + Semantic Score + Length Score + Tone Score + Coherence Score
Maximum: 100 points
```

### Performance Levels
- **85-100**: Excellent
- **70-84**: Very Good
- **60-69**: Good
- **50-59**: Satisfactory
- **Below 50**: Needs Improvement

## 🛠️ Technologies Used

- **Frontend**: React 18.2.0 with Vite
- **Routing**: React Router DOM 6.0.2
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS 3.4.6 with custom plugins
- **Charts**: Recharts, D3.js
- **AI/ML**: Hugging Face Inference API
  - `google/flan-t5-base` - Text generation
  - `distilbert-base-uncased-finetuned-sst-2-english` - Sentiment analysis
  - `facebook/bart-large-mnli` - Topic extraction
- **Export**: XLSX (Excel), jsPDF (PDF)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📋 Prerequisites

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **Hugging Face API Key** (for AI features)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd NIRMAAN
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```env
VITE_HUGGINGFACE_API_KEY=your-huggingface-api-key-here
```

**To get a Hugging Face API key:**
1. Visit [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Create a new token
3. Copy and paste it into your `.env` file

### 4. Start Development Server
```bash
npm start
```

The application will be available at `http://localhost:4028`

## 📦 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Preview production build
npm run serve
```

## 🌐 Application Structure

```
NIRMAAN/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (Button, Input, etc.)
│   │   ├── Header.jsx     # Application header
│   │   ├── Applcon.jsx    # Icon component
│   │   └── ErrorBoundary.jsx
│   ├── pages/             # Application pages
│   │   ├── dashboard/     # Dashboard and metrics
│   │   ├── transcript-submission/  # Transcript upload
│   │   ├── analysis-results/       # Results display
│   │   ├── progress-tracking/      # Progress analytics
│   │   └── training-prompts/       # Practice exercises
│   ├── utils/             # Utility functions
│   │   ├── huggingFaceService.js  # AI integration
│   │   └── cn.js          # Class name utilities
│   ├── styles/            # Global styles
│   ├── App.jsx            # Main app component
│   └── Routes.jsx         # Route configuration
├── public/                # Static assets
├── .env                   # Environment variables
├── package.json           # Dependencies
├── vite.config.mjs        # Vite configuration
└── tailwind.config.js     # Tailwind configuration
```

## 🎯 Usage Guide

### Submitting a Transcript
1. Navigate to **Transcript Submission** page
2. Enter or paste your self-introduction (200-300 words recommended)
3. Select version number
4. Click **Submit for Analysis**

### Viewing Results
- **Overall Score**: See your total score out of 100
- **Criteria Breakdown**: Individual scores for each criterion
- **AI Recommendations**: Personalized improvement suggestions
- **Technical Analysis**: Detailed metrics and NLP scores

### Tracking Progress
1. Go to **Progress Tracking** page
2. View score trends over time
3. Compare different versions
4. Export reports in PDF or Excel format

### Practice Training
- Visit **Training Prompts** page
- Select category (Beginner, Intermediate, Advanced)
- Practice with scenario-based exercises
- Track completion and achievements

## 📤 Export Functionality

The application supports two export formats:

### PDF Export
- Professional formatted report
- Includes criteria scores table
- Technical analysis metrics
- Overall statistics

### Excel Export
- Multiple sheets (Summary, Criteria Details, Trends)
- Detailed breakdowns
- Historical data
- Easy data manipulation

## 🔍 AI Features

When configured with a Hugging Face API key, the application provides:

- **Personalized Recommendations**: Context-aware improvement suggestions
- **Sentiment Analysis**: Emotional tone evaluation
- **Topic Extraction**: Key themes identification
- **Similar Examples**: AI-generated reference transcripts

If no API key is configured, fallback data ensures the application remains functional.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 4028
pkill -f "vite"
# Or use different port in vite.config.mjs
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### PDF Export Not Working
- Ensure `jspdf` and `jspdf-autotable` are installed
- Check browser console for errors
- Try in a different browser

## 🤝 Contributing

This project is part of NIRMAAN initiative for communication skill development.

## 📄 License

This project is private and proprietary.

## 📞 Support

For issues or questions, please check the browser console for detailed error messages.

---

**Built with ❤️ for better communication skills**
