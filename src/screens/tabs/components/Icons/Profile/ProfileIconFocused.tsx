import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const ProfileIconFocused = (props: SvgProps) => (
    <Svg width={24} height={20} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path
                fill="#004932"
                d="M21.348 16.969a10.163 10.163 0 0 0-7.281-6.653 5.435 5.435 0 0 0 3.055-4.877A5.447 5.447 0 0 0 11.683 0 5.439 5.439 0 0 0 6.25 5.434a5.432 5.432 0 0 0 3.084 4.892 10.159 10.159 0 0 0-7.209 6.638c-.498 1.487.6 3.031 2.168 3.031H19.18c1.568 0 2.666-1.544 2.168-3.031v.005Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M2 0h19.468v20H2z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default ProfileIconFocused;
