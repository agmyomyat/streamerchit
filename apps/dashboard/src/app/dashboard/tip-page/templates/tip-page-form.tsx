import { UseFormReturn } from 'react-hook-form';
import { TipPageSettingsFormData } from '../page';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TipPageFormProps {
  form: UseFormReturn<TipPageSettingsFormData>;
}
export function TipPageForm(props: TipPageFormProps) {
  return (
    <Form {...props.form}>
      <FormField
        control={props.form.control}
        name="display_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Display Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your display name" />
            </FormControl>
            <FormDescription>
              This is your public display name on your tip page
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={props.form.control}
        name="memo"
        render={({ field: { name, value, onBlur, onChange, ref } }) => (
          <FormItem>
            <FormLabel>Tip memo</FormLabel>
            <FormControl>
              <Input
                name={name}
                value={value || ''}
                onBlur={onBlur}
                onChange={onChange}
                ref={ref}
                placeholder="Enter Your Tip Memo"
              />
            </FormControl>
            <FormDescription>
              A breif message that is displayed on your tip page
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
