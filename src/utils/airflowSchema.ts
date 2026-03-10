import type { XFormType } from "@emeraldemperaur/vector-sigma";

export const airflowOnboardingData: XFormType = {
  uuid: "airflow-dag-onboard-001",
  name: "Apache Airflow DAG Provisioning",
  logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/AirflowLogo.png",
  brandColor: "#017CEE", 
  logoPosition: "left",
  model: [
    {
      sectionId: "dag-identity-section",
      title: "Pipeline Identity",
      subtitle: "Define the core identity and ownership of your DAG",
      icon: "filetext",
      queries: [
        {
          queryId: 1,
          inputType: "text-input",
          inputAlias: "dagId",
          inputLabel: "DAG ID",
          inputPlaceholder: "e.g., extract_sales_data_daily",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "The unique identifier for your DAG. Must contain only alphanumeric characters, dashes, and underscores.",
          hintUrl: "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html",
          errorText: "DAG ID is required and must be unique",
          queryResponse: null
        },
        {
          queryId: 2,
          inputType: "password-input",
          inputAlias: "connectionSecret",
          inputLabel: "Primary Connection Token",
          inputPlaceholder: "Enter secure token or API key",
          newRow: true,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "This secret will be securely injected into Airflow Connections via your Secrets Backend.",
          errorText: "Connection secret is required",
          queryResponse: null
        },
        {
          queryId: 3,
          inputType: "phone-input",
          inputAlias: "oncallPhone",
          inputLabel: "On-Call Phone Number",
          inputPlaceholder: "Enter Data Engineer's Phone",
          newRow: true,
          inputWidth: 5,
          isRequired: false,
          isHinted: true,
          hintText: "Used for high-severity PagerDuty escalations if the DAG fails.",
          errorText: "Invalid phone number",
          queryResponse: null
        },
        {
          queryId: 4,
          inputType: "creditcard-input",
          inputAlias: "costCenterId",
          inputLabel: "Cloud Cost Center ID",
          inputPlaceholder: "0000 0000 0000 0000",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "The 16-digit billing department ID associated with the compute cost of this pipeline.",
          errorText: "Cost Center ID is required for resource allocation",
          queryResponse: null
        },
        {
          queryId: 5,
          inputType: "avatar-input",
          inputAlias: "teamAvatar",
          inputLabel: "Data Team Avatar",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "Upload your team's logo to display on the Airflow dashboard UI.",
          queryResponse: null
        }
      ]
    },
    {
      sectionId: "infrastructure-compute-section",
      title: "Infrastructure & Compute",
      icon: "desktop",
      queries: [
        {
          queryId: 6,
          inputType: "currency-input",
          inputAlias: "monthlyBudget",
          inputLabel: "Max Monthly Compute Budget",
          inputPlaceholder: "Enter budget limit",
          newRow: false,
          inputWidth: 4,
          isRequired: false,
          isHinted: true,
          hintText: "Hard limit for cloud compute costs associated with this DAG's workers.",
          defaultValue: "USD",
          errorText: "Invalid budget format",
          queryResponse: null
        },
        {
          queryId: 7,
          inputType: "stock-input",
          inputAlias: "coreDependency",
          inputLabel: "Primary Data Warehouse",
          inputPlaceholder: "e.g., SNOW",
          newRow: false,
          inputWidth: 4,
          isRequired: false,
          isHinted: true,
          hintText: "The primary external service ticker/identifier this DAG interacts with (e.g., SNOW, GOOGL).",
          defaultValue: "SNOW",
          queryResponse: null
        },
        {
          queryId: 8,
          inputType: "radiogroup-input",
          inputAlias: "airflowExecutor",
          inputLabel: "Airflow Executor Type",
          inputPlaceholder: "Select Executor",
          newRow: true,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "Determines how and where your tasks are executed.",
          hintUrl: "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/executor/index.html",
          errorText: "Executor type is required",
          inputOptions: [
            { optionid: 1, optionvalue: "KubernetesExecutor", text: "Kubernetes Executor (Isolated Pods)" },
            { optionid: 2, optionvalue: "CeleryExecutor", text: "Celery Executor (Worker Queue)" },
            { optionid: 3, optionvalue: "LocalExecutor", text: "Local Executor (Single Node)" }
          ],
          queryResponse: null
        },
        {
          queryId: 9,
          inputType: "optionselect-input",
          inputAlias: "clusterRegion",
          inputLabel: "Deployment Region",
          inputPlaceholder: "Select AWS Region",
          newRow: false,
          inputWidth: 5,
          isRequired: true,
          isHinted: true,
          hintText: "The cloud region where the Airflow workers will spin up for this DAG.",
          errorText: "Region is required",
          inputOptions: [
            { optionid: 1, optionvalue: "us-east-1", text: "US East (N. Virginia)" },
            { optionid: 2, optionvalue: "eu-central-1", text: "EU Central (Frankfurt)" },
            { optionid: 3, optionvalue: "ap-southeast-1", text: "Asia Pacific (Singapore)" }
          ],
          queryResponse: null
        },
         {
          queryId: 10,
          inputType: "countryselect-input",
          inputAlias: "dataResidency",
          inputLabel: "Primary Data Residency",
          inputPlaceholder: "Select strict compliance country",
          newRow: true,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "Select the country where data must remain to comply with local privacy laws (e.g., GDPR).",
          errorText: "Data residency is required",
          queryResponse: null
        },
        {
          queryId: 11,
          inputType: "countrymultiselect-input",
          inputAlias: "permittedGeoRegions",
          inputLabel: "Permitted Geo-Processing Regions",
          inputPlaceholder: "Select allowed processing countries",
          newRow: false,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "Select all countries where intermediate data is legally allowed to be processed.",
          queryResponse: null
        }
      ]
    },
    {
      sectionId: "execution-properties-section",
      title: "Execution Properties",
      icon: "mixervertical",
      queries: [
        {
          queryId: 12,
          inputType: "selectmultiple-input",
          inputAlias: "targetDataStores",
          inputLabel: "Target Data Connections",
          inputPlaceholder: "Select required connections",
          newRow: false,
          inputWidth: 5,
          isRequired: true,
          isHinted: true,
          hintText: "Select which connections this DAG will need permission to access.",
          errorText: "At least one target connection is required",
          inputOptions: [
            { optionid: 1, optionvalue: "postgres_default", text: "PostgreSQL (RDS)" },
            { optionid: 2, optionvalue: "aws_s3_main", text: "Amazon S3 Data Lake" },
            { optionid: 3, optionvalue: "gcp_bigquery", text: "Google BigQuery" }
          ],
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 13,
          inputType: "slider-input",
          inputAlias: "maxActiveRuns",
          inputLabel: "Max Active Runs",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 7,
          isRequired: false,
          isHinted: true,
          hintText: "Maximum number of active DAG runs allowed concurrently.",
          minValue: 1,
          maxValue: 16,
          stepValue: 1,
          defaultValue: 1,
          queryResponse: null
        },
        {
          queryId: 14,
          inputType: "rangeslider-input",
          inputAlias: "slaTimeoutRange",
          inputLabel: "Expected SLA Window (Minutes)",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "The expected minimum and maximum execution time. Will trigger an SLA miss alert if exceeded.",
          minValue: 0,
          maxValue: 120,
          stepValue: 5,
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 15,
          inputType: "toggle-input",
          inputAlias: "catchupEnabled",
          inputLabel: "Enable Historical Catchup",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 4,
          isRequired: false,
          isHinted: true,
          hintText: "If enabled, Airflow will backfill all missed executions between the start date and today.",
          defaultValue: null,
          queryResponse: null
        }
      ]
    },
    {
      sectionId: "scheduling-assets-section",
      title: "Scheduling & Assets",
      icon: "calendar",
      queries: [
        {
          queryId: 16,
          inputType: "checkboxgroup-input",
          inputAlias: "alertChannels",
          inputLabel: "Failure Notification Channels",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "Where should Airflow send logs when a task in this DAG fails?",
          errorText: "At least one alert channel is required",
          inputOptions: [
            { optionid: 1, optionvalue: "Slack", text: "#data-eng-alerts (Slack)" },
            { optionid: 2, optionvalue: "Email", text: "Team Distribution Email" },
            { optionid: 3, optionvalue: "PagerDuty", text: "PagerDuty (Critical)" }
          ],
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 17,
          inputType: "datepicker-input",
          inputAlias: "dagStartDate",
          inputLabel: "DAG Start Date (start_date)",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 4,
          isRequired: true,
          isHinted: true,
          hintText: "The logical execution date from which this DAG should begin running.",
          errorText: "Start date is required",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 18,
          inputType: "daterangepicker-input",
          inputAlias: "maintenanceWindow",
          inputLabel: "Approved Maintenance Window",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "Timeframe during which the pipeline can be paused for downstream upgrades.",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 19,
          inputType: "datetimepicker-input",
          inputAlias: "firstExecutionLock",
          inputLabel: "Hard Trigger Next Execution",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 4,
          isRequired: false,
          isHinted: true,
          hintText: "Override scheduling and force the first run to execute at this specific timestamp.",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 20,
          inputType: "dropdown-input",
          inputAlias: "scheduleInterval",
          inputLabel: "Schedule Interval (CRON)",
          inputPlaceholder: "Select interval",
          newRow: false,
          inputWidth: 6,
          isRequired: true,
          isHinted: true,
          hintText: "How frequently this DAG should trigger.",
          errorText: "Schedule interval is required",
          inputOptions: [
            { optionid: 1, optionvalue: "@hourly", text: "@hourly (0 * * * *)" },
            { optionid: 2, optionvalue: "@daily", text: "@daily (0 0 * * *)" },
            { optionid: 3, optionvalue: "@weekly", text: "@weekly (0 0 * * 0)" },
            { optionid: 4, optionvalue: "None", text: "None (Manual Trigger Only)" }
          ],
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 21,
          inputType: "file-input",
          inputAlias: "dagPythonScript",
          inputLabel: "Upload Python DAG File (.py)",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 5,
          isRequired: true,
          isHinted: true,
          hintText: "Upload the actual Python script containing your DAG definition.",
          errorText: "Python file is required",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 22,
          inputType: "filemultiple-input",
          inputAlias: "dagDependencies",
          inputLabel: "Upload Dependencies (requirements.txt / sql)",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 7,
          isRequired: false,
          isHinted: true,
          hintText: "Upload any custom operators, SQL files, or requirements.txt files needed.",
          defaultValue: null,
          queryResponse: null
        },
        {
          queryId: 23,
          inputType: "image-output",
          inputAlias: "architectureDiagram",
          inputLabel: "Pipeline Architecture Preview",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 33,
          inputHeight: 33,
          isRequired: false,
          isHinted: true,
          hintText: "A visual reference of how this pipeline connects to the broader ecosystem.",
          defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/AirflowLogo.png/120px-AirflowLogo.png",
          queryResponse: null
        }
      ]
    },
    {
      sectionId: "advanced-routing-section",
      title: "Advanced Routing & Dependencies",
      icon: "code",
      queries: [
        {
          queryId: 24,
          inputType: "conditional-toggle",
          inputAlias: "hasSensorDependency",
          inputLabel: "Waits on External Sensors?",
          inputPlaceholder: "",
          newRow: false,
          inputWidth: 5,
          isRequired: false,
          isHinted: true,
          hintText: "Does this DAG need to wait for a file to land in S3 or a DB record to update before starting?",
          triggerValue: true,
          toggledInput: {
            queryId: 25,
            inputType: "dropdown-input",
            inputAlias: "sensorType",
            inputLabel: "External Sensor Type",
            inputPlaceholder: "Select sensor",
            newRow: false,
            inputWidth: 5,
            isRequired: false,
            isHinted: true,
            hintText: "Which Airflow Sensor should be injected as the root task?",
            inputOptions: [
              { optionid: 1, optionvalue: "S3KeySensor", text: "Amazon S3 Key Sensor" },
              { optionid: 2, optionvalue: "SqlSensor", text: "SQL Record Sensor" },
              { optionid: 3, optionvalue: "ExternalTaskSensor", text: "External DAG Task Sensor" }
            ],
            defaultValue: null,
            queryResponse: null
          },
          queryResponse: null
        },
        {
          queryId: 26,
          inputType: "conditional-select",
          inputAlias: "alertSeverity",
          inputLabel: "DAG Priority Level",
          inputPlaceholder: "Select priority",
          newRow: false,
          inputWidth: 7,
          isRequired: false,
          isHinted: true,
          hintText: "Determines SLA monitoring strictness. Critical priority will require an escalation policy.",
          inputOptions: [
            { optionid: 1, optionvalue: "Low", text: "Low (Best Effort)" },
            { optionid: 2, optionvalue: "Medium", text: "Medium (Business Hours)" },
            { optionid: 3, optionvalue: "Critical", text: "Critical (24/7 Support)" }
          ],
          defaultValue: null,
          triggerValue: "Critical",
          toggledInput: {
            queryId: 27,
            inputType: "dropdown-input",
            inputAlias: "escalationPolicy",
            inputLabel: "Critical Escalation Policy",
            inputPlaceholder: "Select escalation route",
            newRow: false,
            inputWidth: 5,
            isRequired: false,
            isHinted: true,
            hintText: "Who gets paged if this critical pipeline fails?",
            inputOptions: [
              { optionid: 1, optionvalue: "DataOps_Tier1", text: "DataOps L1 (India Team)" },
              { optionid: 2, optionvalue: "DataOps_Tier2", text: "DataOps L2 (US Team)" },
              { optionid: 3, optionvalue: "Platform_Eng", text: "Platform Engineering L3" }
            ],
            defaultValue: null,
            queryResponse: null
          },
          queryResponse: null
        },
        {
          queryId: 28,
          inputType: "conditional-checkbox",
          inputAlias: "requiresCustomDocker",
          inputLabel: "Requires Custom Docker Image (KubernetesPodOperator)",
          inputPlaceholder: "",
          newRow: true,
          inputWidth: 6,
          isRequired: false,
          isHinted: true,
          hintText: "Check this if your tasks require execution inside a custom Docker container instead of native PythonOperators.",
          triggerValue: true,
          toggledInput: {
            queryId: 29,
            inputType: "dropdown-input",
            inputAlias: "dockerRegistry",
            inputLabel: "Approved Docker Registry",
            inputPlaceholder: "Select a registry",
            newRow: false,
            inputWidth: 6,
            isRequired: false,
            isHinted: true,
            hintText: "Select the container registry where your custom image is hosted.",
            inputOptions: [
              { optionid: 1, optionvalue: "AWS_ECR", text: "Amazon Elastic Container Registry (ECR)" },
              { optionid: 2, optionvalue: "GCP_GCR", text: "Google Container Registry (GCR)" },
              { optionid: 3, optionvalue: "DockerHub", text: "DockerHub (Public/Private)" }
            ],
            defaultValue: null,
            queryResponse: null
          },
          queryResponse: null
        }
      ]
    }
  ]
};