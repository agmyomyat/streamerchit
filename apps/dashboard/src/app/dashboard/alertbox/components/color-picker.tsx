import { useEffect } from 'react';
import { Color, ColorPicker as C, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
interface ReactColorPickerProps {
  onChange: (color: Color) => void;
  showComponent: boolean;
  defaultColor: string;
}
export const ColorPicker = (props: ReactColorPickerProps) => {
  const [color, setColor] = useColor('hex', props.defaultColor);
  useEffect(() => {
    props.onChange(color);
  }, [color]);
  if (!props.showComponent) return null;
  return (
    <C
      width={300}
      height={200}
      color={color}
      onChange={setColor}
      hideHSV
      hideHEX
      hideRGB
      dark
    />
  );
};
