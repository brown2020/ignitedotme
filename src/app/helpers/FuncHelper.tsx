import { FormikErrors, FormikHandlers, FormikTouched, FormikValues } from "formik";

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