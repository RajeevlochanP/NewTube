export const fetchUserProfile = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/myDetails`, {
            method: 'GET',
            credentials: 'include', // include cookies for authentication
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

export const updateUserProfile = async (name) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/updateProfile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // include cookies for authentication
            body: JSON.stringify({ name }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};

export const updatePassword = async (currentPassword, newPassword) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/updatePassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // include cookies for authentication
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
};