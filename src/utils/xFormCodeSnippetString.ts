export const xFormCodeSnippet = `import type { XFormType } from "@emeraldemperaur/vector-sigma";

export const xFormPrototypeData: XFormType = {
  uuid: "mock-a-uuid-for-me",
  name: "xForm Test Prototype",
  logo: "https://static.dezeen.com/uploads/2017/01/mozilla-finalises-new-logo-design-graphics_dezeen_hero.jpg",
  brandColor: "#000000",
  logoPosition: "left",
  model: [
    {
      sectionId: "profile-info-section",
      title: "Profile Information",
      subtitle: "Help us deliver a bespoke experience",
      icon: "user",
      queries: [
        {
          queryId: 1,
          inputType: "text-input",
          inputAlias: "userName",
          inputLabel: "VΣ Username",
          inputPlaceholder: "Enter a Username",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm TextInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Username is required",
          queryResponse: null
        },
        {
          queryId: 2,
          inputType: "password-input",
          inputAlias: "userPassword",
          inputLabel: "VΣ Password",
          inputPlaceholder: "Enter a Password",
          newRow: true,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm PasswordInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Password is required",
          queryResponse: null
        },
        {
          queryId: 3,
          inputType: "phone-input",
          inputAlias: "userPhone",
          inputLabel: "Phone Number",
          inputPlaceholder: "Enter CA/NG Phone Number",
          newRow: true,
          inputWidth: 5,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm PhoneInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Phone Number is not required",
          queryResponse: null
        },
        {
          queryId: 4,
          inputType: "creditcard-input",
          inputAlias: "userCreditCard",
          inputLabel: "Credit Card Number",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm CreditCardInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Required",
          queryResponse: null
        },
        {
          queryId: 5,
          inputType: "avatar-input",
          inputAlias: "userProfile",
          inputLabel: "Display Picture (Profile)",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm CreditCardInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Required",
          queryResponse: null
        }
      ]
    },
    {
      sectionId: "billing-info-section",
      title: "Billing Information",
      icon: "idcard",
      queries: [
        {
          queryId: 6,
          inputType: "currency-input",
          inputAlias: "userDeposit",
          inputLabel: "VΣ Account Deposit",
          inputPlaceholder: "Enter a bill deposit amount",
          newRow: false,
          inputWidth: 4,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm CurrencyInput component",
          hintUrl: "https://www.mekaegwim.ca",
          defaultValue: "NGN",
          errorText: "Account deposit is not required",
          queryResponse: null
        },
        {
          queryId: 7,
          inputType: "stock-input",
          inputAlias: "userStock",
          inputLabel: "VΣ Share Limit Order",
          inputPlaceholder: "Enter a share amount",
          newRow: false,
          inputWidth: 4,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm StockInput component",
          hintUrl: "https://www.mekaegwim.ca",
          defaultValue: "TSLA",
          errorText: "Limit order is not required",
          queryResponse: null
        },
        {
          queryId: 8,
          inputType: "radiogroup-input",
          inputAlias: "userSubscriptionLevel",
          inputLabel: "VΣ Subscription",
          inputPlaceholder: "Select user subscription level",
          newRow: true,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm RadioGroupInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Required",
          inputOptions: [
            {
              optionid: 1,
              optionvalue: "Basic",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Basic"
            },
            {
              optionid: 2,
              optionvalue: "Premium",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Premium"
            },
            {
              optionid: 3,
              optionvalue: "Performance",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Performance"
            }
          ],
          queryResponse: null
        },
        {
          queryId: 9,
          inputType: "optionselect-input",
          inputAlias: "userLocationRegion",
          inputLabel: "VΣ Service Region",
          inputPlaceholder: "Select a Service Region",
          newRow: false,
          inputWidth: 5,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm OptionSelectInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Service Region is required",
          inputOptions: [
            {
              optionid: 1,
              optionvalue: "North America",
              optionurl: "https://github.com/emeraldemperaur",
              text: "North America"
            },
            {
              optionid: 2,
              optionvalue: "EMEA",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Europe, Middle East & Africa"
            },
            {
              optionid: 3,
              optionvalue: "APAC",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Asia Pacific"
            }
          ],
          queryResponse: null
        },
         {
          queryId: 10,
          inputType: "countryselect-input",
          inputAlias: "userLocationCountry",
          inputLabel: "VΣ Service Country",
          inputPlaceholder: "Select a service country",
          newRow: true,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm CountrySelect component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Service country selection is required",
          queryResponse: null
        },
        {
          queryId: 11,
          inputType: "countrymultiselect-input",
          inputAlias: "userRelocationCountries",
          inputLabel: "VΣ Service Countries",
          inputPlaceholder: "Select all desired service countries",
          newRow: false,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm CountryMultiselect component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Service country selection is not required",
          queryResponse: null
        }

      ]
    },
    {
      sectionId: "shipping-info-section",
      title: "Shipping Information",
      icon: "paperplane",
      queries: [
        {
          queryId: 10,
          inputType: "selectmultiple-input",
          inputAlias: "userDeliveryAddress",
          inputLabel: "Preffered Delivery Method(s)",
          inputPlaceholder: "Select a shipping preference",
          newRow: false,
          inputWidth: 5,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm SelectMultipleInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Preffered selection is not required",
          inputOptions: [
            {
              optionid: 1,
              optionvalue: "Express AirMail",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Express AirMail"
            },
            {
              optionid: 2,
              optionvalue: "Express Drone",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Express Drone"
            },
            {
              optionid: 3,
              optionvalue: "Express Freight",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Express Freight"
            }
          ],
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 11,
          inputType: "slider-input",
          inputAlias: "userDistance",
          inputLabel: "Recommended Serivce Coverage (km²)",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 7,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm SliderInput component",
          hintUrl: "https://www.mekaegwim.ca",
          minValue: 0,
          maxValue: 100000,
          stepValue: 10,
          errorText: "Service Coverage selection is not required",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 12,
          inputType: "rangeslider-input",
          inputAlias: "userRange",
          inputLabel: "VΣ Location Range (km²)",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm RangeSliderInput component",
          hintUrl: "https://www.mekaegwim.ca",
          minValue: 0,
          maxValue: 1000,
          stepValue: 0.5,
          errorText: "Required",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 13,
          inputType: "toggle-input",
          inputAlias: "userRegionSwitch",
          inputLabel: "Enable Service Region Switching",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 4,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm ToggleInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Service Region switching is not required",
          defaultValue: null,
          queryResponse: null
        }
      ]
    },
    {
      sectionId: "schedule-info-section",
      title: "Schedule Information",
      icon: "laptimer",
      queries: [
        {
          queryId: 14,
          inputType: "checkboxgroup-input",
          inputAlias: "userNoricationsPreference",
          inputLabel: "Preffered Notification Channels",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm CheckboxGroupInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Preffered notification selection is required",
          inputOptions: [
            {
              optionid: 1,
              optionvalue: "Text Message",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Text Message"
            },
            {
              optionid: 2,
              optionvalue: "Email",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Email"
            },
            {
              optionid: 3,
              optionvalue: "AI Call",
              optionurl: "https://github.com/emeraldemperaur",
              text: "AI Call"
            }
          ],
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 15,
          inputType: "datepicker-input",
          inputAlias: "userServiceStartDate",
          inputLabel: "VΣ Service Start Date",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 4,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm DatePickerInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Service start date is required",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 16,
          inputType: "daterangepicker-input",
          inputAlias: "userServiceDuration",
          inputLabel: "VΣ Service Duration",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm DateRangePickerInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Service duration selection is required",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 17,
          inputType: "datetimepicker-input",
          inputAlias: "userServiceRenewal",
          inputLabel: "VΣ Subscription Renewal Date",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 4,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm DateTimePickerInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Service renewal is not required",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 18,
          inputType: "dropdown-input",
          inputAlias: "userRenewalOption",
          inputLabel: "VΣ Subscription Renewal Cadence",
          inputPlaceholder: "Select a cadence",
          newRow: false,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm DropdownInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Renewal cadence selection is not required",
          inputOptions: [
            {
              optionid: 1,
              optionvalue: "Weekly",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Weekly"
            },
            {
              optionid: 2,
              optionvalue: "Monthly",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Monthly"
            },
            {
              optionid: 3,
              optionvalue: "Yearly",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Yearly"
            }
          ],
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 19,
          inputType: "file-input",
          inputAlias: "userProfileDocument",
          inputLabel: "Upload VΣ Profile Document",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 5,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm FileInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Service renewal is not required",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 20,
          inputType: "filemultiple-input",
          inputAlias: "userAgreementDocuments",
          inputLabel: "Upload VΣ Agreement Document(s)",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 7,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm FileMultipleInput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Agreement document(s) not required",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 21,
          inputType: "image-output",
          inputAlias: "subscriptionBadge",
          inputLabel: "VΣ Subscription Badge",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 33,
          inputHeight: 33,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm ImageOutput component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Service renewal is not required",
          defaultValue: "https://static-production.npmjs.com/4a2a680dfcadf231172b78b1d3beb975.svg",
          queryResponse: null
        }
      ]
    },
    {
      sectionId: "conditional-info-section",
      title: "Conditional Information",
      icon: "mix",
      queries: [
        {
          queryId: 22,
          inputType: "conditional-toggle",
          inputAlias: "userDeliveryMethod",
          inputLabel: "Preffered Delivery Method(s)",
          inputPlaceholder: "Select a shipping preference",
          newRow: false,
          inputWidth: 5,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm ConditionalTrigger (Toggle) component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Preffered selection is not required",
          defaultValue: null,
          triggerValue: true,
          toggledInput: {
            queryId: 23,
            inputType: "dropdown-input",
            inputAlias: "userPrefferedMethod",
            inputLabel: "Delivery Method",
            inputPlaceholder: "Select delivery method",
            newRow: false,
            inputWidth: 5,
            isRequired: false,
            isHinted: true,
            hintText: "This is another sample hint text for an xForm Dropdown component",
            hintUrl: "https://www.mekaegwim.ca",
            errorText: "Delivery method selection is not required",
            defaultValue: null,
            queryResponse: null
          },
          queryResponse: null
        },
        {
          queryId: 24,
          inputType: "conditional-select",
          inputAlias: "userDeliveryType",
          inputLabel: "Select a Delivery Type",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 7,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm ConditionalTrigger (OptionSelect) component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Delivery selection is not required",
          inputOptions: [
            {
              optionid: 1,
              optionvalue: "Home",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Home"
            },
            {
              optionid: 2,
              optionvalue: "Office",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Office"
            },
            {
              optionid: 3,
              optionvalue: "Pickup",
              optionurl: "https://github.com/emeraldemperaur",
              text: "Pickup"
            }
          ],
          defaultValue: null,
          triggerValue: "Home",
          toggledInput: {
            queryId: 25,
            inputType: "dropdown-input",
            inputAlias: "userDeliverySelection",
            inputLabel: "Delivery Method",
            inputPlaceholder: "Select delivery method",
            newRow: false,
            inputWidth: 5,
            isRequired: false,
            isHinted: true,
            hintText: "This is another sample hint text for an xForm Dropdown component",
            hintUrl: "https://www.mekaegwim.ca",
            errorText: "Delivery method selection is not required",
            inputOptions: [
              {
                optionid: 1,
                optionvalue: "Courier",
                optionurl: "https://github.com/emeraldemperaur",
                text: "Home"
              },
              {
                optionid: 2,
                optionvalue: "Express",
                optionurl: "https://github.com/emeraldemperaur",
                text: "Office"
              },
              {
                optionid: 3,
                optionvalue: "Drone",
                optionurl: "https://github.com/emeraldemperaur",
                text: "Pickup"
              }
            ],
            defaultValue: null,
            queryResponse: null
          },
          queryResponse: null
        },
        {
          queryId: 26,
          inputType: "conditional-checkbox",
          inputAlias: "userOnlinePayment",
          inputLabel: "Enable VΣ Online Payment",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "This is a sample hint text for an xForm ConditionalTrigger (Checkbox) component",
          hintUrl: "https://www.mekaegwim.ca",
          errorText: "Required",
          defaultValue: null,
          triggerValue: true,
          toggledInput: {
            queryId: 27,
            inputType: "dropdown-input",
            inputAlias: "userPaymentMethod",
            inputLabel: "Payment Method",
            inputPlaceholder: "Select payment method",
            newRow: false,
            inputWidth: 6,
            isRequired: false,
            isHinted: true,
            hintText: "This is another sample hint text for an xForm Dropdown component",
            hintUrl: "https://www.mekaegwim.ca",
            errorText: "Payment method selection is not required",
            inputOptions: [
              {
                optionid: 1,
                optionvalue: "Credit Card",
                optionurl: "https://github.com/emeraldemperaur",
                text: "Credit Card"
              },
              {
                optionid: 2,
                optionvalue: "Debit Card",
                optionurl: "https://github.com/emeraldemperaur",
                text: "Debit Card"
              },
              {
                optionid: 3,
                optionvalue: "ETransfer",
                optionurl: "https://github.com/emeraldemperaur",
                text: "ETransfer"
              }
            ],
            defaultValue: null,
            queryResponse: null
          },
          queryResponse: null
        }
      ]
    }
  ]
};`


