import * as React from "react";
import Svg, {Path, Rect} from "react-native-svg";

const ActivityTabbar = (props: any) => (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M13.8855 20.2776C15.154 20.2776 16.1824 21.3059 16.1824 22.5745V27.1682C16.1824 28.4367 15.154 29.4651 13.8855 29.4651H6.67188C5.40334 29.4651 4.375 28.4367 4.375 27.1682V22.5745C4.375 21.3059 5.40334 20.2776 6.67188 20.2776H13.8855ZM28.3281 20.2776C29.5967 20.2776 30.625 21.3059 30.625 22.5745V27.1682C30.625 28.4367 29.5967 29.4651 28.3281 29.4651H21.1145C19.846 29.4651 18.8176 28.4367 18.8176 27.1682V22.5745C18.8176 21.3059 19.846 20.2776 21.1145 20.2776H28.3281ZM28.3281 5.83325C29.5967 5.83325 30.625 6.86161 30.625 8.13013V15.3534C30.625 16.6219 29.5967 17.6502 28.3281 17.6502H6.67188C5.40334 17.6502 4.375 16.6219 4.375 15.3534V8.13013C4.375 6.92503 5.30308 5.93669 6.48349 5.84086L6.67188 5.83325H28.3281Z"
            fill={props.fill}/**/
        />
        {props.notification ? <Rect x={26.4} width={4} height={4} rx={2} fill="#FF0066"/> : <></> }
    </Svg>
);

export default ActivityTabbar;