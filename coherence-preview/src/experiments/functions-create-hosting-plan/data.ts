// ─── Types ───

export interface HostingPlan {
  id: string;
  name: string;
  description: string;
}

export type FeatureValue =
  | { type: 'check' }
  | { type: 'dash' }
  | { type: 'text'; value: string }
  | { type: 'link'; value: string; label: string };

export interface FeatureRow {
  id: string;
  label: string;
  isLink?: boolean;
  values: Record<string, FeatureValue>;
  explanations: Record<string, string>;
}

// ─── Hosting Plans ───

export const hostingPlans: HostingPlan[] = [
  {
    id: 'flex-consumption',
    name: 'Flex consumption',
    description:
      'Get high scalability with compute choices, virtual networking, and pay-as-you-go billing.',
  },
  {
    id: 'consumption',
    name: 'Consumption',
    description:
      'Pay for compute resources when your functions are running (pay-as-you-go).',
  },
  {
    id: 'container-apps',
    name: 'Container Apps environment',
    description:
      'Host function apps with other containerized microservices.',
  },
  {
    id: 'functions-premium',
    name: 'Functions Premium',
    description:
      'Deploy multiple function apps on the same plan with event-driven scaling.',
  },
  {
    id: 'app-service',
    name: 'App Service',
    description:
      'Run web apps and function apps on the same plan with more compute choices.',
  },
];

// ─── Feature Rows ───