export const xFormCodeUsageSnippet = `import React from 'react';
import { VectorSigma } from '@emeraldemperaur/vector-sigma';

export const VΣRegistrationForm = () => {
    
    const xFormBuilder = VectorSigma(apiXFormData)
        .setName('VΣ Registration Form')
        .setBrand("brandHexColor", "www.exampleurl.com/logoimage.png", 'right');

    return xFormBuilder.render({
        displayMode: 'accordion',
        readOnlyMode: false,
        // Access 'values', 'actions' and 'instance' objects in global onSubmit callback function
        onSubmit: async (values, actions, instance) => {
            console.log(\`xForm InProgess Timestamp:\`, instance.timeInProgress);
            const timeTakenMs = (instance.timeSubmitted || Date.now()) - instance.timeCreated;
            console.log(\`VΣ User finished the xForm in \${timeTakenMs / 1000} seconds.\`);
            
            try {
                // Initiate HTTP POST request with stateful 'values' and 'instance' payload
                await fetch(\`/api/questionnaires/\${instance.formObject.uuid}/responses\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        formVersion: instance.formObject.uuid,
                        responseTime: instance.timeSubmitted - instance.timeCreated,
                        xFormObject: instance.formObject,
                        xFormStatusCode: instance.statusCode,
                        answers: values
                    })
                });
                
                // Reset form after HTTP POST request success and more (i.e. https://formik.org/docs/api/formik)
                actions.resetForm(); 
                alert("Thank you for completing the VΣ questionnaire!");
            } catch (error) {
                console.error("Failed to save responses to VΣ DB", error);
            }
        }
    });
};`;


