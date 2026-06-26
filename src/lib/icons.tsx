import {
  Refrigerator,
  WashingMachine,
  Fan,
  Utensils,
  CookingPot,
  Microwave,
  Snowflake,
  Trash2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Maps Service.icon keys (stored in the DB) to Lucide icon components. */
const iconMap: Record<string, LucideIcon> = {
  refrigerator: Refrigerator,
  "washing-machine": WashingMachine,
  fan: Fan,
  utensils: Utensils,
  "cooking-pot": CookingPot,
  microwave: Microwave,
  snowflake: Snowflake,
  "trash-2": Trash2,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Wrench;
  return <Icon className={className} aria-hidden="true" />;
}
