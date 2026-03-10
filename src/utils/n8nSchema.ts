import type { XFormType } from "@emeraldemperaur/vector-sigma";

export const xFormN8NPrototypeData: XFormType = {
  uuid: "8344e117-2d01-4070-b279-b4bae1cad36c",
  name: "N8N Reservation Booking",
  logo: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/n8n-color.png",
  brandColor: "#EA4B71", // N8N Coral/Pink
  logoPosition: "right",
  model: [
    {
      sectionId: "guest-info-section",
      title: "Guest Information",
      icon: "user",
      queries: [
        {
          queryId: 1,
          inputType: "text-input",
          inputAlias: "guestName",
          inputLabel: "Guest Name",
          inputPlaceholder: "Enter the reservation holder's name",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This name will be used by the AI Voice Agent during the confirmation call.",
          errorText: "Guest name is required",
          queryResponse: null
        },
        {
          queryId: 2,
          inputType: "phone-input",
          inputAlias: "guestPhone",
          inputLabel: "Phone Number (For AI Confirmation)",
          inputPlaceholder: "Enter Phone Number",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "Crucial: The N8N webhook will route this number to the AI Voice Agent for calling/SMS.",
          errorText: "Phone Number is required for confirmation",
          queryResponse: null
        },
        {
          queryId: 3,
          inputType: "creditcard-input",
          inputAlias: "userCreditCard",
          inputLabel: "Credit Card (No-Show Protection)",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "Used to securely hold the reservation. A fee may apply for no-shows.",
          errorText: "Credit Card is required",
          queryResponse: null
        },
        {
          queryId: 4,
          inputType: "avatar-input",
          inputAlias: "guestProfile",
          inputLabel: "Guest Profile (Optional)",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "Helps our host stand identify you when you arrive.",
          queryResponse: null
        }
      ]
    },
    {
      sectionId: "reservation-details-section",
      title: "Reservation Details",
      icon: "calendar",
      queries: [
        {
          queryId: 5,
          inputType: "datetimepicker-input",
          inputAlias: "reservationDateTime",
          inputLabel: "Reservation Date & Time",
          inputPlaceholder: "Select date and time",
          newRow: false,
          inputWidth: 5,
          isRequired: true,
          isHinted: true,
          hintText: "The scheduled time for your dining experience.",
          errorText: "Date and time are required",
          queryResponse: null
        },
        {
          queryId: 6,
          inputType: "slider-input",
          inputAlias: "numberOfGuests",
          inputLabel: "Number of Guests",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 7,
          isRequired: true,
          isHinted: true,
          hintText: "Total number of guests arriving. For parties larger than 20, please call the restaurant.",
          minValue: 1,
          maxValue: 20,
          stepValue: 1, 
          defaultValue: 2,
          queryResponse: null
        },
        {
          queryId: 7,
          inputType: "radiogroup-input",
          inputAlias: "seatingPreference",
          inputLabel: "Seating Preference",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 6,
          isRequired: true,
          isHinted: false,
          errorText: "Please select a seating preference",
          inputOptions: [
            { optionid: 1, optionvalue: "Indoor", text: "Standard Indoor" },
            { optionid: 2, optionvalue: "Patio", text: "Outdoor Patio" },
            { optionid: 3, optionvalue: "Bar", text: "Bar Seating" }
          ],
          queryResponse: null
        },
        {
          queryId: 8,
          inputType: "dropdown-input",
          inputAlias: "specialOccasion",
          inputLabel: "Special Occasion (Optional)",
          inputPlaceholder: "Are you celebrating anything?",
          newRow: false,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "The AI agent can add a personalized greeting if you are celebrating!",
          inputOptions: [
            { optionid: 1, optionvalue: "None", text: "Just dining out" },
            { optionid: 2, optionvalue: "Birthday", text: "Birthday" },
            { optionid: 3, optionvalue: "Anniversary", text: "Anniversary" },
            { optionid: 4, optionvalue: "Business", text: "Business Dinner" }
          ],
          queryResponse: null
        }
      ]
    },
    {
      sectionId: "ai-agent-preferences",
      title: "AI Voice Agent Configuration",
      icon: "mixervertical",
      queries: [
        {
          queryId: 9,
          inputType: "conditional-toggle",
          inputAlias: "enableVoiceCall",
          inputLabel: "Receive AI Voice Call Confirmation?",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "If disabled, the N8N workflow will send a standard SMS instead of triggering the Voice Agent.",
          triggerValue: true,
          defaultValue: true,
          toggledInput: {
            queryId: 10,
            inputType: "optionselect-input",
            inputAlias: "aiAgentLanguage",
            inputLabel: "Preferred AI Agent Language",
            inputPlaceholder: "Select language",
            newRow: false,
            inputWidth: 6,
            isRequired: false,
            isHinted: true,
            hintText: "Determines which language model the voice agent will use when calling you.",
            inputOptions: [
              { optionid: 1, optionvalue: "en-US", text: "English (US)" },
              { optionid: 2, optionvalue: "fr-FR", text: "French" },
              { optionid: 3, optionvalue: "es-ES", text: "Spanish" }
            ],
            defaultValue: "en-US",
            queryResponse: null
          },
          queryResponse: null
        },
        {
          queryId: 11,
          inputType: "selectmultiple-input",
          inputAlias: "dietaryRestrictions",
          inputLabel: "Dietary Restrictions & Allergies",
          inputPlaceholder: "Select any that apply",
          newRow: true,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "The AI agent will verbally confirm these restrictions during the call.",
          inputOptions: [
            { optionid: 1, optionvalue: "Vegetarian", text: "Vegetarian" },
            { optionid: 2, optionvalue: "Vegan", text: "Vegan" },
            { optionid: 3, optionvalue: "Gluten-Free", text: "Gluten-Free" },
            { optionid: 4, optionvalue: "Nut Allergy", text: "Nut Allergy" },
            { optionid: 5, optionvalue: "Shellfish Allergy", text: "Shellfish Allergy" }
          ],
          queryResponse: null
        }
      ]
    }
  ]
};