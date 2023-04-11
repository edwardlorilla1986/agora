import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const RoleAndPermissionIcon = (props: SvgProps) => (
    <Svg
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {props.focused ?  <Path
            d="M13.5 3C10.1863 3 7.5 5.68629 7.5 9C7.5 12.3137 10.1863 15 13.5 15C16.8137 15 19.5 12.3137 19.5 9C19.5 5.68629 16.8137 3 13.5 3ZM6.01309 16.5C4.35472 16.5 3 17.8303 3 19.5C3 22.0368 4.24922 23.9495 6.20249 25.1949C8.12546 26.421 10.7179 27 13.5 27C14.1163 27 14.7232 26.9716 15.3158 26.914C14.1797 25.5005 13.5 23.7047 13.5 21.75C13.5 19.7556 14.2077 17.9263 15.3858 16.5H6.01309ZM20.8125 18.75C20.8125 18.2322 21.2322 17.8125 21.75 17.8125C22.2678 17.8125 22.6875 18.2322 22.6875 18.75C22.6875 19.2678 22.2678 19.6875 21.75 19.6875C21.2322 19.6875 20.8125 19.2678 20.8125 18.75ZM22.5 24.75C22.5 25.1642 22.1642 25.5 21.75 25.5C21.3358 25.5 21 25.1642 21 24.75V21.75C21 21.3358 21.3358 21 21.75 21C22.1642 21 22.5 21.3358 22.5 21.75V24.75ZM15 21.75C15 18.022 18.022 15 21.75 15C25.478 15 28.5 18.022 28.5 21.75C28.5 25.478 25.478 28.5 21.75 28.5C18.022 28.5 15 25.478 15 21.75ZM16.5 21.75C16.5 24.6495 18.8505 27 21.75 27C24.6495 27 27 24.6495 27 21.75C27 18.8505 24.6495 16.5 21.75 16.5C18.8505 16.5 16.5 18.8505 16.5 21.75Z"
            fill="#113196"
        /> : <Path
            d="M13.5 3C10.1863 3 7.5 5.68629 7.5 9C7.5 12.3137 10.1863 15 13.5 15C16.8137 15 19.5 12.3137 19.5 9C19.5 5.68629 16.8137 3 13.5 3ZM9 9C9 6.51472 11.0147 4.5 13.5 4.5C15.9853 4.5 18 6.51472 18 9C18 11.4853 15.9853 13.5 13.5 13.5C11.0147 13.5 9 11.4853 9 9ZM6.01309 16.5C4.35472 16.5 3 17.8303 3 19.5C3 22.0368 4.24922 23.9495 6.20249 25.1949C8.12546 26.421 10.7179 27 13.5 27C14.1163 27 14.7232 26.9716 15.3158 26.914C14.9595 26.4708 14.6481 25.9899 14.3885 25.4783C14.097 25.4927 13.8006 25.5 13.5 25.5C10.8973 25.5 8.61477 24.954 7.00893 23.9301C5.43339 22.9255 4.5 21.4632 4.5 19.5C4.5 18.67 5.17179 18 6.01309 18H14.3996C14.6739 17.4633 15.0052 16.9607 15.3858 16.5H6.01309ZM20.8125 18.75C20.8125 18.2322 21.2322 17.8125 21.75 17.8125C22.2678 17.8125 22.6875 18.2322 22.6875 18.75C22.6875 19.2678 22.2678 19.6875 21.75 19.6875C21.2322 19.6875 20.8125 19.2678 20.8125 18.75ZM22.5 24.75C22.5 25.1642 22.1642 25.5 21.75 25.5C21.3358 25.5 21 25.1642 21 24.75V21.75C21 21.3358 21.3358 21 21.75 21C22.1642 21 22.5 21.3358 22.5 21.75V24.75ZM15 21.75C15 18.022 18.022 15 21.75 15C25.478 15 28.5 18.022 28.5 21.75C28.5 25.478 25.478 28.5 21.75 28.5C18.022 28.5 15 25.478 15 21.75ZM16.5 21.75C16.5 24.6495 18.8505 27 21.75 27C24.6495 27 27 24.6495 27 21.75C27 18.8505 24.6495 16.5 21.75 16.5C18.8505 16.5 16.5 18.8505 16.5 21.75Z"
            fill= {props.fill || "#808196"}
        />}
    </Svg>
);

export default RoleAndPermissionIcon;
