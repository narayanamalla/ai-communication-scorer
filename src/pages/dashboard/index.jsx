import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProgressOverviewCard from './components/ProgressOverviewCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import KeyMetricsCards from './components/KeyMetricsCards';
import StudentOverviewPanel from './components/StudentOverviewPanel';
import UploadDropZone from './components/UploadDropZone';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole] = useState('student');

  const progressData = {
    recentSubmissions: 8,
    currentScore: 78,
    improvementTrend: 12
  };

  const metricsData = {
    averageScore: 78,
    totalSubmissions: 8,
    improvementRate: 12,
    completionRate: 85
  };

  const activitiesData = [
  {
    id: 1,
    type: 'submission',
    title: 'New Transcript Submitted',
    description: 'Self-introduction V3 uploaded for analysis',
    timestamp: new Date('2025-11-24T10:30:00'),
    score: null
  },
  {
    id: 2,
    type: 'score',
    title: 'Analysis Complete',
    description: 'Your transcript V2 has been scored and feedback is ready',
    timestamp: new Date('2025-11-24T09:15:00'),
    score: 78
  },
  {
    id: 3,
    type: 'feedback',
    title: 'Coaching Feedback Received',
    description: 'Instructor provided detailed comments on your communication style',
    timestamp: new Date('2025-11-23T16:45:00'),
    score: null
  },
  {
    id: 4,
    type: 'improvement',
    title: 'Score Improvement Detected',
    description: 'Your average score increased by 12% over the last 3 submissions',
    timestamp: new Date('2025-11-23T14:20:00'),
    score: null
  },
  {
    id: 5,
    type: 'submission',
    title: 'Transcript V2 Submitted',
    description: 'Revised self-introduction based on previous feedback',
    timestamp: new Date('2025-11-22T11:00:00'),
    score: null
  },
  {
    id: 6,
    type: 'score',
    title: 'Initial Assessment Complete',
    description: 'Your first transcript V1 has been analyzed',
    timestamp: new Date('2025-11-21T15:30:00'),
    score: 66
  }];


  const studentsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_112172f2d-1763295913243.png",
    avatarAlt: 'Professional headshot of young woman with blonde hair in business attire smiling at camera',
    status: 'excellent',
    currentScore: 92,
    improvement: 15,
    lastSubmission: '2 hours ago'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb933d20-1763293416126.png",
    avatarAlt: 'Professional headshot of Asian man with short black hair wearing navy suit and glasses',
    status: 'active',
    currentScore: 78,
    improvement: 8,
    lastSubmission: '5 hours ago'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1643a5bbd-1763300147010.png",
    avatarAlt: 'Professional headshot of Hispanic woman with long dark hair in formal business attire',
    status: 'needs-attention',
    currentScore: 64,
    improvement: -3,
    lastSubmission: '1 day ago'
  },
  {
    id: 4,
    name: 'David Thompson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_130504d21-1763295915180.png",
    avatarAlt: 'Professional headshot of middle-aged man with gray hair wearing dark suit and tie',
    status: 'active',
    currentScore: 85,
    improvement: 10,
    lastSubmission: '3 hours ago'
  },
  {
    id: 5,
    name: 'Priya Patel',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b4a14d09-1763293764905.png",
    avatarAlt: 'Professional headshot of Indian woman with black hair wearing traditional business attire',
    status: 'excellent',
    currentScore: 88,
    improvement: 12,
    lastSubmission: '4 hours ago'
  }];


  const handleFileUpload = (file) => {
    console.log('File uploaded:', file?.name);
    navigate('/transcript-submission', { state: { uploadedFile: file } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome to AI Communication Scorer
            </h1>
            <p className="text-muted-foreground">
              Track your progress, submit new transcripts, and improve your communication skills
            </p>
          </div>

          <div className="space-y-6">
            <KeyMetricsCards metrics={metricsData} />

            <ProgressOverviewCard
              recentSubmissions={progressData?.recentSubmissions}
              currentScore={progressData?.currentScore}
              improvementTrend={progressData?.improvementTrend} />


            <QuickActionsPanel />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivityFeed activities={activitiesData} />
              <UploadDropZone onFileUpload={handleFileUpload} />
            </div>

            {userRole === 'instructor' &&
            <StudentOverviewPanel
              students={studentsData}
              isInstructor={true} />

            }
          </div>
        </div>
      </main>
    </div>);

};

export default Dashboard;