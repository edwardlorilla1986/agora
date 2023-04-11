import React, { FC } from 'react'
import Svg, { SvgProps, Path } from "react-native-svg";
import { RFValue } from 'react-native-responsive-fontsize';

const NewSearchIcon: FC = (props: SvgProps) => (
  <Svg
    width={RFValue(23)}
    height={RFValue(23)}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Path
      d="M9.16669 16.6667C13.3088 16.6667 16.6667 13.3088 16.6667 9.16666C16.6667 5.02452 13.3088 1.66666 9.16669 1.66666C5.02455 1.66666 1.66669 5.02452 1.66669 9.16666C1.66669 13.3088 5.02455 16.6667 9.16669 16.6667Z"
      stroke={props.color || "#C1CADC"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.3333 18.3333L15 15"
      stroke={props.color || "#C1CADC"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default NewSearchIcon;
