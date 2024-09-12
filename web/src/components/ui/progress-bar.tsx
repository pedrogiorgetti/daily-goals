import * as ProgressPrimitive from '@radix-ui/react-progress'

export function Progress(props: ProgressPrimitive.ProgressProps) {
  return (
    <ProgressPrimitive.Progress
      {...props}
      className="bg-zinc-900 rounded-full h-2"
    />
  )
}

export function ProgressIndicator(
  props: ProgressPrimitive.ProgressIndicatorProps
) {
  return (
    <ProgressPrimitive.Indicator
      {...props}
      className="bg-gradient-to-r from-indigo-500 to-indigo-500 w-1/2 h-2 rounded-full"
    />
  )
}
