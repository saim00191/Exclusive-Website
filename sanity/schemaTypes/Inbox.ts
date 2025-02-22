import { Rule } from "sanity";

export default {
  name: "inbox",
  title: "Inbox",
  type: "document",
  fields: [
    {
      name: "userLoginName",
      title: "User Login Name",
      type: "string",
      description: "User Login Name",
    },
    {
      name: "userLoginEmail",
      title: "User Login Email",
      type: "string",
      description: "User Login Email",
    },
    {
      name: "userLoginPassword",
      title: "User Login Password",
      type: "string",
      description: "User Login Password",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Name",
      },
      {
        name: "email",
        title: " Email",
        type: "string",
        description: "Email",
      },
      {
        name: "phone",
        title: "Phone Number",
        type: "string",
        description: "Phone Number",
      },
    {
      name: "message",
      title: "Message",
      type: "string",
      description: "Message",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
      description: "Date",
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};
