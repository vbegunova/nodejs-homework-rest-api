const express = require("express");

const ctrl = require("../../controllers/books");
const { validateBody, isValidContactId } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidContactId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidContactId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidContactId,
  validateBody(schemas.updateSchema),
  ctrl.updateStatusContact
);

router.patch(
  "/:contactId/favorite",
  isValidContactId,
  validateBody(schemas.favoriteUpdateSchema),
  ctrl.updateFavorite
);

module.exports = router;
