import * as React from "react";
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from "react-native-svg";
const ChatIconFocusedNotification = (props: SvgProps) => (
    <Svg width={22} height={20} fill="none" {...props}>
        <G clipPath="url(#a)">
            <G clipPath="url(#b)">
                <Mask
                    id="c"
                    width={20}
                    height={20}
                    x={0}
                    y={0}
                    maskUnits="userSpaceOnUse"
                >
                    <Path fill="#fff" d="M20 0H0v20h20V0Z" />
                </Mask>
                <G mask="url(#c)">
                    <Path
                        fill="#004932"
                        d="M0 15.833A4.169 4.169 0 0 0 4.167 20h5.82c1.954 0 3.864-.57 5.499-1.64a9.994 9.994 0 0 0 3.694-4.393 10.003 10.003 0 0 0-1.89-10.832 9.993 9.993 0 0 0-4.963-2.88 10.046 10.046 0 0 0-5.73.319 10.046 10.046 0 0 0-4.615 3.414A10.003 10.003 0 0 0 0 9.375v6.463-.005Z"
                    />
                </G>
            </G>
            <Path
                fill="#D7FF3C"
                d="M17.626 9.906c2 0 3.625-1.548 3.625-3.453C21.252 4.548 19.627 3 17.627 3S14 4.548 14 6.453c0 1.905 1.626 3.453 3.626 3.453Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h22v20H0z" />
            </ClipPath>
            <ClipPath id="b">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default ChatIconFocusedNotification;
