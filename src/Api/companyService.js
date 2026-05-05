import api from "./axiosConfig";

export const createCompany = async (companyData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post('/company', companyData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Failed to create company");
    }   
}
export const uploadImageCompany = async (companyId, imageFile) => {
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        
        // التعديل هنا: غيرنا 'image' إلى 'file'
        formData.append('file', imageFile); 
        
        const response = await api.post(`/company/${companyId}/logo`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Failed to upload company image");
    }
}
export const getCompanyById = async (companyId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/company/${companyId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Failed to fetch company info");
    }
}