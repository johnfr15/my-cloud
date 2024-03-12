const express = require("express");
const { 
    handleSignup, 
    handleLogin, 
    handleForgotPassword, 
    handleConfirmationEmail,
} = require("../controllers/auth");



const router = express.Router();

router.get("/confirm/:_id/:secret", handleConfirmationEmail);

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/forgot-password", handleForgotPassword);
// router.post("/reset-password", handleResetPassword);

module.exports = router;