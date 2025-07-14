
// IMPORTANT: Replace YOUR_MACHINE_IP_ADDRESS with your actual local IP 
export const API_BASE_URL = 'http://192.168.1.7:5217'; 

export const apiConfig = {
    login: `${API_BASE_URL}/api/Account/Login`,
    register: `${API_BASE_URL}/api/Account/Register`,
    forgotPassword: `${API_BASE_URL}/api/Account/ForgotPassword`,
    verifyOtp: `${API_BASE_URL}/api/Account/VerifyOtp`,
    resetPassword: `${API_BASE_URL}/api/Account/ResetPassword`,
    sendOtpForChangePassword: `${API_BASE_URL}/api/Account/SendOtpForChangePassword`, // NEW
    changePasswordWithOtp: `${API_BASE_URL}/api/Account/ChangePasswordWithOtp`,       // UPDATED
    dashboardSummary: `${API_BASE_URL}/api/Dashboard/Summary`,
    claimSubmittedReport: `${API_BASE_URL}/api/Report/ClaimSubmitted`,
    submittedActivityDetails: `${API_BASE_URL}/api/Report/SubmittedActivityDetails`,
    myProfile: `${API_BASE_URL}/api/Profile/MyProfile`,
    submitFeedback: `${API_BASE_URL}/api/Profile/SubmitFeedback`, // Ensure this is also present if you have a Feedback API
};


export const callApi = async (url, method = 'GET', data = null) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                // Add Authorization header if you implement JWT tokens
                // 'Authorization': `Bearer ${await AsyncStorage.getItem('userToken')}`,
            },
        };
        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        const jsonResponse = await response.json(); // Parse the JSON response

        // Check for HTTP errors (e.g., 400, 401, 500)
        if (!response.ok) {
            const error = new Error(jsonResponse.message || 'API request failed');
            error.status = response.status;
            error.data = jsonResponse; // Attach the full JSON response for more details
            throw error;
        }

        // Check the 'Status' property from your custom ApiResponse<T>
        if (jsonResponse.status === false) {
            const error = new Error(jsonResponse.message || 'Operation failed as per API response');
            error.status = response.status; // Still use HTTP status
            error.data = jsonResponse;
            throw error;
        }

        return jsonResponse; // This will be your ApiResponse<T> object
    } catch (error) {
        console.error('API Call Error:', url, error);
        // You can customize error handling here (e.g., show a generic error message)
        throw error; // Re-throw to be caught by the component making the call
    }
};
