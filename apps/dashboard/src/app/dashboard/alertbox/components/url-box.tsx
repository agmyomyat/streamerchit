import { useToast } from '@/components/ui/use-toast';
import copy from 'copy-to-clipboard';

export function UrlBox(props: { url: string }) {
  const { toast } = useToast();
  const copyUrl = () => {
    copy(props.url);
    toast({
      title: 'Copied Url',
      description: (
        <div className="text-red-600">
          Warning: URL should not be shared with anyone
        </div>
      ),
    });
  };
  return (
    <div className="lg:w-[600px] w-64 py-1 border-[#4f5e65] border-[0.1px]">
      <div
        onClick={copyUrl}
        className=" hover:cursor-pointer w-64 absolute lg:w-[600px] text-center text-white z-10"
      >
        Click to copy URL
      </div>
      <div className=" w-full text-center blur-sm truncate max-w-full">
        {props.url}
      </div>
    </div>
  );
}
