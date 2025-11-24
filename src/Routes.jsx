import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProgressTracking from './pages/progress-tracking';
import TrainingPrompts from './pages/training-prompts';
import TranscriptSubmission from './pages/transcript-submission';
import Dashboard from './pages/dashboard';
import AnalysisResults from './pages/analysis-results';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/training-prompts" element={<TrainingPrompts />} />
        <Route path="/transcript-submission" element={<TranscriptSubmission />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis-results" element={<AnalysisResults />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
