import {RFValue} from "react-native-responsive-fontsize";
import {Platform} from "react-native";
import {isTablet} from "react-native-device-info";
import {isMobile} from "./isMobile";
import {px} from "./normalized";

export const fontValue = (number) => {
    return  (isMobile && !(Platform?.isPad || isTablet()))  ? RFValue(number) : px(number);
}
