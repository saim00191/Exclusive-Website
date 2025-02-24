"use client";

import { client } from "@/sanity/lib/client";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

interface Inbox {
  _id?: string;
  userLoginName: string;
  userLoginEmail: string;
  userLoginPassword: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function InboxPage() {
  // State for the emails list and the selected email for reply/modal
  const [emails, setEmails] = useState<Inbox[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Inbox | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const inboxData: Inbox[] = await client.fetch(
          `*[_type == "cancelOrder"]{
            _id,
            userLoginName,
            userLoginEmail,
            userLoginPassword,
            name,
            email,
            phone,
            message,
            date
          }`
        );
        setEmails(inboxData);
        console.log("Inbox Data", inboxData);
      } catch (error) {
        console.error("Error fetching inbox:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInbox();
  }, []);

  const handleEmailClick = (email: Inbox) => {
    setSelectedEmail(email);
    setReplyText("");
    setIsModalOpen(true);
  };

  const handleReply = () => {
    console.log(`Replying to ${selectedEmail?.email}: ${replyText}`);
    setReplyText("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className={`${poppins.className} p-4`}>
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Panel: Emails List */}
        <div className="rounded-lg shadow-md overflow-hidden border">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[400px]">
            {emails.map((email) => (
              <div
                key={email._id}
                className={`p-4 cursor-pointer hover:bg-gray-100 border-b border-gray-200 ${
                  selectedEmail?._id === email._id ? "bg-gray-100" : ""
                }`}
                onClick={() => handleEmailClick(email)}
              >
                {/* Display sender name */}
                <div className="font-semibold">{email.name}</div>
                {/* Use a short preview of the message */}
                <div className="text-sm text-gray-600">
                {email.message?.length > 30
    ? email.message.substring(0, 30) + "..."
    : email.message ?? 'No message'}
                </div>
        
                <div className="text-xs text-gray-500 flex justify-between mt-1">
                  <span>
                    {new Date(email.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                  <span>
                    {new Date(email.date).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Panel: Reply Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold">
              {selectedEmail ? "Reply" : "Select an email"}
            </h2>
            {selectedEmail && (
              <p className="text-sm text-gray-600 mt-1">
                 Replying to {selectedEmail.name} -{" "}
  {selectedEmail.message && selectedEmail.message.length > 30
    ? selectedEmail.message.substring(0, 30) + "..."
    : selectedEmail.message}
              </p>
            )}
          </div>
          <div className="p-4">
            {selectedEmail ? (
              <textarea
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full h-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-500">Select an email from the list to reply.</p>
            )}
          </div>
          {selectedEmail && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Reply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedEmail.name}</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Login Email:</p>
                  <p>{selectedEmail.userLoginEmail}</p>
                </div>
                <div>
                  <p className="font-semibold">Password:</p>
                  <p>{selectedEmail.userLoginPassword}</p>
                </div>
                <div>
                  <p className="font-semibold">Message:</p>
                  <p>{selectedEmail.message}</p>
                </div>
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p>{selectedEmail.name}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
