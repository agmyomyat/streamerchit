import { Button } from '@/components/ui/button';
import { UrlBox } from '../components/url-box';

export function AlertBoxUrlSection(props: { url: string }) {
  if (!props.url) return null;
  return (
    <div className="flex gap-20 align-middle w-full text-slate-400">
      <h1 className="w-32 max-w-full">Tip Box Url</h1>
      <div className="flex w-full flex-col gap-5">
        <div className="flex gap-5">
          <div>
            <UrlBox url={props.url} />
          </div>
          <Button
            onClick={() => window.open(props.url, '_blank')}
            className="h-8"
          >
            Launch
          </Button>
        </div>
        <div>Use the URL in OBS Studio, XSplit Browser Source</div>
      </div>
    </div>
  );
}
