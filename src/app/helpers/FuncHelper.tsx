import { functions } from "@/firebase/firebase";
import { httpsCallable } from "firebase/functions";
import { FormikErrors, FormikHandlers, FormikTouched, FormikValues } from "formik";

interface CheckAdminStatusResponse {
    isAdmin: boolean;
}

export const formAttr = (runform: FormikHandlers & { values: FormikValues }, key: string) => {
    return {
        onChange: runform.handleChange,
        onBlur: runform.handleBlur,
        value: runform.values?.[key],
    };
};

export const errorContainer = (runform: { touched: FormikTouched<FormikValues>, errors: FormikErrors<FormikValues> }, key: string) => {
    const error = runform.errors?.[key];
    if (runform.touched?.[key] && typeof error === 'string') {
        return <div className="text-red-500 text-sm mt-1">{error}</div>;
    }
    return null;
};

export function formatDate(firestoreDate: { seconds: number; nanoseconds: number }) {
    const date = new Date(firestoreDate.seconds * 1000);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h12'

    };

    return date.toLocaleDateString(undefined, options);
}

export const checkAdminStatusFunc = async () => {
    const checkAdminStatus = httpsCallable<CheckAdminStatusResponse, CheckAdminStatusResponse>(functions, "checkAdminStatus");
    try {
        const functionResult = await checkAdminStatus();
        return functionResult.data;
    } catch (error) {
        console.error("Error checking admin status:", error);
        throw new Error("Failed to check admin status.");
    }
}
