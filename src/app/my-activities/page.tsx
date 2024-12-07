"use client";

import { useEffect, useState } from "react";
import { Activity } from "@/app/types";
import ActivityList from "@/components/activityList";
import ActivityModal from "@/components/activityModal";

export default function MyActivities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  useEffect(() => {
    handleGetActivities();
  }, []);

  async function handleGetActivities() {
    try {
      const response = await fetch("/api/activities");
      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.statusText}`);
      }

      const activities: Activity[] = await response.json();
      setActivities(activities);
    } catch (error) {
      console.error(error);
    }
  }

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Activity List</h1>
      {activities && (
        <ActivityList
          activities={activities}
          onActivityClick={handleActivityClick}
        />
      )}
      <ActivityModal
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
