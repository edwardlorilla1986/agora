import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ReportIcon = (props: SvgProps) => (
    <Svg
        width={30}
        height={31}
        viewBox="0 0 30 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {props.focused ? <Path
                           d="M22.8125 4.24512C24.711 4.24512 26.25 5.78414 26.25 7.68262V23.3076C26.25 25.2061 24.711 26.7451 22.8125 26.7451H7.1875C5.28903 26.7451 3.75 25.2061 3.75 23.3076V7.68262C3.75 5.78414 5.28903 4.24512 7.1875 4.24512H22.8125ZM9.6875 11.7493C9.16974 11.7493 8.75 12.1672 8.75 12.6827V20.8158C8.75 21.3314 9.16974 21.7493 9.6875 21.7493C10.2053 21.7493 10.625 21.3314 10.625 20.8158V12.6827C10.625 12.1672 10.2053 11.7493 9.6875 11.7493ZM20.3125 9.24926C19.7948 9.24926 19.375 9.65747 19.375 10.161V20.8375C19.375 21.341 19.7948 21.7493 20.3125 21.7493C20.8302 21.7493 21.25 21.341 21.25 20.8375V10.161C21.25 9.65747 20.8302 9.24926 20.3125 9.24926ZM14.9689 15.4951C14.4634 15.5001 14.0575 15.9106 14.0625 16.412L14.1068 20.8463C14.1118 21.3476 14.5256 21.7501 15.0311 21.7453C15.5366 21.7401 15.9425 21.3296 15.9375 20.8283L15.8932 16.3941C15.8882 15.8928 15.4744 15.4903 14.9689 15.4951Z"
                           fill="#113196"
                       />:
            <Path
                d="M22.8125 4.24512C24.711 4.24512 26.25 5.78414 26.25 7.68262V23.3076C26.25 25.2061 24.711 26.7451 22.8125 26.7451H7.1875C5.28903 26.7451 3.75 25.2061 3.75 23.3076V7.68262C3.75 5.78414 5.28903 4.24512 7.1875 4.24512H22.8125ZM22.8125 6.12012H7.1875C6.32455 6.12012 5.625 6.81968 5.625 7.68262V23.3076C5.625 24.1705 6.32455 24.8701 7.1875 24.8701H22.8125C23.6755 24.8701 24.375 24.1705 24.375 23.3076V7.68262C24.375 6.81968 23.6755 6.12012 22.8125 6.12012ZM9.6875 11.7493C10.1621 11.7493 10.5544 12.1004 10.6164 12.5561L10.625 12.6827V20.8158C10.625 21.3314 10.2053 21.7493 9.6875 21.7493C9.21287 21.7493 8.82064 21.3981 8.75856 20.9425L8.75 20.8158V12.6827C8.75 12.1672 9.16974 11.7493 9.6875 11.7493ZM20.3125 9.24926C20.7871 9.24926 21.1794 9.59227 21.2415 10.0373L21.25 10.161V20.8375C21.25 21.341 20.8302 21.7493 20.3125 21.7493C19.8379 21.7493 19.4456 21.4063 19.3835 20.9613L19.375 20.8375V10.161C19.375 9.65747 19.7948 9.24926 20.3125 9.24926ZM14.9689 15.4951C15.4322 15.4906 15.8186 15.8285 15.8837 16.271L15.8932 16.3941L15.9375 20.8283C15.9425 21.3296 15.5366 21.7401 15.0311 21.7453C14.5678 21.7496 14.1814 21.4119 14.1163 20.9694L14.1068 20.8463L14.0625 16.412C14.0575 15.9106 14.4634 15.5001 14.9689 15.4951Z"
                fill="#808196"
            />
        }
    </Svg>
);

export default ReportIcon;