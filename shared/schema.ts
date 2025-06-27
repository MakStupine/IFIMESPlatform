import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(
  contactSubmissions
).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContactSubmission = z.infer<
  typeof insertContactSubmissionSchema
>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  language: text("language").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(
  newsletterSubscriptions
).pick({
  email: true,
  name: true,
  surname: true,
  language: true,
});

export type InsertNewsletterSubscription = z.infer<
  typeof insertNewsletterSubscriptionSchema
>;
export type NewsletterSubscription =
  typeof newsletterSubscriptions.$inferSelect;
