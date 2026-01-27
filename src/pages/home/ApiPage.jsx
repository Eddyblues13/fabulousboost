import { useState } from "react";
import { Copy, Check, Code, BookOpen, Zap, Shield, Globe } from "lucide-react";
import { toast } from "react-hot-toast";

const ApiPage = () => {
  const [copiedItem, setCopiedItem] = useState("");

  const baseUrl = `${window.location.origin}/api/v2`;

  const copyToClipboard = (text, itemName) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemName);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedItem(""), 2000);
  };

  const apiSections = [
    {
      title: "Service List",
      endpoint: "/services",
      method: "POST",
      description: "Retrieve a list of all available services with their rates, limits, and features.",
      parameters: [
        { param: "key", type: "string", required: true, desc: "Your API key" },
        { param: "action", type: "string", required: true, desc: "Must be 'services'" },
      ],
      exampleRequest: {
        key: "your_api_key_here",
        action: "services"
      },
      exampleResponse: [
        {
          service: 1,
          name: "Instagram Followers | High Quality",
          type: "Default",
          category: "Instagram",
          rate: "2.50",
          min: "100",
          max: "50000",
          refill: true,
          cancel: true,
        },
        {
          service: 2,
          name: "YouTube Views | Fast Delivery",
          type: "Default",
          category: "YouTube",
          rate: "1.80",
          min: "100",
          max: "100000",
          refill: false,
          cancel: true,
        }
      ],
      curlExample: `curl -X POST "${baseUrl}/services" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "your_api_key_here",
    "action": "services"
  }'`
    },
    {
      title: "Place Order",
      endpoint: "/orders",
      method: "POST",
      description: "Create a new order for a specific service.",
      parameters: [
        { param: "key", type: "string", required: true, desc: "Your API key" },
        { param: "action", type: "string", required: true, desc: "Must be 'add'" },
        { param: "service", type: "integer", required: true, desc: "Service ID from the services list" },
        { param: "link", type: "string", required: true, desc: "Target URL or username (e.g., Instagram profile URL)" },
        { param: "quantity", type: "integer", required: true, desc: "Number of followers/views/likes etc. (must be within min-max range)" },
        { param: "runs", type: "integer", required: false, desc: "Number of runs for drip feed (optional)" },
        { param: "interval", type: "integer", required: false, desc: "Interval in minutes between runs for drip feed (optional)" },
        { param: "drip_feed", type: "boolean", required: false, desc: "Enable drip feed delivery (optional)" },
      ],
      exampleRequest: {
        key: "your_api_key_here",
        action: "add",
        service: 1,
        link: "https://instagram.com/username",
        quantity: 1000
      },
      exampleResponse: {
        order: 12345,
        provider_order_id: "provider_123"
      },
      curlExample: `curl -X POST "${baseUrl}/orders" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "your_api_key_here",
    "action": "add",
    "service": 1,
    "link": "https://instagram.com/username",
    "quantity": 1000
  }'`
    },
    {
      title: "Check Order Status",
      endpoint: "/orders/status",
      method: "POST",
      description: "Check the status of a specific order.",
      parameters: [
        { param: "key", type: "string", required: true, desc: "Your API key" },
        { param: "action", type: "string", required: true, desc: "Must be 'status'" },
        { param: "order", type: "integer", required: true, desc: "Order ID returned when placing the order" },
      ],
      exampleRequest: {
        key: "your_api_key_here",
        action: "status",
        order: 12345
      },
      exampleResponse: {
        charge: 25.00,
        start_count: 1000,
        status: "completed",
        status_description: "Order completed successfully",
        remains: 0,
        currency: "USD",
        provider_order_id: "provider_123"
      },
      curlExample: `curl -X POST "${baseUrl}/orders/status" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "your_api_key_here",
    "action": "status",
    "order": 12345
  }'`
    },
    {
      title: "Check Multiple Orders Status",
      endpoint: "/orders/multi-status",
      method: "POST",
      description: "Check the status of multiple orders at once.",
      parameters: [
        { param: "key", type: "string", required: true, desc: "Your API key" },
        { param: "action", type: "string", required: true, desc: "Must be 'multi-status'" },
        { param: "orders", type: "string", required: true, desc: "Comma-separated order IDs (e.g., '123,456,789')" },
      ],
      exampleRequest: {
        key: "your_api_key_here",
        action: "multi-status",
        orders: "12345,12346,12347"
      },
      exampleResponse: {
        "12345": {
          charge: 25.00,
          start_count: 1000,
          status: "completed",
          remains: 0,
          currency: "USD"
        },
        "12346": {
          charge: 50.00,
          start_count: 2000,
          status: "in progress",
          remains: 500,
          currency: "USD"
        },
        "12347": {
          charge: 15.00,
          start_count: 500,
          status: "pending",
          remains: 500,
          currency: "USD"
        }
      },
      curlExample: `curl -X POST "${baseUrl}/orders/multi-status" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "your_api_key_here",
    "action": "multi-status",
    "orders": "12345,12346,12347"
  }'`
    },
    {
      title: "Get Balance",
      endpoint: "/balance",
      method: "POST",
      description: "Retrieve your current account balance.",
      parameters: [
        { param: "key", type: "string", required: true, desc: "Your API key" },
        { param: "action", type: "string", required: true, desc: "Must be 'balance'" },
      ],
      exampleRequest: {
        key: "your_api_key_here",
        action: "balance"
      },
      exampleResponse: {
        balance: 150.75,
        currency: "USD"
      },
      curlExample: `curl -X POST "${baseUrl}/balance" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "your_api_key_here",
    "action": "balance"
  }'`
    },
    {
      title: "Request Refill",
      endpoint: "/refill",
      method: "POST",
      description: "Request a refill for an order that has dropped (if the service supports refills).",
      parameters: [
        { param: "key", type: "string", required: true, desc: "Your API key" },
        { param: "action", type: "string", required: true, desc: "Must be 'refill'" },
        { param: "order", type: "integer", required: true, desc: "Order ID to request refill for" },
      ],
      exampleRequest: {
        key: "your_api_key_here",
        action: "refill",
        order: 12345
      },
      exampleResponse: {
        refill: 12345,
        provider_refill_id: "refill_123"
      },
      curlExample: `curl -X POST "${baseUrl}/refill" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "your_api_key_here",
    "action": "refill",
    "order": 12345
  }'`
    },
    {
      title: "Order History",
      endpoint: "/orders/history",
      method: "POST",
      description: "Retrieve your order history with optional filters and pagination.",
      parameters: [
        { param: "key", type: "string", required: true, desc: "Your API key" },
        { param: "action", type: "string", required: true, desc: "Must be 'history'" },
        { param: "status", type: "string", required: false, desc: "Filter by status (pending, in_progress, completed, partial, cancelled)" },
        { param: "search", type: "string", required: false, desc: "Search term to filter orders" },
        { param: "page", type: "integer", required: false, desc: "Page number for pagination (default: 1)" },
      ],
      exampleRequest: {
        key: "your_api_key_here",
        action: "history",
        page: 1,
        status: "completed"
      },
      exampleResponse: {
        data: [
          {
            id: 123,
            service_id: 5,
            link: "https://instagram.com/username",
            quantity: 1000,
            price: 25.00,
            status: "completed",
            created_at: "2024-01-01T00:00:00Z"
          }
        ],
        meta: {
          current_page: 1,
          last_page: 5,
          per_page: 20,
          total: 100
        }
      },
      curlExample: `curl -X POST "${baseUrl}/orders/history" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "your_api_key_here",
    "action": "history",
    "page": 1,
    "status": "completed"
  }'`
    },
  ];

  const statusCodes = [
    { code: "pending", desc: "Order is waiting to be processed" },
    { code: "in_progress", desc: "Order is currently being processed" },
    { code: "completed", desc: "Order has been completed successfully" },
    { code: "partial", desc: "Order was partially completed" },
    { code: "cancelled", desc: "Order was cancelled" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Code className="h-12 w-12 md:h-16 md:w-16" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              API Documentation
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Integrate our SMM services into your application with our powerful REST API
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Quick Start Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 md:mb-12 border border-purple-100">
          <div className="flex items-center mb-4">
            <Zap className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Quick Start</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Base URL</h3>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200">
                <code className="text-sm md:text-base text-gray-800 font-mono">{baseUrl}</code>
                <button
                  onClick={() => copyToClipboard(baseUrl, "base-url")}
                  className="ml-4 p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Copy base URL"
                >
                  {copiedItem === "base-url" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Authentication</h3>
              <p className="text-gray-600 mb-3">
                All API requests require authentication using your API key. Include your API key in the request body for each endpoint.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> You need to be logged in to generate an API key. Visit your dashboard to generate your API key.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">HTTP Method</h3>
              <p className="text-gray-600">All endpoints use <span className="font-mono bg-gray-100 px-2 py-1 rounded">POST</span> method.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Response Format</h3>
              <p className="text-gray-600">All responses are in <span className="font-mono bg-gray-100 px-2 py-1 rounded">JSON</span> format.</p>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-8 md:space-y-12">
          {apiSections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 md:px-8 py-4 md:py-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-0">
                    {section.title}
                  </h2>
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm md:text-base font-mono">
                    {section.method} {section.endpoint}
                  </span>
                </div>
                <p className="text-purple-100 mt-2 text-sm md:text-base">{section.description}</p>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* Parameters */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
                    Parameters
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-purple-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Parameter</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Required</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {section.parameters.map((param, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <code className="text-sm font-mono text-purple-600 bg-purple-50 px-2 py-1 rounded">{param.param}</code>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{param.type}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {param.required ? (
                                <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">Required</span>
                              ) : (
                                <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">Optional</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{param.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Example Request */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Code className="h-5 w-5 text-purple-600 mr-2" />
                      Example Request (JSON)
                    </h3>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(section.exampleRequest, null, 2), `request-${index}`)}
                      className="flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {copiedItem === `request-${index}` ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 md:p-6 rounded-lg overflow-x-auto text-sm md:text-base">
                    <code>{JSON.stringify(section.exampleRequest, null, 2)}</code>
                  </pre>
                </div>

                {/* cURL Example */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Globe className="h-5 w-5 text-purple-600 mr-2" />
                      cURL Example
                    </h3>
                    <button
                      onClick={() => copyToClipboard(section.curlExample, `curl-${index}`)}
                      className="flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {copiedItem === `curl-${index}` ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 md:p-6 rounded-lg overflow-x-auto text-sm md:text-base">
                    <code>{section.curlExample}</code>
                  </pre>
                </div>

                {/* Example Response */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Shield className="h-5 w-5 text-purple-600 mr-2" />
                      Example Response
                    </h3>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(section.exampleResponse, null, 2), `response-${index}`)}
                      className="flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      {copiedItem === `response-${index}` ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 md:p-6 rounded-lg overflow-x-auto text-sm md:text-base">
                    <code>{JSON.stringify(section.exampleResponse, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Status Codes */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-8 md:mt-12 border border-purple-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="h-6 w-6 text-purple-600 mr-2" />
            Order Status Codes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statusCodes.map((status, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="flex items-center mb-2">
                  <code className="text-sm font-mono font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">{status.code}</code>
                </div>
                <p className="text-gray-600 text-sm md:text-base">{status.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 md:p-8 mt-8 md:mt-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
            If you have any questions about our API or need assistance with integration, please visit your dashboard support section or contact our team.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiPage;

