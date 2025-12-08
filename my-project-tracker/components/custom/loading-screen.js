import {
  Dialog,
  DialogTitle,
  DialogContent
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"

export default function LoadingScreen({ enabled }){
  return(
    <Dialog open={enabled}>
      <DialogContent className="flex w-1/8 justify-center">
        <Spinner/>
        <DialogTitle>Loading...</DialogTitle>
      </DialogContent>
    </Dialog>
  )
}