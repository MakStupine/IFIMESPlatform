import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertContactSubmissionSchema,
  insertNewsletterSubscriptionSchema,
} from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";
import fetch from "node-fetch"; // <-- Add this at the top if you don't have global fetch
import dotenv from "dotenv";
dotenv.config(); // This looks for `.env` by default
console.log(
  "📦 .env loaded:",
  process.env.MAILCHIMP_API_KEY,
  process.env.MAILCHIMP_AUDIENCE_ID
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form (not used if you're only using newsletter)
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: validatedData.email,
        subject: "Hello from your application",
        text: "Hello World",
      });

      res.status(201).json({
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
        data: submission,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        console.error("❌ Contact form submission error:", error);
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  });

  // ✅ Newsletter form
  app.post("/api/newsletter", async (req, res) => {
    console.log("🟢 /api/newsletter hit");
    try {
      console.log("🔁 Incoming newsletter subscription:", req.body);

      // Validate email
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      console.log("✅ Email validated:", validatedData.email);

      // Load .env credentials
      const API_KEY = process.env.MAILCHIMP_API_KEY;
      const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

      console.log("🔐 MAILCHIMP_API_KEY:", process.env.MAILCHIMP_API_KEY);
      console.log(
        "🔐 MAILCHIMP_AUDIENCE_ID:",
        process.env.MAILCHIMP_AUDIENCE_ID
      );

      if (!API_KEY || !AUDIENCE_ID) {
        throw new Error("❌ Mailchimp credentials are missing in .env");
      }

      const DATACENTER = API_KEY.split("-")[1];

      // Prepare Mailchimp request
      const mailchimpUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
      const mcResponse = await fetch(mailchimpUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: validatedData.email,
          status: "subscribed",
          merge_fields: {
            FNAME: validatedData.name,
            LNAME: validatedData.surname,
            LANG: validatedData.language,
          },
        }),
      });

      // Handle Mailchimp response
      if (!mcResponse.ok) {
        const mcError = (await mcResponse.json()) as { detail?: string };
        console.error("❌ Mailchimp Error:", mcError);
        return res.status(400).json({
          success: false,
          message: mcError.detail || "Mailchimp rejected the request",
        });
      }

      // Save to local DB (if needed)
      const existing = await storage.getSubscriptionByEmail(
        validatedData.email
      );
      if (existing) {
        return res.status(200).json({
          success: true,
          message: "You are already subscribed to our newsletter.",
          data: existing,
        });
      }

      const newSub = await storage.createNewsletterSubscription(validatedData);
      console.log("✅ Subscription saved to DB:", newSub);

      res.status(201).json({
        success: true,
        message: "Thank you for subscribing to our newsletter!",
        data: newSub,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }

      console.error("❌ Newsletter subscription error:", error);
      res.status(500).json({
        success: false,
        message: `Server error. Please try again later. (${error})`,
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
