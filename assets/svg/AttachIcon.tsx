import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const AttachIcon = (props: SvgProps) => (
    <Svg
        width={26}
        height={26}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M12.7153 2.68009C15.642 -0.24939 20.3908 -0.24939 23.3197 2.67954C26.1735 5.53337 26.2467 10.1149 23.5392 13.0572L23.304 13.304L12.304 24.3018L12.2583 24.3396C10.4318 25.9855 7.61426 25.9296 5.85505 24.1704C4.20627 22.5216 4.05362 19.9433 5.39711 18.1224C5.42629 18.0656 5.4616 18.011 5.50311 17.9596L5.57006 17.885L5.67869 17.7754L5.85505 17.5905L5.85869 17.5941L15.1534 8.2762C15.4858 7.94292 16.0065 7.91197 16.3739 8.1838L16.4792 8.27444C16.8125 8.60682 16.8434 9.12761 16.5716 9.49499L16.481 9.60026L6.98769 19.1166C6.09064 20.2111 6.15299 21.829 7.17474 22.8507C8.21106 23.887 9.86062 23.9364 10.9554 22.9988L21.9963 11.9606C24.1906 9.76361 24.1906 6.20206 21.9939 4.00536C19.8659 1.87731 16.4569 1.81081 14.2487 3.80586L14.039 4.00536L14.0232 4.02325L2.10285 15.9436C1.73674 16.3097 1.14315 16.3097 0.777025 15.9436C0.4442 15.6109 0.413938 15.09 0.68625 14.723L0.777025 14.6179L12.7131 2.67954L12.7153 2.68009Z"
            fill="#212121"
        />
    </Svg>
);

export default AttachIcon;