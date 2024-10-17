import * as React from "react";
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from "react-native-svg";
const ChatIcon = (props: SvgProps) => (
    <Svg width={22} height={20} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Mask
                id="b"
                width={20}
                height={20}
                x={0}
                y={0}
                maskUnits="userSpaceOnUse"
            >
                <Path fill="#fff" d="M20 0H0v20h20V0Z" />
            </Mask>
            <G mask="url(#b)">
                <Path
                    fill="#004932"
                    d="M0 15.833A4.169 4.169 0 0 0 4.167 20h5.82c1.954 0 3.864-.57 5.499-1.64a9.994 9.994 0 0 0 3.694-4.393 10.003 10.003 0 0 0-1.89-10.832 9.993 9.993 0 0 0-4.963-2.88 10.046 10.046 0 0 0-5.73.319 10.046 10.046 0 0 0-4.615 3.414A10.003 10.003 0 0 0 0 9.375v6.463-.005Zm1.669-6.38a8.367 8.367 0 0 1 3-5.87A8.237 8.237 0 0 1 9.982 1.67c.362 0 .723.024 1.085.067a8.376 8.376 0 0 1 7.215 7.302 8.233 8.233 0 0 1-.328 3.477 8.362 8.362 0 0 1-1.736 3.034 8.339 8.339 0 0 1-6.231 2.788H4.167a2.504 2.504 0 0 1-2.503-2.503V9.452h.005Z"
                />
            </G>
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default ChatIcon;
