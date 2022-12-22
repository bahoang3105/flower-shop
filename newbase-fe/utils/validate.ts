const validate = {
  passwordStrength(pw: string): number {
    return (
      (/.{8,}/.test(pw) ? 1 : 0) /* at least 8 characters */ *
      ((/[a-z]/.test(pw) ? 1 : 0) /* a lower letter */ +
        (/[A-Z]/.test(pw) ? 1 : 0) /* a upper letter */ +
        (/\d/.test(pw) ? 1 : 0) /* a digit */ +
        (/[^A-Za-z0-9]/.test(pw) ? 1 : 0)) /* a special character */
    );
  },
  validateStatus(status: number): boolean {
    return status === 200 || status === 201 || status === 400 || status === 401 || status === 500;
  },
};

export default validate;
