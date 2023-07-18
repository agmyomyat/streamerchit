'use client';
import { UseFormReturn, set, useWatch } from 'react-hook-form';
import { SettingFormData } from '../page';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ColorPickerInput } from '../components/color-picker-input';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface SettingsSectionProps {
  form: UseFormReturn<SettingFormData>;
}
export function SettingsSection(props: SettingsSectionProps) {
  if (!props.form.getValues().font_color) return null;
  return (
    <Form {...props.form}>
      <div className="flex flex-col gap-10">
        <FormField
          control={props.form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alert Duration</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  <Slider
                    onValueChange={(value) => field.onChange(value[0])}
                    value={[field.value]}
                    min={5}
                    max={30}
                  />
                  <div>{field.value}s</div>
                </div>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name="font_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Highlighted text color</FormLabel>
              <FormControl>
                <div className="w-[300px]">
                  <ColorPickerInput
                    {...field}
                    colorPicker={{
                      defaultValue: field.value,
                      onChange: (color) => field.onChange(color),
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name="font_size"
          render={({ field }) => {
            const _value = parseInt(field.value?.split('px')?.[0]);
            return (
              <FormItem>
                <FormLabel>Highlighted text size</FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    <Slider
                      onValueChange={(value) =>
                        field.onChange(value[0].toString() + 'px')
                      }
                      value={[_value]}
                      min={5}
                      max={100}
                    />
                    {field.value}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={props.form.control}
          name="font_weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hightlighted Font Weight</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  <Slider
                    onValueChange={(value) => field.onChange(value[0])}
                    value={[field.value]}
                    min={100}
                    max={1000}
                  />
                  <div>{field.value}</div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={props.form.control}
          name="message_font_size"
          render={({ field }) => {
            const _value = parseInt(field.value.split('px')[0]);
            return (
              <FormItem>
                <FormLabel>Message text size</FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    <Slider
                      onValueChange={(value) =>
                        field.onChange(value[0].toString() + 'px')
                      }
                      value={[_value]}
                      min={5}
                      max={100}
                    />
                    {field.value}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={props.form.control}
          name="message_font_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message text color</FormLabel>
              <FormControl>
                <div className="w-[300px]">
                  <ColorPickerInput
                    {...field}
                    colorPicker={{
                      defaultValue: field.value,
                      onChange: (color) => field.onChange(color),
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
