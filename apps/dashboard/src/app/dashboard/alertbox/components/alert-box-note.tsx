import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertBoxNote() {
  return (
    <Alert>
      <AlertTitle>Note!</AlertTitle>
      <AlertDescription>
        We suggest connecting your Streamlabs account on the account page and
        using the Streamlabs Alert Box widget URL to receive and display
        donations in your live stream. Streamlabs provides various features
        related to donation management.
      </AlertDescription>
    </Alert>
  );
}
