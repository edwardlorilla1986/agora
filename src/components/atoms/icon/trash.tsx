import React, { FC } from 'react'
import Svg, { SvgProps, Path } from "react-native-svg";
import {fontValue as RFValue} from "../../../utils/fontValue";
const TrashIcon: FC = (props: SvgProps) => (
  <Svg
    width={RFValue(16)}
    height={RFValue(16)}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
     <Path
        d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17"
        stroke={props.color || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
  </Svg>
);

export default TrashIcon;
