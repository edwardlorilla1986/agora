import React, { FC } from 'react'
import Svg, { SvgProps, Path } from "react-native-svg";
import {fontValue as RFValue} from "../../../utils/fontValue";
const MinusIcon: FC = (props: SvgProps) => (
  <Svg
    width={RFValue(14)}
    height={RFValue(4)}
    viewBox="0 0 14 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
     <Path
        d="M2 2L12 2"
        stroke={props.color || "white"}
        strokeWidth="3"
        strokeLinecap="round"
      />
  </Svg>
);

export default MinusIcon;
