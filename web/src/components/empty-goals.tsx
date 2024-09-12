import { Plus } from "lucide-react";

import logo from "../assets/logo.svg";
import letsStartIllustration from "../assets/lets-start-illustration.svg";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 bg-transparent">
      <img className="h-12" src={logo} alt="Logo" />
      <img src={letsStartIllustration} alt="Empty illustration" />

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        You still didn't create any goals, let's start by creating your first
        one?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Create goal
        </Button>
      </DialogTrigger>
    </div>
  );
}
