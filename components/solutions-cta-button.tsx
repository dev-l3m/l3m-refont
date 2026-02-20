"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { Button } from "@/components/ui/button";

interface SolutionsCtaButtonProps {
  text: string;
}

export function SolutionsCtaButton({ text }: SolutionsCtaButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-ink hover:bg-accent-light">
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <AppointmentForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
