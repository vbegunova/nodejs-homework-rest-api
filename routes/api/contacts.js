const express = require("express");

const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  isValidContactId,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidContactId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidContactId,
  ctrl.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidContactId,
  validateBody(schemas.updateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidContactId,
  validateBody(schemas.favoriteUpdateSchema),
  ctrl.updateFavorite
);

module.exports = router;
