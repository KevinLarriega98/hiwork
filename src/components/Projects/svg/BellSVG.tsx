import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
    <Svg width={16} height={16} fill="none" {...props}>
        <Path
            fill="#000"
            d="M8.667 1v.559c2.265.36 4 2.322 4 4.691v1.044a6.27 6.27 0 0 0 1.368 3.906l.466.581A.748.748 0 0 1 13.916 13h-12.5a.75.75 0 0 1-.585-1.219l.466-.581a6.259 6.259 0 0 0 1.37-3.906V6.25a4.752 4.752 0 0 1 4-4.691V1a1 1 0 1 1 2 0Zm-1.25 2a3.252 3.252 0 0 0-3.25 3.25v1.044a7.758 7.758 0 0 1-1.24 4.206h9.48a7.762 7.762 0 0 1-1.24-4.206V6.25A3.251 3.251 0 0 0 7.916 3h-.5Zm2.25 11c0 .503-.21 1.04-.585 1.416A2.05 2.05 0 0 1 7.667 16a2 2 0 0 1-1.416-.584A2.05 2.05 0 0 1 5.667 14h4Z"
        />
    </Svg>
);
export default SvgComponent;
