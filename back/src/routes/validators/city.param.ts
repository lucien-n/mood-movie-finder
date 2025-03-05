import { param } from "express-validator";

export default param("city")
  .escape()
  .isLength({ min: 2, max: 32 })
  .withMessage("Must be a string of length >= 2 & <= 32");
