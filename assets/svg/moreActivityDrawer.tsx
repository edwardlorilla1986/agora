import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const MoreDrawerIcon = (props: SvgProps) => (
    <Svg
        width={20}
        height={16}
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M0.00999451 1.76C0.00999451 1.07 0.549995 0.5 1.23999 0.5H18.76C19.45 0.5 19.99 1.04 19.99 1.76C19.99 2.45 19.45 2.99 18.76 2.99H1.23999C0.549995 2.99 0.00999451 2.45 0.00999451 1.76ZM0.00999451 8C0.00999451 7.31 0.549995 6.74 1.23999 6.74H18.76C19.45 6.74 19.99 7.31 19.99 8C19.99 8.69 19.45 9.26 18.76 9.26H1.23999C0.549995 9.26 0.00999451 8.69 0.00999451 8ZM0.00999451 14.24C0.00999451 13.55 0.549995 13.01 1.23999 13.01H18.76C19.45 13.01 19.99 13.55 19.99 14.24C19.99 14.93 19.45 15.5 18.76 15.5H1.23999C0.549995 15.5 0.00999451 14.93 0.00999451 14.24Z"
            fill="black"
        />
    </Svg>
);

export default MoreDrawerIcon;