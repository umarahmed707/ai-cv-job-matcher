# AI CV Job Matcher

An AI-powered CV analysis and job matching platform that analyzes a candidate's CV and recommends relevant job opportunities based on their skills, experience, education, and profile.

## Overview

AI CV Job Matcher allows users to upload their CV in PDF or Microsoft Word `.docx` format.

The system:

* Extracts CV content
* Uses AI to analyze the candidate profile
* Detects skills, experience, education, strengths, and skill gaps
* Recommends suitable job roles
* Matches the candidate with relevant job opportunities
* Calculates a job match score
* Shows matched and missing skills
* Provides detailed job information through the Job Matches dashboard

## Features

### CV Upload

Supports:

* PDF
* Microsoft Word `.docx`

Other file formats are rejected.

### AI CV Analysis

The system extracts:

* Candidate name
* Professional summary
* Skills
* Years of experience
* Work experience
* Education
* Recommended roles
* Strengths
* Skill gaps

### AI Job Matching

Jobs are matched using:

* Candidate skills
* Required job skills
* Experience requirements
* Recommended roles

Each matched job includes:

* Match percentage
* Matched skills
* Skill gaps
* Required experience
* Match explanation

### Dashboard

The dashboard provides a summary of:

* CV analysis status
* Number of job matches
* Top match
* Candidate profile summary
* Recommended roles
* Top matching opportunities

### Job Details

Users can click **View Job** to open detailed information for a matched opportunity.

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Python
* FastAPI
* Uvicorn
* pypdf
* python-docx

### AI

* Groq API
* OpenAI GPT-OSS-20B

### Job Matching

* Python-based skill matching
* Experience matching
* Role matching
* JSON job dataset

## Project Structure

```text
AI-CV-Job-Matcher/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── Pages/
│   │   └── services/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── data/
│   │   └── jobs.json
│   ├── routers/
│   │   ├── __init__.py
│   │   └── cv_routes.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── cv_service.py
│   │   └── matching_service.py
│   ├── main.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/umarahmed707/ai-cv-job-matcher.git
cd YOUR_REPOSITORY
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

## Backend Setup

Open another terminal:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Run FastAPI:

```powershell
python -m uvicorn main:app --reload
```

Backend will run on:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
GROQ_API_KEY=your_groq_api_key
```

Never commit your `.env` file or API key to GitHub.

## API Endpoint

### Analyze CV

```http
POST /api/v1/cv/analyze
```

Request:

```text
multipart/form-data
file = CV file
```

Supported files:

```text
.pdf
.docx
```

Example response:

```json
{
  "success": true,
  "message": "CV analyzed successfully",
  "analysis": {
    "candidate_name": "Candidate Name",
    "professional_summary": "...",
    "skills": [],
    "years_of_experience": 1,
    "experience": [],
    "education": [],
    "recommended_roles": [],
    "strengths": [],
    "skill_gaps": []
  },
  "job_matches": []
}
```

## Job Matching Logic

The backend calculates job compatibility using:

```text
Skills       → 60%
Experience   → 25%
Role Match   → 15%
```

Jobs with very low relevance are filtered out before being returned to the frontend.

## Security

The Groq API key is stored only on the backend through environment variables.

The frontend never receives the Groq API key.

## Deployment

The project is structured as a monorepo:

```text
Repository
├── frontend/
└── backend/
```

The frontend and backend can be deployed independently from the same GitHub repository.

### Frontend

Recommended deployment platform:

```text
Vercel
```

Root directory:

```text
frontend
```

### Backend

Recommended deployment platform:

```text
Vercel
```

Root directory:

```text
backend
```

Backend environment variable:

```text
GROQ_API_KEY
```

## Future Improvements

Planned improvements include:

* Real job API integration
* Database-backed job listings
* User authentication
* Saved jobs
* Job application tracking
* Resume improvement suggestions
* ATS score
* More CV formats
* Advanced semantic job matching
* AI-powered CV rewriting
* Job search filters
* Production job sources

## License

This project is created for learning, development, and portfolio purposes.
