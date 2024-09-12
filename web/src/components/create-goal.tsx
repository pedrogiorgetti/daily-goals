import { X } from "lucide-react";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IsVisible } from "./utils/is-visible";
import { createGoalRequest } from "../http/goals/create";
import { weekFrequency } from "../constants/weekFrequency";
import { EQueryKeys } from "../enums/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const createGoalSchema = z.object({
  title: z.string().min(1, { message: "The title is required" }).max(100),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalFormValues = z.infer<typeof createGoalSchema>;

export function CreateGoal() {
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGoalFormValues>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      title: "",
      desiredWeeklyFrequency: 3,
    },
  });

  async function handleCreateGoal(values: CreateGoalFormValues) {
    await createGoalRequest({
      payload: {
        title: values.title,
        desiredWeeklyFrequency: values.desiredWeeklyFrequency,
      },
      functions: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [EQueryKeys.weekGoalsSummary],
          });
          queryClient.invalidateQueries({
            queryKey: [EQueryKeys.getAllGoals],
          });

          reset();

          toast.success("Goal created with success!", {
            duration: 3000,
            position: "top-right",
          });
        },
      },
    });
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between">
            <DialogTitle>Create goal</DialogTitle>
            <DialogClose>
              <X className="size-4" />
            </DialogClose>
          </div>

          <DialogDescription>
            Add new activity to your list and start tracking your progress.
          </DialogDescription>

          <form
            onSubmit={handleSubmit(handleCreateGoal)}
            className="flex-1 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">What is the activity?</Label>
                <Input
                  autoFocus
                  id="title"
                  placeholder="Meditate, go to the gym, study, etc..."
                  {...register("title")}
                />

                <IsVisible when={!!errors.title?.message}>
                  <p className="text-red-400 text-xs">
                    {errors.title?.message}
                  </p>
                </IsVisible>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="frequency">How many times per week?</Label>
                <Controller
                  name="desiredWeeklyFrequency"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      {weekFrequency.map((frequency) => (
                        <RadioGroupItem
                          key={frequency.value}
                          value={frequency.value}
                        >
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            {frequency.label}
                          </span>
                          <span className="text-lg leading-none">
                            {frequency.emoji}
                          </span>
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button className="flex-1" type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button className="flex-1">Confirm</Button>
            </div>
          </form>
        </div>
      </div>
    </DialogContent>
  );
}
