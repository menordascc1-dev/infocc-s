import { useMutation } from "@tanstack/react-query";
import { api, type InsertConsultation } from "@shared/routes";

export function useCreateConsultation() {
  return useMutation({
    mutationFn: async (data: InsertConsultation) => {
      const res = await fetch(api.consultations.create.path, {
        method: api.consultations.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || 'Validation failed');
        }
        throw new Error('Failed to create consultation');
      }
      
      return await res.json();
    },
  });
}