export const xFormRenderOption = `const xForm = new VectorSigma(myJsonData);

return xForm.render({
    displayMode: 'codex',
    theme: {
        appearance: 'dark',        // Apply dark mode to the form
        accentColor: 'grass',      // Changes all checkboxes, toggles, and focus rings with accentColor
        grayColor: 'slate',        // Renders the background panels with a bluish-gray tint
        radius: 'full',            // Render all inputs and buttons pill-shaped
        scaling: '110%'            // Slightly enlarge the form for accessibility
    },
    onSubmit: async (values) => {
        console.log(values);
    }
});`;

export const xForm97 = `theme: {
        appearance: 'dark',        // Renders the background with dark aesthetic (Danger Room)
        accentColor: 'yellow',     // Render input components with classic 90's high contrast yellow on dark mode
        grayColor: 'slate',        // Render background panels with deep bluish-gray akin to classic 90's uniforms
        radius: 'none',            // Render with sharp, 0px border radius for a comic-book panel feel
        scaling: '100%'            // Render with default scaling
    }`

export const statefulUsageSnippet = `import React from 'react';
import { useVectorSigma } from '@emeraldemperaur/vector-sigma';

// Optionally define interface for inputAlias's expected in xForm 'values'
interface VΣRegistrationForm {
    firstName: string;
    lastName: string;
    emailAddress: string;
    isMITUndergraduate: boolean;
}

export const VΣRegistrationForm = () => {
    
    // Optionally pass the interface into the hook to apply <T> typing to 'values'
    // const xFormBuilder = useVectorSigma<VΣRegistrationForm>(apiXFormData); 
        .setName('VΣ Registration Form')
        .setBrand("brandHexColor", "www.exampleurl.com/logoimage.png", 'right');
    return xFormBuilder.render({
        displayMode: 'accordion',
        readOnlyMode: false,
        // Access 'values', 'actions' and 'instance' objects in global onSubmit callback function
        onSubmit: async (values, actions, instance) => {
            console.log("Email:", values.emailAddress);
            console.log("MIT Undergraduate:", values.isMITUndergraduate);
            const timeTakenMs = (instance.timeSubmitted || Date.now()) - instance.timeCreated;
            console.log(\`VΣ User finished the xForm in \${timeTakenMs / 1000} seconds.\`);
            console.log(\`xForm Status:\`, instance.statusCode);
           try {
                // Initiate HTTP POST request with stateful 'values' and 'instance' payload
                await fetch(\`/api/questionnaires/\${instance.formObject.uuid}/responses\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        formVersion: instance.formObject.uuid,
                        responseTime: instance.timeSubmitted - instance.timeCreated,
                        xFormObject: instance.formObject,
                        answers: values
                    })
                });
                // Reset form after HTTP POST request success and more (i.e. https://formik.org/docs/api/formik)
                actions.resetForm(); 
                alert("Thank you for completing the VΣ questionnaire!");
            } catch (error) {
                console.error("Failed to save responses to VΣ DB", error);
            }
        }
    });
};`;

