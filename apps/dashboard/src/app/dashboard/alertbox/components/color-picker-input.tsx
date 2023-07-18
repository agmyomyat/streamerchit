import { Input, InputProps } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import { ColorPicker } from './color-picker';
import React from 'react';
interface ColorPickerInputProps extends InputProps {
  colorPicker: {
    defaultValue: string;
    onChange: (color: string) => void;
  };
}
export const ColorPickerInput = React.forwardRef<
  HTMLInputElement,
  ColorPickerInputProps
>((props, ref) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const { colorPicker, ..._props } = props;
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [colorPickerRef]);
  return (
    <div ref={colorPickerRef} className="relative">
      <Input
        ref={ref}
        onFocus={() => setShowColorPicker(true)}
        placeholder=""
        {..._props}
      />
      <ColorPicker
        defaultColor={props.colorPicker.defaultValue}
        onChange={(color) => {
          props.colorPicker.onChange(color.hex);
        }}
        showComponent={showColorPicker}
      />
    </div>
  );
});
