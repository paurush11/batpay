const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
        "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin:
        "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
} as const;
type errorTypes = keyof typeof errors;
const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    // Just digits.
    const phoneNumber = value.replace(/[^\d]/g, '');
    // Slice and add dashes.
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};
const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setPhoneNumber: React.Dispatch<React.SetStateAction<string>>) => {
    const { value } = event.target;
    const formattedPhoneNumber = formatPhoneNumber(value);
    setPhoneNumber(formattedPhoneNumber);
};
async function onError(errors: any) {
    console.error(errors);
}

export {
    errors,
    type errorTypes,
    formatPhoneNumber,
    onError,
    handleChange
}