export const xFormRegistrationCodeString = `import React, { useMemo, useState } from 'react';
import { Box, Flex, Button, Card, Text, Badge } from '@radix-ui/themes';
import { VectorSigma } from '@emeraldemperaur/vector-sigma'; 

export const AgentRegistrationDashboard = () => {
  // Initialize the VectorSigma instance exactly once using useMemo
  const vsInstance = useMemo(() => {
    return new VectorSigma()
      .setName("MI6 Ops Registration")
      .setBrand("#800020")
      .createSection("identity", "Agent Identity")
      .addQueryToSection("identity", {
        queryId: 1,
        inputType: "text-input",
        inputAlias: "codename",
        inputLabel: "Agent Codename",
        isRequired: true,
        inputPlaceholder: "e.g. 007"
      })
      .addQueryToSection("identity", {
        queryId: 2,
        inputType: "optionselect-input",
        inputAlias: "clearance",
        inputLabel: "Clearance Level",
        isRequired: true,
        inputOptions: [
          {optionid: 1, text: "Level 1 (Standard)", optionvalue: "L1" , optionurl: "https://github.com/emeraldemperaur"},
          {optionid: 2, text: "Level X (Classified)", optionvalue: "LX", optionurl: "https://github.com/emeraldemperaur"}
        ]
      });
  }, []);

  const [, setTriggerRender] = useState(0);
  const updateUI = () => setTriggerRender(prev => prev + 1);

  // ==========================================
  // EXTERNAL xFORM CONTROL via vsInstance.actions
  // ==========================================
  
  const handleExternalSubmit = () => {
    // Programmatically trigger Formik's submit routine
    vsInstance.actions?.submitForm();
    updateUI();
  };

  const handleExternalReset = () => {
    // Reset xForm Instance
    vsInstance.actions?.resetForm();
    updateUI();
  };

  const handleInjectMockData = () => {
    // Pre-fill specific fields with override values using setFieldValue
    vsInstance.actions?.setFieldValue('codename', 'Mito');
    vsInstance.actions?.setFieldValue('clearance', 'LX');
    
    // Trigger validation after mock data injection
    vsInstance.actions?.validateForm();
    updateUI();
  };

  const handleSaveDraft = async () => {
    // Get a snapshot of the current state of the xForm instance without submitting
    const extantValues = vsInstance.values;
    console.log("Saving xForm Draft to LocalStorage...", extantValues);
    
    // Access VΣ instance properties for analytics
    const timeSpent = Date.now() - (vsInstance.timeInProgress || vsInstance.timeCreated);
    console.log(\`User has spent \${timeSpent / 1000} seconds on this draft.\`);
    
    alert(\`Draft saved for agent: \${extantValues.codename || 'Unknown'}\`);
  };

  return (
    <Flex gap="6" align="start" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <Box style={{ flex: '1' }}>
        {vsInstance.render({
          displayMode: 'codex',
          buttonOverride: true, // disable VΣ default submit button
          theme: { appearance: 'dark', accentColor: 'ruby', radius: 'medium' },
          onSubmit: async (values, actions, instance) => {
            alert(\`Successfully registered \${values.codename}!\`);
            actions.resetForm();
            updateUI();
          }
        })}
      </Box>

      <Card size="3" style={{ width: '350px', backgroundColor: 'var(--gray-2)' }}>
        <Flex direction="column" gap="4">
          <Text size="5" weight="bold">Command Center</Text>
          
          {/* RENDER INSTANCE PROPERTIES */}
          <Box style={{ padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
            <Flex justify="between" align="center" mb="2">
              <Text size="2" color="gray">Status:</Text>
              <Badge color={vsInstance.statusCode === 0 ? 'gray' : vsInstance.statusCode === 1 ? 'blue' : 'green'}>
                {vsInstance.statusCode === 0 ? '0 - Empty' : vsInstance.statusCode === 1 ? '1 - In Progress' : '2 - Submitted'}
              </Badge>
            </Flex>
            <Flex justify="between" align="center">
              <Text size="2" color="gray">Errors:</Text>
              <Text size="2" color={Object.keys(vsInstance.errors).length > 0 ? 'red' : 'green'}>
                {Object.keys(vsInstance.errors).length} detected
              </Text>
            </Flex>
          </Box>

          {/* CONTROL COMPONENTS FOR VΣ INSTANCE ACTIONS */}
          <Button size="3" color="ruby" variant="solid" onClick={handleExternalSubmit}>
            Authorize Submission
          </Button>
          
          <Button size="3" color="gray" variant="surface" onClick={handleSaveDraft}>
            Save Draft (Read Values)
          </Button>

          <Flex gap="3">
            <Button size="2" color="indigo" variant="soft" style={{ flex: 1 }} onClick={handleInjectMockData}>
              Inject Data
            </Button>
            <Button size="2" color="tomato" variant="soft" style={{ flex: 1 }} onClick={handleExternalReset}>
              Purge Form
            </Button>
          </Flex>

        </Flex>
      </Card>
      
    </Flex>
  );
};`;


export const xFormFileDataCodeString = `onSubmit: async (values, actions, instance) => {
    // Create new FormData object
    const formData = new FormData();

    // Append FormData object with hydrated VectorSigma object converted to JSON string
    formData.append('formSchema', instance.toJSON());

    // Iterate over xForm Formik values and append FormData object with any File object instances encountered
    Object.keys(values).forEach(key => {
        const val = values[key];
        if (val instanceof File) {
            // Single File upload
            formData.append(key, val);
        } else if (Array.isArray(val) && val[0] instanceof File) {
            // Multiple File upload
            val.forEach(file => formData.append(key, file));
        }
    });
    // Send multipart form data via Axios
    // https://axios-http.com/docs/multipart
    await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    actions.resetForm();
}`;