import { Activity } from '@/app/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ActivityModalProps {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
}

export default function ActivityModal({ activity, isOpen, onClose }: ActivityModalProps) {
  if (!activity) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{activity.name}</DialogTitle>
          <DialogDescription>Activity Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <h3 className="font-semibold">Basic Info</h3>
            <p>Type: {activity.type}</p>
            <p>Distance: {activity.distance.toFixed(2)} meters</p>
            <p>Date: {new Date(activity.start_date).toLocaleString()}</p>
            <p>Duration: {activity.elapsed_time} seconds</p>
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>Start: {activity.start_latlng.join(', ')}</p>
            <p>End: {activity.end_latlng.join(', ')}</p>
            <p>Elevation Gain: {activity.total_elevation_gain} meters</p>
          </div>
          <div>
            <h3 className="font-semibold">Stats</h3>
            <p>Average Speed: {activity.average_speed.toFixed(2)} m/s</p>
            <p>Max Speed: {activity.max_speed.toFixed(2)} m/s</p>
            <p>Kudos: {activity.kudos_count}</p>
            <p>Comments: {activity.comment_count}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

