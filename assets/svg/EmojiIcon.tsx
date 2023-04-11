import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const EmojiIcon = (props: SvgProps) => (
    <Svg
        width={26}
height={26}
viewBox="0 0 26 26"
fill="none"
xmlns="http://www.w3.org/2000/svg"
{...props}
>
<Path
    d="M13 0.497559C19.9046 0.497559 25.502 6.09486 25.502 12.9995C25.502 19.9041 19.9046 25.5014 13 25.5014C6.0954 25.5014 0.498085 19.9041 0.498085 12.9995C0.498085 6.09486 6.0954 0.497559 13 0.497559ZM13 2.37256C7.13093 2.37256 2.37309 7.1304 2.37309 12.9995C2.37309 18.8686 7.13093 23.6264 13 23.6264C18.8691 23.6264 23.627 18.8686 23.627 12.9995C23.627 7.1304 18.8691 2.37256 13 2.37256ZM8.5772 16.4786C9.63862 17.8257 11.2524 18.6265 13 18.6265C14.7452 18.6265 16.3571 17.828 17.4187 16.4839C17.7396 16.0775 18.3291 16.0082 18.7355 16.3292C19.1417 16.6501 19.211 17.2396 18.8901 17.646C17.4766 19.4356 15.3252 20.5015 13 20.5015C10.6717 20.5015 8.51767 19.4327 7.10442 17.639C6.78399 17.2324 6.85391 16.6429 7.26061 16.3225C7.66731 16.002 8.25677 16.072 8.5772 16.4786ZM9.25059 8.9378C10.113 8.9378 10.8122 9.63695 10.8122 10.4994C10.8122 11.3619 10.113 12.061 9.25059 12.061C8.38814 12.061 7.68897 11.3619 7.68897 10.4994C7.68897 9.63695 8.38814 8.9378 9.25059 8.9378ZM16.7506 8.9378C17.613 8.9378 18.3122 9.63695 18.3122 10.4994C18.3122 11.3619 17.613 12.061 16.7506 12.061C15.8881 12.061 15.189 11.3619 15.189 10.4994C15.189 9.63695 15.8881 8.9378 16.7506 8.9378Z"
fill="#212121"
    />
    </Svg>
);

export default EmojiIcon;