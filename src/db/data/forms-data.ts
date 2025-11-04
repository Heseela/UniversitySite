import { FormFieldType } from "@/schemas/forms.schema";
import { TFormTableSelect } from "../schema/form";

export const formsData: TFormTableSelect[] = [
  {
    "id": "7e8ced0f-d36b-430a-82ee-9d1d61b680a8",
    "title": "Contact Form",
    "slug": "contact-form-F8Xz_n7V__",
    "fields": [
      {
        "name": "name",
        "type": FormFieldType.Text,
        "label": "Your Name",
        "required": true,
        "validation": {},
        "placeholder": "",
        "defaultValue": ""
      },
      {
        "name": "email",
        "type": FormFieldType.Email,
        "label": "Your Email",
        "required": true,
        "validation": {},
        "placeholder": "",
        "defaultValue": ""
      },
      {
        "name": "subject",
        "type": FormFieldType.Text,
        "label": "Subject",
        "required": true,
        "validation": {},
        "placeholder": "",
        "defaultValue": ""
      },
      {
        "name": "message",
        "type": FormFieldType.Textarea,
        "label": "Your Message",
        "required": true,
        "validation": {},
        "placeholder": "",
        "defaultValue": ""
      }
    ],
    "submitBtnLabel": "Send Message",
    "createdAt": new Date("2025-10-10 10:28:17.700458"),
    "updatedAt": new Date("2025-10-10 10:28:17.700458")
  }
]
