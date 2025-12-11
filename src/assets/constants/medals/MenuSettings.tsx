export interface MenuSettingsProps {
  id: string;
  href: string;
  label: string;
  icon: React.ReactNode;
  role?: "admin" | "user" | "all";
} 

export const MenuSettings: MenuSettingsProps[] = [
  {
    id: "1",
    href: "/",
    label: "Home",  
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 15V12.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.39172 2.34998L2.61672 6.97498C1.96672 7.49164 1.55006 8.58331 1.69172 9.39998L2.80006 16.0333C3.00006 17.2166 4.13339 18.175 5.33339 18.175H14.6667C15.8584 18.175 17.0001 17.2083 17.2001 16.0333L18.3084 9.39998C18.4417 8.58331 18.0251 7.49164 17.3834 6.97498L11.6084 2.35831C10.7167 1.64164 9.27506 1.64164 8.39172 2.34998Z"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    role: "all",
  },
  {
    id: "3",
    href: "/championships",
    label: "Campeonatos",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.33337 12.2167V13.5717C8.33023 13.8572 8.25378 14.1371 8.11136 14.3846C7.96894 14.6321 7.76532 14.8388 7.52004 14.985C6.99933 15.3707 6.57574 15.8725 6.28294 16.4506C5.99015 17.0286 5.83622 17.667 5.83337 18.315"
          
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.6666 12.2167V13.5717C11.6698 13.8572 11.7462 14.1371 11.8886 14.3846C12.0311 14.6321 12.2347 14.8388 12.48 14.985C13.0007 15.3707 13.4243 15.8725 13.7171 16.4506C14.0098 17.0286 14.1638 17.667 14.1666 18.315"
          
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 7.50004H16.25C16.8025 7.50004 17.3324 7.28055 17.7231 6.88985C18.1138 6.49915 18.3333 5.96924 18.3333 5.41671C18.3333 4.86417 18.1138 4.33427 17.7231 3.94357C17.3324 3.55287 16.8025 3.33337 16.25 3.33337H15"
          
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.33337 18.3334H16.6667"
          
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 7.49996C5 8.82604 5.52678 10.0978 6.46447 11.0355C7.40215 11.9732 8.67392 12.5 10 12.5C11.3261 12.5 12.5979 11.9732 13.5355 11.0355C14.4732 10.0978 15 8.82604 15 7.49996V2.49996C15 2.27895 14.9122 2.06698 14.7559 1.9107C14.5996 1.75442 14.3877 1.66663 14.1667 1.66663H5.83333C5.61232 1.66663 5.40036 1.75442 5.24408 1.9107C5.0878 2.06698 5 2.27895 5 2.49996V7.49996Z"
          
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.99996 7.50004H3.74996C3.19742 7.50004 2.66752 7.28055 2.27682 6.88985C1.88612 6.49915 1.66663 5.96924 1.66663 5.41671C1.66663 4.86417 1.88612 4.33427 2.27682 3.94357C2.66752 3.55287 3.19742 3.33337 3.74996 3.33337H4.99996"
          
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    role: "all",
  },
  {
    id: "4",
    href: "/my-team",
    label: "Meu Time",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.2917 11.0417C17.2917 15.0667 14.025 18.3333 10 18.3333C5.97504 18.3333 2.70837 15.0667 2.70837 11.0417C2.70837 7.01667 5.97504 3.75 10 3.75C14.025 3.75 17.2917 7.01667 17.2917 11.0417Z"
          
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 6.66663V10.8333"
          
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.5 1.66663H12.5"
          
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    role: "all",
  },
  {
    id: "6",
    href: "/championships-settings",
    label: "Configurações",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    role: "admin",
  },
];
