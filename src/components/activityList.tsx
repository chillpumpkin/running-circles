import { Activity } from "@/app/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ActivityListProps {
  activities: Activity[];
  onActivityClick: (activity: Activity) => void;
}

export default function ActivityList({
  activities,
  onActivityClick,
}: ActivityListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity) => (
        <Card
          key={activity.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onActivityClick(activity)}
        >
          <CardHeader>
            <CardTitle>{activity.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Type: {activity.type}</p>
            <p>Distance: {activity.distance.toFixed(2)} meters</p>
            <p>Date: {new Date(activity.start_date).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
