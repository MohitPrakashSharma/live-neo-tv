// API Configuration
const API_BASE_URL = 'https://api-houston.khabriya.in/api/v3';
const API_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmZGQ3YjMzLWY2ZGItNDNlOC05NmM0LTFkNDMyYjc2NDI4NCIsIm1hY19hZGRyZXNzIjoibWFjX2FkZHJlc3MiLCJpYXQiOjE3MzUwNzc3NDh9.IS_fhrvJGGFPUHZD81ZBvpArLHuZi1EF1BMUy-c70j9Q4fu07tJgTurlGHs8vBP9ECEZWlh-m8SrQU8T-6nPsK84ZAB67mxQA84sbOsJnrh3TOYZKWIMawE6Qt1ebmYNF_i3PIXZOaImgFULGkKlUthqOCN_qtlIBweYFFI0jKU2umPssVK79qt10w_fuiyVMGUms-ZWrK9UIwwGdltN7jjFIqCxPvAH2nD1PuxvQZn5sQQXxtK7npOvce3ns_tx_u9mztTZI3mqV6V0rVrsfprTVOz2tWFiWzHdXHL-6jq_CV5DOFazQ-p8fQZbkoa9pTZflxEHL7H-K3V7qrPSwA';

// Common headers for all requests
const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
};

// Error handling utility
const handleApiError = (error: unknown, message: string) => {
  console.error(message, error);
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(message);
};

// Response validation
const validateResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message || 'API returned unsuccessful response');
  }
  return data;
};

/**
 * Fetch categories from the API
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/languages`, {
      method: 'POST',
      headers
    });

    const data = await validateResponse(response);
    return data.data;
  } catch (error) {
    handleApiError(error, 'Error fetching categories');
  }
};

/**
 * Fetch channels for a specific language
 */
export const fetchChannels = async (language: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/channels`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ language })
    });

    const data = await validateResponse(response);
    return data.data;
  } catch (error) {
    handleApiError(error, 'Error fetching channels');
  }
};

/**
 * Fetch popular channels
 */
export const fetchPopularChannels = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/quick-channels`, {
      method: 'POST',
      headers
    });

    const data = await validateResponse(response);
    return data.data;
  } catch (error) {
    handleApiError(error, 'Error fetching popular channels');
  }
};

/**
 * Fetch channel by name
 */
export const fetchChannelByName = async (channelName: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/deep-link`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ channel_name: channelName })
    });

    const data = await validateResponse(response);
    return data.data;
  } catch (error) {
    handleApiError(error, 'Error fetching channel');
  }
};