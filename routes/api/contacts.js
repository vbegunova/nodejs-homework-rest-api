const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ data: result });
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      const error = new Error("Missing required field or fields");
      error.status = 400;
      throw error;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json({ data: result });
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    console.log(result);
    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) {
      const error = new Error("Missing fields");
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ data: result });
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
});

module.exports = router;
