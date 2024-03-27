
import { Button } from "@/components/ui/button"
import {format} from 'date-fns'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"


export default function EditEvent({open, setOpen, event}){

  
    const date = event.start && format(new Date(event.start), 'dd/MM/yyyy')
    return (
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            {date}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
           
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}

