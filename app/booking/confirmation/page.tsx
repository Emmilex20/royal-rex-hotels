import ConfirmationClient from "@/components/ConfirmationClient";
export const dynamic="force-dynamic";
export default async function ConfirmationPage({searchParams}:{searchParams:Promise<{reference?:string;booking?:string}>}){const params=await searchParams;return <ConfirmationClient reference={params.reference||""} bookingReference={params.booking||""}/>}
