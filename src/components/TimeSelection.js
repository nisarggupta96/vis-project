import {
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderMark,
    RangeSliderThumb,
    RangeSliderTrack,
} from "@chakra-ui/react";

const labelStyles = {
    mt: "3",
    ml: "-2.5",
    fontSize: "sm",
    fontWeight: "bold",
};

const years = [...Array(23).keys()].map((i) => i + 2000);

const TimeSelection = ({ handleTimeChange }) => {
    return (
        <RangeSlider
            defaultValue={[2000, 2022]}
            min={2000}
            max={2022}
            step={1}
            onChange={([year_start, year_end]) =>
                handleTimeChange(year_start, year_end)
            }
        >
            {years.map((year) => (
                <RangeSliderMark key={year} value={year} {...labelStyles}>
                    {year}
                </RangeSliderMark>
            ))}
            <RangeSliderTrack h={4} bg="#DADADA">
                <RangeSliderFilledTrack bg="#0073D0" />
            </RangeSliderTrack>
            <RangeSliderThumb
                borderColor={"#1D1F20"}
                borderWidth={2}
                boxSize={6}
                index={0}
            />
            <RangeSliderThumb
                borderColor={"#1D1F20"}
                borderWidth={2}
                boxSize={6}
                index={1}
            />
        </RangeSlider>
    );
};

export default TimeSelection;
