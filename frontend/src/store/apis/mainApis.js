import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BACKEND_URL } from "../../config/utility";

export const checkAuthToken = createAsyncThunk("main/checkAuthToken", async ({ token }) => {
    try {
        const formData = new FormData();

        formData.append("token", token);

        const checkUser = await fetch(`${API_BACKEND_URL}check-auth`, {
            method: "POST",
            headers: {
                "content-type": "multipart/form-data",
                "authorization": `Bearer ${token}`
            },

            body: formData
        });

        if (checkUser.ok)
            return await checkUser.json();
        else
            return { status: false };
    } catch (error) {
        return error
    }
});