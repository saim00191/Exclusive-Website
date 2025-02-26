'use client'
import React, { useState } from "react";
import {
  getAuth,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/firebase/firebase"; // Adjust the path based on your project structure
import { sendEmailVerification } from "firebase/auth";

const SecondPart = () => {
    
  const auth = getAuth(app);
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || ""); // Set default email
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveChanges = async () => {
    if (!user) {
      alert("User not logged in!");
      return;
    }
  
    try {
      // Update Email
      if (email !== user.email) {
        // Re-authenticate user before changing email
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
  
        // Send verification email
        await sendEmailVerification(user);
        alert(` A verification email has been sent. Please verify your new email before updating to.${email}`);
        return; // Exit the function to wait for email verification
      }
  
      // If user wants to update the password
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          alert("New Password and Confirm Password do not match.");
          return;
        }
  
        // Re-authenticate user before changing password
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
  
        // Update password after successful re-authentication
        await updatePassword(user, newPassword);
        alert("Password updated successfully!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-[870px] h-[630px] flex flex-col items-center justify-center">
      <div className="w-[710px] h-[580px]">
        <h2 className="text-[20px] text-carminePink font-medium">
          Edit Your Profile
        </h2>

        {/* Name & Email Section */}
        <div className="flex justify-between w-full h-[82px] mt-6">
          <div className="flex flex-col gap-2">
            <p className="text-[16px] text-black">Name:</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black/50 text-[16px] px-4 w-[330px] h-full bg-secondary rounded-[4px] outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[16px] text-black">Email:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black/50 text-[16px] px-4 w-[330px] h-full bg-secondary rounded-[4px] outline-none"
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-[16px] text-black">Address:</p>
          <input
            type="text"
            className="text-black/50 text-[16px] px-4 w-full h-[50px] bg-secondary rounded-[4px] outline-none"
          />
        </div>

        {/* Password Change Section */}
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-[16px] text-black">Password Changes:</p>
          <div className="flex flex-col gap-7 h-full">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="text-black/50 text-[16px] px-4 w-full h-[50px] bg-secondary rounded-[4px] outline-none"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="text-black/50 text-[16px] px-4 w-full h-[50px] bg-secondary rounded-[4px] outline-none"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-black/50 text-[16px] px-4 w-full h-[50px] bg-secondary rounded-[4px] outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <div className="flex w-[303px] h-[56px] justify-between items-center">
            <p className="text-[16px] text-black font-normal hover:underline hover:cursor-pointer">
              Cancel
            </p>
            <button
              onClick={handleSaveChanges}
              className="w-[214px] h-full rounded-[4px] bg-carminePink text-white cursor-pointer flex items-center justify-center"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPart;
