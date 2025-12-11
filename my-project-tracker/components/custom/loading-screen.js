import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

export default function LoadingScreen({ enabled }) {
  return (
    <Dialog open={enabled}>
      <DialogContent className="flex w-1/8 justify-center">
        {/*<Image*/}
        {/*  src={"my-project-tracker/public/my-project-tracker-logo.png"}*/}
        {/*  alt={"Hello"}*/}
        {/*  width={100}*/}
        {/*  height={100}*/}
        {/*/>*/}
        <Spinner />
        <DialogTitle>Loading...</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