export const featureRows: FeatureRow[] = [
  {
    id: 'serverless',
    label: 'Serverless',
    values: {
      'flex-consumption': { type: 'check' },
      consumption: { type: 'check' },
      'container-apps': { type: 'check' },
      'functions-premium': { type: 'dash' },
      'app-service': { type: 'dash' },
    },
    explanations: {
      'flex-consumption':
        'Flex Consumption is fully serverless — your code runs on-demand with no always-on infrastructure. You pay only for actual execution time and resources consumed, making it ideal for unpredictable or bursty workloads.',
      consumption:
        'Consumption plan is the original serverless option. Azure automatically provisions and scales compute resources. You never manage infrastructure, but execution time is capped and cold starts may occur.',
      'container-apps':
        'Container Apps supports scale-to-zero, meaning instances spin down when idle just like traditional serverless. However, since it runs containers, you get more control over the runtime environment.',
      'functions-premium':
        'Functions Premium uses pre-warmed instances that are always running, so it is not truly serverless. You pay for the always-on compute even when no functions are executing.',
      'app-service':
        'App Service plans run dedicated VMs that are always on regardless of function activity. This is traditional compute hosting, not serverless — you pay for the plan whether functions run or not.',
    },
  },
  {
    id: 'dedicated-compute',
    label: 'Dedicated compute',
    values: {
      'flex-consumption': { type: 'dash' },
      consumption: { type: 'dash' },
      'container-apps': { type: 'check' },
      'functions-premium': { type: 'check' },
      'app-service': { type: 'check' },
    },
    explanations: {
      'flex-consumption':
        'Flex Consumption does not offer dedicated compute. Your functions run on shared infrastructure managed by Azure. This keeps costs low but means resource isolation is not guaranteed.',
      consumption:
        'Consumption plan uses shared infrastructure — there are no dedicated VMs assigned to your app. This is cost-effective but offers no compute isolation from other tenants.',
      'container-apps':
        'Container Apps can run on dedicated workload profiles, giving your functions isolated compute resources. This is important for compliance-sensitive workloads that require tenant isolation.',
      'functions-premium':
        'Functions Premium provides dedicated compute with pre-allocated instances. Your functions run on VMs reserved for your plan, ensuring consistent performance and resource isolation.',
      'app-service':
        'App Service provides fully dedicated compute with VMs exclusively assigned to your plan. You choose the exact VM size, and no other tenants share your resources.',
    },
  },
  {
    id: 'virtual-networking',
    label: 'Virtual networking',
    isLink: true,
    values: {
      'flex-consumption': { type: 'check' },
      consumption: { type: 'dash' },
      'container-apps': { type: 'check' },
      'functions-premium': { type: 'check' },
      'app-service': { type: 'check' },
    },
    explanations: {
      'flex-consumption':
        'Flex Consumption supports full VNet integration, allowing your functions to access resources in private networks. This is a key advantage over the standard Consumption plan for enterprise scenarios requiring network isolation.',
      consumption:
        'The Consumption plan does not support VNet integration. Your functions can only communicate over the public internet, which may not meet security requirements for accessing private databases or internal APIs.',
      'container-apps':
        'Container Apps supports VNet integration natively. You can deploy into a custom VNet to access private resources, and you can also restrict inbound traffic using network security groups.',
      'functions-premium':
        'Functions Premium offers full VNet integration with both inbound and outbound traffic control. Your functions can securely access private endpoints, databases, and services within your virtual network.',
      'app-service':
        'App Service supports VNet integration and can be deployed into an App Service Environment (ASE) for complete network isolation. This is the most flexible option for complex networking requirements.',
    },
  },
  {
    id: 'cold-starts',
    label: 'Prevent cold starts',
    values: {
      'flex-consumption': { type: 'text', value: 'Optional' },
      consumption: { type: 'dash' },
      'container-apps': { type: 'text', value: 'Optional' },
      'functions-premium': { type: 'text', value: 'Included' },
      'app-service': { type: 'text', value: 'Included' },
    },
    explanations: {
      'flex-consumption':
        'Flex Consumption lets you optionally configure pre-provisioned instances to eliminate cold starts for critical functions. You pay extra for always-ready instances, but keep serverless pricing for the rest of your workload.',
      consumption:
        'The Consumption plan has no cold start prevention. When your function has been idle, the first request must wait for a new instance to initialize, which can add several seconds of latency.',
      'container-apps':
        'Container Apps allows you to set minimum replica counts to keep instances warm. Setting a minimum above zero prevents cold starts but means you pay for those always-on replicas.',
      'functions-premium':
        'Functions Premium eliminates cold starts by always keeping pre-warmed instances ready. At least one instance is running at all times, so your functions respond immediately to incoming requests.',
      'app-service':
        'App Service plans run dedicated VMs that are always on, so cold starts effectively do not exist. Your functions are always loaded and ready to respond instantly.',
    },
  },
  {
    id: 'max-scale-out',
    label: 'Max scale out',
    values: {
      'flex-consumption': { type: 'text', value: '1000' },
      consumption: { type: 'text', value: '200' },
      'container-apps': { type: 'text', value: '300' },
      'functions-premium': { type: 'text', value: '100' },
      'app-service': { type: 'text', value: '40-60' },
    },
    explanations: {
      'flex-consumption':
        'Flex Consumption scales up to 1000 instances, the highest of any plan. This makes it ideal for extremely high-throughput scenarios like event processing pipelines or large fan-out workloads.',
      consumption:
        'Consumption plan scales to 200 instances. While sufficient for most workloads, this may be a bottleneck if you need to process a very high volume of concurrent events or HTTP requests.',
      'container-apps':
        'Container Apps scales to 300 replicas per function app. Scaling is driven by KEDA rules, giving you fine-grained control over scaling triggers including custom metrics.',
      'functions-premium':
        'Functions Premium scales to 100 instances. While lower than serverless plans, each instance is typically more powerful (dedicated compute), so total throughput can still be very high.',
      'app-service':
        'App Service plans scale to 40-60 instances depending on the pricing tier. Scaling is manual or rule-based (autoscale), not event-driven, so you need to configure scaling policies.',
    },
  },
  {
    id: 'execution-time',
    label: 'Max function execution time',
    values: {
      'flex-consumption': { type: 'text', value: 'Unlimited' },
      consumption: { type: 'text', value: '10 minutes' },
      'container-apps': { type: 'text', value: 'Unlimited' },
      'functions-premium': { type: 'text', value: 'Unlimited' },
      'app-service': { type: 'text', value: 'Unlimited' },
    },
    explanations: {
      'flex-consumption':
        'Flex Consumption has no execution time limit. Long-running orchestrations, batch processing, and durable functions can run as long as needed without being terminated.',
      consumption:
        'Consumption plan limits each function execution to 10 minutes by default (configurable up to 10 min). If your function takes longer, it will be terminated, making this plan unsuitable for long-running tasks.',
      'container-apps':
        'Container Apps has no function execution time limit. This makes it suitable for long-running background jobs, data pipelines, and tasks that need more than a few minutes to complete.',
      'functions-premium':
        'Functions Premium has no execution time limit. Combined with dedicated compute and VNet integration, it is well-suited for long-running enterprise workloads.',
      'app-service':
        'App Service has no function execution time limit. Since you control the underlying VMs, there are no platform-imposed timeouts on your function executions.',
    },
  },
  {
    id: 'openai-integration',
    label: 'Azure OpenAI integration',
    values: {
      'flex-consumption': { type: 'check' },
      consumption: { type: 'dash' },
      'container-apps': { type: 'dash' },
      'functions-premium': { type: 'dash' },
      'app-service': { type: 'dash' },
    },
    explanations: {
      'flex-consumption':
        'Flex Consumption offers built-in Azure OpenAI integration with optimized bindings for calling GPT models. This simplifies AI-powered function development with managed authentication, token management, and retry logic.',
      consumption:
        'The Consumption plan does not offer built-in Azure OpenAI integration. You can still call OpenAI APIs manually via HTTP, but you must handle authentication, rate limiting, and retries yourself.',
      'container-apps':
        'Container Apps does not have built-in Azure OpenAI bindings. You would connect to OpenAI services using standard HTTP clients or SDKs from your containerized function code.',
      'functions-premium':
        'Functions Premium does not include the built-in Azure OpenAI integration. You can still use the OpenAI SDK, but the optimized bindings and managed token handling are not available.',
      'app-service':
        'App Service does not include built-in Azure OpenAI integration. You can call OpenAI APIs from your function code, but there are no managed bindings or platform-level optimizations.',
    },
  },
];
