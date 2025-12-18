import { db } from "./db";
import {
  consultations,
  type InsertConsultation,
  type Consultation
} from "@shared/schema";

export interface IStorage {
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
}

export class DatabaseStorage implements IStorage {
  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const [consultation] = await db
      .insert(consultations)
      .values(insertConsultation)
      .returning();
    return consultation;
  }
}

export const storage = new DatabaseStorage();
