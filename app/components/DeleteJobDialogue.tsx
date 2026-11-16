"use client"
import { Trash2Icon } from "lucide-react"
import { toast } from "@/components/ui/toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { JobPost } from "../dashboard/recruiter/jobs/manage-jobs-table"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DeleteJobDialogue({ job }: { job: JobPost }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleDelete = async () => {
    const res = await deleteJob(job._id)
    if (res.deletedCount) {
      setOpen(false)
      toast.add({
        title: "Job Deleted",
        description: "This Job Has Been Permanently Deleted",
      })
      router.refresh();
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-extrabold text-red-600">
              Remember this will permanently delete this job from the portal !
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
