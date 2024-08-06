import * as React from "react";
import Svg, { SvgProps, G, Circle, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
    <Svg width={25} height={24} fill="none" {...props}>
        <G stroke="#000" strokeWidth={1.5}>
            <Circle cx={12.5} cy={12} r={11} />
            <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.5 7v5M12.5 16v.5"
            />
        </G>
    </Svg>
);
export default SvgComponent;
