import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PermitIcon = (props) => (
    <Svg
        width="48px"
        height="48px"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 6C13.3431 6 12 7.34315 12 9V35C12 36.6569 13.3431 38 15 38H25V40H15C12.2386 40 10 37.7614 10 35V9C10 6.23858 12.2386 4 15 4H33C35.7614 4 38 6.23858 38 9V35C38 37.7614 35.7614 40 33 40H31V38H33C34.6569 38 36 36.6569 36 35V9C36 7.34315 34.6569 6 33 6H15Z"
            fill={props.color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 11C18 10.4477 18.4477 10 19 10L29 10C29.5523 10 30 10.4477 30 11C30 11.5523 29.5523 12 29 12L19 12C18.4477 12 18 11.5523 18 11Z"
            fill={props.color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 17C14 16.4477 14.4477 16 15 16H33C33.5523 16 34 16.4477 34 17C34 17.5523 33.5523 18 33 18H15C14.4477 18 14 17.5523 14 17Z"
            fill={props.color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 21C14 20.4477 14.4477 20 15 20H33C33.5523 20 34 20.4477 34 21C34 21.5523 33.5523 22 33 22H15C14.4477 22 14 21.5523 14 21Z"
            fill={props.color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 25C14 24.4477 14.4477 24 15 24H33C33.5523 24 34 24.4477 34 25C34 25.5523 33.5523 26 33 26H15C14.4477 26 14 25.5523 14 25Z"
            fill={props.color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28 36C29.1046 36 30 35.1046 30 34C30 32.8954 29.1046 32 28 32C26.8954 32 26 32.8954 26 34C26 35.1046 26.8954 36 28 36ZM28 38C30.2091 38 32 36.2091 32 34C32 31.7909 30.2091 30 28 30C25.7909 30 24 31.7909 24 34C24 36.2091 25.7909 38 28 38Z"
            fill={props.color}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28 40.478L29 40.9225V38H27V40.9225L28 40.478ZM25 44V36H31V44L28 42.6667L25 44Z"
            fill={props.color}
        />
    </Svg>
);
export default PermitIcon;
