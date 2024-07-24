import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path
            stroke="#000"
            strokeWidth={2.182}
            d="M5 6.273A3.273 3.273 0 0 1 8.273 3h7.454A3.273 3.273 0 0 1 19 6.273V19.88a1.09 1.09 0 0 1-1.725.888l-4.64-3.315c-.38-.271-.89-.271-1.27 0l-4.64 3.315A1.09 1.09 0 0 1 5 19.88V6.273Z"
        />
    </Svg>
);
export default SvgComponent;
