import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ComplaintRequest = (props) => (
    <Svg
        width="18px"
        height="18px"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M16 7.184C16 3.14 12.86 0 9 0S2 3.14 2 7c-1.163.597-2 1.696-2 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1 5 5 0 0 1 10 0 1 1 0 0 0-1 1v6a1 1 0 0 0 1 1v1h-2.592c-.206-.581-.756-1-1.408-1H8a1.5 1.5 0 0 0 0 3h6a2 2 0 0 0 2-2v-1.183A2.992 2.992 0 0 0 18 12v-2a2.99 2.99 0 0 0-2-2.816L-7 62"
            fill="#494c4e"
            fillRule="evenodd"
        />
    </Svg>
);
export default ComplaintRequest;