import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Hint } from "@/lib/checks/check";
import { Switch } from "./ui/switch";

export interface CheckState {
  check: Check;
  enabled: boolean;
}

export function CheckPopover({
  value,
  onChange,
}: {
  value: CheckState[];
  onChange: (state: CheckState) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {value.filter((c) => c.enabled).length} Checks
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Enable/Disable Checks
            </p>
          </div>
          <div className="grid gap-2">
            {value.map((state) => (
              <div
                key={state.check.name}
                className="grid grid-cols-3 items-center gap-4"
              >
                <Switch
                  id={state.check.name}
                  checked={state.enabled}
                  onClick={() =>
                    onChange({ check: state.check, enabled: !state.enabled })
                  }
                />
                <Label htmlFor={state.check.name}>{state.check.name}</Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
