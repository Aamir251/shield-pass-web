import toast from "react-hot-toast";

export const showSessionExpiredToastMessage = () => {
  // session expired Please Log In Again
  toast.error("Session Expired! Redirecting to Login Page...", {
    duration: 4000,
    ariaProps: {
      role: "status",
      "aria-live": "assertive",
    },
    iconTheme: {
      primary: "#141415",
      secondary: "#C3C1C1",
    },
  });
};

export const showSuccessToastMessage = (message: string) => {
  toast.success(message, {
    duration: 3000,
    ariaProps: {
      role: "status",
      "aria-live": "assertive",
    },
    iconTheme: {
      primary: "#141415",
      secondary: "#C3C1C1",
    },
  });
};

export const showToastErrorMessage = (message: string) => {
  toast.error(message, {
    duration: 3000,
    ariaProps: {
      role: "status",
      "aria-live": "assertive",
    },
  });
};
