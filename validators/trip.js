import { body } from "express-validator";
import { validate } from "./validate.js";
import { ValidationError } from "../errors/validation.js";

export const createTripValidator = [
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new ValidationError("End date must be after start date");
      }
      return true;
    }),

  body("destinations")
    .isArray({ min: 1 })
    .withMessage("Destinations must be a non-empty array")
    .custom((value) => {
      return value.every(
        (destination) => typeof destination === "string"
      );
    })
    .withMessage("Destinations must be an array of strings"),

  body("budget.total")
    .notEmpty()
    .withMessage("Total budget is required")
    .isNumeric()
    .withMessage("Total budget must be a number"),

  body("budget.expenses")
    .optional()
    .isArray()
    .withMessage("Expenses must be an array"),

  body("budget.expenses.*.name")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Expense name is required"),

  body("budget.expenses.*.amount")
    .optional()
    .isNumeric()
    .withMessage("Expense amount must be a number"),

  validate,
];