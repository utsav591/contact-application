import express from "express";
import { protect } from "../middelwares/authMiddelware.js";
import { createContact, editContact, getContactDetails, getContactList } from "../controllers/contactController.js";


const router = express.Router();

router.route("/").post(protect, createContact).get(getContactList);
router.route("/:contactId").get(getContactDetails).put(protect, editContact)

export default router;