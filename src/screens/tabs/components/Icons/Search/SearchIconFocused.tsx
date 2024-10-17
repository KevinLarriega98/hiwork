import * as React from "react";
import Svg, {
    SvgProps,
    G,
    Mask,
    Path,
    Circle,
    Defs,
    ClipPath,
} from "react-native-svg";
const SearchIconFocused = (props: SvgProps) => (
    <Svg width={20} height={20} fill="none" {...props}>
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
                        d="m19.759 18.577-4.977-4.972a8.353 8.353 0 0 0 1.861-5.908 8.33 8.33 0 0 0-2.725-5.565 8.347 8.347 0 0 0-11.502.285 8.347 8.347 0 0 0-.285 11.501 8.35 8.35 0 0 0 5.566 2.725 8.352 8.352 0 0 0 5.908-1.861l4.972 4.977a.834.834 0 0 0 1.172-.01.846.846 0 0 0 .246-.583.862.862 0 0 0-.232-.589h-.004ZM8.334 15a6.663 6.663 0 0 1-6.16-4.114 6.673 6.673 0 0 1 1.443-7.268 6.664 6.664 0 0 1 7.268-1.442 6.664 6.664 0 0 1-2.551 12.824Z"
                    />
                </G>
                <Circle cx={8.333} cy={8.336} r={5.122} fill="#004932" />
            </G>
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
            <ClipPath id="b">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default SearchIconFocused;
