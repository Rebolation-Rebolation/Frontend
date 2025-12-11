import "./style.css";
import { MenuSettings } from "../../assets/constants/medals/MenuSettings";
import type { MenuSettingsProps } from "../../assets/constants/medals/MenuSettings";
export const Navbar = ({
  closeMenuDrawer,
  navbarRef,
}: {
  navbarRef: React.RefObject<HTMLDivElement | null> ;
  closeMenuDrawer: () => void;
}) => {
  const location = window.location.pathname;

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-header">
        <div className="navbar-logo">
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.4941 44.6214L19 30.2396L26.5 22.5L45.9701 42.5982C45.9701 42.5982 46.0873 43.4076 45.8577 43.8346C45.6207 44.2754 44.8461 44.6214 44.8461 44.6214H33.4941Z"
              fill="#05344A"
            />
            <path
              d="M45.6955 3.42261L4.94544 44.9585C4.94544 44.9585 2.80262 45.5696 1.68594 44.9585C0.723292 44.4318 0 42.7106 0 42.7106V3.03471C0 3.03471 0.306565 1.64115 0.899171 1.01158C1.47787 0.39679 2.80991 1.25177e-05 2.80991 1.25177e-05H11.914C11.914 1.25177e-05 13.1225 0.0582694 13.6 0.561994C14.0979 1.08742 14.0495 2.36034 14.0495 2.36034L10.0964 20.5258C9.88079 21.5167 11.1071 22.1623 11.802 21.4235L30.6842 1.34877C30.6842 1.34877 31.9424 0 32.5949 0L33.4941 1.25177e-05H43.7222C43.7222 1.25177e-05 45.5794 0.260388 45.8079 1.17468C46.0327 2.07385 45.6955 3.42261 45.6955 3.42261Z"
              fill="#20C4BA"
            />
          </svg>
        </div>
        <div className="navbar-close-button" onClick={closeMenuDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      </div>
      <div className="navbar-menu">
        <ul className="navbar-menu-list">
          {MenuSettings.map((item: MenuSettingsProps) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`navbar-menu-item ${
                  location === item.href ? "navbar-menu-item-selected" : ""
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
