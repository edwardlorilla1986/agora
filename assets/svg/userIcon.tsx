import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const UserIcon = (props: SvgProps) => (
    <Svg
        width={30}
        height={31}
        viewBox="0 0 30 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {props.focused ? <Path
            d="M10 14.25C12.7614 14.25 15 12.0114 15 9.25C15 6.48857 12.7614 4.25 10 4.25C7.23857 4.25 5 6.48857 5 9.25C5 12.0114 7.23857 14.25 10 14.25ZM21.25 14.25C23.3211 14.25 25 12.5711 25 10.5C25 8.42894 23.3211 6.75 21.25 6.75C19.1789 6.75 17.5 8.42894 17.5 10.5C17.5 12.5711 19.1789 14.25 21.25 14.25ZM5.3125 16.75C3.7592 16.75 2.5 18.0092 2.5 19.5625V19.875C2.5 19.875 2.5 25.5 10 25.5C11.7373 25.5 13.0723 25.1981 14.0979 24.7344C13.8716 23.9876 13.75 23.1955 13.75 22.375C13.75 20.3039 14.5249 18.4139 15.8006 16.9789C15.4593 16.8316 15.0829 16.75 14.6875 16.75H5.3125ZM17.8465 17.9699C18.24 19.3326 17.422 20.7494 16.045 21.0901L15.3147 21.2708C15.2586 21.6304 15.2295 21.9994 15.2295 22.3754C15.2295 22.7687 15.2614 23.1544 15.3228 23.5296L15.997 23.692C17.3877 24.027 18.2144 25.4583 17.8095 26.8301L17.5766 27.6193C18.1256 28.1012 18.7511 28.4928 19.4319 28.7711L20.0485 28.1227C21.0341 27.0863 22.687 27.0865 23.6724 28.1234L24.2957 28.7794C24.9751 28.504 25.6001 28.1162 26.1493 27.6383L25.9017 26.7809C25.5082 25.418 26.3263 24.0012 27.7032 23.6606L28.4329 23.48C28.489 23.1204 28.5181 22.7514 28.5181 22.3754C28.5181 21.982 28.4862 21.5963 28.4249 21.2209L27.7511 21.0586C26.3605 20.7237 25.5339 19.2925 25.9387 17.9205L26.1714 17.132C25.6225 16.6497 24.9969 16.2582 24.3161 15.9797L23.6998 16.6279C22.7141 17.6645 21.0612 17.6641 20.0759 16.6273L19.4524 15.9712C18.773 16.2465 18.148 16.6341 17.5989 17.1121L17.8465 17.9699ZM21.8739 24.2504C20.873 24.2504 20.0618 23.4109 20.0618 22.3754C20.0618 21.3399 20.873 20.5004 21.8739 20.5004C22.8746 20.5004 23.6859 21.3399 23.6859 22.3754C23.6859 23.4109 22.8746 24.2504 21.8739 24.2504Z"
            fill="#113196"
        /> : <Path
            d="M6.875 9.25C6.875 7.52411 8.27411 6.125 10 6.125C11.7259 6.125 13.125 7.52411 13.125 9.25C13.125 10.9759 11.7259 12.375 10 12.375C8.27411 12.375 6.875 10.9759 6.875 9.25ZM10 4.25C7.23857 4.25 5 6.48857 5 9.25C5 12.0114 7.23857 14.25 10 14.25C12.7614 14.25 15 12.0114 15 9.25C15 6.48857 12.7614 4.25 10 4.25ZM19.375 10.5C19.375 9.46446 20.2145 8.625 21.25 8.625C22.2855 8.625 23.125 9.46446 23.125 10.5C23.125 11.5355 22.2855 12.375 21.25 12.375C20.2145 12.375 19.375 11.5355 19.375 10.5ZM21.25 6.75C19.1789 6.75 17.5 8.42894 17.5 10.5C17.5 12.5711 19.1789 14.25 21.25 14.25C23.3211 14.25 25 12.5711 25 10.5C25 8.42894 23.3211 6.75 21.25 6.75ZM5.3125 16.75C3.7592 16.75 2.5 18.0092 2.5 19.5625V19.8764V19.8778L2.50001 19.881L2.50009 19.8889L2.50044 19.9096C2.5008 19.9258 2.50146 19.9464 2.50262 19.9714C2.50495 20.0211 2.50931 20.0881 2.51747 20.1698C2.53376 20.3326 2.56541 20.5562 2.62706 20.8205C2.74994 21.347 2.99568 22.0505 3.48979 22.7564C4.51333 24.2186 6.46473 25.5 10 25.5C11.7112 25.5 13.0514 25.1997 14.0947 24.7241C13.9085 24.1064 13.7937 23.4575 13.7603 22.7874C12.9541 23.2635 11.7658 23.625 10 23.625C6.97277 23.625 5.64292 22.5626 5.02584 21.6811C4.69964 21.2151 4.53523 20.7467 4.45301 20.3944C4.41213 20.2191 4.3925 20.0765 4.38316 19.9831C4.37851 19.9366 4.37646 19.9028 4.37559 19.884L4.375 19.8684V19.5625C4.375 19.0448 4.79474 18.625 5.3125 18.625H14.6652C14.9759 18.0291 15.3581 17.4766 15.8006 16.9789C15.4593 16.8316 15.0829 16.75 14.6875 16.75H5.3125ZM17.8465 17.9699C18.24 19.3326 17.422 20.7494 16.045 21.0901L15.3147 21.2708C15.2586 21.6304 15.2295 21.9994 15.2295 22.3754C15.2295 22.7687 15.2614 23.1544 15.3228 23.5296L15.997 23.692C17.3877 24.027 18.2144 25.4583 17.8095 26.8301L17.5766 27.6193C18.1256 28.1012 18.7511 28.4928 19.4319 28.7711L20.0485 28.1227C21.0341 27.0863 22.687 27.0865 23.6724 28.1234L24.2957 28.7794C24.9751 28.504 25.6001 28.1162 26.1493 27.6383L25.9017 26.7809C25.5082 25.418 26.3263 24.0012 27.7032 23.6606L28.4329 23.48C28.489 23.1204 28.5181 22.7514 28.5181 22.3754C28.5181 21.982 28.4862 21.5963 28.4249 21.2209L27.7511 21.0586C26.3605 20.7237 25.5339 19.2925 25.9387 17.9205L26.1714 17.132C25.6225 16.6497 24.9969 16.2582 24.3161 15.9797L23.6998 16.6279C22.7141 17.6645 21.0612 17.6641 20.0759 16.6273L19.4524 15.9712C18.773 16.2465 18.148 16.6341 17.5989 17.1121L17.8465 17.9699ZM21.8739 24.2504C20.873 24.2504 20.0618 23.4109 20.0618 22.3754C20.0618 21.3399 20.873 20.5004 21.8739 20.5004C22.8746 20.5004 23.6859 21.3399 23.6859 22.3754C23.6859 23.4109 22.8746 24.2504 21.8739 24.2504Z"
            fill="#808196"
        />}
    </Svg>
);

export default UserIcon;