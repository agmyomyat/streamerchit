import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function StreamlabsNote() {
  return (
    <Alert>
      <AlertTitle>Note!</AlertTitle>
      <AlertDescription>
        If you are linked to a Streamlabs account, donation alerts will be
        routed to the associated account, thereby enabling the utilization of
        Streamlabs widgets such as the Alert Box and other donation-related
        widgets
      </AlertDescription>
    </Alert>
  );
}
