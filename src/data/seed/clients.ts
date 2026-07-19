import { ClientRef } from "@/lib/content/types";

export const clients: ClientRef[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `client-${i + 1}`,
  name: `Cliente Placeholder ${String(i + 1).padStart(2, "0")}`,
}));
