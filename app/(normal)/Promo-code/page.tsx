import PromoCodesOfferHero from "@/components/promopage/herobanner";
import PromoStepsNewsletter from "@/components/promopage/howtouse";
import PromocodeServer from "@/components/promopage/PromocodeServer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = async () => {

  return (
    <div>
      <PromoCodesOfferHero />
      <Suspense fallback={<LoadingS />}>
        <PromocodeServer />
      </Suspense>


      <PromoStepsNewsletter />
    </div>
  );
};

export default Page;

const LoadingS = () => {
  return (
    <div className=' bg-black w-full gap-6 px-10 py-5 flex'>
      <Skeleton className=' h-96 w-full rounded bg-gray-800' ></Skeleton>
      <Skeleton className=' h-96 w-full rounded bg-gray-800' ></Skeleton>
      <Skeleton className=' h-96 w-full rounded bg-gray-800' ></Skeleton>
      <Skeleton className=' h-96 w-full rounded bg-gray-800' ></Skeleton>
    </div>
  )
}